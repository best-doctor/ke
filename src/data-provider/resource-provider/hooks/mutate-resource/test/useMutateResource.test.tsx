/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-underscore-dangle */

import { act, renderHook } from '@testing-library/react-hooks'
import React, { PropsWithChildren } from 'react'
import { ResourceProvider } from '../../../ResourceProvider'
import { ResourceProviderConfig } from '../../../interfaces'

import { getDefaultResourceConfig } from '../../../utils/getDefaultResourceConfig'
import { useMutateResource } from '../useMutateResource'

test('fetch должен вызываться с параметром url если он пеередан в конфиг', async () => {
  const axiosMock = jest.fn(() => Promise.resolve({ data: {} }))
  const config: Partial<ResourceProviderConfig> = getDefaultResourceConfig(axiosMock as any)
  const wrapper = ({ children }: PropsWithChildren<{}>) => (
    <ResourceProvider options={config}>{children}</ResourceProvider>
  )

  const {
    result: {
      current: { mutateAsync },
    },
  } = renderHook(
    () =>
      useMutateResource<void, void>('http://test/', {
        requestConfig: {
          url: 'http://peretest/',
        },
      }),
    { wrapper }
  )
  await act(() => mutateAsync())
  expect(axiosMock).toBeCalledWith(expect.objectContaining({ url: 'http://peretest/' }))
})

test('fetch должен вызваться с resourceKey в url, если url не передан в параметрах', async () => {
  const axiosMock = jest.fn(() => Promise.resolve({ data: {} }))
  const config: Partial<ResourceProviderConfig> = getDefaultResourceConfig(axiosMock as any)
  const wrapper = ({ children }: PropsWithChildren<{}>) => (
    <ResourceProvider options={config}>{children}</ResourceProvider>
  )

  const {
    result: {
      current: { mutateAsync },
    },
  } = renderHook(() => useMutateResource<void, void>('http://test/'), { wrapper })
  await act(() => mutateAsync())
  expect(axiosMock).toBeCalledWith(expect.objectContaining({ url: 'http://test/' }))
})
