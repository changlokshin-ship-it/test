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

### Git 저장소 초기화 + Chromatic 연동 (7번째 청크)
- 사용자가 `npm install -D chromatic` + `npx chromatic --project-token=...`를 요청. 실행 전 보안 정책(회사 승인 없는 외부 SaaS 데이터 전송 금지)에 걸려 사용자에게 회사 승인 여부를 확인 — "이미 승인됨" 확인받고 진행.
  - 왜 멈췄는지: Chromatic은 빌드된 Storybook(실제 Figma 색상 토큰 포함)을 외부 클라우드에 업로드하는 서드파티 SaaS라 글로벌 보안 정책의 "회사 데이터·토큰을 외부 서비스에 저장 또는 중계" 금지 조항에 정면으로 해당.
- `chromatic` npm 패키지 보안성 검토(MIT 라이선스, chromaui 공식 저장소, 의존성 1개 `semver`) 후 설치.
- 프로젝트 토큰을 커맨드라인 인자 대신 `CHROMATIC_PROJECT_TOKEN` 환경변수로 전달 — 셸 히스토리/프로세스 목록에 토큰이 평문으로 남는 것을 방지.
- Chromatic이 git 저장소를 요구해 최초 1회 `git init` + 첫 커밋 생성 — 이것도 별도로 사용자 승인받고 진행. `.gitignore`가 이미 `node_modules`/`dist` 등을 제외하고 있어 민감 파일 없이 39개 파일 커밋.
- **결과**: Chromatic 빌드 성공 — 컴포넌트 5개, 스토리 5개, 스냅샷 5개 전부 캡처, 첫 빌드로 자동 승인(baseline 없음). Storybook 퍼블리시 URL 확보.
- 빌드 후 남은 `build-storybook.log`는 이미 `.gitignore`(`*storybook.log`)에 걸려 있었고 정리 삭제.

### 첫 실제 컴포넌트 구현 — Button (8번째 청크)
- Figma 노드(`fileKey=TsK9PNhDrcyBIRYiEWs0Pr`, `node-id=70:4864`, "Button" 컴포넌트 세트)를 `get_design_context`로 구현. size(sm/md/lg) × type(primary/secondary/tertiary) × state(default/hover/disabled) 27개 variant 중 11개를 샘플링해 전체 패턴을 파악.
  - 왜 11개만: 섹션 노드 자체는 sparse 메타데이터만 반환해 개별 variant를 직접 조회해야 했음. 사이즈 3종 + primary 3-state + secondary 2-state + tertiary 3-state 조합으로 전체 규칙을 충분히 추론 가능해 27개 전부를 조회하지 않음.
- 커스텀 프로젝트 에이전트(`figma-implementer`)를 Agent 도구로 호출 시도 — "Agent type not found"로 실패. `.claude/agents/*.md`는 세션 재시작 후에야 인식되는 것으로 보임. 대신 동일한 Clarify→Reuse→Implement→Evaluate 절차를 직접 수행.
- `src/components/Button/Button.tsx`, `Button.stories.tsx` 신규 (이 프로젝트의 첫 실제 컴포넌트, `src/components/` 디렉터리도 처음 생성).
- **색상 매핑**: primary→`fill-primary-01`(hover:`fill-primary-02`), secondary→`fill-secondary-01`(hover:`fill-secondary-02`), tertiary→`fill-tertiary-01`+`border-default`(hover:`border-strong`) — 전부 기존 `colors.tokens.css` 토큰과 정확히 일치.
- **disabled 처리가 variant마다 다름을 확인**: primary/secondary는 전체 `opacity-40`, tertiary는 opacity 변화 없이 텍스트 색만 `text-disabled`로 전환(배경/테두리는 default와 동일 유지) — Figma에서 실제로 3개 variant의 disabled를 각각 확인해서 발견, 하나만 보고 일반화하지 않음.
- **Figma "type" prop을 컴포넌트 API에서는 `variant`로 개명**: HTML 네이티브 `<button type="submit|button|reset">`과 이름이 충돌하기 때문. `type`은 네이티브 용도로 그대로 두고 기본값 `'button'`(폼 오작동 제출 방지).
- **hover/disabled는 React state prop이 아니라 실제 CSS `:hover`/`:disabled` 의사 클래스(Tailwind `hover:`/`disabled:`)로 구현** — Figma는 각 상태를 별도 variant로 모델링하지만, 실제 웹에서는 네이티브 `<button disabled>` + 의사 클래스가 올바른 패턴이라 스킬 가이드("타겟 프로젝트 컨벤션에 맞게 각색")에 따라 변환.
- **아이콘은 하드코딩하지 않음**: 27개 variant 전부 데모용으로 동일한 plus/chevron 아이콘을 쓰고 있어, 이건 Button 자체의 고정 아이콘이 아니라 인스턴스별 예시로 판단. `leadingIcon`/`trailingIcon`을 옵셔널 `ReactNode` prop으로 열어두고 실제 아이콘 에셋은 다운로드하지 않음 (에셋 URL은 7일 후 만료되며, Button 자체 속성이 아니므로).

