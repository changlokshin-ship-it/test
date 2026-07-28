# Design Tokens 매핑 테이블

Figma 디자인 변수를 `src/tokens/*.tokens.css`로 변환한 매핑 기록. 변환 규칙과 예외는 `src/tokens/README.md` 참고.

## 출처

- Figma 파일: `[NHN] 실습 디자인시스템 (Copy)`
- fileKey: `TsK9PNhDrcyBIRYiEWs0Pr`, node-id: `146:10144`
- 추출 방법: `get_variable_defs`
- 변환 규칙: Figma 변수명의 `/` → CSS 토큰명의 `-` (예: `blue/700` → `--color-blue-700`)

## 진행 상태

| 카테고리 | 상태 | 파일 |
|---|---|---|
| 색상 (Color) | ✅ 완료 | `src/tokens/colors.tokens.css` |
| 스페이싱 (Spacing) | ⏳ 대기 (다음 Figma 링크) | `src/tokens/spacing.tokens.css` (예정) |
| 타이포그래피 (Text Styles) | ⏳ 대기 (다음 Figma 링크) | Tailwind `@utility` 클래스 (예정) |
| 라디우스/그림자 등 기타 | ⏳ 대기 (다음 Figma 링크) | 미정 |

## 색상 — Primitive

| Figma 변수 | CSS 토큰 | 값 |
|---|---|---|
| `static/white` | `--color-static-white` | `#ffffff` |
| `static/black` | `--color-static-black` | `#222222` |
| `blue/100` | `--color-blue-100` | `#e9f1ff` |
| `blue/200` | `--color-blue-200` | `#c8dcff` |
| `blue/300` | `--color-blue-300` | `#a6c6ff` |
| `blue/400` | `--color-blue-400` | `#84b1ff` |
| `blue/500` | `--color-blue-500` | `#609afe` |
| `blue/600` | `--color-blue-600` | `#377cf4` |
| `blue/700` | `--color-blue-700` | `#125de6` |
| `blue/800` | `--color-blue-800` | `#1446c8` |
| `blue/900` | `--color-blue-900` | `#162faa` |
| `neutral/100` | `--color-neutral-100` | `#f9f9f9` |
| `neutral/200` | `--color-neutral-200` | `#f4f4f4` |
| `neutral/300` | `--color-neutral-300` | `#eeeeee` |
| `neutral/400` | `--color-neutral-400` | `#e5e5e5` |
| `neutral/500` | `--color-neutral-500` | `#dddddd` |
| `neutral/600` | `--color-neutral-600` | `#cccccc` |
| `neutral/700` | `--color-neutral-700` | `#aaaaaa` |
| `neutral/800` | `--color-neutral-800` | `#777777` |
| `neutral/850` | `--color-neutral-850` | `#444444` |
| `neutral/900` | `--color-neutral-900` | `#555555` |
| `red/100` | `--color-red-100` | `#fff0f0` |
| `red/200` | `--color-red-200` | `#ffd6d6` |
| `red/300` | `--color-red-300` | `#ffadad` |
| `red/500` | `--color-red-500` | `#e14040` |
| `red/700` | `--color-red-700` | `#b31111` |
| `green/100` | `--color-green-100` | `#f2ffe8` |
| `green/200` | `--color-green-200` | `#c4eed4` |
| `green/300` | `--color-green-300` | `#6fd395` |
| `green/500` | `--color-green-500` | `#1ca653` |
| `green/700` | `--color-green-700` | `#1a7a33` |
| `purple/100` | `--color-purple-100` | `#f6e9ff` |
| `purple/200` | `--color-purple-200` | `#e2c4ff` |
| `purple/300` | `--color-purple-300` | `#bf84f5` |
| `purple/500` | `--color-purple-500` | `#9421db` |
| `purple/700` | `--color-purple-700` | `#6b18a0` |

## 색상 — Semantic (Primitive 참조)

