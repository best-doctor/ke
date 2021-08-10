import { QueryResourceOptions, ResourceQueryResult } from './interfaces'
import { useResource } from './useResource'

export const useResourceByKey = <ResourceData>(
  key: string,
  requestOptions: QueryResourceOptions<ResourceData> = {}
): ResourceQueryResult<ResourceData> => useResource(key, requestOptions)
