import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import RichTextEditor, { EditorValue, ToolbarConfig } from 'react-rte'

import classNames from 'classnames'
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

const toolbarConfig: ToolbarConfig = {
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
  BLOCK_TYPE_DROPDOWN: []
}

export interface TextEditorProps extends ControlProps<string> {
  /**
   * Class name for element
   */
  className?: string
}

export const TextEditor = forwardRef<HTMLDivElement, TextEditorProps>((props, ref): JSX.Element => {
  const { value: inputValue, onChange, className } = props
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

  const handlePastedText = useCallback((
    text: string,
    _html: string,
    editorState: Parameters<typeof EditorValue['createFromState']>[0]
  ) => {
    const selection = editorState.getSelection();
    const selectionStart = selection.getStartOffset();
    const selectionEnd = selection.getStartOffset();
    const rawValue = valueFromEditorFormat(EditorValue.createFromState(editorState));
    setValue(valueToEditorFormat([
      rawValue.slice(0, selectionStart),
      text,
      rawValue.slice(selectionEnd)
    ].join('')));

    return true;
  },[]);

  return (
    <StyledTextEditor ref={ref}>
      <RichTextEditor
        toolbarConfig={toolbarConfig}
        className={classNames('text-editor', className)}
        editorClassName="text-editor-widget"
        value={value}
        onChange={setValue}
        // NOTE: add methods will be passed to underhood DraftJS Editor component
        {...{ onBlur, handlePastedText }}
      />
    </StyledTextEditor>
  )
})
