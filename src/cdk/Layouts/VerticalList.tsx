import React from 'react'
import { Box } from '@chakra-ui/core'

import { makeList } from './Base'

export const VerticalList = makeList(({ children }) => <>{children}</>, Box)
