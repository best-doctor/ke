import React, { ChangeEvent, ReactElement, useCallback, useRef, useState } from 'react'
import { Button, List, ListIcon, ListItem, Progress } from '@chakra-ui/react'
import { Paperclip } from 'react-feather'

import { FileDescriptor, LoadingFileDescriptor } from './types'

export function UploadButton({ onSelect, onUpload }: UploadButtonProps): ReactElement<UploadButtonProps> {
  const [loadingFiles, setLoadingFiles] = useState<LoadingFileDescriptor[]>([])

  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    hiddenFileInput.current?.click()
  }, [])

  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      Array.from(event.target.files || []).forEach((file: File) => {
        const start = new Date()
        const key = `${file.name}-${new Date()}`
        const loadingFile: LoadingFileDescriptor = {
          key,
          name: file.name,
          loaded: 0,
          total: file.size,
          start,
        }
        setLoadingFiles((prev) => [...prev, loadingFile])

        onSelect(file, ({ loaded, total }) => {
          setLoadingFiles((prev) => prev.map((desc) => (desc.key === key ? { ...desc, loaded, total } : desc)))
        }).then((loadedDesc) => {
          setLoadingFiles((prev) => prev.filter((desc) => desc.key !== key))
          onUpload(loadedDesc)
        })
      })
      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    },
    [onSelect, onUpload]
  )

  return (
    <>
      <UploadingList files={loadingFiles} />
      <Button leftIcon={<Paperclip />} onClick={handleClick}>
        Прикрепить ещё один файл
      </Button>
      <input type="file" ref={hiddenFileInput} onChange={handleFileSelect} style={{ display: 'none' }} />
    </>
  )
}

function UploadingList({ files }: UploadingListProps): ReactElement<UploadingListProps> {
  return (
    <List>
      {files.map((file) => (
        <ListItem key={file.key}>
          <ListIcon icon={Paperclip} />
          {file.name}
          <Progress hasStripe isAnimated value={Math.floor((file.loaded / file.total) * 100)} />
        </ListItem>
      ))}
    </List>
  )
}

interface UploadButtonProps {
  onSelect: (file: File, onProgress: OnProgress) => Promise<FileDescriptor>
  onUpload: (desc: FileDescriptor) => void
}

interface UploadingListProps {
  files: LoadingFileDescriptor[]
}

export type OnProgress = (event: { loaded: number; total: number }) => void
