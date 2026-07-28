# Changelog

## 2026-07-28

### 프로젝트 초기화 (Vite 6 + React 19 + TypeScript 5)
- `create-vite`로 스캐폴딩 후 버전을 vite ^6.4.3 / react ^19.2.8 / typescript ^5.9.3으로 고정.
  - 왜: 요청된 스택 버전(Vite 6, React 19, TS5)을 명시적으로 맞추기 위해. `create-vite@latest`는 Vite 8 / TS 6 기준 템플릿을 생성하므로 수동 고정 필요.
- 템플릿 기본 lint 도구(oxlint)는 제거.
  - 왜: 요청 범위에 없던 의존성이라 최소 구성 원칙에 따라 제외.

### Tailwind CSS v4 적용
- `tailwindcss@4.3.3`, `@tailwindcss/vite@4.3.3` 설치, `vite.config.ts`에 `tailwindcss()` 플러그인 등록, `src/index.css`에 `@import "tailwindcss";` 추가.
  - 왜: Tailwind v4부터는 PostCSS 설정 대신 전용 Vite 플러그인 방식이 공식 권장 경로.

### Storybook 8 초기화
- `storybook@8.6.14 init`으로 `.storybook/main.ts`, `preview.ts`, 예제 stories 생성 (react-vite 빌더).
- `@storybook/addon-onboarding`은 제거 (온보딩 전용, 상시 필요 없음).
- `@storybook/addon-designs@8.2.1` 추가.
  - 왜: 최신(11.x)은 Storybook 9/10 전용 peer dependency라 Storybook 8 + React 19 조합에서 호환되는 마지막 버전(8.2.1)으로 고정.
- `.storybook/main.ts`에 `docs.autodocs: "tag"`, `.storybook/preview.ts`에 전역 `tags: ['autodocs']` 설정.
  - 왜: 모든 스토리에 자동으로 문서 페이지가 생성되도록 요청 조건(autodocs) 충족.

### 보안 검토 메모
- 설치 전 각 패키지(vite, react, typescript, tailwindcss, storybook 계열)의 라이선스/메인테이너/CVE를 확인 후 사용자 승인 받고 진행 (회사 보안 정책 준수).
- `esbuild@0.25.12`, `fsevents@2.3.3`의 postinstall 스크립트는 사용자 승인 후 `npm approve-scripts`로 허용.
- `npm audit` 결과 high/moderate 취약점 9건 발견(전부 Storybook 8.x 생태계 devDependency 전이 의존성, 빌드 도구 체인에 한정). `--force` 업그레이드 시 Storybook 9/10으로 강제 이동되어 요청 버전과 상충하므로, 사용자 승인 하에 Storybook 8 유지.

### 디자인 시스템 하네스 — 목적/완료기준 확정 (1번째 청크)
- `CLAUDE.md` 신규 생성. 목적 3가지(일관성 보장/하드코딩 자동 차단/구현 프로세스 표준화)와 측정 가능한 완료 기준(DoD-1~3)만 작성.
  - 왜: 4원칙/에이전트/hook/토큰을 먼저 설계하면 "무엇이 성공인지" 기준 없이 구현이 앞서가는 것을 방지하기 위해, 측정 기준부터 못 박기로 함.
- 4원칙/에이전트 정의/hook 설정/토큰 스키마는 의도적으로 비워둠 — 다음 청크에서 채울 예정.

### 디자인 시스템 하네스 — 4원칙 + 표준 워크플로 추가 (2번째 청크)
- `CLAUDE.md`에 4원칙(Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution) 추가. 각 원칙을 슬로건이 아닌 "막는 문제 + 강제 방식" 쌍으로 서술.
  - 왜: 원칙이 구호로만 남으면 실제 판단 기준이 안 되므로, 무엇을 막는지와 어떻게 강제하는지를 명시해 검증 가능하게 함.
- 표준 워크플로 Clarify→Reuse→Implement→Evaluate를 원칙 1~4와 1:1 대응하도록 명시.
  - 왜: 청크 1의 DoD-3("모든 컴포넌트 작업이 동일한 4단계 절차를 거침")을 실제로 검증하려면 절차 자체가 먼저 정의돼 있어야 하기 때문.
- 목적/완료 기준 섹션(청크 1)은 수정하지 않고 유지. 플레이스홀더 안내 줄에서 "4원칙" 항목만 제거.

### 디자인 시스템 하네스 — 강제 계약 + 토큰 규칙 + 라우팅 표 (3번째 청크)
- `CLAUDE.md`에 "강제 계약(Enforcement Contract)" 섹션 추가: 레이어1 선언(CLAUDE.md) / 레이어2 절차(에이전트의 Clarify→Reuse→Implement→Evaluate 수행) / 레이어3 자동 차단(hook)으로 3중 강제 구조 명시.
  - 왜: 4원칙이 "문서 권고"에 머물지 않고 실제로 지켜지도록, 선언만으로 끝나지 않는다는 것과 최종 방어선(레이어3)이 어디인지를 계약 형태로 못 박기 위해.
