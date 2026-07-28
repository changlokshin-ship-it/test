import type { Meta, StoryObj } from '@storybook/react'
import { TokenGrid, TokenLabel, useCssVarValue } from './TokenPreview'

const SHADOW_TOKENS = [
  { cls: 'shadow-sm', varName: '--shadow-sm' },
  { cls: 'shadow-md', varName: '--shadow-md' },
  { cls: 'shadow-lg', varName: '--shadow-lg' },
] as const

function ShadowSwatch({ cls, varName }: (typeof SHADOW_TOKENS)[number]) {
  const value = useCssVarValue(varName)
  return (
    <div className="flex flex-col items-center gap-md">
      <div className={`h-16 w-16 rounded-md bg-bg-canvas ${cls}`} />
      <TokenLabel name={varName} value={value} />
    </div>
  )
}

function ElevationScale() {
  return (
    <TokenGrid>
      {SHADOW_TOKENS.map((token) => (
        <ShadowSwatch key={token.cls} {...token} />
      ))}
    </TokenGrid>
  )
}

const meta = {
  title: 'Tokens/Elevation',
  component: ElevationScale,
} satisfies Meta<typeof ElevationScale>

export default meta
type Story = StoryObj<typeof meta>

export const AllElevation: Story = {}
