import React, { useEffect, useState, useMemo } from 'react'
import { useCanvasStore } from '../store'
import styles from './styles.module.css';
import { ArrowProps, RFlowState, Node } from '../types';

export default function Arrow({ node, nextNodeId }: ArrowProps) {
  const nodes = useCanvasStore((state: RFlowState) => state.nodes)

  const [nextNode, setNextNode] = useState<Node | null>(null)

  useEffect(() => {
    setNextNode(nodes.find((n: Node) => n.id === nextNodeId) || null)
  }, [nodes, nextNodeId])

  const getDPath = useMemo(() => {
    const n1 = node
    let n2 = nextNode

    if(!n1 || !n1.w || !n1.h || !n2 || !n2.w || !n2.h) return '';

    let d1 = `${n1.x + n1.w} ${n1.y + n1.h / 2}`
    let d2 = `${n1.x + (n2.x + n2.w - n1.x) / 2} ${n1.y + n1.h / 2}`
    let d3 = `${n1.x + (n2.x + n2.w - n1.x) / 2} ${n2.y + n2.h / 2}`
    let d4 = `${n2.x} ${n2.y + n2.h / 2}`

    if (n2.x <= n1.x) {
      d1 = `${n1.x} ${n1.y + n1.h / 2}`
      d4 = `${n2.x + n2.w} ${n2.y + n2.h / 2}`
    } else {
      d1 = `${n1.x + n1.w} ${n1.y + n1.h / 2}`
      d4 = `${n2.x} ${n2.y + n2.h / 2}`
    }

    if (n1.y + n1.h < n2.y && n2.x < n1.x + n1.w && n2.x + n2.w > n1.x) {
      d1 = `${n1.x + n1.w / 2} ${n1.y + n1.h}`
      d2 = `${n1.x + n1.w / 2} ${n1.y + (n2.y + n2.h - n1.y) / 2}`
      d3 = `${n2.x + n2.w / 2} ${n1.y + (n2.y + n2.h - n1.y) / 2}`
      d4 = `${n2.x + n2.w / 2} ${n2.y}`
      return `M ${d1} L ${d2} L ${d3} L ${d4}`
    }
    if (n1.y + n1.h > n2.y && n2.x < n1.x + n1.w && n2.x + n2.w > n1.x) {
      d1 = `${n1.x + n1.w / 2} ${n1.y}`
      d2 = `${n1.x + n1.w / 2} ${n1.y + (n2.y + n2.h - n1.y) / 2}`
      d3 = `${n2.x + n2.w / 2} ${n1.y + (n2.y + n2.h - n1.y) / 2}`
      d4 = `${n2.x + n2.w / 2} ${n2.y + n2.h + 6}`
      return `M ${d1} L ${d2} L ${d3} L ${d4}`
    }
    // n2 top right
    if (n2.y + n2.h <= n1.y) {
      d2 = `${n2.x + n2.w / 2} ${n1.y + n1.h / 2}`
      d3 = `${n2.x + n2.w / 2} ${n2.y + n2.h}`
      return `M ${d1} L ${d2} L ${d3}`
    }
    // n2 bottom right
    if (n2.y >= n1.y + n1.h) {
      d2 = `${n2.x + n2.w / 2} ${n1.y + n1.h / 2}`
      d3 = `${n2.x + n2.w / 2} ${n2.y}`
      return `M ${d1} L ${d2} L ${d3}`
    }

    return `M ${d1} L ${d2} L ${d3} L ${d4}`
  }, [node, nextNode])

  const getTransform = useMemo(() => {
    const n1 = node
    let n2 = nextNode

    if(!n1 || !n1.w || !n1.h || !n2 || !n2.w || !n2.h) return ''

    if (
      (n1.y + n1.h > n2.y && n2.x < n1.x + n1.w && n2.x + n2.w > n1.x) ||
      n2.y + n2.h <= n1.y
    ) {
      return `translate(${n2.x + n2.w / 2 - 6},${n2.y + n2.h + 12}) rotate(-90)`
    }
    if (
      (n1.y + n1.h < n2.y && n2.x < n1.x + n1.w && n2.x + n2.w > n1.x) ||
      n2.y >= n1.y + n1.h
    ) {
      return `translate(${n2.x + n2.w / 2 + 6},${n2.y - 12}) rotate(90)`
    }
    if (n2.x >= n1.x) return `translate(${n2.x - 12},${n2.y + n2.h / 2 - 6})`
    if (n2.x < n1.x) {
      return `translate(${n2.x + n2.w + 12},${n2.y + n2.h / 2 + 6}) rotate(180)`
    }
  }, [node, nextNode])

  return nextNode ? (
    <svg className={styles.line}>
      <path
        d={getDPath}
        style={{ pointerEvents: 'visibleStroke' }}
        fill='none'
        stroke={node?.arrowColor || '#000'}
        strokeWidth='2'
      />
      <g
        style={{ pointerEvents: 'visibleFill' }}
        transform={getTransform}
      >
        <path d='M 0 0 L 12 6 L 0 12 L 3 6 z' fill={node?.arrowColor || '#000'} />
      </g>
    </svg>
  ) : null
}
