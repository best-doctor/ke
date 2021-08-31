import React from 'react'
import { makeSlots } from '@cdk/Layouts'

export const Simple = makeSlots<'Control'>((slotElements) => <>{slotElements.Control}</>)
