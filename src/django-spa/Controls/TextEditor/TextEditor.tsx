import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import RichTextEditor, { EditorValue } from 'react-rte'

import { ControlProps } from '../types'

export const StyledTextEditor = styled.div`
  .text-editor {
    border-radius: 0.375rem;
    border-color: #cbd5e0;
  }
  .text-editor-widget {
    height: 208px;
    max-height: 208px;
  }
`

const valueToEditorFormat = (value: string, format = 'html'): EditorValue =>
  RichTextEditor.createValueFromString(value, format)

const valueFromEditorFormat = (value: { toString: (f: string) => string }, format = 'html'): string =>
  value.toString(format)

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
  ],
}

export const TextEditor = (props: ControlProps<string>): JSX.Element => {
  const { value: inputValue, onChange } = props
  const [value, setValue] = useState(valueToEditorFormat(inputValue))

  useEffect(() => {
    setValue(valueToEditorFormat(inputValue))
  }, [inputValue])

  const onBlur = useCallback((): void => {
    const formattedValue = valueFromEditorFormat(value)
    if (formattedValue === '<p><br></p>') {
      onChange('')
    } else {
      onChange(formattedValue)
    }
  }, [onChange, value])

  const handleChange = useCallback((v: EditorValue): void => {
    setValue(v)
  }, [])

  return (
    <StyledTextEditor>
      <RichTextEditor
        // eslint-disable-next-line
        // @ts-ignore
        toolbarConfig={toolbarConfig}
        className="text-editor"
        editorClassName="text-editor-widget"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </StyledTextEditor>
  )
}
