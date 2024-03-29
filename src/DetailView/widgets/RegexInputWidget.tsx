// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useCallback, useMemo } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { Input, InputProps } from '@chakra-ui/react'
import { Accessor, WidgetProps } from '../../typing'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { getAccessor, getCopyHandler, getPayload } from '../utils/dataAccess'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { useCreateTestId } from '../../django-spa/aspects'

type RegexInputWidgetProps = WidgetProps & {
  regexp: RegExp
  height?: number
  debounce?: number
  isDisabled?: Accessor<boolean>
}

interface RegexpInputProps extends InputProps {
  regexp: RegExp
}

const RegexInput: React.FC<RegexpInputProps> = ({ onChange, regexp, ...props }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if ((!e.target.value || regexp.test(e.target.value)) && onChange) {
        onChange(e)
      } else {
        e.preventDefault()
      }
    },
    [onChange, regexp]
  )
  return <Input onChange={handleChange} {...props} />
}

export const RegexInputWidget = forwardRef<HTMLInputElement, RegexInputWidgetProps>(
  (props: RegexInputWidgetProps, ref): JSX.Element => {
    const {
      name,
      helpText,
      targetPayload,
      style,
      submitChange,
      setInitialValue,
      containerStore,
      height,
      debounce = 1000,
      notifier,
      copyValue,
      useClipboard,
      isDisabled,
      mainDetailObject,
      containerProps,
      labelContainerProps,
      regexp,
    } = props
    const context = containerStore.getState()

    const { targetUrl, content, isRequired, widgetDescription } = useWidgetInitialization({ ...props, context })

    setInitialValue({ [name]: content })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const inputPayload = getPayload(e.target.value, name, targetPayload)
      submitChange({ url: targetUrl, payload: inputPayload })
    }

    const handleCopyValue = getCopyHandler(content, copyValue)

    const Element = useMemo(() => (localProps: InputProps) => <RegexInput {...localProps} regexp={regexp} />, [regexp])

    const { getDataTestId } = useCreateTestId()
    return (
      <WidgetWrapper
        name={name}
        style={style}
        helpText={helpText}
        description={widgetDescription}
        required={isRequired}
        notifier={notifier}
        useClipboard={useClipboard}
        copyValue={handleCopyValue}
        containerProps={containerProps}
        labelContainerProps={labelContainerProps}
        {...getDataTestId(props)}
      >
        <DebounceInput
          value={content as string}
          height={height}
          debounceTimeout={debounce}
          element={Element}
          onChange={handleChange}
          inputRef={ref}
          disabled={getAccessor(isDisabled, mainDetailObject, context)}
        />
      </WidgetWrapper>
    )
  }
)
