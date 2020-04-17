import axios from 'axios'

const backendAPIURL = process.env.API_URL
const authHeader = process.env.AUTH_HEADER

const HTTP = axios.create({
  headers: {
    Authorization: authHeader,
  },
})

export abstract class BaseProvider {
  abstract url: string

  abstract writableFields: string[]

  abstract readOnlyFields: string[]

  getList = async (): Promise<Model[]> => {
    const response = await HTTP.get(backendAPIURL + this.url)
    return response.data.data
  }

  getObject = async (objectId: string): Promise<Model> => {
    const response = await HTTP.get(`${backendAPIURL + this.url + objectId}/`)
    return response.data.data
  }
}
