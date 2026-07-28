import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: '버튼',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
}

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
}

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-md p-md">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex items-center gap-sm">
          <Button variant="primary" size={size}>
            Primary
          </Button>
          <Button variant="secondary" size={size}>
            Secondary
          </Button>
          <Button variant="tertiary" size={size}>
            Tertiary
          </Button>
          <Button variant="primary" size={size} disabled>
            Primary
          </Button>
          <Button variant="tertiary" size={size} disabled>
            Tertiary
          </Button>
        </div>
      ))}
    </div>
  ),
}
