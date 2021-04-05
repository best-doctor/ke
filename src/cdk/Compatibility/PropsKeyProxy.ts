import { FC } from 'react'

export function makePropsKeyProxy<SP, SK extends keyof SP, TK extends string>(
  source: FC<SP>,
  map: ReadonlyMap<SK, TK>
): FC<Omit<SP, SK> & Record<TK, SP[SK]>> {
  return (targetProps) => {
    const sourceProps = [...map.entries()].reduce(
      (acc, [sourceKey, targetKey]) => {
        const { [targetKey]: targetVal, ...other } = acc
        return {
          ...other,
          [sourceKey]: targetVal,
        } as {}
      },
      { ...targetProps } as {}
    )
    return source(sourceProps as SP)
  }
}
