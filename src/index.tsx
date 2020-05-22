import * as React from 'react'
import { ThemeProvider } from '@chakra-ui/core'

import { BaseAdmin } from 'admin'
import { BaseProvider } from 'admin/providers'
import { StringField } from 'admin/fields/StringField'
import { LayoutComposer } from './LayoutComposer'
import { Table } from './LayoutComposer/components/Table'

const App = (props: any): JSX.Element => {
  const { admin, additionalListComponents, additionalDetailComponents } = props

  return (
    <ThemeProvider>
      <LayoutComposer
        customAdminClass={admin}
        additionalListComponents={additionalListComponents}
        additionalDetailComponents={additionalDetailComponents}
      />
    </ThemeProvider>
  )
}

export { App, BaseAdmin, BaseProvider, StringField, Table }
