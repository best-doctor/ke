import { mount } from 'enzyme'
import * as React from 'react'
import { useState } from 'react'

import { Form } from './Form'
import { FormField } from './FormField'
import { Input } from './Adapters'
import { FormGroup } from './FormGroup'
import { FormArray } from './FormArray'

describe('Forms sample tests', () => {
  const sampleData = {
    name: 'Test name',
    surname: 'Test surname',
    meta: {
      title: 'Dr.',
      subtitle: 'Mr.',
    },
    rates: [1, 2, 3],
  }

  const makeChangeEvent = (value: unknown) => ({ target: { value } } as const)

  test('Full form must render without error', () => {
    const form = mount(
      <Form value={sampleData} onChange={jest.fn()}>
        <FormField name="name" as={Input} />
        <FormField name="surname" as={Input} />
        <FormGroup name="meta">
          <FormField as={Input} name="title" />
          <FormField as={Input} name="subtitle" />
        </FormGroup>
        <FormArray name="rates">
          <FormField as={Input} name={0} />
          <FormField as={Input} name={1} />
        </FormArray>
      </Form>
    )

    expect(form.find(FormField).length).toBe(6)
    expect(form.find(FormGroup).length).toBe(1)
    expect(form.find(FormArray).length).toBe(1)
  })

  test('Changes fields in form should update form-data', () => {
    const handleChange = jest.fn()
    const form = mount(
      <Form value={sampleData} onChange={handleChange}>
        <FormField name="name" as={Input} />
      </Form>
    )

    form.find({ name: 'name' }).simulate('change', makeChangeEvent('new name'))
    const withUpdatedName = { ...sampleData, name: 'new name' }

    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toBeCalledWith(withUpdatedName)
  })

  test('Changes fields in form-group should update form-data', () => {
    const handleChange = jest.fn()
    const form = mount(
      <Form value={sampleData} onChange={handleChange}>
        <FormGroup name="meta">
          <FormField as={Input} name="title" />
        </FormGroup>
      </Form>
    )

    form.find({ name: 'title' }).simulate('change', makeChangeEvent('new title'))
    const withUpdatedTitle = { ...sampleData, meta: { ...sampleData.meta, title: 'new title' } }

    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toBeCalledWith(withUpdatedTitle)
  })

  test('Changes fields in form-array should update form-data', () => {
    const handleChange = jest.fn()
    const form = mount(
      <Form value={sampleData} onChange={handleChange}>
        <FormArray name="rates">
          <FormField as={Input} name={1} />
        </FormArray>
      </Form>
    )

    form.find({ name: 1 }).simulate('change', makeChangeEvent(10))
    const updatedRates = [...sampleData.rates]
    updatedRates[1] = 10
    const withUpdateRates = { ...sampleData, rates: updatedRates }

    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toBeCalledWith(withUpdateRates)
  })

  test('Sequence Changes fields in form should update form-data', () => {
    const handleChange = jest.fn()
    const form = mount(
      <Form value={sampleData} onChange={handleChange}>
        <FormField name="name" as={Input} />
        <FormField name="surname" as={Input} />
      </Form>
    )

    form.find({ name: 'name' }).simulate('change', makeChangeEvent('new name'))
    form.find({ name: 'surname' }).simulate('change', makeChangeEvent('new surname'))
    const updated = { ...sampleData, name: 'new name', surname: 'new surname' }

    expect(handleChange).toBeCalledTimes(2)
    expect(handleChange).toBeCalledWith(updated)
  })

  test('Form-data should updates via props', () => {
    const handleChange = jest.fn()
    const changedData = { name: 'changed name', surname: 'changed surname' }
    function UpdatesForm(): JSX.Element {
      const [data, setData] = useState<typeof changedData>(sampleData)
      return (
        <>
          <Form value={data} onChange={handleChange}>
            <FormField name="name" as={Input} />
            <FormField name="surname" as={Input} />
          </Form>
          <button type="button" onClick={() => setData(changedData)}>
            Change form data
          </button>
        </>
      )
    }
    const form = mount(<UpdatesForm />)

    form.find('button').simulate('click')
    form.find({ name: 'surname' }).simulate('change', makeChangeEvent('new surname'))
    const updated = { ...changedData, name: 'changed name', surname: 'new surname' }

    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toBeCalledWith(updated)
  })

  test('Field with unavailable name must throw exception', () => {
    const spy = jest.spyOn(console, 'error') // We waiting for errors on render, so disable logging spam
    spy.mockImplementation(() => {}) // Seems standard not exists https://github.com/facebook/react/issues/11098

    expect(() =>
      mount(
        <Form value={sampleData} onChange={jest.fn()}>
          <FormField as={Input} name="unexpected" />
        </Form>
      )
    ).toThrow(RangeError)

    spy.mockRestore()
  })
})
