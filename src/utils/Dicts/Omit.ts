/**
 * Создаёт новый словарь из исходного, скопировав все ключи кроме переданных вторым параметром
 *
 * @param dict - исходный словарь
 * @param keys - ключи для исключения из нового словарь
 */
export function omit<T, K extends keyof T>(dict: T, keys: K[]): Omit<T, K> {
  return Object.fromEntries(Object.entries(dict).filter(([key]) => !keys.includes(key as K))) as Omit<T, K>
}
