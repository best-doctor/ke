import axios from 'axios'

const backendAPIURL = '/api'

export abstract class BaseProvider {
  url!: string

  writableFields!: string[]

  readOnlyFields!: string[]

  getList = async (): Promise<Model[]> => {
    const response = await axios.get(backendAPIURL + this.url)
    return response.data
  }

  getObject = async (objectId: string): Promise<Model> => {
    const response = await axios.get(`${backendAPIURL + this.url + objectId}/`)
    return response.data
  }
}