- 토큰 규칙 섹션 추가: 모든 시각 값은 `src/tokens` 토큰만 참조, raw hex/px/rgb/arbitrary Tailwind 금지.
  - 왜: DoD-1과 레이어3(hook)이 실제로 무엇을 판정 기준으로 삼을지 구체적 규칙이 필요했기 때문.
- 에이전트 라우팅 표(작업→에이전트), 스킬 가이드 표(에이전트=역할/스킬=절차) 추가 — 이름은 전부 가칭 placeholder, 다음 청크에서 실제 정의.
  - 왜: 다음 청크에서 만들 에이전트/스킬 4개가 들어갈 자리를 미리 잡아 청크 간 연속성을 확보하기 위해.
- 기존 내용(목적/완료기준/4원칙/표준워크플로/기존 플레이스홀더 줄)은 지시대로 전혀 수정하지 않고 파일 맨 아래에만 추가.

### 디자인 시스템 하네스 — 범위 4축 실제 구현 (4번째 청크)
- **정리**: `.oxlintrc.json`(제거된 oxlint 잔여 설정), `src/stories/*`(Storybook 예제 스토리 8개+이미지), `src/App.css`, `src/assets/{react.svg,vite.svg,hero.png}`, `public/icons.svg` 삭제.
  - 왜: create-vite/storybook init이 생성한 데모 콘텐츠는 raw hex/px가 다수라 하드코딩 차단 hook 도입 전에 제거하지 않으면 즉시 충돌.
- **토큰 SSOT**: `src/tokens/design-tokens.css`(Tailwind v4 `@theme`, color/spacing/radius/typography/shadow/breakpoint 중립 기본값), `src/tokens/README.md`(의미 기반 네이밍 규칙, raw 금지, `token-exempt` 예외 사용법) 신규 작성.
  - 왜: 축1(에이전트)·축3(hook)이 참조할 단일 기준점이 먼저 있어야 나머지 축이 성립하기 때문.
- **축2 스캐폴드**: `src/App.tsx`를 토큰 기반 최소 shell로 재작성, `src/index.css`를 `@import "tailwindcss"` + `@import "./tokens/design-tokens.css"`만 남기도록 축소, `src/vite-env.d.ts` 신규, `.storybook/preview.ts`에 `import '../src/index.css'` 추가.
  - 왜: 데모 콘텐츠를 걷어내면서 토큰 클래스(`bg-bg-canvas` 등)가 실제로 Tailwind에 의해 컴파일되는지 빌드로 확인.
- **축3 hook**: `.claude/hooks/check-hardcode.mjs`(Node 내장 모듈만 사용) + `.claude/settings.json`(`PreToolUse`, matcher `Edit|Write|MultiEdit`) 작성.
  - 설계 결정: 파일 전체가 아니라 **새로 추가/변경된 줄만** 스캔(diff 기반). Edit/MultiEdit은 `new_string`-`old_string`, Write는 디스크의 기존 내용과의 차이만 검사.
  - 왜: 스캐폴드에 이미 존재하는 raw px(미디어쿼리 등)까지 전부 걸리면 파일을 조금만 고쳐도 항상 차단되어 편집 자체가 불가능해지므로.
  - 검증: 하드코딩(hex/rgb/px/arbitrary) 입력 → exit 2, 토큰 클래스 입력 → exit 0, `design-tokens.css`/`*.tokens.css` 면제 → exit 0, `token-exempt` 주석 → exit 0, 기존 파일의 미변경 raw 값은 diff에서 제외되어 재차단되지 않음 — 총 7~8개 케이스 전부 기대대로 동작 확인.
- **축1 에이전트/스킬**: `.claude/agents/{figma-implementer,token-guardian,component-builder,design-reviewer}.md` 4개, `.claude/skills/{figma-to-code,new-component,sync-tokens,review-design}/SKILL.md` 4개 작성. 각 에이전트가 Clarify→Reuse→Implement→Evaluate를 내부적으로 전부 수행하도록 명시, figma-implementer/token-guardian은 Figma MCP(get_metadata/get_screenshot/get_design_context/get_variable_defs)를 중간 레이어 없이 직접 호출.
  - 왜: "1 에이전트 = 1 워크플로 단계"가 아니라 "1 에이전트 = 1 작업 유형, 각자 4단계 수행"이 실제 설계이므로 (이전 청크의 가정 수정).
- **CLAUDE.md**: 에이전트 라우팅 표·스킬 가이드 표의 가칭 placeholder를 실제 에이전트/스킬 이름으로 교체. 목적/완료기준/4원칙/강제계약/토큰규칙 본문과 line 47의 플레이스홀더 안내 줄은 지시대로 미수정 (현재는 다소 stale하지만 이번 청크 범위 밖).
- **최종 검증**: `npm run build`, `npm run build-storybook` 통과. `grep`으로 `src/` 전체(토큰 파일 제외) raw hex/rgb/px 매치 0건 확인(DoD-1 실사 통과).