**⚠️ 토큰 불일치 (정확히 매핑되지 않아 근사치 사용, 최종 보고 의무 사항):**
- **radius**: Figma 실제 값은 `radius/2`(2px)인데, 현재 `--radius-sm`은 4px(0.25rem)로 고정되어 있어 2배 차이. 가장 가까운 기존 토�큰(`rounded-sm`)을 임시로 사용. spacing/radius Figma 동기화가 되면 `--radius-xs: 2px` 같은 토큰 추가 검토 필요.
- **font-family**: Figma는 Pretendard인데 현재 `--font-sans`는 Pretendard를 포함하지 않은 시스템 폰트 스택. 타이포그래피 청크에서 처리 예정이라 이번엔 손대지 않음 — 지금은 시스템 폰트로 렌더링됨.
- **text size**: sm/md 버튼의 Figma 값은 13px(Caption Base, lineHeight 20)인데 정확히 일치하는 토큰이 없어 `text-sm`(14px)을 사용 — line-height(20px)는 정확히 일치하지만 font-size는 1px 차이. lg 버튼의 Figma 값은 15px(Body Base, lineHeight 22)인데 `text-base`(16px/24px)로 근사 — font-size 1px, line-height 2px 차이.
- **lg 버튼 padding**: Figma 측정값이 `scale/12`(12px 토큰)인데 실제 렌더링은 13px로 나와 근소한 차이가 있었음. 토큰 이름(scale/12=12px)을 신뢰해 `px-3`(12px)으로 반영. 세로 padding(측정값 11px, 이름 없는 값)은 가장 가까운 `py-3`(12px)으로 근사.
- **primary/secondary border**: lg-primary 샘플 하나에서만 배경색과 동일한 색의 보더가 보였음(시각적으로는 무의미) — md/sm에서는 보더가 없어 일관성 없는 것으로 판단해 구현에서 제외.
- **검증**: `npm run build`(tsc 포함), `npm run build-storybook` 둘 다 통과. `src/`(토큰 파일 제외) raw 값 grep 0건 유지 — hook을 실제로 통과하며 하드코딩 없이 작성됨.

