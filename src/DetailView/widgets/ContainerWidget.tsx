import React from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import { Store } from 'effector'

import { mountComponents } from '../../common/utils/mountComponents'
import { getAccessor } from '../utils/dataAccess'
import { useCreateTestId } from '../../django-spa/aspects/test-id/TestIdProvider'

/**
 * Render props.widgets in data-grid by their layout-properties
 * props.widgets: DetailFieldDescription[]
 *
 * @param props - widget props
 */
const ContainerWidget = (props: any): JSX.Element => {
  const {
    setInitialValue,
    submitChange,
    resourceName,
    mainDetailObject,
    provider,
    setMainDetailObject,
    refreshMainDetailObject,
    notifier,
    user,
    analytics,
    ViewType,
    containerStore,
    containerErrorsStore,
    widgets,
    name,
    isCollapsible = false,
    helpText = '',
    style,
    accordionProps,
    accordionItemProps,
    accordionPanelProps,
    AccordionButton: UserAccordionButton,
  } = props
  const containerContent = mountComponents({
    setInitialValue,
    submitChange,
    resourceName,
    mainDetailObject,
    elements: widgets,
    provider,
    setMainDetailObject,
    refreshMainDetailObject,
    notifier,
    user,
    analytics,
    ViewType,
    containerStore,
    containerErrorsStore,
  })
  const context = (containerStore as Store<object>).getState()
  const isContainerCollapsible = getAccessor(isCollapsible, mainDetailObject, context)

  const { getDataTestId } = useCreateTestId()
  return isContainerCollapsible ? (
    <Accordion allowToggle pt={4} {...accordionProps} {...getDataTestId(props)}>
      <AccordionItem {...accordionItemProps}>
        {UserAccordionButton ? (
          <UserAccordionButton>{helpText}</UserAccordionButton>
        ) : (
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {helpText}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
        )}
        <AccordionPanel pb={4} {...accordionPanelProps}>
          {containerContent}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <Box data-name={name} {...getDataTestId(props)} {...style}>
      {containerContent}
    </Box>
  )
}

export { ContainerWidget }
