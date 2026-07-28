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
| 스페이싱 (Spacing) | ✅ 완료 | `src/tokens/spacing.tokens.css` |
| 라디우스 (Radius) | ✅ 완료 | `src/tokens/radius.tokens.css` |
| 그림자 (Shadow/Effect) | ✅ 완료 | `src/tokens/effects.tokens.css` |
| 타이포그래피 (Text Styles) | ✅ 완료 | `src/tokens/typography.tokens.css` (Tailwind `@utility`) |

색상 이후 스페이싱/라디우스/타이포그래피/그림자는 새 Figma 링크 없이, `use_figma`(Plugin API)로 파일의 로컬 변수 컬렉션(`figma.variables.getLocalVariableCollectionsAsync()`)과 이펙트 스타일을 직접 조회해서 완료했다 (`get_variable_defs`는 특정 노드 선택이 필요해 스페이싱 전용 노드를 찾지 못해 막혀 있었음).

## 스페이싱

Figma "Spacing" 컬렉션은 `scale/N` 이름 그대로 N px인 리터럴 스케일이다. Tailwind v4의 기본 숫자 유틸리티(`p-12` 등은 `N × --spacing` 배수)와 이름이 겹치므로, `--spacing-scale-N` 네임스페이스로 분리해서 노출한다(유틸리티 클래스는 `p-scale-12` 형태).

| Figma 변수 | CSS 토큰 | 값 |
|---|---|---|
| `scale/1` | `--spacing-scale-1` | `1px` |
| `scale/2` | `--spacing-scale-2` | `2px` |
| `scale/4` | `--spacing-scale-4` | `4px` |
| `scale/5` | `--spacing-scale-5` | `5px` |
| `scale/6` | `--spacing-scale-6` | `6px` |
| `scale/8` | `--spacing-scale-8` | `8px` |
| `scale/10` | `--spacing-scale-10` | `10px` |
| `scale/11` | `--spacing-scale-11` | `11px` |
| `scale/12` | `--spacing-scale-12` | `12px` |
| `scale/13` | `--spacing-scale-13` | `13px` |
| `scale/15` | `--spacing-scale-15` | `15px` |
| `scale/16` | `--spacing-scale-16` | `16px` |
| `scale/20` | `--spacing-scale-20` | `20px` |
| `scale/24` | `--spacing-scale-24` | `24px` |
| `scale/25` | `--spacing-scale-25` | `25px` |
| `scale/26` | `--spacing-scale-26` | `26px` |
| `scale/30` | `--spacing-scale-30` | `30px` |
| `scale/50` | `--spacing-scale-50` | `50px` |

의미 기반 별칭(`--spacing-xs/sm/md/lg/xl`)은 각각 `scale/8`,`scale/12`,`scale/16`,`scale/24`,`scale/30`을 그대로 참조한다. 이전 placeholder는 `xl`이 32px(틀림)였는데 실제로는 30px이라 수정했다.

## 라디우스

Figma "Radius" 컬렉션은 3단계뿐이다 (sm/md/lg 같은 의미 기반 이름이 아니라 값 기반 이름).

| Figma 변수 | CSS 토큰 | 값 |
|---|---|---|
| `radius/1` | `--radius-1` | `1px` |
| `radius/2` | `--radius-2` | `2px` |
| `radius/18` | `--radius-18` | `18px` |

이전 placeholder(`--radius-sm`=4px 등)는 전부 틀렸다 — 실제 스케일과 무관한 임의값이었음. 완전한 원(pill)이 필요하면 Tailwind 기본 키워드 `rounded-full`을 그대로 쓴다 (Figma에도 별도 "full" 토큰 없음).

## 그림자 (Effect Style)

Figma에는 이름 없는 이펙트 스타일 "shadow" 단 하나만 존재한다 (`use_figma`로 `effects` 배열 직접 조회).

| Figma 스타일 | CSS 토큰 | 값 |
|---|---|---|
| `shadow` (drop-shadow) | `--shadow` | `0px 10px 30px 0px rgba(0, 0, 0, 0.25)` |

