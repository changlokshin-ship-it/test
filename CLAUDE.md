# CLAUDE.md — Figma 디자인 시스템 → 코드 변환 하네스

## 목적 (Goals)
1. 일관성 보장 — 모든 시각 값(color/spacing/radius/font-size/shadow 등)이 디자인 토큰만 참조한다.
2. 하드코딩 자동 차단 — 토큰 외 값 입력 시 사람 리뷰가 아니라 도구 레벨(lint/hook)에서 자동 차단된다.
3. 구현 프로세스 표준화 — 모든 컴포넌트 작업이 동일한 4단계 절차를 예외 없이 거친다.

## 완료 기준 (Definition of Done)
- [DoD-1] 컴포넌트 소스 전체에서 raw hex(`#[0-9a-fA-F]{3,8}`), `rgb(`/`rgba(`, Tailwind arbitrary value(`[...]`) 패턴 매치 0건 (grep 기준).
- [DoD-2] 토큰 외 값을 입력하는 테스트 케이스 실행 시, 사람 리뷰 이전에 도구(lint/hook/CI) 단계에서 실패로 차단됨이 재현 가능.
- [DoD-3] 컴포넌트 구현 기록(PR/로그/체크리스트) 샘플을 확인했을 때 전부 동일한 4단계 절차를 거쳤음이 문서로 확인 가능.

---

## 4원칙 (Working Principles)

각 원칙은 "막는 문제(실패 모드) + 강제 방식(구체적 행동)" 쌍으로 정의한다.

1. **Think Before Coding**
   - 막는 문제: 잘못된 가정 위에서 구현이 진행되는 것.
   - 강제 방식: 요구사항이 모호하면 즉시 멈추고 질문한다. 확인되지 않은 내용을 사실처럼 말하지 않는다.

2. **Simplicity First**
   - 막는 문제: 불필요하게 부풀려진 구현.
   - 강제 방식: 새로 만들기 전에 기존 토큰/컴포넌트의 재사용 가능 여부를 먼저 확인한다. 요청하지 않은 추상화·옵션을 추가하지 않는다.

3. **Surgical Changes**
   - 막는 문제: 요청 범위를 벗어난 변경.
   - 강제 방식: 변경된 모든 줄이 요청과 1:1로 추적 가능해야 한다. 연결 지을 수 없는 줄은 되돌린다.

4. **Goal-Driven Execution**
   - 막는 문제: 미완성 상태에서의 종료 처리.
   - 강제 방식: 작업 시작 전 측정 가능한 완료 조건을 정의하고, 자체 검증을 통과하기 전에는 "완료"라고 말하지 않는다.

## 표준 워크플로 (Clarify → Reuse → Implement → Evaluate)

모든 작업은 아래 4단계를 예외 없이 거치며, 각 단계는 원칙 1~4와 1:1 대응한다.

| 단계 | 대응 원칙 |
|---|---|
| 1. Clarify | Think Before Coding |
| 2. Reuse | Simplicity First |
| 3. Implement | Surgical Changes |
| 4. Evaluate | Goal-Driven Execution |

---
(에이전트 정의 / hook 설정 / 토큰 스키마는 다음 청크에서 작성)

## 강제 계약 (Enforcement Contract)

4원칙은 선언에 그치지 않는다. 아래 3개 레이어가 각각 독립적으로 강제하며, 상위 레이어가 지켜지지 않아도 하위 레이어가 최종 방어선이 된다.

- **레이어 1 — 선언**: `CLAUDE.md`가 원칙과 규칙을 명시적으로 선언한다. (이 문서 자체)
- **레이어 2 — 절차**: 에이전트가 Clarify → Reuse → Implement → Evaluate 절차를 실제로 수행하며 원칙 1~4를 단계별로 실행한다.
- **레이어 3 — 자동 차단**: hook이 토큰 외 값 입력을 도구 레벨에서 자동으로 차단한다. 사람의 리뷰나 에이전트의 판단력에 의존하지 않는다.

레이어 3이 최종 방어선이다 — 레이어 1(선언)과 레이어 2(절차)가 지켜지지 않더라도, 레이어 3은 토큰 외 값이 코드에 들어가는 것을 기계적으로 막는다.

## 토큰 규칙 (Token Rule)

모든 시각 값(color/spacing/radius/font-size/shadow 등)은 `src/tokens`에 정의된 토큰만 참조한다.

금지: raw hex(`#RRGGBB` 등), raw px/rem 수치, `rgb()`/`rgba()`, Tailwind arbitrary value(`w-[13px]`, `text-[#111]` 등).

이 규칙이 DoD-1(청크 1)과 레이어 3(hook)의 판정 기준선이다.

## 에이전트 라우팅 표 (작업 → 에이전트)

| 작업 | 담당 에이전트 | 상태 |
|---|---|---|
| Figma 링크/노드 → 코드 구현 | `figma-implementer` | 정의 완료 (`.claude/agents/figma-implementer.md`) |
| 하드코딩 감지·토큰 매핑·Figma 변수 동기화 | `token-guardian` | 정의 완료 (`.claude/agents/token-guardian.md`) |
| Figma 없이 토큰으로 컴포넌트 생성/변형 | `component-builder` | 정의 완료 (`.claude/agents/component-builder.md`) |
| 완료 전 검증 게이트 (PASS/FAIL) | `design-reviewer` | 정의 완료 (`.claude/agents/design-reviewer.md`) |

각 에이전트는 내부적으로 Clarify→Reuse→Implement→Evaluate 4단계를 전부 수행한다 (1 에이전트 = 1 워크플로 단계가 아니라, 1 에이전트 = 1 작업 유형).

## 스킬 가이드 표 (에이전트=역할 / 스킬=절차)

| 에이전트 (역할) | 스킬 (절차) | 상태 |
|---|---|---|
| `figma-implementer` — Figma 디자인 → 코드 구현 담당 | `/figma-to-code` | 정의 완료 (`.claude/skills/figma-to-code/SKILL.md`) |
| `component-builder` — 토큰 기반 컴포넌트 생성/변형 담당 | `/new-component` | 정의 완료 (`.claude/skills/new-component/SKILL.md`) |
| `token-guardian` — 토큰 파일 편집·동기화 담당 | `/sync-tokens` | 정의 완료 (`.claude/skills/sync-tokens/SKILL.md`) |
| `design-reviewer` — 완료 전 검증 게이트 담당 | `/review-design` | 정의 완료 (`.claude/skills/review-design/SKILL.md`) |

각 스킬은 자체 판단 없이 대응 에이전트를 결정적으로 호출하는 라우팅 전용이다.
