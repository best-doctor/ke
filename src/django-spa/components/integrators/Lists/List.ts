import { makeCommonProvider, makeConsumerFactory } from '@cdk/multiple-contexts'
import { makeIntegrator } from '@cdk/integrators'

import { dataContext, paramsContext, statusContext } from './contexts'
import { Filters } from './Filters'
import { Data } from './Data'
import { Order } from './Order'
import { Pagination } from './Pagination'

const listContexts = {
  data: dataContext,
  params: paramsContext,
  status: statusContext,
}

const Root = makeCommonProvider(listContexts)

export const ListIntegrator = makeIntegrator(Root, {
  Filters,
  Data,
  Order,
  Pagination,
})

export const makeListConsumer = makeConsumerFactory(listContexts)
