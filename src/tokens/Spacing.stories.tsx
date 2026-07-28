import type { Meta, StoryObj } from '@storybook/react'
import { useCssVarValue } from './TokenPreview'

const SPACING_TOKENS = [
  { cls: 'w-xs', varName: '--spacing-xs' },
  { cls: 'w-sm', varName: '--spacing-sm' },
  { cls: 'w-md', varName: '--spacing-md' },
  { cls: 'w-lg', varName: '--spacing-lg' },
  { cls: 'w-xl', varName: '--spacing-xl' },
] as const

function SpacingRow({ cls, varName }: (typeof SPACING_TOKENS)[number]) {
  const value = useCssVarValue(varName)
  return (
    <div className="flex items-center gap-md">
      <div className={`h-md rounded-sm bg-interactive-primary ${cls}`} />
      <p className="text-sm text-text-default">
        {varName} <span className="text-text-secondary">({value})</span>
      </p>
    </div>
  )
}

function SpacingScale() {
  return (
    <div className="flex flex-col gap-md p-md">
      {SPACING_TOKENS.map((token) => (
        <SpacingRow key={token.cls} {...token} />
      ))}
    </div>
  )
}

const meta = {
  title: 'Tokens/Spacing',
  component: SpacingScale,
} satisfies Meta<typeof SpacingScale>

export default meta
type Story = StoryObj<typeof meta>

export const AllSpacing: Story = {}
