import { CRUDProvider } from '@cdk/Providers/CRUD/types'

export class GetSetBased<T> implements CRUDProvider<T> {
  constructor(
    private readonly get: () => Promise<T[]>,
    private readonly set: (val: T[]) => Promise<void>,
    private readonly calcPK: (val: T) => string | number
  ) {}

  async create(val: T): Promise<void> {
    const createPk = this.calcPK(val)
    const items = await this.get()
    if (items.find((item) => createPk === this.calcPK(item))) {
      throw new TypeError(
        `Try to create item with already exists primary key. Item: ${JSON.stringify(val)}, key: "${createPk}"`
      )
    }
    await this.set([...items, val])
  }

  async delete(val: T): Promise<void> {
    const deletePk = this.calcPK(val)
    const items = await this.get()
    await this.set(items.filter((item) => deletePk !== this.calcPK(item)))
  }

  async read(): Promise<T[]> {
    return this.get()
  }

  async update(val: T): Promise<void> {
    const updatePk = this.calcPK(val)
    const items = await this.get()
    const updateIndex = items.findIndex((item) => updatePk === this.calcPK(item))
    if (updateIndex < 0) {
      throw new TypeError(`Try to update not exists item. Item: ${JSON.stringify(val)}, key: "${updatePk} `)
    }
    items.splice(updateIndex, 1, val)
    await this.set(items)
  }
}
