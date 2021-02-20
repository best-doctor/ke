import * as React from 'react'

export function Filters({ filters }: FiltersProps): JSX.Element {
  return <>{filters}</>
}

interface FiltersProps {
  filters: unknown[]
}
