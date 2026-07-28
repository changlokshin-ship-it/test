import type { Meta, StoryObj } from '@storybook/react'
import { TokenGrid, TokenLabel, useCssVarValue } from './TokenPreview'

const RADIUS_TOKENS = [
  { cls: 'rounded-sm', varName: '--radius-sm' },
  { cls: 'rounded-md', varName: '--radius-md' },
  { cls: 'rounded-lg', varName: '--radius-lg' },
  { cls: 'rounded-full', varName: '--radius-full' },
] as const

function RadiusSwatch({ cls, varName }: (typeof RADIUS_TOKENS)[number]) {
  const value = useCssVarValue(varName)
  return (
    <div className="flex flex-col items-center gap-xs">
      <div className={`h-16 w-16 bg-interactive-primary ${cls}`} />
      <TokenLabel name={varName} value={value} />
    </div>
  )
}

function RadiusScale() {
  return (
    <TokenGrid>
      {RADIUS_TOKENS.map((token) => (
        <RadiusSwatch key={token.cls} {...token} />
      ))}
    </TokenGrid>
  )
}

const meta = {
  title: 'Tokens/Radius',
  component: RadiusScale,
} satisfies Meta<typeof RadiusScale>

export default meta
type Story = StoryObj<typeof meta>

export const AllRadius: Story = {}
