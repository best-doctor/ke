import React, { ReactElement, useCallback } from 'react'

import { FileDescriptor } from './types'
import { FilesList } from './FilesList'
import { OnProgress, UploadButton } from './UploadButton'

export function FilesUpload({ value, onChange, upload }: FilesUploadProps): ReactElement<FilesUploadProps> {
  const handleUpload = useCallback(
    (desc: FileDescriptor) => {
      const newValue = [...value, desc]
      onChange(newValue)
    },
    [value, onChange]
  )

  return (
    <>
      <FilesList value={value} onChange={onChange} />
      <UploadButton onSelect={upload} onUpload={handleUpload} />
    </>
  )
}

interface FilesUploadProps {
  value: FileDescriptor[]
  onChange: (value: readonly FileDescriptor[]) => void
  upload: (file: File, onProgress: OnProgress) => Promise<FileDescriptor>
}