### 두 번째 컴포넌트 — ServerSecurityCheckModal (9번째 청크)
- Figma 노드(`node-id=329:1587`, "Modal/Server Security Check")를 `get_design_context`로 구현. 헤더+닫기버튼, 2단계 스텝 인디케이터, 안내문구 리스트 4개, 카드 추가 placeholder, 푸터(취소/다음)로 구성된 큰 모달.
- **구현 전 사용자에게 분해 방식 확인**: "하나의 페이지 컴포넌트로 Figma 1:1 구현" vs "Modal/StepIndicator/NoticeList로 재사용 가능하게 분해" — 아키텍처가 갈리는 지점이라 추측하지 않고 질문. 사용자가 전자(단일 페이지 컴포넌트)를 선택.
- `src/components/ServerSecurityCheckModal/{ServerSecurityCheckModal.tsx,ServerSecurityCheckModal.stories.tsx,assets/}` 신규.
- **Reuse 원칙 실제 적용**: 푸터의 취소/다음 버튼은 새로 만들지 않고 기존 `Button` 컴포넌트(`variant="secondary"/"primary"`, `size="lg"`)를 그대로 재사용 — 이 프로젝트에서 컴포넌트 재사용이 실제로 일어난 첫 사례.
- **아이콘 5개를 실제로 다운로드해서 커밋**(닫기 아이콘 20x20, 안내 아이콘 13x13, plus 아이콘용 사각형 2개, 스텝 구분선): 원격 asset URL이 7일 후 만료되고, SVG를 직접 그리는 건 스킬 가이드가 금지하기 때문. `src/components/ServerSecurityCheckModal/assets/*.svg`. 닫기 아이콘 fill(`#222222`)과 안내 아이콘 fill(`#E14040`)은 각각 우리 `text-default`/`status-critical` 토큰 값과 정확히 일치함을 확인(다만 SVG에 색이 직접 박혀 있어 토큰이 나중에 바뀌어도 자동으로 안 바뀜 — 알려진 한계).
- **percentage 기반 arbitrary value 회피**: Figma 원본 코드는 plus 아이콘을 `left-[45%]` 같은 임의 퍼센트 inset으로 배치하는데, 이는 hook이 차단하는 arbitrary value 문법이라 그대로 옮길 수 없음. 대신 `relative` 래퍼 + `absolute inset-0 m-auto`로 두 사각형을 중앙 정렬해 퍼센트 값 없이 동일한 시각 결과를 냄.
- Tailwind v4의 동적 숫자 유틸리티(`w-175`=700px, `size-11`, `size-3.5`, `w-22` 등, 전부 `--spacing` 배수로 계산)를 컴파일된 CSS에서 직접 확인 — `calc(var(--spacing) * N)` 형태로 정상 생성됨.

**⚠️ 근사치 사용 (spacing/radius/typography가 아직 Figma 미연동이라 발생, Button 때와 동일한 종류의 문제):**
- 모달 전체 radius/shadow는 `rounded-sm`/`shadow-lg`로 근사 (Figma는 `radius/2`=2px, box-shadow도 공식이 다름).
- 제목(19px/Bold/lineHeight 34) → `text-xl`(20px)+`font-bold`로 근사, line-height는 정확히 안 맞음.
- 스텝 배지 크기(46px) → `size-11`(44px), 스텝 구분선 폭(90px) → `w-22`(88px), 카드 placeholder 내부 padding(290px/33px) → `px-18`(72px)/`py-lg`(24px)로 각각 근사 — 전부 4px 배수로 반올림.
- 헤더 padding(45/40/30px) → `pt-11`(44px)/`pl-10`(40px)/`pb-8`(32px)로 근사.
- **radius/spacing 토큰이 실제 Figma 값으로 갱신되면 Button.tsx와 이 파일의 근사 매핑을 함께 재검토해야 함** (STATUS.md에 기록).
- **검증**: `npm run build`, `npm run build-storybook` 통과. `src/` 전체 raw hex/rgb/px 매치 0건 + Tailwind arbitrary value(`-[...]`) 패턴 매치 0건 확인(hook이 실제로 막는 두 패턴 모두 재점검).

