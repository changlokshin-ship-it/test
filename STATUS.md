# STATUS

마지막 갱신: 2026-07-28

## 프로젝트
Figma 디자인 시스템 → 코드 변환 하네스 (Vite 6 + React 19 + TypeScript 5 + Tailwind v4 + Storybook 8)

## 진행 상태
- [x] 프로젝트 스캐폴딩 (Vite/React/TS/Tailwind/Storybook) — `npm run dev`, `npm run storybook`, `npm run build` 모두 검증 완료
- [x] 청크 1: `CLAUDE.md` 목적 3가지 + 측정 가능한 완료 기준(DoD-1~3) 확정
- [x] 청크 2: `CLAUDE.md`에 4원칙(문제+강제 방식) + 표준 워크플로(Clarify→Reuse→Implement→Evaluate, 원칙 1:1 대응) 추가
- [x] 청크 3: `CLAUDE.md`에 강제 계약(3중 레이어: 선언/절차/자동차단) + 토큰 규칙 + 에이전트 라우팅 표·스킬 가이드 표(placeholder) 추가
- [x] 청크 4: 범위 4축 실제 파일 구현 완료
  - 토큰 SSOT: `src/tokens/design-tokens.css`, `src/tokens/README.md`
  - 스캐폴드: `App.tsx`(토큰 기반) / `index.css`(최소화) / `vite-env.d.ts` / `preview.ts`(index.css import) — 데모 보일러플레이트 전량 제거
  - hook: `.claude/hooks/check-hardcode.mjs` + `.claude/settings.json` (diff 기반 스캔, 7~8개 케이스 검증 통과)
  - 에이전트 4개(`figma-implementer`/`token-guardian`/`component-builder`/`design-reviewer`) + 스킬 4개(`/figma-to-code`/`/new-component`/`/sync-tokens`/`/review-design`) 작성
  - `CLAUDE.md` 라우팅 표·스킬 표의 가칭 placeholder를 실제 이름으로 교체 완료
- [x] 청크 5: Figma 색상 변수 실제 동기화
  - Figma `fileKey=TsK9PNhDrcyBIRYiEWs0Pr`, `node-id=146:10144`에서 `get_variable_defs`로 색상 47개 추출 → `src/tokens/colors.tokens.css` (Primitive→Semantic)
  - `design-tokens.css`의 placeholder color 블록 제거 (정의 주체를 colors.tokens.css로 이전), `index.css`에 import 추가
  - `docs/design-tokens.md` 신규 (매핑 테이블 + 진행 상태), `src/tokens/README.md` 규칙 3 수정
  - 사용자가 스코프를 색상만으로 명시 제한 — 같은 응답에 포함된 타이포/scale/radius 변수는 의도적으로 미반영
