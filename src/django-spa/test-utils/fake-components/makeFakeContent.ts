import stringify from 'safe-stable-stringify'

/**
 * Генерит стабильную строку на основе входных параметров
 *
 * @param componentName - имя компонента
 * @param props - параметры компонента
 */
export function makeFakeContent(componentName: string, props: unknown): string {
  return `Component "${componentName}", props: "${stringify(props)}"`
}
