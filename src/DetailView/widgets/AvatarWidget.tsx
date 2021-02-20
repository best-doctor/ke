import * as React from 'react'

import { Avatar } from '@chakra-ui/core'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

type AvatarWidgetProps = {
  name: string
  helpText: string
  style: object
}

const AvatarWidget = ({ helpText, style, name }: AvatarWidgetProps): JSX.Element => {
  return (
    <WidgetWrapper name={name} style={style} helpText={helpText}>
      <Avatar name="BD" src="" />
    </WidgetWrapper>
  )
}

export { AvatarWidget }