- [x] 청크 6: 토큰 시각화 Storybook 스토리 5개 (`src/tokens/{Colors,Spacing,Typography,Elevation,Radius}.stories.tsx` + 공용 `TokenPreview.tsx`), `npm run build`/`npm run build-storybook` 통과, 컴파일된 CSS로 유틸리티 실제 생성 확인
- [x] 청크 7: git 저장소 초기화(최초 커밋) + Chromatic 연동 — 회사 승인 확인 후 진행, 토큰은 CLI 인자 대신 `CHROMATIC_PROJECT_TOKEN` 환경변수로 전달, 빌드 성공(컴포넌트 5/스토리 5/스냅샷 5, 첫 빌드 자동 승인)
- [x] 청크 8: 첫 실제 컴포넌트 `src/components/Button/{Button.tsx,Button.stories.tsx}` 구현 (Figma node-id `70:4864`, size×variant×state 27개 중 11개 샘플링). `npm run build`/`npm run build-storybook` 통과, hook 실통과. spacing/radius/typography가 아직 Figma 미연동이라 근사 매핑 다수 발생 — 상세는 CHANGELOG 참고.
- [x] 청크 9: 두 번째 컴포넌트 `src/components/ServerSecurityCheckModal/` 구현 (Figma node-id `329:1587`). 구현 전 "단일 페이지 컴포넌트 vs 재사용 가능한 프리미티브 분해" 질문 → 사용자가 단일 페이지 컴포넌트 선택. 푸터 버튼은 기존 `Button` 컴포넌트 재사용(이 프로젝트 첫 Reuse 사례). 아이콘 5개(닫기/안내/plus×2/구분선) 실제 다운로드해서 `assets/`에 커밋. `npm run build`/`build-storybook` 통과, hex/rgb/px 0건 + arbitrary value(`-[...]`) 0건 재확인.
- [x] 청크 10: `ServerSecurityCheckModal` 코드를 `figma-generate-design`/`figma-use`로 Figma에 역방향 생성 (node-id `2019:1675`, 새 파일 없이 기존 파일에 새 프레임으로 추가). 기존 컴포넌트(Button/Divider/ic-delete/ic-noticeIcon/ic-plus) 인스턴스 재사용, 기존 변수 컬렉션(Primitives/Spacing/Radius/Typography/Semantics) + 이펙트 스타일 바인딩, Auto Layout Hug contents. 새 컴포넌트/토큰 생성 없음.
- [x] 청크 11: 스페이싱/라디우스/타이포그래피/그림자 전부 동기화 완료 — 새 Figma 링크 없이 청크 10에서 `use_figma`로 이미 읽어둔 전체 변수 컬렉션 재사용.
  - `src/tokens/spacing.tokens.css`(`--spacing-scale-N`, Tailwind 기본 숫자 스케일과 충돌 방지), `radius.tokens.css`(`--radius-1/2/18`), `effects.tokens.css`(`--shadow`), `typography.tokens.css`(`@utility` 10개, `text-heading-3` 등)
  - `design-tokens.css`: color/spacing/radius/shadow 섹션 완전 제거, `--text-sm`/`--text-base`를 실측값(13/15px)으로 수정, `--font-sans`에 Pretendard 추가
  - `Button.tsx`/`ServerSecurityCheckModal.tsx` 근사값 재검토·수정 완료(`rounded-sm`→`rounded-2`, `shadow-lg`→`shadow`, `text-xl font-bold`→`text-heading-3` 등)
  - `npm run build`/`build-storybook` 통과, DoD-1 재확인, `docs/design-tokens.md` 전체 갱신(진행상태 전부 완료로 변경)
- [ ] 청크 12 (예정): 브레이크포인트 — 유일하게 아직 Figma 미연동인 카테고리 (`design-tokens.css`의 `--breakpoint-*`는 여전히 중립 placeholder). Figma 파일에 브레이크포인트 변수가 있는지 확인 필요.
- [ ] 청크 13 (예정): 여전히 근사치로 남은 세부값 재검토 — 스텝 배지 지름(46px→44px), 구분선 폭(90px→88px), 헤더 상단 padding(45px→44px). Figma 원본에도 대응 토큰이 없는 un-tokenized 값이라 지금은 정확한 매칭이 불가능 — 디자이너가 이 값들에 토큰을 새로 만들지 않는 이상 해결 안 됨(우리가 임의로 새 토큰을 만들면 안 됨 — CLAUDE.md Simplicity First 위반).

