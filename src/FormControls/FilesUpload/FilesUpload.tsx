import React, { ReactElement, useCallback } from 'react'

import { ButtonProps, LinkProps } from '@chakra-ui/react'
import { FileDescriptor } from './types'
import { FilesList } from './FilesList'
import { OnProgress, UploadButton } from './UploadButton'

export function FilesUpload({
  value,
  onChange,
  upload,
  buttonProps,
  label,
  listItemIcon,
  linkProps,
}: FilesUploadProps): ReactElement<FilesUploadProps> {
  const handleUpload = useCallback(
    (desc: FileDescriptor) => {
      const newValue = [...value, desc]
      onChange(newValue)
    },
    [value, onChange]
  )

  return (
    <>
      <FilesList listItemIcon={listItemIcon} linkProps={linkProps} value={value} onChange={onChange} />
      <UploadButton label={label} onSelect={upload} onUpload={handleUpload} buttonProps={buttonProps} />
    </>
  )
}

interface FilesUploadProps {
  value: FileDescriptor[]
  onChange: (value: readonly FileDescriptor[]) => void
  upload: (file: File, onProgress: OnProgress) => Promise<FileDescriptor>
  buttonProps?: ButtonProps
  label?: React.ReactChild
  listItemIcon?: React.ComponentType
  linkProps?: Omit<LinkProps, 'href'>
}
