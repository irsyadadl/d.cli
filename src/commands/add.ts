import { components } from '../resources/components'
import { getWriteComponentPath, writeFile } from '../utils'

async function createComponent(componentName: string) {
  const url = `https://raw.githubusercontent.com/irsyadadl/d.irsyad.co/master/components/ui/${componentName}.tsx`
  const writePath = getWriteComponentPath(componentName)
  await writeFile(`${componentName} created`, url, writePath)
}

export async function add(options: any) {
  for (const component of components) {
    if (component.name === options.component) {
      await createComponent(component.name)
      if (component.children) {
        for (const child of component.children) {
          await createComponent(child.name)
        }
      }
      return
    }
  }
  console.log('No component found')
}
