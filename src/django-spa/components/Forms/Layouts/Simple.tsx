import React from 'react'
import { makeSlots } from '@cdk/layouts'

export const Simple = makeSlots<'Control'>((slotElements) => <>{slotElements.Control}</>)
