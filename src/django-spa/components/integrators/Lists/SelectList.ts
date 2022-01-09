import { makeCommonProvider, makeConsumerFactory } from '@cdk/multiple-contexts'
import { makeIntegrator } from '@cdk/integrators'

import { dataContext, paramsContext, statusContext, selectedContext } from './contexts'
import { Filters } from './Filters'
import { Order } from './Order'
import { Pagination } from './Pagination'
import { SelectData } from './SelectData'
import { Selected } from './Selected'

const selectListContexts = {
  data: dataContext,
  params: paramsContext,
  status: statusContext,
  selected: selectedContext,
}

const Root = makeCommonProvider(selectListContexts)

/**
 * Компонент-интегратор для управления списком записей получаемых с сервера в стандартной связке:
 *  - элементы
 *  - фильтры
 *  - сортировка
 *  - пагинация
 *  - текущий статус получения данных
 *
 *  С дополнительной возможностью выбора подмассива записей и организации пакетных операций над ними.
 *  Технически, с помощь данного интегратора можно реализовать компонент с функциональностью Select
 *
 *  В корневой элемент передаются параметры запроса и данные полученные по этому запросу, а также текущие выбранные записи
 *  Важно отметить: на этом этапе не производится никаких проверок, что выбранные элементы являются подмассивом к основным.
 */
export const SelectListIntegrator = makeIntegrator(Root, {
  Filters,
  Data: SelectData,
  Order,
  Pagination,
  Selected,
})

export const makeSelectListConsumer = makeConsumerFactory(selectListContexts)
