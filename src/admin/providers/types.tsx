import type { AxiosError, AxiosRequestConfig } from 'axios'

type BaseResponse = {
  data: {
    data: any
    meta: any
  }
}

type ErrorHandler = (error: Error | AxiosError) => void

type ProviderOptions = {
  onError?: ErrorHandler
  requestConfig?: AxiosRequestConfig
}

export { BaseResponse, ErrorHandler, ProviderOptions }
