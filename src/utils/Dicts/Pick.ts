/**
 * Создаёт новый словарь из исходного, скопировав указанное подмножество ключей
 *
 * @param dict - исходный словарь
 * @param keys - ключи для переноса в новый словарь
 */
export function pick<T, K extends keyof T>(dict: T, keys: K[]): Pick<T, K> {
  return Object.fromEntries(keys.map((key) => [key, dict[key]])) as Pick<T, K>
}