### 코드 → Figma 역방향 생성: ServerSecurityCheckModal (10번째 청크)
- `figma-generate-design`/`figma-use` 스킬로 `src/components/ServerSecurityCheckModal`을 Figma에 실제 컴포넌트 인스턴스 + 변수 바인딩으로 재현. 새 프레임: `Modal/Server Security Check (from code)` (node-id `2019:1675`).
- **조건**: 새 컴포넌트/토큰 생성 금지, 기존 컴포넌트 인스턴스 재사용, 기존 variable collection 바인딩, 코드 레이아웃을 Auto Layout(Hug contents)으로 재현, 컴포넌트가 안 덮는 영역만 새 프레임 — 전부 준수.
- 기존 컴포넌트 재사용: `Button`(size=lg, type=primary/secondary, state=default), `Divider`(type=vertical), `ic/delete`, `ic/noticeIcon`, `ic/plus` — 전부 같은 파일에 이미 있던 것.
- 변수/스타일 바인딩: `Semantics`(bg/canvas, text/default, text/secondary, interactive/primary, bg/subtle, border/subtle 등), `Typography`(size/19, size/18, size/15, size/13, lineHeight/34,22,20), `Spacing`(scale/30, scale/24, scale/5, scale/6, scale/4), `Radius`(radius/2), 이펙트 스타일 `shadow` — 전부 실제 존재하는 항목을 그대로 바인딩.
- **로컬 vs 원격 API 혼동 발견**: `importVariableByKeyAsync`/`importStyleByKeyAsync`는 크로스파일(라이브러리) 전용이라 같은 파일의 로컬 변수/스타일에 쓰면 "not found" 에러. 로컬은 `getVariableByIdAsync`/`getStyleById`/`getNodeByIdAsync`로 직접 참조해야 함 — 컴포넌트/변수/스타일 전부 동일 원칙.
- **Pretendard 폰트가 이 Figma 환경에 설치되어 있지 않음**(`listAvailableFontsAsync`로 실측 확인, 0건). 사용자 승인 받아 Inter로 임시 대체 — 레이아웃/토큰 바인딩은 정확, 폰트만 stand-in. Pretendard 설치 후 텍스트 노드 폰트만 교체하면 됨.
- **폰트 로드 순서 이슈**: 기존 컴포넌트 인스턴스(Button 등)를 auto-layout 부모에 `appendChild`하면 내부 텍스트의 기존 폰트("Pretendard variable")가 로드되어 있어야 한다는 에러 발생. 로드 불가능한 폰트이므로, `appendChild` **전에** 텍스트 노드의 `fontName`을 먼저 Inter로 교체(로드된 폰트로 직접 재할당)한 뒤 append하는 방식으로 해결 — 기존 폰트를 로드할 필요 없이 새 폰트로 직접 교체 가능함을 확인.
- **Button 컴포넌트 인스턴스는 기본으로 leading/trailing 아이콘이 켜져 있음** — 우리 코드가 아이콘 없이 쓰므로 `show leading icon`/`show trailing icon` 컴포넌트 프로퍼티를 `setProperties()`로 꺼서 코드와 일치시킴.
- 헤더 padding(45px/40px)은 Spacing 컬렉션에 정확히 일치하는 값이 없어 원본 Figma 모달과 동일하게 언바운드 고정값 유지. `scale/30`(pb-30)만 정확히 일치해 바인딩.
- **검증**: `get_screenshot`으로 3단계(헤더+스텝, 전체 1차, 아이콘/버튼 수정 후 최종) 확인. `get_metadata`로 구조 검증 — 700x585(Hug), 모든 텍스트/색상/spacing이 실제 변수 참조, 컴포넌트 인스턴스 5종 정상 배치.

### 스페이싱/라디우스/타이포그래피/그림자 토큰 동기화 (11번째 청크)
- 이전 청크에서 `use_figma`로 이미 읽어둔 Figma 로컬 변수 컬렉션 전체(Spacing 18개/Radius 3개/Typography/Semantics)와 이펙트 스타일("shadow")을 실제 토큰 파일로 반영. 새 Figma 링크나 `get_variable_defs` 재호출 없이 진행.
- `src/tokens/spacing.tokens.css` 신규: Figma `scale/N`(=Npx 리터럴 스케일) 18개를 `--spacing-scale-N`으로 정의.
  - **중요한 설계 결정**: Figma 이름을 그대로 `--spacing-N`으로 쓰면 Tailwind v4의 기본 숫자 유틸리티(`p-12`=`12 × --spacing` 배수)와 이름이 겹쳐, 기존 컴포넌트 전역의 숫자 클래스(`px-3`,`gap-md` 등 배후의 `p-N` 계열)가 전부 다른 의미로 바뀌는 대형 회귀가 될 뻔했음. `--spacing-scale-N` 네임스페이스로 분리해 회피 (`p-scale-12` 형태) — Tailwind 기본 숫자 스케일은 완전히 그대로 유지됨.
  - 기존 의미 별칭(`--spacing-xs/sm/md/lg/xl`)을 이 파일로 이전. `xl`이 32px(틀림)이었던 걸 실제 `scale/30`(30px)로 수정 — 나머지 4개(xs/sm/md/lg)는 이미 8/12/16/24px로 실제 값과 정확히 일치했음.
