import React, { ForwardedRef, forwardRef, useCallback, useState } from 'react'
import { render } from '@testing-library/react'

import { Form } from './Form'
import { Field } from './Field'
import { Group } from './Group'
import { Arr } from './Arr'

const Input = forwardRef(
  (
    { value, onChange }: { value: string; onChange: (val: string) => void },
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => <input ref={ref} value={value} onChange={(event) => onChange(event.target.value)} />
)

interface Person {
  name: {
    first: string
    second: string
  }
  sex: string
  comments: string[]
}

function PersonExample({
  initial,
  onChange,
}: {
  initial: Person
  onChange: (v: Person, meta: unknown) => void
}): JSX.Element {
  const [person, setPerson] = useState(initial)
  const getCommentKey = useCallback((_, index: number) => index, [])
  const handleChange = useCallback(
    (v: Person, meta: unknown) => {
      onChange(v, meta)
      setPerson(v)
    },
    [onChange]
  )

  return (
    <>
      <Form data={person} onFormChange={handleChange}>
        <Group name="name">
          <Field as={Input} name="first" />
          <Field as={Input} name="second" />
        </Group>
        <Field as={Input} name="sex" />
        <Arr getKey={getCommentKey} name="comments">
          {(item: string, index) => <Field as={Input} name={getCommentKey(item, index)} />}
        </Arr>
      </Form>
    </>
  )
}

const samplePerson: Person = {
  name: {
    first: 'Reno',
    second: 'Jan',
  },
  sex: 'any',
  comments: ['one', 'two', 'three'],
}

test('Form correct rendered', async () => {
  const { findByDisplayValue } = render(<PersonExample initial={samplePerson} onChange={jest.fn()} />)

  expect(await findByDisplayValue(samplePerson.name.first)).toBeInTheDocument()
  expect(await findByDisplayValue(samplePerson.name.second)).toBeInTheDocument()
  expect(await findByDisplayValue(samplePerson.sex)).toBeInTheDocument()
  expect(await findByDisplayValue(samplePerson.comments[0])).toBeInTheDocument()
  expect(await findByDisplayValue(samplePerson.comments[1])).toBeInTheDocument()
  expect(await findByDisplayValue(samplePerson.comments[2])).toBeInTheDocument()
})
