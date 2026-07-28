#!/usr/bin/env node
// PreToolUse hook: blocks Edit/Write/MultiEdit calls that introduce raw
// visual values instead of design tokens. Zero external dependencies.
//
// Only newly added/changed lines are scanned (Edit/MultiEdit: new_string
// minus old_string; Write: new content minus the file's current content
// on disk). Pre-existing lines in a file are never re-flagged just
// because the file was touched.

import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'

function readStdin() {
  try {
    return readFileSync(0, 'utf8')
  } catch {
    return ''
  }
}

function linesOf(str) {
  return str.split(/\r?\n/)
}

function addedLines(oldStr, newStr) {
  const oldSet = new Set(linesOf(oldStr))
  return linesOf(newStr).filter((line) => !oldSet.has(line))
}

const SCAN_EXTS = new Set(['.tsx', '.jsx', '.ts', '.js', '.css'])

const EXEMPT_COMMENT = /token-exempt:\s*\S/
const HEX_COLOR = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/
const COLOR_FN = /\b(?:rgb|rgba|hsl|hsla)\s*\(/i
const RAW_PX = /(?<![\w.#-])\d+(?:\.\d+)?px\b/
const TAILWIND_ARBITRARY = /\b[a-zA-Z][a-zA-Z0-9-]*-\[[^\]\s]+\]/

function isOffendingLine(line) {
  if (EXEMPT_COMMENT.test(line)) return false
  return (
    HEX_COLOR.test(line) ||
    COLOR_FN.test(line) ||
    RAW_PX.test(line) ||
    TAILWIND_ARBITRARY.test(line)
  )
}

function main() {
  let payload
  try {
    payload = JSON.parse(readStdin())
  } catch {
    process.exit(0)
  }

  const toolName = payload.tool_name
  if (!['Edit', 'Write', 'MultiEdit'].includes(toolName)) process.exit(0)

  const input = payload.tool_input || {}
  const filePath = input.file_path
  if (!filePath) process.exit(0)

  const ext = path.extname(filePath)
  if (!SCAN_EXTS.has(ext)) process.exit(0)

  const base = path.basename(filePath)
  if (base === 'design-tokens.css' || base.endsWith('.tokens.css')) process.exit(0)

  let segments = []
  if (toolName === 'Write') {
    const before = existsSync(filePath) ? readFileSync(filePath, 'utf8') : ''
    segments = addedLines(before, input.content || '')
  } else if (toolName === 'Edit') {
    segments = addedLines(input.old_string || '', input.new_string || '')
  } else if (toolName === 'MultiEdit') {
    for (const edit of input.edits || []) {
      segments.push(...addedLines(edit.old_string || '', edit.new_string || ''))
    }
  }

  const offenders = segments.map((l) => l.trim()).filter(isOffendingLine)

  if (offenders.length > 0) {
    const message = [
      `[check-hardcode] 하드코딩된 시각 값이 감지되어 차단되었습니다: ${filePath}`,
      ...offenders.slice(0, 5).map((l) => `  - ${l}`),
      '',
      '해결 방법:',
      '  1) src/tokens/design-tokens.css 의 토큰(Tailwind 유틸리티 클래스)으로 교체하세요.',
      '  2) 불가피한 예외라면 해당 줄 끝에 `// token-exempt: <사유>` (CSS는 `/* token-exempt: <사유> */`) 주석을 추가하세요.',
    ].join('\n')
    console.error(message)
    process.exit(2)
  }

  process.exit(0)
}

main()
