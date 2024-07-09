import fs from 'fs'
import path from 'path'
import { components } from '../resources/components'
import { getWriteComponentPath, writeFile } from '../utils'
import chalk from 'chalk'
import { getPackageManager } from '../utils/get-package-manager'
import { additionalDeps } from '../utils/additional-deps'

async function createComponent(componentName: string) {
  const writePath = getWriteComponentPath(componentName)

  // Ensure directory exists before writing file
  const dir = path.dirname(writePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Check if the file already exists
  if (fs.existsSync(writePath)) {
    console.log(chalk.gray(`- Skipping ${componentName}, as it already exists.`))
    return
  }

  const url = `https://raw.githubusercontent.com/irsyadadl/d.irsyad.co/master/components/ui/${componentName}.tsx`
  try {
    await writeFile(`${componentName} created`, url, writePath)
    console.log(`- ${chalk.green(`${componentName} created  ✓`)}`)
  } catch (error) {
    // @ts-ignore
    console.error(chalk.red(`Error writing component to ${writePath}: ${error.message}`))
  }
}

export async function add(options: any) {
  const configFilePath = path.join(process.cwd(), 'd.json')

  if (!fs.existsSync(configFilePath)) {
    console.log(
      `${chalk.red('d.json not found')}. ${chalk.gray(`Please run ${chalk.blue('`npx @irsyadadl/d@latest init`')} to initialize the project.`)}`,
    )
    return
  }

  const onlyChildren = [
    'buttons',
    'collections',
    'date-and-time',
    'drag-and-drop',
    'forms',
    'navigation',
    'overlays',
    'pickers',
    'statuses',
  ]

  const packageManager = await getPackageManager()
  const action = packageManager === 'npm' ? 'i ' : 'add '

  for (const component of components) {
    if (component.name === options.component) {
      if (onlyChildren.includes(options.component)) {
        if (component.children) {
          for (const child of component.children) {
            await createComponent(child.name)
          }
        }
      } else {
        await additionalDeps(component.name, packageManager, action)
        await createComponent(component.name)
        if (component.children) {
          for (const child of component.children) {
            await createComponent(child.name)
          }
        }
      }
      return
    }
  }
  console.log(chalk.yellow('No component found'))
}
