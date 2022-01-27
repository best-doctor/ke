// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react'
import { List, ListIcon, ListItem, Link, LinkProps } from '@chakra-ui/react'
import { Paperclip } from 'react-feather'

import { FileDescriptor } from './types'

export function FilesList({
  value,
  listItemIcon = Paperclip,
  linkProps,
}: FilesListProps): ReactElement<FilesListProps> {
  return (
    <List>
      {value.map((file) => (
        <ListItem key={file.uuid}>
          <ListIcon as={listItemIcon} />
          {file?.url ? (
            <Link href={file.url} isExternal {...linkProps}>
              {file.name}
            </Link>
          ) : (
            file.name
          )}
        </ListItem>
      ))}
    </List>
  )
}

interface FilesListProps {
  value: readonly FileDescriptor[]
  listItemIcon?: React.ComponentType
  linkProps?: Omit<LinkProps, 'href'>
}
