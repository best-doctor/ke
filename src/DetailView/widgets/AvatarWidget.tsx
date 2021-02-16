import * as React from 'react'

import { Avatar } from '@chakra-ui/core'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

type AvatarWidgetProps = {
  name: string
  helpText: string
  style: object
}

/**
 * Render initials "BD" styled like avatar image
 *
 * @param helpText - description
 * @param style
 * @constructor
 */
const AvatarWidget = ({ helpText, style }: AvatarWidgetProps): JSX.Element => {
  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <Avatar name="BD" src="" />
    </WidgetWrapper>
  )
}

export { AvatarWidget }
