import fs from 'fs'
import path from 'path'
import { components, namespaces } from '../resources/components'
import { getWriteComponentPath, writeFile } from '../utils'
import chalk from 'chalk'
import { getPackageManager } from '../utils/get-package-manager'
import { additionalDeps } from '../utils/additional-deps'
import ora from 'ora'

async function createComponent(componentName: string) {
  const writePath = getWriteComponentPath(componentName)

  const dir = path.dirname(writePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const spinner = ora(`Creating ${componentName}...`).start()

  const url = `https://raw.githubusercontent.com/irsyadadl/d.irsyad.co/master/components/ui/${componentName}.tsx`
  try {
    await writeFile(`${componentName} created`, url, writePath)
    spinner.succeed(`${componentName} created`)
  } catch (error) {
    // @ts-ignore
    spinner.fail(`Error writing component to ${writePath}: ${error.message}`)
  }
}

async function processComponent(
  componentName: string,
  packageManager: string,
  action: string,
  processed: Set<string>,
  allComponents: any[],
) {
  const componentPath = getWriteComponentPath(componentName)
  if (processed.has(componentName) || fs.existsSync(componentPath)) {
    console.warn(`${chalk.blue('ℹ')} ${componentName} is already in the mix or already exists.`)
    return // Skip processing and its children if already processed or exists
  }

  processed.add(componentName)

  if (!fs.existsSync(componentPath)) {
    await additionalDeps(componentName, packageManager, action)
    await createComponent(componentName)
  }

  const component = allComponents.find((c) => c.name === componentName)
  if (component && component.children) {
    for (const child of component.children) {
      await processComponent(child.name, packageManager, action, processed, allComponents)
    }
  }
}

export async function add(options: any) {
  const configFilePath = path.join(process.cwd(), 'd.json')
  if (!fs.existsSync(configFilePath)) {
    console.error(
      `${chalk.red('d.json not found')}. ${chalk.gray(`Please run ${chalk.blue('npx @irsyadadl/d@latest init')} to initialize the project.`)}`,
    )
    return
  }

  const packageManager = await getPackageManager()
  const action = packageManager === 'npm' ? 'i ' : 'add '
  const targetComponent = components.find((comp) => comp.name === options.component)
  if (!targetComponent) {
    console.log(chalk.yellow('No component found'))
    return
  }

  // Initialize a new set for each session
  const processed = new Set<string>()

  console.log(`Starting to add ${options.component}...`)

  if (namespaces.includes(options.component)) {
    // Only process the children of the component
    if (targetComponent.children) {
      for (const child of targetComponent.children) {
        await processComponent(child.name, packageManager, action, processed, components)
      }
    }
  } else {
    // Process the component and all its children
    await processComponent(targetComponent.name, packageManager, action, processed, components)
  }

  console.log(chalk.green(`✔ All the goodies in ${options.component} are now locked and loaded.`))
}
