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
- [ ] 청크 7 (블로킹): 스페이싱 → `src/tokens/spacing.tokens.css` — Figma `node-id=0:1`(페이지 루트)로 `get_variable_defs` 시도했으나 "선택된 레이어 없음" 오류로 실패. **사용자가 스페이싱 변수가 있는 구체적 프레임의 node-id를 다시 줘야 진행 가능.**
- [ ] 청크 8 (예정): 타이포그래피(Text Styles, `get_design_context` 필요) → Tailwind `@utility` 클래스
- [ ] 청크 9 (예정): 라디우스/그림자 등 기타 변수 (색상 응답에 `radius/*` 일부 이미 포함돼 있었음 — 재확인 필요)
- [ ] 청크 10 (예정): 실제 Figma 프레임으로 `figma-implementer` end-to-end 컴포넌트 구현 테스트

## 다음 세션 시작 시 참고
- `CLAUDE.md` 최상단의 목적/DoD, 4원칙, 강제계약, 토큰규칙은 확정본. 이후 작업이 이 기준에 부합하는지 항상 대조할 것.
- `CLAUDE.md` line 47 부근 "(에이전트 정의 / hook 설정 / 토큰 스키마는 다음 청크에서 작성)" 안내 줄은 청크 4에서 전부 완료됐음에도 **의도적으로 미수정 상태로 남겨둠** (해당 청크 지시가 "라우팅 표의 빈 자리만 채워"로 범위를 한정했기 때문). 다음에 CLAUDE.md를 다시 편집할 기회가 있으면 이 줄 정리 필요.
- DoD-1은 실제로 `grep`으로 `src/`(토큰 파일 제외) 검사해 0건 확인함 — 초안이 아니라 실사 검증됨.
- hook은 diff 기반(새로 추가/변경된 줄만 스캔)으로 설계 — 파일 전체를 재스캔하지 않는다는 점을 잊지 말 것.
- 에이전트 4개는 정의만 완료된 상태 — 실제 Figma 프레임/컴포넌트 요청으로 아직 실전 테스트하지 않음.
- **색상은 실제 Figma 값으로 동기화 완료** (`src/tokens/colors.tokens.css`). `design-tokens.css`는 이제 spacing/radius/typography/shadow/breakpoint만 담당하며 이 카테고리들은 여전히 중립 placeholder.
- Figma 파일 접근 시 첫 번째로 준 링크(`Ugj4ksEhbVHGAJNlaZkNUq`)는 편집 권한이 없어 실패했고, 사용자가 사본 링크(`TsK9PNhDrcyBIRYiEWs0Pr`, 동일 node-id)를 다시 줘서 성공했음.
- `get_variable_defs` 응답(`node-id=146:10144`)에 이미 타이포(`size/*`,`family/*`,`lineHeight/*`,`weight/*`,`Typography/*`)와 `scale/*`(스페이싱 추정), `radius/*` 변수가 포함되어 있었음 — **다음 청크에서는 새 node-id를 받기보다 먼저 `nodeId=146:10144`로 재조회가 되는지부터 시도해볼 것** (`node-id=0:1`은 실패했음 — "선택된 레이어 없음" 오류. `get_variable_defs`는 Figma 데스크톱 앱에서 실제로 선택 가능한/구체적인 노드가 필요해 보임. 문서/캔버스 루트(`0:1`) 같은 추상 노드는 안 됨).
- 토큰 시각화 스토리(`src/tokens/*.stories.tsx`)는 하드코딩 없이 Tailwind 유틸리티 클래스 문자열만으로 작성됨 — Tailwind는 소스 텍스트를 정적 스캔하므로 클래스명을 반드시 리터럴 문자열로 어딘가에 존재시켜야 하고(`${}` 템플릿 보간으로 동적 생성 금지), 이 제약을 지키기 위해 배열에 완전한 클래스명(`'bg-blue-700'` 등)을 직접 저장하는 패턴을 씀 — 이후 토큰 카테고리(spacing/radius/typography) 추가 시 같은 파일들(Spacing/Radius/Typography.stories.tsx)을 확장하게 되면 이 패턴을 유지할 것.