- `src/tokens/radius.tokens.css` 신규: 실제 Radius 스케일 `--radius-1/2/18`(1/2/18px). 이전 placeholder(`--radius-sm`=4px 등, sm/md/lg/full 네이밍 자체가 Figma에 없는 가공의 스케일)는 전부 폐기.
- `src/tokens/effects.tokens.css` 신규: 이펙트 스타일 "shadow"의 실측값(`drop-shadow, blur 30, offset (0,10), rgba(0,0,0,0.25)`)으로 `--shadow` 정의(접미사 없음 — Figma에 sm/md/lg 여러 단계가 아니라 스타일 하나뿐이라 별도 스케일 안 만듦). 이전 `--shadow-sm/md/lg` placeholder 폐기.
- `src/tokens/typography.tokens.css` 신규: Figma 합성 타이포 토큰 10개(Display/Heading1-4/Body Large,Base,Small/Caption Base,Small)를 CSS 변수가 아니라 Tailwind `@utility` 클래스로 변환(family+size+weight+line-height를 한 클래스에 묶음, 예: `text-heading-3`). CSS 주석 안에 `text-*/font-weight-*`처럼 `*/`가 우연히 들어가 주석이 조기 종료되는 버그를 빌드로 발견, 문구 수정으로 해결.
- `design-tokens.css`: color/spacing/radius/shadow 섹션 전부 제거(각 전용 파일로 이전 완료). 남은 범용 `--text-sm`/`--text-base`를 Figma 실측값(13px/20px, 15px/22px)으로 수정 — Button/Modal이 이미 이 클래스를 쓰고 있어 토큰 값만 바꿔도 자동으로 정확해짐. `--font-sans`에 `'Pretendard Variable'`을 우선순위 1번으로 추가(Tailwind preflight가 `html`에 자동 적용).
- **컴포넌트 근사값 재검토·수정**(`Button.tsx`, `ServerSecurityCheckModal.tsx`): `rounded-sm`(가짜 4px)→`rounded-2`(실제 2px), `shadow-lg`(임의값)→`shadow`(실측값), `text-xl font-bold`(19px 근사)→`text-heading-3`(정확), 섹션 제목/안내문구/스텝라벨의 `text-sm`/`text-base`→`text-caption-base`/`text-body-base`(합성 클래스로 명확화), 안내 아이콘 `size-3.5`(14px 근사)→`size-scale-13`(정확 13px), 헤더 `pb-8`(32px 근사)→`pb-scale-30`(정확 30px). 여전히 근사치로 남은 것(스텝 배지 46px→44px, 구분선 90px→88px, 헤더 상단 45px→44px)은 Figma 원본 파일에도 대응 토큰이 없는 un-tokenized 값이라 손대지 않음.
- **사용자가 Pretendard 폰트를 Figma 플러그인 환경에 설치해달라고 요청 → 불가능함을 설명**: `use_figma`(Plugin API)는 이미 설치된 폰트를 로드만 할 뿐 새 폰트를 설치하는 기능이 없음. Figma 데스크톱 앱에서 사용자가 직접 폰트를 추가해야 함.
- **검증**: `npm run build`(CSS 주석 버그 발견 후 재빌드로 통과 확인), `npm run build-storybook` 통과, `src/`(토큰 파일 제외) raw hex/rgb/px grep 0건 재확인.
- `docs/design-tokens.md`에 스페이싱/라디우스/그림자/타이포그래피 매핑 테이블 추가, 진행 상태 표를 전부 "완료"로 갱신.
