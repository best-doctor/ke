import React from 'react'
import { Box } from '@chakra-ui/core'

import { makeList } from '@cdk/Layouts'

export const ListVertical = makeList(({ children }) => <>{children}</>, Box)
