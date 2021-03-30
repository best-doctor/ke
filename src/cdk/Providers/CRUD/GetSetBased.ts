import { CRUDProvider } from '@cdk/Providers/CRUD/types'

export class GetSetBased<T> implements CRUDProvider<T> {
  constructor(
    private readonly get: () => readonly T[],
    private readonly set: (val: T[]) => void,
    private readonly calcPK: (val: T) => string | number
  ) {}

  async create(val: T): Promise<void> {
    const createPk = this.calcPK(val)
    const items = this.get()
    if (items.find((item) => createPk === this.calcPK(item))) {
      throw new TypeError(
        `Try to create item with already exists primary key. Item: ${JSON.stringify(val)}, key: "${createPk}"`
      )
    }
    this.set([...items, val])
    return Promise.resolve()
  }

  async delete(val: T): Promise<void> {
    const deletePk = this.calcPK(val)
    const items = this.get()
    this.set(items.filter((item) => deletePk !== this.calcPK(item)))

    return Promise.resolve()
  }

  async read(): Promise<readonly T[]> {
    return Promise.resolve(this.get())
  }

  async update(val: T): Promise<void> {
    const updatePk = this.calcPK(val)
    const items = [...this.get()]
    const updateIndex = items.findIndex((item) => updatePk === this.calcPK(item))
    if (updateIndex < 0) {
      throw new TypeError(`Try to update not exists item. Item: ${JSON.stringify(val)}, key: "${updatePk} `)
    }
    items.splice(updateIndex, 1, val)
    this.set(items)

    return Promise.resolve()
  }
}
