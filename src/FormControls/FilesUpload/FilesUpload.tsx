import React, { ReactElement, useCallback, useEffect, useRef } from 'react'
import { ButtonProps, LinkProps, Text } from '@chakra-ui/react'
import Filesize from 'filesize'

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
  maxFileSize,
  multiple,
}: FilesUploadProps): ReactElement<FilesUploadProps> {
  const valueRef = useRef(value)

  useEffect(() => {
    valueRef.current = value
  }, [value])

  const handleUpload = useCallback(
    (desc: FileDescriptor[]) => {
      const newValue = [...valueRef.current, ...desc]
      onChange(newValue)
    },
    [onChange]
  )

  return (
    <>
      <FilesList listItemIcon={listItemIcon} linkProps={linkProps} value={value} onChange={onChange} />
      <UploadButton
        label={label}
        onSelect={upload}
        onUpload={handleUpload}
        buttonProps={buttonProps}
        maxFileSize={maxFileSize}
        multiple={multiple}
      />
      {maxFileSize && (
        <Text fontSize="sm" color="gray.500" mt={2}>
          Максимальный размер файла - {Filesize(maxFileSize)}
        </Text>
      )}
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
  maxFileSize?: number
  multiple?: boolean
}
