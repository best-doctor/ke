import React from 'react'
import { mount } from 'enzyme'
import RichTextEditor from 'react-rte'

import { TextEditor, StyledTextEditor } from './TextEditor'

const onChangeMock = jest.fn()

const getComponent = (): JSX.Element => <TextEditor value="test" onChange={onChangeMock} />

test('TextEditor properly rendered', () => {
  const component = mount(getComponent())

  expect(component.find(StyledTextEditor).length).toEqual(1)
  expect(component.find(RichTextEditor).length).toEqual(1)
  expect(component.find('button[title="Bold"]').length).toEqual(1)
  expect(component.find('button[title="Italic"]').length).toEqual(1)
  expect(component.find('button[title="Underline"]').length).toEqual(1)
  expect(component.find('button[title="UL"]').length).toEqual(1)
  expect(component.find('button[title="OL"]').length).toEqual(1)
  expect(component.find('button[title="Link"]').length).toEqual(1)
  expect(component.find('button[title="Remove Link"]').length).toEqual(1)
})
