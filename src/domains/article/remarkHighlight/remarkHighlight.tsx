/**
 * Plugin by: github.com/mika-f
 */

import { u } from 'unist-builder'
import { visit } from 'unist-util-visit'

import type { Root, Text, Node } from 'mdast'
import type { Plugin, Transformer } from 'unified'
import type { Visitor, VisitorResult } from 'unist-util-visit'

type TextDecorationOptions = {
  marker?: string
  markerWithOptions?: string
  markedAcceptedOptionsPattern?: string
  markerTag?: string
  markerClassNames?:
    | ((options: string) => string | undefined)
    | string
    | undefined
  markerProperties?:
    | ((options: string) => Record<string, string> | undefined)
    | Record<string, string>
    | undefined
}

const DEFAULT_SETTINGS: TextDecorationOptions = {
  marker: '==',
  markerWithOptions: '=',
  markedAcceptedOptionsPattern: '[A-Za-z0-9]+',
  markerClassNames(options) {
    return options ? `text-highlight-${options}` : 'text-highlight'
  },
}

const REGEX_ESCAPE_PATTERN = /[-\/\\^$*+?.()|[\]{}]/g

const escapeEl = (marker: string) =>
  marker.replace(REGEX_ESCAPE_PATTERN, '\\$&')

const remarkHighlight: Plugin<[TextDecorationOptions?], Root> = (options) => {
  const opts = { ...DEFAULT_SETTINGS, ...options }


  const marker = escapeEl(opts.marker)
  const markerWithOptions = escapeEl(opts.markerWithOptions)

  const matcher = new RegExp(
    `(${marker}\s*(.*[^ ])\s*${marker}|${markerWithOptions}(${opts.markedAcceptedOptionsPattern})${markerWithOptions}\s*([^${markerWithOptions}]*[^ ])\s*${marker})`,
    'g',
  )

  const visitor: Visitor<Text> = (node, index, parent): VisitorResult => {
    const { value } = node
    const children: Node[] = []
    const matches = value.matchAll(matcher)

    let cursor = 0

    for (const match of matches) {
      const i = match.index ?? 0
      const len = match[0].length

      if (cursor < i) {
        const text = value.slice(cursor, i)
        const textNode = u('text', text)
        if (typeof index === 'undefined') return
        children.splice(index, 1, textNode)
      }

      const [, , content, args, contentWhenArgsIsPassed] = match
      const tag = opts.markerTag || 'span'
      const classNames =
        typeof opts.markerClassNames === 'function'
          ? opts.markerClassNames(args || '')
          : opts.markerClassNames
      const styleObj =
        typeof opts.markerProperties === 'function'
          ? opts.markerProperties(args || '')
          : opts.markerProperties
      const style = Object.entries(styleObj || {})
        .map(([key, value]) => `${key}:${value}`)
        .join(';')

      const node = {
        type: 'paragraph',
        children: [{ type: 'text', value: content || contentWhenArgsIsPassed }],
        data: {
          hName: tag,
          hProperties: {
            className: classNames,
            style: styleObj ? style : undefined,
          },
        },
      }

      children.push(node)

      cursor += i + len
    }

    if (cursor < value.length) {
      const text = value.slice(cursor)
      const textNode = u('text', text)

      children.push(textNode)
    }

    if (children.length > 0) {
      if (typeof index === 'undefined') return
      parent?.children.splice(index, 1, ...children)
    }
  }

  const transformer: Transformer<Root> = (tree) => {
    visit(tree, 'text', visitor)
  }

  return transformer
}

export default remarkHighlight
