import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TextEditor } from './TextEditor'
import { ThemeProvider } from '../../../../styles'

export default {
  title: 'Components/TextEditor',
  component: TextEditor,
} as ComponentMeta<typeof TextEditor>

const Template: ComponentStory<typeof TextEditor> = (args) => (
  <ThemeProvider>
    {/* Это обёртка */}
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <TextEditor {...args} />
  </ThemeProvider>
)

export const TextEditorWithValue = Template.bind({})
TextEditorWithValue.args = {
  value:
    'Simple text<br><u>Underlined text</u><br><b>Bold text</b><br><i>Italic text</i><ul><li>Unordered</li><li>List</li></ul><ol><li>Ordered</li><li>List</li></ol>',
}
