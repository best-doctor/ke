import React, { ReactElement } from 'react'
import { List, ListIcon, ListItem, IconButton } from '@chakra-ui/react'
import { Paperclip, X } from 'react-feather'
import { usePropState } from '@cdk/Hooks'

import { FileDescriptor } from './types'

export function FilesList({ value, onChange }: FilesListProps): ReactElement<FilesListProps> {
  const [files, setFiles] = usePropState(value)

  const deleteFile = (file: FileDescriptor): void => {
    const restFiles = files.filter((f) => f !== file)
    setFiles(restFiles)
    onChange(restFiles)
  }

  return (
    <List>
      {files.map((file) => (
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
