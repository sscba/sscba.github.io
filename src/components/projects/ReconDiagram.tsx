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
  [key: string]: unknown
}

function CustomNode({ data }: { data: CustomNodeData }) {
  const { label, sub, color = '#e11d48', dim = false } = data
  return (
    <div
      title={sub ?? label}
      className="rounded-lg px-3 py-2 text-center min-w-[90px] border transition-all"
      style={{
        background: dim ? '#1a1a1a' : '#1e1e1e',
        border: `1.5px solid ${dim ? 'rgba(255,255,255,0.1)' : color}`,
        opacity: dim ? 0.45 : 1,
        boxShadow: dim ? 'none' : `0 0 12px ${color}44`,
        color: dim ? '#555' : '#f5f5f5',
        fontFamily: 'Courier New, monospace',
        fontSize: 11,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: color, border: 'none' }} />
      <div className="font-semibold leading-tight">{label}</div>
      {sub && <div style={{ fontSize: 9, color: dim ? '#555' : '#a1a1aa', marginTop: 2 }}>{sub}</div>}
      <Handle type="source" position={Position.Right} style={{ background: color, border: 'none' }} />
    </div>
  )
}

const nodeTypes: NodeTypes = { custom: CustomNode }

const nodes: Node[] = [
  // Real-time lane
  { id: 'switch', type: 'custom', position: { x: 0, y: 40 }, data: { label: 'Switch', sub: 'UPI Events', color: '#e11d48' } },
  { id: 'kafka', type: 'custom', position: { x: 160, y: 40 }, data: { label: 'Kafka', sub: '6 partitions, RF3', color: '#e11d48' } },
  { id: 'consumer', type: 'custom', position: { x: 320, y: 40 }, data: { label: 'Java Consumer', sub: 'Spring Boot', color: '#e11d48' } },
  { id: 'yugabyte', type: 'custom', position: { x: 500, y: 40 }, data: { label: 'YugabyteDB', sub: 'Distributed SQL', color: '#10b981' } },

  // Batch lane
  { id: 'npci', type: 'custom', position: { x: 0, y: 160 }, data: { label: 'NPCI/CBS', sub: 'Batch Files', color: '#8b5cf6' } },
  { id: 'sftp', type: 'custom', position: { x: 160, y: 160 }, data: { label: 'SFTP', sub: 'File Ingestion', color: '#8b5cf6' } },
  { id: 'redis', type: 'custom', position: { x: 320, y: 160 }, data: { label: 'Redis', sub: '2ms p99', color: '#8b5cf6' } },
  { id: 'gears', type: 'custom', position: { x: 420, y: 240 }, data: { label: 'Redis Gears', sub: 'Python UDF', color: '#f59e0b' } },
  { id: 'streams', type: 'custom', position: { x: 540, y: 160 }, data: { label: 'Redis Streams', sub: 'Discrepancies', color: '#8b5cf6' } },
  { id: 'reporting', type: 'custom', position: { x: 680, y: 100 }, data: { label: 'Reporting', sub: 'Service', color: '#10b981' } },
]

const edges: Edge[] = [
  // Real-time
  { id: 'e1', source: 'switch', target: 'kafka', animated: true, style: { stroke: '#e11d48', strokeWidth: 2 } },
  { id: 'e2', source: 'kafka', target: 'consumer', animated: true, style: { stroke: '#e11d48', strokeWidth: 2 } },
  { id: 'e3', source: 'consumer', target: 'yugabyte', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
  // Batch
  { id: 'e4', source: 'npci', target: 'sftp', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
  { id: 'e5', source: 'sftp', target: 'redis', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
  { id: 'e6', source: 'redis', target: 'gears', style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e7', source: 'gears', target: 'streams', style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e8', source: 'streams', target: 'reporting', style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'e9', source: 'yugabyte', target: 'reporting', style: { stroke: '#10b981', strokeWidth: 2 }, type: 'step' },
]

export function ReconDiagram() {
  const onInit = useCallback(() => {}, [])
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: 340, background: '#0d0d0d', border: '1px solid rgba(225,29,72,0.2)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={onInit}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag={false}
      >
        <Background color="rgba(225,29,72,0.06)" gap={20} />
        <Controls showInteractive={false} style={{ background: '#1a1a1a', border: '1px solid rgba(225,29,72,0.2)' }} />
      </ReactFlow>
    </div>
  )
}
