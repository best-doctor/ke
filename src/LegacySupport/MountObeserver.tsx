import React, { useEffect, useRef } from 'react'

interface MountObeserverProps {
  onMount?(): void
  onUnmount?(): void
}

export const MountObeserver: React.FC<MountObeserverProps> = ({ onMount, onUnmount }) => {
  const mountRef = useRef(onMount)
  mountRef.current = onMount

  const unMountRef = useRef(onUnmount)
  unMountRef.current = onUnmount

  useEffect(() => {
    mountRef?.current?.()
    return unMountRef.current
  }, [])
  return null
}
