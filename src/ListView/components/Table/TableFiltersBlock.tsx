import React, { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Text, Box, Collapse, Button } from '@chakra-ui/react'

import type { ListFilterDescription, ListFilterTemplateDescription } from 'admin/fields/FieldDescription'
import type { BaseAnalytic } from 'integration/analytics'

import { pushAnalytics } from '../../../integration/analytics/utils'
import { EventNameEnum, WidgetTypeEnum } from '../../../integration/analytics/firebase/enums'
import { FilterManager } from '../../../common/filterManager'
import type { Provider } from '../../../admin/providers/interfaces'
import { getAccessor } from '../../../DetailView/utils/dataAccess'

type FilterBlockProps = {
  resourceName: string
  listFilters?: ListFilterDescription[]
  listFilterTemplates?: ListFilterTemplateDescription[]
  user: any
  analytics: BaseAnalytic | undefined
  provider?: Provider
}

const filterTemplatesOnClick = (
  listFilterTemplate: ListFilterTemplateDescription,
  props: FilterBlockProps,
  history: any
): void => {
  const { user, resourceName } = props
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

const mountFilters = (props: FilterBlockProps): ReactNode => {
  const { listFilters, analytics, resourceName, provider } = props
  // eslint-disable-next-line
  return (
    <Flex flexWrap="wrap" key="custom_filters">
      {listFilters &&
        listFilters.map((listFilter: ListFilterDescription) => {
          const name = getAccessor(listFilter.name)
          return name ? (
            <Flex flexDirection="column" m={2} key={name}>
              <Text fontWeight="bold">{listFilter.label}</Text>
              <Box>
                {React.createElement(listFilter.Filter, {
                  ...listFilter,
                  name,
                  analytics,
                  resourceName,
                  provider,
                })}
              </Box>
            </Flex>
          ) : (
            <></>
          )
        })}
    </Flex>
  )
}

const mountFilterTemplates = (props: FilterBlockProps, history: any): JSX.Element => {
  const { listFilterTemplates } = props
  return (
    <Flex flexDirection="row">
      {listFilterTemplates &&
        listFilterTemplates.map((listFilterTemplate: ListFilterTemplateDescription) => {
          const style = listFilterTemplate.style || {
            colorScheme: 'teal',
            variant: 'outline',
          }
          return (
            <Button
              onClick={() => filterTemplatesOnClick(listFilterTemplate, props, history)}
              maxWidth={250}
              m={2}
              key={listFilterTemplate.name}
              {...style}
            >
              {listFilterTemplate.label}
            </Button>
          )
        })}
    </Flex>
  )
}

const sendPushAnalytics = (widgetName: string, props: FilterBlockProps): void => {
  const { resourceName } = props
  pushAnalytics({
    eventName: EventNameEnum.BUTTON_CLICK,
    widgetName,
    widgetType: WidgetTypeEnum.FILTER,
    value: undefined,
    resource: resourceName,
    viewType: 'list_view',
    ...props,
  })
}

const FilterBlock = (props: FilterBlockProps): JSX.Element => {
  const history = useHistory()

  const [show, setShow] = React.useState<boolean>(false)
  const handleToggle = (): void => setShow(!show)

  const resetFiltersOnClick = (): void => {
    FilterManager.resetFilters(history)
    sendPushAnalytics('reset_filters', props)
  }

  return (
    <>
      <Flex flexDirection="row">
        <Button colorScheme="teal" onClick={handleToggle} maxWidth={130} m={2}>
          Фильтровать
        </Button>
        <Button id="reset-filters" colorScheme="teal" onClick={() => resetFiltersOnClick()} maxWidth={130} m={2}>
          Сбросить
        </Button>
      </Flex>
      {mountFilterTemplates(props, history)}
      <Box marginTop={19}>
        <Collapse in={show}>{mountFilters(props)}</Collapse>
      </Box>
    </>
  )
}

export { FilterBlock }
