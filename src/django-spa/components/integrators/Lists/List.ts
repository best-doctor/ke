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

/**
 * Компонент-интегратор для управления списком записей получаемых с сервера в стандартной связке:
 *  - элементы
 *  - фильтры
 *  - сортировка
 *  - пагинация
 *  - текущий статус получения данных
 *
 *  В корневой элемент передаются параметры запроса и данные полученные по этому запросу
 */
export const ListIntegrator = makeIntegrator(Root, {
  Filters,
  Data,
  Order,
  Pagination,
})

/**
 * Фабричная функция для создания кастомных компонентов потребителей для интегратора {@link ListIntegrator}
 */
export const makeListConsumer = makeConsumerFactory(listContexts)
