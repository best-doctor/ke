import { Provider, ProviderProps } from 'react'

export type LeafData = unknown

export type RootProviderDesc<T> = [Provider<RootContext<T>>, ProviderProps<RootContext<T>>]

export type RootContext<T = unknown> = [KeyGetter<T>, KeyUpdater<T>]

export type KeyGetter<T> = (key: string | number) => T

export type KeyUpdater<T> = (key: string | number, updater: (val: T) => T) => void

export type Updater<T = unknown> = (prev: T) => T
