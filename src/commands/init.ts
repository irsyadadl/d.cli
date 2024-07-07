import { confirm, input, select } from '@inquirer/prompts'
import fs from 'fs'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import fetch from 'node-fetch'

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Adjust the path to reference the correct resource directory relative to the compiled output
const resourceDir = path.resolve(__dirname, '../src/resources')

export async function init() {
  const cssPath = {
    laravel: 'resources/css/app.css',
    nextHasSrc: 'src/app/globals.css',
    nextNoSrc: 'app/globals.css',
    other: 'styles/app.css',
  }

  console.log('Initializing...')

  // Check if either tailwind.config.ts or tailwind.config.js exists
  const configJsExists = fs.existsSync('tailwind.config.js')
  const configTsExists = fs.existsSync('tailwind.config.ts')
  console.log(`tailwind.config.js exists: ${configJsExists}`)
  console.log(`tailwind.config.ts exists: ${configTsExists}`)

  if (!configJsExists && !configTsExists) {
    console.log(
      'No Tailwind configuration file found. Please ensure tailwind.config.ts or tailwind.config.js exists in the root directory.',
    )
    return
  }

  const projectType = await select({
    message: 'Select the project type:',
    choices: [
      { name: 'Next.js', value: 'Next.js' },
      { name: 'Laravel', value: 'Laravel' },
      { name: 'Other', value: 'Other' },
    ],
  })

  let componentsFolder, uiFolder, cssLocation, configSourcePath

  if (projectType === 'Laravel') {
    componentsFolder = 'resources/js/components'
    uiFolder = path.join(componentsFolder, 'ui')
    cssLocation = cssPath.laravel
    configSourcePath = path.join(resourceDir, 'tailwind-config/tailwind.config.laravel.stub')
  } else if (projectType === 'Next.js') {
    const hasSrc = await confirm({
      message: 'Does this project have a src directory?',
      default: true,
    })
    componentsFolder = hasSrc ? 'src/components' : 'components'
    uiFolder = path.join(componentsFolder, 'ui')
    cssLocation = hasSrc ? cssPath.nextHasSrc : cssPath.nextNoSrc
    configSourcePath = path.join(resourceDir, 'tailwind-config/tailwind.config.next.stub')
  } else {
    componentsFolder = await input({
      message: 'Enter the path to your components folder:',
      default: 'components',
    })
    uiFolder = path.join(componentsFolder, 'ui')
    cssLocation = await input({
      message: 'Where would you like to place the CSS file?',
      default: cssPath.other,
    })
    configSourcePath = path.join(resourceDir, 'tailwind-config/tailwind.config.next.stub')
  }

  console.log(`Determined CSS location: ${cssLocation}`)
  console.log(`Using Tailwind config source path: ${configSourcePath}`)

  // Ensure the components and UI folders exist
  if (!fs.existsSync(uiFolder)) {
    fs.mkdirSync(uiFolder, { recursive: true })
    console.log(`Created UI folder at ${uiFolder}`)
  } else {
    console.log(`UI folder already exists at ${uiFolder}`)
  }

  // Handle CSS file placement (always overwrite)
  const cssSourcePath = path.join(resourceDir, 'tailwind-css/app.css')
  console.log(`Checking if CSS source path exists: ${cssSourcePath}`)
  if (!fs.existsSync(path.dirname(cssLocation))) {
    fs.mkdirSync(path.dirname(cssLocation), { recursive: true })
    console.log(`Created directory for CSS at ${path.dirname(cssLocation)}`)
  }
  if (fs.existsSync(cssSourcePath)) {
    try {
      const cssContent = fs.readFileSync(cssSourcePath, 'utf8')
      console.log(`Read CSS content from ${cssSourcePath}`)
      fs.writeFileSync(cssLocation, cssContent, { flag: 'w' }) // Overwrite the existing CSS file
      console.log(`CSS file copied to ${cssLocation}`)
    } catch (error) {
      // @ts-ignore
      console.error(`Failed to write CSS file to ${cssLocation}: ${error.message}`)
    }
  } else {
    console.log(`Source CSS file does not exist at ${cssSourcePath}`)
  }

  // Determine the target Tailwind config file based on existing files
  const tailwindConfigTarget = fs.existsSync('tailwind.config.js') ? 'tailwind.config.js' : 'tailwind.config.ts'
  console.log(`Target Tailwind config file: ${tailwindConfigTarget}`)

  // Check if the config source path exists
  if (!fs.existsSync(configSourcePath)) {
    console.log(`Source Tailwind config file does not exist at ${configSourcePath}`)
    return
  }

  // Copy Tailwind configuration content (always overwrite)
  try {
    const tailwindConfigContent = fs.readFileSync(configSourcePath, 'utf8')
    fs.writeFileSync(tailwindConfigTarget, tailwindConfigContent, { flag: 'w' }) // Overwrite the existing Tailwind config
  } catch (error) {
    // @ts-ignore
    console.error(`Failed to write Tailwind config to ${tailwindConfigTarget}: ${error.message}`)
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
    packageManager === 'bun' || packageManager === 'yarn' ? `${packageManager} add ` : `${packageManager} install `

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

  // Wait for the installation to complete before proceeding
  await new Promise((resolve) => child.on('close', resolve))

  const fileUrl = 'https://raw.githubusercontent.com/irsyadadl/d.irsyad.co/master/components/ui/primitive.tsx'
  const response = await fetch(fileUrl)
  const fileContent = await response.text()
  fs.writeFileSync(path.join(uiFolder, 'primitive.tsx'), fileContent)
  console.log(`primitive.tsx file copied to ${uiFolder}`)

  // Save configuration to d.json with relative path
  const config = { ui: uiFolder }
  fs.writeFileSync('d.json', JSON.stringify(config, null, 2))
  console.log('Configuration saved to d.json')

  console.log('Installation complete.')
}
