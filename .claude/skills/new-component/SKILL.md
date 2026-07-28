---
name: new-component
description: Figma 없이 기존 토큰만으로 새 컴포넌트를 만들거나 변형한다.
---

# /new-component

이 스킬은 `component-builder` 에이전트를 결정적으로 호출하는 라우팅 스킬이다. 자체 구현 로직을 갖지 않는다.

## 실행
1. 사용자 요청을 그대로 `component-builder` 서브에이전트에 전달한다.
2. Figma 링크/노드가 포함된 요청이면 대신 `/figma-to-code`로 안내한다.
