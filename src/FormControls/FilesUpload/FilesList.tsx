// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useCallback } from 'react'
import { List, ListIcon, ListItem, IconButton, Link, LinkProps } from '@chakra-ui/react'
import { Paperclip, X } from 'react-feather'

import { css } from '@emotion/css'
import { FileDescriptor } from './types'

const listItemCss = css`
  & + & {
    margin-top: 4px;
  }
`

type FilesListProps = {
  value: readonly FileDescriptor[]
  listItemIcon?: React.ComponentType
  linkProps?: Omit<LinkProps, 'href'>
} & (
  | {
      isReadOnly: true
      onChange: undefined
    }
  | {
      isReadOnly?: false
      onChange: (value: FileDescriptor[]) => void
    }
)

export function FilesList({
  value,
  onChange,
  listItemIcon = Paperclip,
  linkProps,
  isReadOnly = false,
}: FilesListProps): ReactElement<FilesListProps> {
  const deleteFile = useCallback(
    (file: FileDescriptor): void => {
      if (!onChange) {
        return
      }

      const restFiles = value.filter((f) => f.uuid !== file.uuid)
      onChange(restFiles)
    },
    [onChange, value]
  )

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
          {!isReadOnly && (
            <IconButton
              aria-label="Удалить"
              variant="unstyled"
              size="xs"
              icon={<X color="red" size={16} />}
              ml={2}
              onClick={() => deleteFile(file)}
            />
          )}
        </ListItem>
      ))}
    </List>
  )
}
