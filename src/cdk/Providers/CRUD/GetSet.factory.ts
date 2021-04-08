import { CRUDProvider, ReadQuery } from './types'

export function makeByGetSet<T>(
  get: () => readonly T[],
  set: (val: T[]) => void,
  calcPK: (val: T) => string | number
): CRUDProvider<T> {
  return {
    async create(val: T): Promise<void> {
      const createPk = calcPK(val)
      const items = get()
      if (items.find((item) => createPk === calcPK(item))) {
        throw new TypeError(
          `Try to create item with already exists primary key. Item: ${JSON.stringify(val)}, key: "${createPk}"`
        )
      }
      set([...items, val])
      return Promise.resolve()
    },

    async delete(val: T): Promise<void> {
      const deletePk = calcPK(val)
      const items = get()
      set(items.filter((item) => deletePk !== calcPK(item)))

      return Promise.resolve()
    },

    async read(): Promise<ReadQuery<T>> {
      const entities = get()
      return Promise.resolve({
        entities,
        totalCount: entities.length,
      })
    },

    async update(val: T): Promise<void> {
      const updatePk = calcPK(val)
      const items = [...get()]
      const updateIndex = items.findIndex((item) => updatePk === calcPK(item))
      if (updateIndex < 0) {
        throw new TypeError(`Try to update not exists item. Item: ${JSON.stringify(val)}, key: "${updatePk} `)
      }
      items.splice(updateIndex, 1, val)
      set(items)

      return Promise.resolve()
    },
  }
}
