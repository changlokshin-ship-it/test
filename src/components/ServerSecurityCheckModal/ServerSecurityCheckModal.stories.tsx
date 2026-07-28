import type { Meta, StoryObj } from '@storybook/react'
import { ServerSecurityCheckModal } from './ServerSecurityCheckModal'

const meta = {
  title: 'Components/ServerSecurityCheckModal',
  component: ServerSecurityCheckModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ServerSecurityCheckModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomSteps: Story = {
  args: {
    title: 'Custom Security Check',
    steps: ['정보 입력', '검토 및 완료'],
    notices: [
      { id: 'a', text: '예시 안내 문구 1' },
      { id: 'b', text: '예시 안내 문구 2' },
    ],
  },
}
