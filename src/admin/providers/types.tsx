import type { AxiosError } from 'axios'

type BaseResponse = {
  data: {
    data: any
    meta: any
  }
}

type ErrorHandler = (error: Error | AxiosError) => void

type ProviderOptions = {
  onError?: ErrorHandler
}

export { BaseResponse, ErrorHandler, ProviderOptions }
