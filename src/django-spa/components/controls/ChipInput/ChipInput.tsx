import React, { ChangeEvent, KeyboardEvent, useCallback, useRef, useState, forwardRef, RefObject } from 'react'
import { Tag, TagCloseButton, TagLabel, Input, Flex, Text, useMultiStyleConfig } from '@chakra-ui/react'

import { usePropState } from '@cdk/Hooks'

import { ControlProps } from '../types'

type ChipInputProps = ControlProps<string[]> & {
  /**
  Displayed placeholder
  */
  placeholder?: string
  /**
  Keys that are used to submit new value
  */
  submitKeys?: string[]
  /**
  Function to validate input value
  */
  validator?: (value: string) => boolean
  /**
  Error text on invalid value
  */
  errorText?: string
  /**
  ClassName of each Chip
  */
  chipClassName?: string
  /**
  ClassName of input
  */
  inputClassName?: string
}

export const ChipInput = forwardRef<HTMLInputElement, ChipInputProps>((props, ref): JSX.Element => {
  const {
    value: inputValue,
    onChange,
    placeholder,
    submitKeys = ['Enter', 'Tab'],
    validator = () => true,
    errorText = 'Invalid value',
    chipClassName,
    inputClassName,
  } = props
  const [chips, setChips] = usePropState<string[]>(inputValue)
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')
  const inputRef = (ref as RefObject<HTMLInputElement>) ?? useRef<HTMLInputElement>(null)

  const isValid = useCallback(
    (val: string): boolean => {
      if (!validator(val)) {
        setError(errorText)
        return false
      }
      setError('')
      return true
    },
    [errorText, validator]
  )

  const deleteChip = useCallback(
    (index: number): void => {
      const newChips = chips.filter((_, chipIndex) => chipIndex !== index)
      setChips(newChips)
      onChange(newChips)
    },
    [onChange, chips, setChips]
  )

  const finishInput = useCallback((): void => {
    const trimmedValue = value.trim()
    if (trimmedValue && isValid(trimmedValue)) {
      const newChips = [...chips, trimmedValue]
      setChips(newChips)
      onChange(newChips)
      setValue('')
      setError('')
    }
  }, [onChange, chips, setChips, isValid, value])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (submitKeys.includes(e.key)) {
        e.preventDefault()
        finishInput()
      }
      if (e.key === 'Backspace') {
        if (!value && chips.length > 0) {
          e.preventDefault()
          deleteChip(chips.length - 1)
        }
      }
    },
    [chips.length, deleteChip, finishInput, submitKeys, value]
  )

  const { container, input, chip, chipLabel } = useMultiStyleConfig('ChipInput', props)

  return (
    <>
      <Flex __css={container} onClick={() => inputRef?.current?.focus?.()}>
        {chips.map((chipValue: string, index: number) => {
          const key = index
          return (
            <Tag key={key} minWidth={undefined} minHeight={undefined} sx={chip} className={chipClassName}>
              <TagLabel sx={chipLabel} width="100%">
                {chipValue}
              </TagLabel>
              <TagCloseButton onClick={() => deleteChip(key)} />
            </Tag>
          )
        })}
        <Input
          variant="unstyled"
          sx={input}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          isInvalid={!!error}
          ref={inputRef}
          width="auto"
          height="2rem"
          borderRadius="0px"
          onBlur={finishInput}
          className={inputClassName}
        />
      </Flex>
      {error && (
        <Text className="error" fontSize="0.7rem" color="red.400">
          {error}
        </Text>
      )}
    </>
  )
})
