import fs from 'fs'
import path from 'path'
import { components } from '../resources/components'
import { getWriteComponentPath, writeFile } from '../utils'
import chalk from 'chalk'

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

  console.log(chalk.blue('Checking for d.json file...'))

  if (!fs.existsSync(configFilePath)) {
    console.log(
      `${chalk.red('d.json not found')}. ${chalk.gray(`Please run ${chalk.blue('`npx @irsyadadl/d@latest init`')} to initialize the project.`)}`,
    )
    return
  }

  console.log(chalk.blue('d.json file found ✓, proceeding...'))

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

  for (const component of components) {
    if (component.name === options.component) {
      if (onlyChildren.includes(options.component)) {
        // Install only child components
        if (component.children) {
          for (const child of component.children) {
            await createComponent(child.name)
          }
        }
      } else {
        // Install the main component and its children
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
