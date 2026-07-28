---
name: sync-tokens
description: 하드코딩 감지, 토큰 매핑, Figma 변수 → 토큰(src/tokens) 동기화.
---

# /sync-tokens

이 스킬은 `token-guardian` 에이전트를 결정적으로 호출하는 라우팅 스킬이다. 자체 구현 로직을 갖지 않는다.

## 실행
1. 사용자 요청을 그대로 `token-guardian` 서브에이전트에 전달한다.
