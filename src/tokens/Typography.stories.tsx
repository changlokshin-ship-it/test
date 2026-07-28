import type { Meta, StoryObj } from '@storybook/react'
import { useCssVarValue } from './TokenPreview'

const TEXT_SIZES = [
  { cls: 'text-xs', varName: '--text-xs' },
  { cls: 'text-sm', varName: '--text-sm' },
  { cls: 'text-base', varName: '--text-base' },
  { cls: 'text-lg', varName: '--text-lg' },
  { cls: 'text-xl', varName: '--text-xl' },
  { cls: 'text-2xl', varName: '--text-2xl' },
] as const

const FONT_WEIGHTS = [
  { cls: 'font-normal', varName: '--font-weight-normal' },
  { cls: 'font-medium', varName: '--font-weight-medium' },
  { cls: 'font-semibold', varName: '--font-weight-semibold' },
  { cls: 'font-bold', varName: '--font-weight-bold' },
] as const

function TextSizeRow({ cls, varName }: (typeof TEXT_SIZES)[number]) {
  const value = useCssVarValue(varName)
  return (
    <div className="flex items-baseline gap-md">
      <p className={`font-sans text-text-default ${cls}`}>Aa 디자인 토큰</p>
      <span className="text-xs text-text-secondary">
        {varName} ({value})
      </span>
    </div>
  )
}

function FontWeightRow({ cls, varName }: (typeof FONT_WEIGHTS)[number]) {
  const value = useCssVarValue(varName)
  return (
    <div className="flex items-baseline gap-md">
      <p className={`font-sans text-lg text-text-default ${cls}`}>Aa 디자인 토큰</p>
      <span className="text-xs text-text-secondary">
        {varName} ({value})
      </span>
    </div>
  )
}

function TypographyScale() {
  return (
    <div className="flex flex-col gap-lg p-md">
      <div>
        <h2 className="mb-sm text-xl font-semibold text-text-default">Font size</h2>
        <div className="flex flex-col gap-sm">
          {TEXT_SIZES.map((token) => (
            <TextSizeRow key={token.cls} {...token} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-sm text-xl font-semibold text-text-default">Font weight</h2>
        <div className="flex flex-col gap-sm">
          {FONT_WEIGHTS.map((token) => (
            <FontWeightRow key={token.cls} {...token} />
          ))}
        </div>
      </div>
    </div>
  )
}

const meta = {
  title: 'Tokens/Typography',
  component: TypographyScale,
} satisfies Meta<typeof TypographyScale>

export default meta
type Story = StoryObj<typeof meta>

export const AllTypography: Story = {}
