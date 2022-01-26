import stringify from 'safe-stable-stringify'

export function makeFakeContent(componentName: string, props: unknown): string {
  return `Component "${componentName}", props: "${stringify(props)}"`
}