이전 placeholder(`--shadow-sm/md/lg` 3단계)는 전부 임의값이었다. 실제로는 스케일 없이 하나뿐이라 Tailwind의 접미사 없는 `shadow` 유틸리티로 노출한다.

## 타이포그래피 (합성 토큰 → @utility)

Figma의 "Typography/X" 항목은 family+size+weight+lineHeight가 묶인 합성 토큰이라, CSS 변수가 아니라 Tailwind `@utility` 클래스로 변환했다 (`src/tokens/typography.tokens.css`).

| Figma 변수 | Tailwind 클래스 | family | weight | size | line-height |
|---|---|---|---|---|---|
| `Typography/Display` | `text-display` | Pretendard Variable | 700 (Bold) | 34px | 50px |
| `Typography/Heading 1` | `text-heading-1` | Pretendard Variable | 400 (Regular) | 22px | 34px |
| `Typography/Heading 2` | `text-heading-2` | Pretendard Variable | 400 (Regular) | 20px | 28px |
| `Typography/Heading 3` | `text-heading-3` | Pretendard Variable | 700 (Bold) | 19px | 34px |
| `Typography/Heading 4` | `text-heading-4` | Pretendard Variable | 400 (Regular) | 18px | 44px |
| `Typography/Body Large` | `text-body-large` | Pretendard Variable | 500 (Medium) | 16px | 20px |
| `Typography/Body Base` | `text-body-base` | Pretendard Variable | 500 (Medium) | 15px | 22px |
| `Typography/Body Small` | `text-body-small` | Pretendard Variable | 400 (Regular) | 14px | 20px |
| `Typography/Caption Base` | `text-caption-base` | Pretendard Variable | 400 (Regular) | 13px | 20px |
| `Typography/Caption Small` | `text-caption-small` | Pretendard Variable | 400 (Regular) | 12px | 18px |

`design-tokens.css`의 범용 `--text-sm`/`--text-base`(개별 크기만 필요할 때 쓰는 것)도 각각 13px/20px, 15px/22px로 Figma 실측값에 맞춰 고쳤다 — `Button`/`ServerSecurityCheckModal`이 이미 이 클래스를 쓰고 있어서, 값만 바꿔도 두 컴포넌트가 자동으로 정확해졌다. 이후 두 컴포넌트는 더 명확한 합성 클래스(`text-caption-base`, `text-body-base`, `text-heading-3`)로 마저 교체했다.

`--font-sans`에 `'Pretendard Variable'`을 첫 번째 폰트로 추가 — Tailwind preflight가 `html`에 `font-family: var(--font-sans)`를 기본 적용하므로, 컴포넌트에서 별도 클래스 없이도 전역에 반영된다. (단, Figma 플러그인 실행 환경 자체에는 Pretendard 폰트가 설치되어 있지 않아, Figma 쪽 작업(컴포넌트 인스턴스 생성 등) 시에는 Inter로 대체함 — 코드 프로젝트의 이 설정과는 별개 이슈.)

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

- `src/tokens/design-tokens.css`의 기존 color placeholder(`bg-canvas`/`text-default`/`text-secondary`/`border-subtle`/`border-default`/`border-strong`)는 실제 값으로 대체되었고, 정의 주체가 `colors.tokens.css`로 이전되었다. `design-tokens.css`는 더 이상 color/spacing/radius/shadow를 정의하지 않는다 — 남은 건 범용 text-size/font-weight 유틸리티와 아직 미연동인 breakpoint뿐.
- `Button.tsx`/`ServerSecurityCheckModal.tsx`에서 근사치로 썼던 `rounded-sm`(4px, 실제 2px), `shadow-lg`(실제 값과 다른 임의 그림자), `text-xl font-bold`(19px 근사, 실제로는 `text-heading-3`) 등은 전부 실제 토큰으로 교체 완료. 여전히 근사치로 남은 것: 스텝 배지 지름(46px→44px), 스텝 구분선 폭(90px→88px), 헤더 상단 padding(45px→44px) — 전부 Figma 원본 파일에도 스페이싱 토큰에 바인딩되어 있지 않은(un-tokenized) 값이라 대응하는 토큰 자체가 없음.
