import type { FC } from 'react'

export function makeComponentProxy<SP, TP>(
  source: FC<SP>,
  proxy: readonly [keyof SP, [keyof TP, (val: unknown) => unknown] | [keyof TP]][]
): FC<TP> {
  return (props) => {
    const sourceProps = proxy.reduce(
      (acc, [sourceKey, [targetKey, converter]]) => {
        const { [targetKey]: targetVal, ...other } = acc
        return {
          ...other,
          [sourceKey]: converter ? converter(targetVal) : targetVal,
        }
      },
      { ...props } as Record<string, unknown>
    )
    return source(sourceProps as SP)
  }
}
