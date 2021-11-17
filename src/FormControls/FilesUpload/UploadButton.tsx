import React, { ChangeEvent, ReactElement, useCallback, useRef, useState } from 'react'
import { Button, ButtonProps, List, ListIcon, ListItem, Progress, Text } from '@chakra-ui/react'
import { Loader, Paperclip } from 'react-feather'
import Filesize from 'filesize'
import { FileDescriptor, LoadingFileDescriptor } from './types'

export function UploadButton({
  onSelect,
  onUpload,
  label = 'Прикрепить ещё один файл',
  buttonProps,
  maxFileSize,
  multiple,
}: UploadButtonProps): ReactElement<UploadButtonProps> {
  const [loadingFiles, setLoadingFiles] = useState<LoadingFileDescriptor[]>([])
  const [fileErrors, setFileErrors] = useState<string[]>([])

  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    hiddenFileInput.current?.click()
  }, [])

  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFileErrors([])
      const uploadingPromises = Array.from(event.target.files || []).map(
        (file: File): Promise<FileDescriptor | null> => {
          const start = new Date()
          const key = `${file.name}-${new Date()}`
          const loadingFile: LoadingFileDescriptor = {
            key,
            name: file.name,
            loaded: 0,
            total: file.size,
            start,
          }

          if (maxFileSize && file.size > maxFileSize) {
            setFileErrors((prev) => [
              ...prev,
              `Размер файла ${file.name} превышает допустимый максимальный размер ${Filesize(maxFileSize)}`,
            ])
            return Promise.resolve(null)
          }

          setLoadingFiles((prev) => [...prev, loadingFile])

          return onSelect(file, ({ loaded, total }) => {
            setLoadingFiles((prev) => prev.map((desc) => (desc.key === key ? { ...desc, loaded, total } : desc)))
          }).then((loadedDesc: FileDescriptor) => {
            setLoadingFiles((prev) => prev.filter((desc) => desc.key !== key))
            return loadedDesc
          })
        }
      )
      Promise.allSettled(uploadingPromises)
        .then((result) =>
          result
            .filter((item): item is PromiseFulfilledResult<FileDescriptor> => item.status === 'fulfilled')
            .map(({ value }) => value)
        )
        .then(onUpload)
      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    },
    [onUpload, maxFileSize, onSelect]
  )

  return (
    <>
      <UploadingList files={loadingFiles} />
      <Button leftIcon={<Paperclip size={18} />} size="sm" mt="5px" {...buttonProps} onClick={handleClick}>
        {label}
      </Button>
      {fileErrors.map((error, index) => {
        const errorIndex = index
        return (
          <Text color="red" key={errorIndex} fontSize="sm">
            {error}
          </Text>
        )
      })}
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        multiple={multiple}
      />
    </>
  )
}

function UploadingList({ files }: UploadingListProps): ReactElement<UploadingListProps> {
  return (
    <List>
      {files.map((file) => (
        <ListItem key={file.key}>
          <ListIcon as={Loader} />
          {file.name}
          <Progress hasStripe isAnimated value={Math.floor((file.loaded / file.total) * 100)} />
        </ListItem>
      ))}
    </List>
  )
}

interface UploadButtonProps {
  buttonProps?: ButtonProps
  label?: React.ReactChild
  onSelect: (file: File, onProgress: OnProgress) => Promise<FileDescriptor>
  onUpload: (desc: FileDescriptor[]) => void
  maxFileSize?: number
  multiple?: boolean
}

interface UploadingListProps {
  files: LoadingFileDescriptor[]
}

export type OnProgress = (event: { loaded: number; total: number }) => void
