import { FC } from 'react'

export function makePropsValueProxy<SP, SK extends keyof SP, TV>(
  source: FC<SP>,
  map: ReadonlyMap<SK, (val: unknown) => TV>
): FC<Omit<SP, SK> & Record<SK, TV>> {
  return (targetProps) => {
    const sourceProps = [...map.entries()].reduce(
      (acc, [sourceKey, converter]) => {
        const { [sourceKey]: targetVal, ...other } = acc
        return {
          ...other,
          [sourceKey]: converter(targetVal),
        } as {}
      },
      { ...targetProps } as {}
    )
    return source(sourceProps as SP)
  }
}
