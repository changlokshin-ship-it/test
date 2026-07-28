---
name: review-design
description: 완료 전 최종 검증 게이트(하드코딩/토큰 사용/범위 일치/빌드/a11y/스크린샷). PASS/FAIL만 반환하며 코드를 수정하지 않는다.
---

# /review-design

이 스킬은 `design-reviewer` 에이전트를 결정적으로 호출하는 라우팅 스킬이다. 자체 구현 로직을 갖지 않는다.

## 실행
1. 사용자 요청(리뷰 대상 범위)을 그대로 `design-reviewer` 서브에이전트에 전달한다.
2. FAIL이면, 원인에 따라 어느 에이전트(figma-implementer/token-guardian/component-builder)로 돌려보내야 하는지 함께 안내한다.
