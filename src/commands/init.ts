import { confirm, input, select } from '@inquirer/prompts'
import fs from 'fs'
import { spawn } from 'child_process'
import path from 'path'

export async function init() {
  console.log('Initializing...')

  // User selects the project type
  const projectType = await select({
    message: 'Select the project type:',
    choices: [
      { name: 'Next.js', value: 'Next.js' },
      { name: 'Laravel', value: 'Laravel' },
      { name: 'Other', value: 'Other' }, // Option for Other project types
    ],
  })

  let componentsFolder, uiFolder, cssLocation, configSourcePath

  if (projectType === 'Other') {
    componentsFolder = await input({
      message: 'Enter the path to your components folder:',
      default: 'components',
    })

    uiFolder = path.join(componentsFolder, 'ui')
    cssLocation = await input({
      message: 'Where would you like to place the CSS file?',
      default: 'styles/app.css',
    })
    // For "Other", always use Next.js config as a fallback
    configSourcePath = 'src/resources/tailwind-config/tailwind.config.next.ts'
  } else {
    const hasSrc = await confirm({
      message: 'Does this project have a src directory?',
      default: true,
    })

    componentsFolder = hasSrc ? 'src/components' : 'components'
    uiFolder = path.join(componentsFolder, 'ui')
    cssLocation = hasSrc ? 'src/styles/app.css' : 'styles/app.css'
    configSourcePath =
      projectType === 'Next.js'
        ? 'src/resources/tailwind-config/tailwind.config.next.ts'
        : 'src/resources/tailwind-config/tailwind.config.laravel.ts'
  }

  // Ensure the components and UI folders exist
  if (!fs.existsSync(uiFolder)) {
    fs.mkdirSync(uiFolder, { recursive: true })
    console.log(`Created UI folder at ${uiFolder}`)
  }

  // Handle CSS file placement
  const cssSourcePath = 'src/resources/tailwind-css/app.css' // Adjust path as necessary
  if (!fs.existsSync(path.dirname(cssLocation))) {
    fs.mkdirSync(path.dirname(cssLocation), { recursive: true })
    console.log(`Created directory for CSS at ${path.dirname(cssLocation)}`)
  }
  if (fs.existsSync(cssSourcePath)) {
    const cssContent = fs.readFileSync(cssSourcePath, 'utf8')
    fs.writeFileSync(cssLocation, cssContent)
    console.log(`CSS file copied to ${cssLocation}`)
  } else {
    console.log(`Source CSS file does not exist at ${cssSourcePath}`)
  }

  // Copy Tailwind configuration content
  if (fs.existsSync(configSourcePath)) {
    const tailwindConfigContent = fs.readFileSync(configSourcePath, 'utf8')
    fs.writeFileSync('tailwind.config.ts', tailwindConfigContent) // Always write to root as tailwind.config.ts
    console.log(`Tailwind configuration copied to root directory.`)
  } else {
    console.log(`Tailwind configuration file does not exist at ${configSourcePath}`)
  }

  // Ask for preferred package manager
  const packageManager = await select({
    message: 'Which package manager do you want to use for installing dependencies?',
    choices: [
      { name: 'npm', value: 'npm' },
      { name: 'yarn', value: 'yarn' },
      { name: 'pnpm', value: 'pnpm' },
      { name: 'bun', value: 'bun' },
    ],
  })

  console.log('Installing dependencies...')
  const installCommand =
    packageManager === 'bun' || packageManager === 'yarn'
      ? `${packageManager} add ` // bun and yarn use 'add'
      : `${packageManager} install ` // npm and pnpm use 'install'

  const packages = [
    'react-aria-components',
    'tailwindcss-react-aria-components',
    'tailwind-variants',
    'tailwind-merge',
    'clsx',
    '@irsyadadl/paranoid',
    'tailwindcss-animate',
    'embla-carousel-react',
    'cmdk',
    'framer-motion',
    'input-otp',
    'sonner',
  ]
    .map((component) => component)
    .join(' ')
  const child = spawn(installCommand + packages, {
    stdio: 'inherit',
    shell: true,
  })

  const fileUrl = 'https://raw.githubusercontent.com/irsyadadl/d.irsyad.co/master/components/ui/primitive.tsx'
  const response = await fetch(fileUrl)
  const fileContent = await response.text()
  fs.writeFileSync(path.join(uiFolder, 'primitive.tsx'), fileContent)

  const config = { ui: uiFolder }
  fs.writeFileSync('d.json', JSON.stringify(config, null, 2))
  console.log('Configuration saved to d.json')

  console.log('Installation complete.')
}
