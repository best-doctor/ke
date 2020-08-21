import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Text, Box, Collapse, Button } from '@chakra-ui/core'

import type { ReactNode } from 'react'
import type { ListFilterDescription, ListFilterTemplateDescription } from 'admin/fields/FieldDescription'
import type { BaseAnalytic } from 'integration/analytics'

import { pushAnalytics } from '../../integration/analytics/utils'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { FilterManager } from '../../common/filterManager'

type FilterBlockProps = {
  resourceName: string
  listFilters?: ListFilterDescription[]
  listFilterTemplates?: ListFilterTemplateDescription[]
  user: any
  analytics: BaseAnalytic | undefined
}

const FilterBlock = (props: FilterBlockProps): JSX.Element => {
  const history = useHistory()
  const { resourceName, listFilters, listFilterTemplates, user, analytics } = props

  const [show, setShow] = React.useState<boolean>(false)
  const handleToggle = (): void => setShow(!show)

  const resetFiltersOnClick = (): void => {
    FilterManager.resetFilters(history)

    pushAnalytics({
      eventName: EventNameEnum.BUTTON_CLICK,
      widgetName: 'reset_filters',
      widgetType: WidgetTypeEnum.FILTER,
      value: undefined,
      resource: resourceName,
      viewType: 'list_view',
      ...props,
    })
  }

  const filterTemplatesOnClick = (listFilterTemplate: ListFilterTemplateDescription): void => {
    FilterManager.overrideFilters(listFilterTemplate.filters(user), history)

    pushAnalytics({
      eventName: EventNameEnum.BUTTON_CLICK,
      widgetName: listFilterTemplate.name,
      widgetType: WidgetTypeEnum.ACTION,
      value: undefined,
      resource: resourceName,
      viewType: 'list_view',
      ...props,
    })
  }

  const mountFilters = (): ReactNode => {
    // eslint-disable-next-line
    return (
      <Flex flexWrap="wrap" key="custom_filters">
        {listFilters &&
          listFilters.map((listFilter: ListFilterDescription) => (
            <Flex flexDirection="column" m={2} key={listFilter.name}>
              <Text fontWeight="bold">{listFilter.label}</Text>
              <Box>{React.createElement(listFilter.Filter, { ...listFilter, analytics, resourceName })}</Box>
            </Flex>
          ))}
      </Flex>
    )
  }

  const mountFilterTemplates = (): JSX.Element => (
    <Flex flexDirection="row">
      {listFilterTemplates &&
        listFilterTemplates.map((listFilterTemplate: ListFilterTemplateDescription) => (
          <Button
            variantColor="teal"
            variant="outline"
            onClick={() => filterTemplatesOnClick(listFilterTemplate)}
            maxWidth={150}
            m={2}
            key={listFilterTemplate.name}
          >
            {listFilterTemplate.label}
          </Button>
        ))}
    </Flex>
  )

  return (
    <>
      <Flex flexDirection="row">
        <Button variantColor="teal" onClick={handleToggle} maxWidth={130} m={2}>
          Фильтровать
        </Button>
        <Button variantColor="teal" onClick={() => resetFiltersOnClick()} maxWidth={130} m={2}>
          Сбросить
        </Button>
      </Flex>
      {mountFilterTemplates()}
      <Collapse mt={19} isOpen={show}>
        {mountFilters()}
      </Collapse>
    </>
  )
}

export { FilterBlock }