import React, { ChangeEvent, ReactElement, useCallback, useRef, useState } from 'react'
import { Button, ButtonProps, List, ListIcon, ListItem, Progress, Text } from '@chakra-ui/react'
import { Loader, Paperclip } from 'react-feather'
import { filesize } from 'filesize'
import { FileDescriptor, LoadingFileDescriptor } from './types'

interface CombinedFileDescriptor {
  loadingDescriptor: LoadingFileDescriptor
  fileDescriptor: FileDescriptor
}

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

  const removeFromLoading = useCallback((key: string) => {
    setLoadingFiles((prev) => prev.filter((desc) => desc.key !== key))
  }, [])

  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFileErrors([])
      const uploadingPromises = Array.from(event.target.files || []).map(
        (file: File): Promise<CombinedFileDescriptor | null> => {
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
              `Размер файла ${file.name} превышает допустимый максимальный размер ${filesize(maxFileSize)}`,
            ])
            return Promise.resolve(null)
          }

          setLoadingFiles((prev) => [...prev, loadingFile])

          return onSelect(file, ({ loaded, total }) => {
            setLoadingFiles((prev) => prev.map((desc) => (desc.key === key ? { ...desc, loaded, total } : desc)))
          })
            .then((loadedDesc: FileDescriptor) => ({ loadingDescriptor: loadingFile, fileDescriptor: loadedDesc }))
            .catch((error) => {
              removeFromLoading(key)
              throw error
            })
        }
      )
      Promise.allSettled(uploadingPromises)
        .then((result) =>
          result
            .filter(
              (item): item is PromiseFulfilledResult<CombinedFileDescriptor | null> => item.status === 'fulfilled'
            )
            .filter((item): item is PromiseFulfilledResult<CombinedFileDescriptor> => item.value !== null)
            .map(({ value }) => {
              removeFromLoading(value.loadingDescriptor.key)
              return value.fileDescriptor
            })
        )
        .then(onUpload)
      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    },
    [onUpload, maxFileSize, onSelect, removeFromLoading]
  )

  return (
    <>
      <UploadingList files={loadingFiles} />
      <Button
        leftIcon={<Paperclip size={18} />}
        size="sm"
        mt="5px"
        // Это легаси
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...buttonProps}
        onClick={handleClick}
        isDisabled={buttonProps?.isDisabled || !!loadingFiles.length}
      >
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
