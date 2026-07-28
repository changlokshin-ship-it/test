import type { Meta, StoryObj } from '@storybook/react'
import { TokenGrid, TokenLabel, useCssVarValue } from './TokenPreview'

const PRIMITIVES = [
  'bg-static-white', 'bg-static-black',
  'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500',
  'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900',
  'bg-neutral-100', 'bg-neutral-200', 'bg-neutral-300', 'bg-neutral-400', 'bg-neutral-500',
  'bg-neutral-600', 'bg-neutral-700', 'bg-neutral-800', 'bg-neutral-850', 'bg-neutral-900',
  'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-500', 'bg-red-700',
  'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-500', 'bg-green-700',
  'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-500', 'bg-purple-700',
] as const

const SEMANTIC_GROUPS: Record<string, readonly string[]> = {
  fill: [
    'bg-fill-white', 'bg-fill-default', 'bg-fill-primary-01', 'bg-fill-primary-02',
    'bg-fill-secondary-01', 'bg-fill-secondary-02', 'bg-fill-tertiary-01', 'bg-fill-subtle', 'bg-fill-muted',
  ],
  text: ['bg-text-default', 'bg-text-secondary', 'bg-text-primary', 'bg-text-disabled'],
  bg: ['bg-bg-canvas', 'bg-bg-surface', 'bg-bg-subtle', 'bg-bg-muted', 'bg-bg-inverse'],
  border: [
    'bg-border-subtle', 'bg-border-default', 'bg-border-medium', 'bg-border-strong',
    'bg-border-primary', 'bg-border-caution', 'bg-border-inverse',
  ],
  icon: ['bg-icon-default', 'bg-icon-subtle', 'bg-icon-accent', 'bg-icon-on-white', 'bg-icon-tertiary'],
  interactive: ['bg-interactive-primary', 'bg-interactive-hover', 'bg-interactive-light'],
  status: [
    'bg-status-critical', 'bg-status-critical-surface', 'bg-status-success', 'bg-status-success-surface',
    'bg-status-urgent', 'bg-status-urgent-surface', 'bg-status-info', 'bg-status-info-surface',
  ],
}

function toCssVar(bgClass: string) {
  return `--color-${bgClass.replace(/^bg-/, '')}`
}

function ColorSwatch({ bgClass }: { bgClass: string }) {
  const varName = toCssVar(bgClass)
  const value = useCssVarValue(varName)
  return (
    <div className="flex flex-col items-center gap-xs">
      <div className={`h-16 w-full rounded-md border-2 border-border-subtle ${bgClass}`} />
      <TokenLabel name={varName} value={value} />
    </div>
  )
}

function ColorPalette() {
  return (
    <div>
      <h2 className="mb-sm text-xl font-semibold text-text-default">Primitive</h2>
      <TokenGrid>
        {PRIMITIVES.map((cls) => (
          <ColorSwatch key={cls} bgClass={cls} />
        ))}
      </TokenGrid>

      {Object.entries(SEMANTIC_GROUPS).map(([group, classes]) => (
        <div key={group}>
          <h2 className="mb-sm mt-lg text-xl font-semibold capitalize text-text-default">
            Semantic — {group}
          </h2>
          <TokenGrid>
            {classes.map((cls) => (
              <ColorSwatch key={cls} bgClass={cls} />
            ))}
          </TokenGrid>
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: 'Tokens/Colors',
  component: ColorPalette,
} satisfies Meta<typeof ColorPalette>

export default meta
type Story = StoryObj<typeof meta>

export const AllColors: Story = {}
