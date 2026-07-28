---
name: figma-to-code
description: Figma 링크/노드를 코드로 구현한다. Figma URL이나 node-id가 있고 "이 디자인대로 구현해줘"라고 할 때 사용.
---

# /figma-to-code

이 스킬은 `figma-implementer` 에이전트를 결정적으로 호출하는 라우팅 스킬이다. 자체 구현 로직을 갖지 않는다.

## 실행
1. 사용자 요청(Figma 링크/노드 ID 포함)을 그대로 `figma-implementer` 서브에이전트에 전달한다.
2. Figma 참조가 없는 요청이면 대신 `/new-component`로 안내한다.
