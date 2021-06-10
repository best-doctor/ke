import React, { ReactElement } from 'react'
import { List, ListIcon, ListItem, IconButton } from '@chakra-ui/react'
import { Paperclip, X } from 'react-feather'

import { FileDescriptor } from './types'

export function FilesList({ value, onChange }: FilesListProps): ReactElement<FilesListProps> {
  const deleteFile = (file: FileDescriptor): void => {
    const restFiles = value.filter((f) => f.uuid !== file.uuid)
    onChange(restFiles)
  }

  return (
    <List>
      {value.map((file) => (
        <ListItem key={file.uuid}>
          <ListIcon icon={<Paperclip />} />
          {file.name}
          <IconButton aria-label="Удалить" icon={<X />} onClick={() => deleteFile(file)} />
        </ListItem>
      ))}
    </List>
  )
}

interface FilesListProps {
  value: readonly FileDescriptor[]
  onChange: (value: FileDescriptor[]) => void
}
