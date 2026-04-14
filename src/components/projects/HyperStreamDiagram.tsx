import { useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeTypes,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

interface CustomNodeData {
  label: string
  sub?: string
  color?: string
  dim?: boolean
  badge?: string
  [key: string]: unknown
}

function CustomNode({ data }: { data: CustomNodeData }) {
  const { label, sub, color = '#10b981', dim = false, badge } = data
  return (
    <div
      className="rounded-lg px-3 py-2 text-center min-w-[90px] relative"
      style={{
        background: dim ? '#111' : '#1e1e1e',
        border: `1.5px solid ${dim ? 'rgba(255,255,255,0.08)' : color}`,
        opacity: dim ? 0.35 : 1,
        boxShadow: dim ? 'none' : `0 0 12px ${color}44`,
        color: dim ? '#444' : '#f5f5f5',
        fontFamily: 'Courier New, monospace',
        fontSize: 11,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: color, border: 'none' }} />
      <div className="font-semibold leading-tight">{label}</div>
      {sub && <div style={{ fontSize: 9, color: dim ? '#444' : '#a1a1aa', marginTop: 2 }}>{sub}</div>}
      {badge && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-nowrap px-2 py-0.5 rounded-full text-white"
          style={{ fontSize: 9, background: color, fontFamily: 'Courier New', whiteSpace: 'nowrap' }}
        >
          {badge}
        </div>
      )}
      <Handle type="source" position={Position.Right} style={{ background: color, border: 'none' }} />
    </div>
  )
}

const nodeTypes: NodeTypes = { custom: CustomNode }

const nodes: Node[] = [
  { id: 'upi', type: 'custom', position: { x: 0, y: 80 }, data: { label: 'UPI Feed', sub: '70M+ daily', color: '#e11d48' } },
  { id: 'kafka', type: 'custom', position: { x: 160, y: 80 }, data: { label: 'Kafka', sub: 'Fan-out', color: '#f59e0b' } },
  // Legacy
  { id: 'spark', type: 'custom', position: { x: 340, y: 20 }, data: { label: 'Spark Cluster', sub: '40 nodes / 4hrs', dim: true, color: '#666' } },
  // New
  { id: 'duckdb', type: 'custom', position: { x: 340, y: 140 }, data: { label: 'DuckDB', sub: 'Vectorized / 15min', color: '#10b981', badge: '18x faster · 70% cheaper' } },
  { id: 'output', type: 'custom', position: { x: 520, y: 80 }, data: { label: 'Analytics', sub: 'Reports + Dashboards', color: '#10b981' } },
]

const edges: Edge[] = [
  { id: 'e1', source: 'upi', target: 'kafka', animated: true, style: { stroke: '#e11d48', strokeWidth: 2 } },
  { id: 'e2', source: 'kafka', target: 'spark', style: { stroke: '#555', strokeWidth: 1.5, strokeDasharray: '4 3' } },
  { id: 'e3', source: 'kafka', target: 'duckdb', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'e4', source: 'duckdb', target: 'output', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
]

export function HyperStreamDiagram() {
  const onInit = useCallback(() => {}, [])
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: 260, background: '#0d0d0d', border: '1px solid rgba(16,185,129,0.2)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={onInit}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag={false}
      >
        <Background color="rgba(16,185,129,0.04)" gap={20} />
        <Controls showInteractive={false} style={{ background: '#1a1a1a', border: '1px solid rgba(16,185,129,0.2)' }} />
      </ReactFlow>
    </div>
  )
}
