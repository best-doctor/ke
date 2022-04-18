import { useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { InfoSize } from './types'

interface BalloonSize {
  balloonMaxHeight?: number
  balloonMaxWidth?: number
  balloonMinHeight?: number
  balloonMinWidth?: number
}

const defaultSize: InfoSize = { maxWidth: 784 }

export function useBalloonSize(balloonNode: HTMLElement | undefined, setSize?: InfoSize): BalloonSize {
  const [balloonSize, setBalloonSize] = useState<BalloonSize>(mergeBalloonSize(balloonNode, setSize))

  useEffect(() => {
    setBalloonSize((prev) => {
      const updated = mergeBalloonSize(balloonNode, setSize)

      return isEqual(updated, prev) ? prev : updated
    })
  }, [balloonNode, setSize])

  return balloonSize
}

function mergeBalloonSize(balloonNode: HTMLElement | undefined, setSize?: InfoSize): BalloonSize {
  const maxHeight = setSize?.maxHeight || defaultSize.maxHeight
  const minHeight = setSize?.minHeight || balloonNode?.clientHeight || defaultSize.minHeight
  const maxWidth = setSize?.maxWidth || defaultSize.maxWidth
  const minWidth = setSize?.minWidth || balloonNode?.clientWidth || defaultSize.minWidth
  return {
    balloonMinHeight: minHeight ? Math.min(minHeight, maxHeight || Number.MAX_VALUE) : undefined,
    balloonMinWidth: minWidth ? Math.min(minWidth, maxWidth || Number.MAX_VALUE) : undefined,
    balloonMaxHeight: maxHeight,
    balloonMaxWidth: maxWidth,
  }
}