### Figma 색상 토큰 실제 동기화 (5번째 청크)
- Figma 파일(`[NHN] 실습 디자인시스템 (Copy)`, fileKey `TsK9PNhDrcyBIRYiEWs0Pr`, node-id `146:10144`)에서 `get_variable_defs`로 변수 전체(색상+타이포+scale+radius)를 조회. 이번 청크는 사용자가 명시한 대로 **색상만** 반영.
  - 왜: 사용자가 "색상부터 가이드 링크 나눠서 전달, 컬러 먼저 완료 후 다음 링크"라고 명시적으로 스코프를 제한했기 때문. 스페이싱/타이포/radius/shadow는 응답에 포함돼 있었지만 의도적으로 보류.
- `src/tokens/colors.tokens.css` 신규 생성: Primitive(`--color-{blue,neutral,red,green,purple}-{100~900}`, `--color-static-{white,black}`) → Semantic(`--color-{fill,text,bg,border,icon,interactive,status}-*`, 전부 `var(--color-primitive)`로 참조) 2계층 구조. Figma 변수명의 `/`는 CSS 토큰명의 `-`로 변환.
- `src/tokens/design-tokens.css`에서 placeholder color 블록(`bg`/`text`/`border`) 제거 — color 정의 주체를 `colors.tokens.css`로 완전히 이전(중복/충돌 방지). spacing/radius/typography/shadow/breakpoint 섹션은 미수정.
- `src/index.css`에 `@import "./tokens/colors.tokens.css";` 추가.
- `src/tokens/README.md` 갱신: 규칙 3("의미 기반 네이밍")을 Primitive(스케일 기반 이름 허용)/Semantic(의미 기반 이름 필수, Primitive 참조) 2계층 기준으로 수정 — 기존 문구가 `--color-purple-500` 같은 실제 Primitive 네이밍과 모순됐기 때문. 파일 구성 섹션에 `colors.tokens.css` 반영.
- `docs/design-tokens.md` 신규 생성: Figma 변수 → CSS 토큰 → 값(Semantic은 참조 Primitive 포함) 매핑 테이블, 진행 상태(색상 완료/나머지 대기) 명시.
- **검증**: hook이 `colors.tokens.css`(`*.tokens.css` 패턴)를 정상 면제(exit 0) 확인. `src/`(토큰 파일 제외) raw 값 grep 0건 유지. `npm run build` 통과, 컴파일된 CSS에서 `--color-bg-canvas`→`--color-static-white`→실제 Figma 값(`#fff`)까지 참조 체인이 그대로 살아있음을 직접 확인 (placeholder 값 `#18181b` 등은 완전히 대체됨).

### Figma 스페이싱 조회 시도 실패 + 토큰 시각화 Storybook 스토리 (6번째 청크)
- 사용자가 새 Figma 링크(같은 파일, node-id `0:1`)를 제공, `get_variable_defs(fileKey=TsK9PNhDrcyBIRYiEWs0Pr, nodeId=0:1)` 호출 → `"You currently have nothing selected. You need to select a layer first"` 오류로 실패.
  - 왜 기록: `0:1`은 파일의 루트/첫 페이지 노드라 이 MCP 도구가 요구하는 "선택된 레이어"가 아닌 것으로 보임. 스페이싱 추출은 보류 상태 — 특정 프레임의 node-id가 필요.
- `src/tokens/TokenPreview.tsx` 신규: `useCssVarValue`(런타임에 `getComputedStyle`로 실제 CSS 변수 값을 읽는 훅), `TokenGrid`/`TokenLabel`(그리드 스와치 공용 레이아웃). 5개 스토리가 공유.
  - 왜: 토큰 값을 문자열로 중복 하드코딩하면 나중에 토큰이 바뀔 때 스토리 문서가 stale해지므로, 항상 실제 CSS 변수를 읽어 표시.
- `src/tokens/{Colors,Spacing,Typography,Elevation,Radius}.stories.tsx` 5개 신규 — 전부 Tailwind 유틸리티 클래스(`bg-blue-700`, `w-xs`, `rounded-full`, `shadow-md`, `text-2xl`, `font-semibold` 등)만 사용해 시각화, raw hex/px/rgb 없음.
  - Colors: Primitive(정적/blue/neutral/red/green/purple) + Semantic(fill/text/bg/border/icon/interactive/status) 스와치 그리드
  - Spacing: `--spacing-{xs,sm,md,lg,xl}` 너비 막대
  - Typography: `--text-{xs..2xl}` 크기 샘플 + `--font-weight-{normal..bold}` 굵기 샘플
  - Elevation: `--shadow-{sm,md,lg}` 그림자 박스
  - Radius: `--radius-{sm,md,lg,full}` 라운드 박스
- **검증**: 6개 파일 전부 실제 Write 도구 호출로 생성(hook 차단 없이 통과 — 실제 하드코딩 없음을 재확인). `npm run build`(tsc 타입체크 포함) 통과. `npm run build-storybook` 통과, 5개 스토리 청크 전부 정상 번들. 컴파일된 Storybook CSS에서 `bg-blue-700`/`w-xs`/`rounded-full`/`shadow-md`/`text-2xl`/`font-semibold`/`bg-status-critical-surface` 유틸리티가 전부 올바른 토큰 변수를 참조하도록 생성됐음을 직접 확인.
