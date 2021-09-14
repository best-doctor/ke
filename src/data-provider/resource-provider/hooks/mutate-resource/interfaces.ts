import { MutationOptions as QueryMutationOptions, UseMutationResult } from 'react-query'

import { RequestConfig } from '../../request-types'
import { SharedResourceOptions } from '../interfaces'

export interface MutationOptions<ResourceData, SourceData, TError = unknown, TContext = unknown>
  extends QueryMutationOptions<ResourceData, TError, SourceData, TContext>,
    SharedResourceOptions {
  requestConfig?: RequestConfig
}

export type MutateFn<ResourceData = unknown, SourceData = ResourceData> = (
  resourceKey: string,
  data?: SourceData,
  config?: RequestConfig
) => Promise<ResourceData>

export interface MutationResult<ResourceData, SourceData, TError = unknown, TContext = unknown>
  extends UseMutationResult<ResourceData, TError, SourceData, TContext> {}
