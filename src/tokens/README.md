# Design Tokens

이 디렉터리는 프로젝트의 유일한 시각 값 출처(SSOT)다. 모든 컴포넌트는 여기 정의된 토큰만 참조한다.

## 규칙

1. **토큰만 참조한다.** color/spacing/radius/typography/shadow/breakpoint 등 모든 시각 값은 이 디렉터리에 정의된 토큰(Tailwind 유틸리티 클래스로 노출됨)을 통해서만 쓴다.
2. **raw 값 금지.** 컴포넌트 코드에 hex(`#RRGGBB`), `rgb()`/`rgba()`/`hsl()`, raw px/rem 수치, Tailwind arbitrary value(`w-[13px]`, `text-[#111]` 등)를 직접 쓰지 않는다. 이 규칙은 `.claude/hooks/check-hardcode.mjs`가 도구 레벨에서 자동으로 강제한다.
3. **Primitive → Semantic 2계층 구조.**
   - Primitive(원시값)는 스케일 기반 이름을 쓴다 — 예: `--color-blue-700`, `--color-neutral-500`.
   - Semantic(용도)는 반드시 의미 기반 이름을 쓰고, Primitive를 참조(`var(...)`)한다 — 예: `--color-text-primary: var(--color-blue-700);`.
   - 컴포넌트는 **Semantic 토큰만** 참조한다. Primitive를 컴포넌트에서 직접 쓰지 않는다.
   - 값 자체를 이름에 넣는 것(`--color-hex-aa3bff`)은 Primitive/Semantic 어느 쪽이든 금지.
4. **새 토큰이 필요하면 여기에 추가한다.** 컴포넌트에서 값을 직접 정의하지 않는다. 필요한 토큰이 없으면 토큰을 먼저 추가한 뒤 컴포넌트에서 참조한다.
5. **Figma 동기화는 `token-guardian` 에이전트가 담당한다.** Figma 디자인 변수가 바뀌면 이 파일들을 갱신하는 주체는 사람이 아니라 `token-guardian`이다.

## 파일 구성

- `design-tokens.css` — 범용 typography 유틸리티(text-size/font-weight 스케일)와 breakpoint만 남은 잔여 토큰. color/spacing/radius/shadow는 여기서 정의하지 않는다(각각 아래 파일로 이전됨). breakpoint는 아직 Figma 미연동 중립 placeholder.
- `colors.tokens.css` — Figma 색상 변수 동기화 결과 (Primitive → Semantic).
- `spacing.tokens.css` — Figma Spacing 컬렉션 동기화 결과. Tailwind 기본 숫자 스케일과의 충돌을 피하기 위해 `--spacing-scale-N` 네임스페이스를 씀 (`p-scale-12` 형태).
- `radius.tokens.css` — Figma Radius 컬렉션 동기화 결과 (`--radius-1/2/18`).
- `effects.tokens.css` — Figma 이펙트 스타일("shadow") 동기화 결과.
- `typography.tokens.css` — Figma 합성 타이포그래피 토큰을 Tailwind `@utility` 클래스로 변환한 것 (예: `text-heading-3`). CSS 변수가 아니라 클래스이므로 `@theme`가 아니라 `@utility`로 정의됨.
- 위 5개 파일의 Figma 원본 매핑 근거는 전부 `../../docs/design-tokens.md` 참고.
- `*.tokens.css` — 카테고리별로 분리가 필요해지면 이 명명 규칙으로 파일을 나눈다.

## 하드코딩 차단 예외

`.claude/hooks/check-hardcode.mjs`는 아래 두 경우만 예외로 허용한다:

1. **토큰 파일 자체** — `design-tokens.css`, `*.tokens.css` (raw 값을 정의하는 것이 이 파일들의 존재 목적).
2. **명시적 예외 주석** — 불가피하게 raw 값이 필요하면 해당 줄 끝에 사유를 남긴다.
   - JS/TS/JSX/TSX: `// token-exempt: <사유>`
   - CSS: `/* token-exempt: <사유> */`

예외 주석 없이 raw 값을 쓰면 Edit/Write/MultiEdit 자체가 exit 2로 차단된다.
