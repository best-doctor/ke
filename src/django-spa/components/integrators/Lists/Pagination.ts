import { useCallback } from 'react'
import { makeCommonConsumer } from '@cdk/multiple-contexts'

import { dataContext, paramsContext, statusContext } from './contexts'

export const Pagination = makeCommonConsumer(
  {
    dataCtx: dataContext,
    paramsCtx: paramsContext,
    statusCtx: statusContext,
  },
  ({ dataCtx, paramsCtx, statusCtx }) => {
    const [params, setParams] = paramsCtx
    const { currentPage, itemsPerPage } = params.pagination
    const { total } = dataCtx
    const handleChange = useCallback(
      (page: number) => {
        setParams({
          ...params,
          pagination: {
            ...params.pagination,
            currentPage: page,
          },
        })
      },
      [params, setParams]
    )

    return {
      onChange: handleChange,
      currentPage,
      totalPages: Math.ceil(total / itemsPerPage),
      isLoading: statusCtx.isLoading,
    }
  }
)
