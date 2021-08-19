import React, { ReactElement } from 'react'
import { List, ListIcon, ListItem, IconButton, Link, LinkProps } from '@chakra-ui/react'
import { Paperclip, X } from 'react-feather'

import { css } from '@emotion/css'
import { FileDescriptor } from './types'

const listItemCss = css`
  & + & {
    margin-top: 4px;
  }
`

export function FilesList({
  value,
  onChange,
  listItemIcon = Paperclip,
  linkProps,
}: FilesListProps): ReactElement<FilesListProps> {
  const deleteFile = (file: FileDescriptor): void => {
    const restFiles = value.filter((f) => f.uuid !== file.uuid)
    onChange(restFiles)
  }

  return (
    <List>
      {value.map((file) => (
        <ListItem display="flex" alignItems="center" className={listItemCss} key={file.uuid}>
          <ListIcon as={listItemIcon} />
          {file?.url ? (
            <Link href={file.url} isExternal {...linkProps}>
              {file.name}
            </Link>
          ) : (
            file.name
          )}
          <IconButton
            aria-label="Удалить"
            variant="unstyled"
            size="xs"
            icon={<X color="red" size={16} />}
            ml={2}
            onClick={() => deleteFile(file)}
          />
        </ListItem>
      ))}
    </List>
  )
}

interface FilesListProps {
  value: readonly FileDescriptor[]
  onChange: (value: FileDescriptor[]) => void
  listItemIcon?: React.ComponentType
  linkProps?: Omit<LinkProps, 'href'>
}
