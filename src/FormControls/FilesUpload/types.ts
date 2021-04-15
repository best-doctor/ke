export interface FileDescriptor {
  uuid: string
  name: string
}

export interface LoadingFileDescriptor {
  key: string
  name: string
  loaded: number
  total: number
  start: Date
}
