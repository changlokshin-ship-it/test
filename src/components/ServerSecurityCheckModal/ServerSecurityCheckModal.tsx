import { Button } from '../Button/Button'
import closeIcon from './assets/close-icon.svg'
import noticeIcon from './assets/notice-icon.svg'
import plusIconVertical from './assets/plus-icon-1.svg'
import plusIconHorizontal from './assets/plus-icon-2.svg'
import stepDivider from './assets/step-divider.svg'

export interface SecurityCheckNotice {
  id: string
  text: string
}

const DEFAULT_NOTICES: SecurityCheckNotice[] = [
  {
    id: 'popup-allow',
    text: '팝업이 차단된 경우, "팝업을 항상 허용" 옵션을 열어주신 후 결제 수단 추가/변경을 부탁드립니다.',
  },
  {
    id: 'popup-blocked-required',
    text: '팝업이 차단된 결제 수단은 NHN Cloud 서비스를 이용하기 위해 반드시 등록해야 합니다.',
  },
  {
    id: 'payment-required',
    text: '결제 수단은 NHN Cloud 서비스를 이용하기 위해 반드시 등록해야 합니다.',
  },
  {
    id: 'account-limit',
    text: '동일한 결제 수단은 최대 3개의 계정에 등록할 수 있습니다.',
  },
]

export interface ServerSecurityCheckModalProps {
  title?: string
  steps?: [string, string]
  notices?: SecurityCheckNotice[]
  onClose?: () => void
  onCancel?: () => void
  onNext?: () => void
  onAddCard?: () => void
}

function PlusIcon() {
  return (
    <span className="relative inline-block size-5" aria-hidden="true">
      <img src={plusIconVertical} alt="" className="absolute inset-0 m-auto" />
      <img src={plusIconHorizontal} alt="" className="absolute inset-0 m-auto" />
    </span>
  )
}

function StepBadge({ index, label, active }: { index: number; label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-sm">
      <div
        className={`flex size-11 items-center justify-center rounded-full text-lg ${
          active ? 'bg-interactive-primary text-fill-white' : 'bg-border-subtle text-text-default'
        }`}
      >
        {index}
      </div>
      <p className="whitespace-nowrap text-center text-caption-base text-text-default">{label}</p>
    </div>
  )
}

export function ServerSecurityCheckModal({
  title = 'Server Security Check',
  steps = ['결제 수단 등록', '조직/프로젝트 확인'],
  notices = DEFAULT_NOTICES,
  onClose,
  onCancel,
  onNext,
  onAddCard,
}: ServerSecurityCheckModalProps) {
  return (
    <div role="dialog" aria-label={title} className="relative w-175 rounded-2 bg-bg-canvas shadow">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute right-5 top-5 flex size-5 items-center justify-center rounded-2"
      >
        <img src={closeIcon} alt="" className="size-5" />
      </button>

      <header className="flex items-center pb-scale-30 pl-10 pt-11">
        <h2 className="text-heading-3 text-text-default">{title}</h2>
      </header>

      <div className="flex flex-col items-start px-10">
        <div className="flex w-full items-center justify-center gap-md border-b border-border-subtle py-lg">
          <StepBadge index={1} label={steps[0]} active />
          <img src={stepDivider} alt="" role="presentation" className="h-px w-22" />
          <StepBadge index={2} label={steps[1]} />
        </div>

        <section className="flex w-full flex-col gap-sm py-lg">
          <h3 className="text-body-base text-text-default">결제 수단</h3>

          <ul className="flex flex-col">
            {notices.map((notice) => (
              <li key={notice.id} className="flex items-center gap-sm py-xs">
                <img src={noticeIcon} alt="" className="size-scale-13 shrink-0" />
                <p className="text-caption-base text-text-secondary">{notice.text}</p>
              </li>
            ))}
          </ul>

          <div className="flex w-full justify-center border border-border-subtle px-18 py-lg">
            <button
              type="button"
              onClick={onAddCard}
              aria-label="결제 수단 추가"
              className="flex size-10 items-center justify-center rounded-full bg-bg-subtle"
            >
              <PlusIcon />
            </button>
          </div>
        </section>
      </div>

      <footer className="flex items-center justify-end gap-xs px-10 py-lg">
        <Button variant="secondary" size="lg" onClick={onCancel}>
          취소
        </Button>
        <Button variant="primary" size="lg" onClick={onNext}>
          다음
        </Button>
      </footer>
    </div>
  )
}
