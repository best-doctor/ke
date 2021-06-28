import React, { ReactElement } from 'react'
import { List, ListIcon, ListItem, Link } from '@chakra-ui/react'
import { Paperclip } from 'react-feather'

import { FileDescriptor } from './types'

export function FilesList({ value }: FilesListProps): ReactElement<FilesListProps> {
  return (
    <List>
      {value.map((file) => (
        <ListItem key={file.uuid}>
          <ListIcon as={Paperclip} />
          {file?.url ? (
            <Link href={file.url} isExternal>
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
}
