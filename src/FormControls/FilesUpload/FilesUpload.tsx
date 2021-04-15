import React, { ReactElement, useCallback } from 'react'
import { usePropState } from '@cdk/Hooks'

import { FileDescriptor } from './types'
import { FilesList } from './FilesList'
import { OnProgress, UploadButton } from './UploadButton'

export function FilesUpload({ value, onChange, upload }: FilesUploadProps): ReactElement<FilesUploadProps> {
  const [files, setFiles] = usePropState(value)

  const handleUpload = useCallback(
    (desc: FileDescriptor) => {
      setFiles((prev) => [...prev, desc])
    },
    [setFiles]
  )

  return (
    <>
      <FilesList value={files} onChange={onChange} />
      <UploadButton onSelect={upload} onUpload={handleUpload} />
    </>
  )
}

interface FilesUploadProps {
  value: FileDescriptor[]
  onChange: (value: readonly FileDescriptor[]) => void
  upload: (file: File, onProgress: OnProgress) => Promise<FileDescriptor>
}
