import { DetailResponse } from '../request-types'

export function getDataFieldOrDetailResponse<T>(data: T | DetailResponse<T>): T {
  if ((data as DetailResponse<T>).data && Object.values(data).length === 1) {
    return (data as DetailResponse<T>).data
  }
  return data as T
}
