import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  useReactFlow,
  type Node,
  type Edge,
  type NodeTypes,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CustomNodeData {
  label: string
  sub?: string
  color?: string
  [key: string]: unknown
}

function CustomNode({ data }: { data: CustomNodeData }) {
  const { label, sub, color = '#8b5cf6' } = data
  return (
    <div
      className="rounded-lg px-3 py-2 text-center min-w-[85px]"
      style={{
        background: '#1e1e1e',
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 12px ${color}44`,
        color: '#f5f5f5',
        fontFamily: 'Courier New, monospace',
        fontSize: 11,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: color, border: 'none' }} />
      <div className="font-semibold leading-tight">{label}</div>
      {sub && <div style={{ fontSize: 9, color: '#a1a1aa', marginTop: 2 }}>{sub}</div>}
      <Handle type="source" position={Position.Right} style={{ background: color, border: 'none' }} />
    </div>
  )
}

const nodeTypes: NodeTypes = { custom: CustomNode }

const nodes: Node[] = [
  { id: 'nl', type: 'custom', position: { x: 0, y: 60 }, data: { label: 'NL Query', sub: 'Analyst Input', color: '#e11d48' } },
  { id: 'lc', type: 'custom', position: { x: 150, y: 60 }, data: { label: 'Langchain', sub: 'Agent + Memory', color: '#8b5cf6' } },
  { id: 'llama', type: 'custom', position: { x: 300, y: 60 }, data: { label: 'Llama3 8B', sub: 'Local LLM', color: '#8b5cf6' } },
  { id: 'sql', type: 'custom', position: { x: 450, y: 60 }, data: { label: 'SQL Gen', sub: 'AST Validated', color: '#f59e0b' } },
  { id: 'duck', type: 'custom', position: { x: 600, y: 60 }, data: { label: 'DuckDB', sub: 'Sub-second', color: '#10b981' } },
  { id: 'ui', type: 'custom', position: { x: 600, y: 160 }, data: { label: 'Streamlit', sub: 'Charts + RCA', color: '#10b981' } },
]

const edges: Edge[] = [
  { id: 'e1', source: 'nl', target: 'lc', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
  { id: 'e2', source: 'lc', target: 'llama', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
  { id: 'e3', source: 'llama', target: 'sql', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e4', source: 'sql', target: 'duck', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'e5', source: 'duck', target: 'ui', style: { stroke: '#10b981', strokeWidth: 2 } },
]

function PanButtons() {
  const { getViewport, setViewport } = useReactFlow()
  const btn = {
    background: '#1a1a1a',
    border: '1px solid rgba(139,92,246,0.35)',
    color: '#8b5cf6',
    borderRadius: 6,
    padding: '4px 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  } as const
  const pan = (dx: number) => {
    const { x, y, zoom } = getViewport()
    setViewport({ x: x + dx, y, zoom }, { duration: 300 })
  }
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <button onClick={() => pan(300)}  style={btn} title="Pan left"><ChevronLeft  size={14} /></button>
      <button onClick={() => pan(-300)} style={btn} title="Pan right"><ChevronRight size={14} /></button>
    </div>
  )
}

export function IntelliQueryDiagram() {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: 280, background: '#0d0d0d', border: '1px solid rgba(139,92,246,0.2)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
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
        <Background color="rgba(139,92,246,0.04)" gap={20} />
        <Controls showInteractive={false} style={{ background: '#1a1a1a', border: '1px solid rgba(139,92,246,0.2)' }} />
        <Panel position="bottom-right"><PanButtons /></Panel>
      </ReactFlow>
    </div>
  )
}
