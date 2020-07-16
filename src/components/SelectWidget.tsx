import * as React from 'react'
import { useEffect, useState } from 'react'
import { FormLabel, Select, Box } from '@chakra-ui/core'
import { getData, getWidgetContent, getPayload } from '../utils/dataAccess'

import type { BaseProvider } from '../admin/providers'
import type { GenericAccessor } from '../typing'

type SelectObject = {
  value: string
  text: string
}

type SelectProps = {
  name: string
  detailObject: any
  helpText: string
  setObject: Function
  displayValue: GenericAccessor
  dataSource: string | Function
  dataTarget: GenericAccessor
  targetPayload: GenericAccessor
  provider: BaseProvider
  notifier: Function
  style: any
}

const SelectWidget = ({
  name,
  helpText,
  displayValue,
  detailObject,
  dataSource,
  dataTarget,
  targetPayload,
  setObject,
  provider,
  style,
  notifier,
}: SelectProps): JSX.Element => {
  const sourceUrl = getData(dataSource, detailObject)
  const targetUrl = getData(dataTarget, detailObject) || detailObject.url
  const content = getWidgetContent(name, detailObject, displayValue)

  const [resultOptions, setResultOptions] = useState<SelectObject[]>([])

  useEffect(() => {
    provider.getList(sourceUrl).then(([responseOptions, ,]: [any, any, any]) => setResultOptions(responseOptions))
  }, [provider, sourceUrl])

  const handleChange = (e: any): void => {
    provider.put(targetUrl, getPayload(e, name, targetPayload)).then(
      (result: any) => {
        setObject(result)
        notifier('success')
      },
      () => notifier('error')
    )
  }

  return (
    <Box {...style}>
      <FormLabel mt={5}>{helpText}</FormLabel>
      <Select onChange={(e) => handleChange(e)}>
        <option value={content.value} selected key={content.value}>
          {content.text}
        </option>
        {resultOptions
          .filter((element) => element.value !== content.value)
          .map((resultOption) => (
            <option value={resultOption.value} key={resultOption.value}>
              {resultOption.text}
            </option>
          ))}
      </Select>
    </Box>
  )
}

export { SelectWidget }