| Figma 변수 | CSS 토큰 | 참조하는 Primitive | 값 |
|---|---|---|---|
| `fill/white` | `--color-fill-white` | `--color-static-white` | `#ffffff` |
| `fill/default` | `--color-fill-default` | `--color-static-black` | `#222222` |
| `fill/primary-01` | `--color-fill-primary-01` | `--color-blue-700` | `#125de6` |
| `fill/primary-02` | `--color-fill-primary-02` | `--color-blue-800` | `#1446c8` |
| `fill/secondary-01` | `--color-fill-secondary-01` | `--color-neutral-800` | `#777777` |
| `fill/secondary-02` | `--color-fill-secondary-02` | `--color-neutral-900` | `#555555` |
| `fill/tertiary-01` | `--color-fill-tertiary-01` | `--color-neutral-100` | `#f9f9f9` |
| `fill/subtle` | `--color-fill-subtle` | `--color-neutral-100` | `#f9f9f9` |
| `fill/muted` | `--color-fill-muted` | `--color-neutral-400` | `#e5e5e5` |
| `text/default` | `--color-text-default` | `--color-static-black` | `#222222` |
| `text/secondary` | `--color-text-secondary` | `--color-neutral-900` | `#555555` |
| `text/primary` | `--color-text-primary` | `--color-blue-700` | `#125de6` |
| `text/disabled` | `--color-text-disabled` | `--color-neutral-700` | `#aaaaaa` |
| `bg/canvas` | `--color-bg-canvas` | `--color-static-white` | `#ffffff` |
| `bg/surface` | `--color-bg-surface` | `--color-neutral-100` | `#f9f9f9` |
| `bg/subtle` | `--color-bg-subtle` | `--color-neutral-200` | `#f4f4f4` |
| `bg/muted` | `--color-bg-muted` | `--color-neutral-400` | `#e5e5e5` |
| `bg/inverse` | `--color-bg-inverse` | `--color-neutral-850` | `#444444` |
| `border/subtle` | `--color-border-subtle` | `--color-neutral-300` | `#eeeeee` |
| `border/default` | `--color-border-default` | `--color-neutral-500` | `#dddddd` |
| `border/medium` | `--color-border-medium` | `--color-neutral-600` | `#cccccc` |
| `border/strong` | `--color-border-strong` | `--color-neutral-700` | `#aaaaaa` |
| `border/primary` | `--color-border-primary` | `--color-blue-700` | `#125de6` |
| `border/caution` | `--color-border-caution` | `--color-red-700` | `#b31111` |
| `border/inverse` | `--color-border-inverse` | `--color-static-white` | `#ffffff` |
| `icon/default` | `--color-icon-default` | `--color-static-black` | `#222222` |
| `icon/subtle` | `--color-icon-subtle` | `--color-neutral-700` | `#aaaaaa` |
| `icon/accent` | `--color-icon-accent` | `--color-blue-700` | `#125de6` |
| `icon/on-white` | `--color-icon-on-white` | `--color-neutral-100` | `#f9f9f9` |
| `icon/tertiary` | `--color-icon-tertiary` | `--color-neutral-500` | `#dddddd` |
| `interactive/primary` | `--color-interactive-primary` | `--color-blue-700` | `#125de6` |
| `interactive/hover` | `--color-interactive-hover` | `--color-blue-800` | `#1446c8` |
| `interactive/light` | `--color-interactive-light` | `--color-blue-100` | `#e9f1ff` |
| `status/critical` | `--color-status-critical` | `--color-red-500` | `#e14040` |
| `status/critical-surface` | `--color-status-critical-surface` | `--color-red-100` | `#fff0f0` |
| `status/success` | `--color-status-success` | `--color-green-500` | `#1ca653` |
| `status/success-surface` | `--color-status-success-surface` | `--color-green-100` | `#f2ffe8` |
| `status/urgent` | `--color-status-urgent` | `--color-purple-500` | `#9421db` |
| `status/urgent-surface` | `--color-status-urgent-surface` | `--color-purple-100` | `#f6e9ff` |
| `status/info` | `--color-status-info` | `--color-blue-400` | `#84b1ff` |
| `status/info-surface` | `--color-status-info-surface` | `--color-blue-100` | `#e9f1ff` |

## 참고

- `src/tokens/design-tokens.css`의 기존 color placeholder(`bg-canvas`/`text-default`/`text-secondary`/`border-subtle`/`border-default`/`border-strong`)는 이번에 실제 값으로 대체되었고, 정의 주체가 `colors.tokens.css`로 이전되었다. `design-tokens.css`는 더 이상 color를 정의하지 않는다.
- `get_variable_defs` 응답에는 타이포그래피(`size/*`, `family/*`, `lineHeight/*`, `weight/*`, `Typography/*`)와 `scale/*`(스페이싱 추정), `radius/*` 변수도 포함되어 있었으나, 이번 청크 범위(컬러)가 아니므로 반영하지 않았다. 다음 Figma 링크를 받으면 이 값들로 `spacing.tokens.css`, 타이포그래피 `@utility` 클래스, radius/shadow 토큰을 이어서 작업한다.
