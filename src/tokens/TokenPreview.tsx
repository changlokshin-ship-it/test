import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export function useCssVarValue(varName: string) {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(varName).trim())
  }, [varName])

  return value
}

export function TokenGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-md p-md sm:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  )
}

export function TokenLabel({ name, value }: { name: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-sm font-medium text-text-default">{name}</p>
      <p className="text-xs text-text-secondary">{value}</p>
    </div>
  )
}
