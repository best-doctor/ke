import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { Tag, TagCloseButton, TagLabel, Input, Flex, Text } from '@chakra-ui/react'

import { usePropState } from '../../Hooks'

export const ChipInput = (props: ChipInputProps): JSX.Element => {
  const {
    content,
    handleChange,
    placeholder,
    submitKeys = ['Enter', 'Tab'],
    validator = () => true,
    errorText = 'Invalid value',
  } = props
  const [chips, setChips] = usePropState<string[]>(content || [])
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const isValid = (val: string): boolean => {
    if (!validator(val)) {
      setError(errorText)
      return false
    }
    setError('')
    return true
  }

  const deleteChip = (index: number): void => {
    const newChips = chips.filter((_, chipIndex) => chipIndex !== index)
    setChips(newChips)
    handleChange(newChips)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (submitKeys.includes(e.key)) {
      e.preventDefault()
      const trimmedValue = value.trim()
      if (trimmedValue && isValid(trimmedValue)) {
        const newChips = [...chips, trimmedValue]
        setChips(newChips)
        handleChange(newChips)
        setValue('')
        setError('')
      }
    }
    if (e.key === 'Backspace') {
      if (!value && chips.length > 0) {
        e.preventDefault()
        deleteChip(chips.length - 1)
      }
    }
  }

  return (
    <>
      <Flex
        borderWidth="1px"
        borderRadius="3px"
        borderColor="#cbd5e0"
        alignItems="center"
        flexWrap="wrap"
        onClick={() => inputRef && inputRef.current && inputRef.current.focus()}
      >
        {chips.map((chipValue: string, index: number) => {
          const key = index
          return (
            <Tag
              key={key}
              minWidth={undefined}
              minHeight={undefined}
              height="1.5rem"
              fontSize="0.85rem"
              m="0.2rem"
              bg="#E3E5E8"
            >
              <TagLabel width="100%">{chipValue}</TagLabel>
              <TagCloseButton onClick={() => deleteChip(key)} />
            </Tag>
          )
        })}
        <Input
          variant="unstyled"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          isInvalid={!!error}
          ref={inputRef}
          width="auto"
        />
      </Flex>
      {error && (
        <Text className="error" fontSize="0.7rem" color="red.400">
          {error}
        </Text>
      )}
    </>
  )
}

type ChipInputProps = {
  content: string[]
  handleChange: (chips: string[]) => void
  placeholder?: string
  submitKeys?: string[]
  validator?: (value: string) => boolean
  errorText?: string
}