## 다음 세션 시작 시 참고
- `CLAUDE.md` 최상단의 목적/DoD, 4원칙, 강제계약, 토큰규칙은 확정본. 이후 작업이 이 기준에 부합하는지 항상 대조할 것.
- `CLAUDE.md` line 47 부근 "(에이전트 정의 / hook 설정 / 토큰 스키마는 다음 청크에서 작성)" 안내 줄은 청크 4에서 전부 완료됐음에도 **의도적으로 미수정 상태로 남겨둠** (해당 청크 지시가 "라우팅 표의 빈 자리만 채워"로 범위를 한정했기 때문). 다음에 CLAUDE.md를 다시 편집할 기회가 있으면 이 줄 정리 필요.
- DoD-1은 실제로 `grep`으로 `src/`(토큰 파일 제외) 검사해 0건 확인함 — 초안이 아니라 실사 검증됨.
- hook은 diff 기반(새로 추가/변경된 줄만 스캔)으로 설계 — 파일 전체를 재스캔하지 않는다는 점을 잊지 말 것.
- 에이전트 4개는 정의만 완료된 상태 — 실제 Figma 프레임/컴포넌트 요청으로 아직 실전 테스트하지 않음.
- **color/spacing/radius/shadow/typography 전부 실제 Figma 값으로 동기화 완료** (`src/tokens/{colors,spacing,radius,effects,typography}.tokens.css`). `design-tokens.css`에 남은 건 범용 text-size/font-weight 유틸리티(일부는 실측값 반영됨)와 **breakpoint만 유일하게 아직 중립 placeholder** (Figma에 브레이크포인트 변수가 있는지 미확인).
- Figma 파일 접근 시 첫 번째로 준 링크(`Ugj4ksEhbVHGAJNlaZkNUq`)는 편집 권한이 없어 실패했고, 사용자가 사본 링크(`TsK9PNhDrcyBIRYiEWs0Pr`, 동일 node-id)를 다시 줘서 성공했음.
- `get_variable_defs`는 노드 기반이라 "선택된 레이어 없음" 오류로 스페이싱류 조회가 한동안 막혔었음 (`node-id=0:1` 같은 추상 노드는 안 됨) — **결국 `use_figma`(`figma.variables.getLocalVariableCollectionsAsync()`)로 우회 성공, 청크 11에서 해결 완료.** 앞으로 비슷하게 특정 노드를 못 찾아 변수 조회가 막히면 `get_variable_defs` 대신 `use_figma`로 파일 전체 컬렉션을 직접 순회하는 방법을 먼저 시도할 것.
- 토큰 시각화 스토리(`src/tokens/*.stories.tsx`)는 하드코딩 없이 Tailwind 유틸리티 클래스 문자열만으로 작성됨 — Tailwind는 소스 텍스트를 정적 스캔하므로 클래스명을 반드시 리터럴 문자열로 어딘가에 존재시켜야 하고(`${}` 템플릿 보간으로 동적 생성 금지), 이 제약을 지키기 위해 배열에 완전한 클래스명(`'bg-blue-700'` 등)을 직접 저장하는 패턴을 씀 — 이후 토큰 카테고리(spacing/radius/typography) 추가 시 같은 파일들(Spacing/Radius/Typography.stories.tsx)을 확장하게 되면 이 패턴을 유지할 것.
- **이 프로젝트는 이제 git 저장소다** (청크 7에서 `git init` + 최초 커밋). 최초 커밋은 Chromatic 요구사항 때문에 사용자 승인 받고 예외적으로 진행한 것 — 이후 커밋은 다시 기본 원칙(사용자가 명시적으로 요청할 때만 커밋)을 따를 것.
- Chromatic: `CHROMATIC_PROJECT_TOKEN` 환경변수 사용 필요(레포에 저장하지 않음, `.env` 파일도 없음 — 매번 사용자가 값을 제공해야 함). 프로젝트 대시보드: `https://www.chromatic.com/setup?appId=6a6836d2a5a2fa5e61da0647`.
- **커스텀 프로젝트 에이전트(`.claude/agents/*.md`)는 Agent 도구에서 이번 세션 내내 인식되지 않았음** ("Agent type 'figma-implementer' not found") — 세션 재시작 후에 등록되는 것으로 추정. 다음 새 세션에서는 먼저 `Agent({subagent_type: 'figma-implementer', ...})`가 되는지 확인해볼 것. 그 전까지는 메인 스레드가 같은 절차(Clarify→Reuse→Implement→Evaluate)를 직접 수행해서 대체함.
- `src/components/Button/Button.tsx`: Figma의 "type"(primary/secondary/tertiary) prop은 네이티브 `<button type>`과 충돌해 `variant`로 개명함 — 앞으로 다른 컴포넌트도 이 컨벤션(variant=디자인 종류, type=네이티브 용도)을 따를 것. hover/disabled는 React state prop이 아니라 Tailwind `hover:`/`disabled:` 의사 클래스로 구현(네이티브 `<button disabled>` 활용) — Figma의 "state" variant를 그대로 prop화하지 않는 게 이 프로젝트의 패턴.
- tertiary variant의 disabled는 primary/secondary와 다르게 opacity 변화가 없고 텍스트 색만 바뀜 — variant마다 disabled 처리가 다를 수 있으니 다음 컴포넌트 구현 시에도 상태별로 전부 실제 확인하고 하나만 보고 일반화하지 말 것.
- **컴포넌트 분해 단위(단일 페이지 vs 재사용 프리미티브)는 매번 모호할 수 있는 지점** — Figma 노드가 여러 하위 패턴(스텝 인디케이터, 안내 리스트 등)을 담고 있는 큰 컴포넌트/모달일 때는 구현 전에 항상 사용자에게 분해 방식을 확인할 것 (Button처럼 표준 atomic 컴포넌트면 물어볼 필요 없었음).
- **Figma의 percentage 기반 절대 위치(`left-[45%]` 등)는 그대로 옮기면 hook의 arbitrary-value 차단에 걸림** — `relative` 래퍼 + `absolute inset-0 m-auto` 패턴으로 퍼센트 없이 중앙 정렬하는 방법을 씀. 아이콘을 여러 개의 절대위치 도형으로 조합하는 패턴이 또 나오면 이 방법을 재사용할 것.
- **아이콘/이미지 에셋은 상황에 따라 처리가 다름**: Button처럼 아이콘이 인스턴스마다 바뀌는 optional prop이면 다운로드하지 않고 caller가 주입(ReactNode)하게 둠. Modal의 닫기/안내 아이콘처럼 컴포넌트 자체에 고정으로 필요하면 실제 SVG를 다운로드해서 컴포넌트 폴더 내 `assets/`에 커밋 (원격 URL은 7일 후 만료). SVG에 색이 하드코딩되어 있으면(`fill="#222222"` 등) 토큰과 값이 일치하는지 확인은 하되, 토큰이 바뀌어도 자동 반영 안 되는 한계가 있음을 인지할 것.
- Tailwind v4 동적 숫자 유틸리티는 정수뿐 아니라 `.5` 소수(`size-3.5` 등)도 `calc(var(--spacing) * 3.5)`로 정상 생성됨을 컴파일된 CSS로 직접 확인함 (추측이 아니라 실측).
- **`get_variable_defs`가 노드 문제로 막히면 `use_figma`(`getLocalVariableCollectionsAsync`)로 우회 가능함을 확인, 청크 11에서 실제로 이 방법으로 spacing/radius/typography/shadow 동기화 전부 완료.** 실제 값은 이제 `src/tokens/{spacing,radius,effects,typography}.tokens.css`와 `docs/design-tokens.md`가 SSOT — STATUS.md에 중복 기록하지 않음.
- Figma에는 `Typography/Caption Base`,`Typography/Body Base` 외에 Heading 1-4/Body Large,Small/Caption Small/Display까지 총 10개 합성 타이포 스타일이 존재 (전부 `typography.tokens.css`에 반영 완료). `Typography/Heading 3`는 실제 텍스트 노드가 이 이름있는 스타일 대신 개별 변수(size/19)만 바인딩해서 썼음 — Figma 파일 내에서도 named style과 개별 변수 바인딩이 혼용되고 있다는 뜻이니, 앞으로 새 컴포넌트를 읽을 때 텍스트가 named style을 쓰는지 개별 변수인지 둘 다 확인할 것.
- **Figma 플러그인 환경에 Pretendard 폰트가 설치되어 있지 않음** (`listAvailableFontsAsync()`로 실측, 0건 매치) — Figma 쪽에서 컴포넌트 인스턴스/텍스트를 다룰 때는 Inter로 대체해야 함. 사용자가 "설치해달라"고 요청했으나 `use_figma`/MCP 도구에는 폰트 설치 기능 자체가 없어 불가능하다고 안내함 — Figma 데스크톱 앱에서 사용자가 직접 설치해야 하는 영역. 코드 프로젝트의 `--font-sans`(Pretendard Variable 반영)와는 별개 문제.
