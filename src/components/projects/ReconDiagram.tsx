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
  const hs = { background: dim ? 'rgba(255,255,255,0.15)' : color, border: 'none', width: 6, height: 6 }
  return (
    <div
      title={sub ?? label}
      className="rounded-lg px-3 py-2 text-center min-w-[100px] border transition-all"
      style={{
        background: dim ? 'rgba(20,20,20,0.6)' : '#1e1e1e',
        border: `1.5px solid ${dim ? 'rgba(255,255,255,0.12)' : color}`,
        opacity: dim ? 0.55 : 1,
        boxShadow: dim ? 'none' : `0 0 10px ${color}33`,
        fontFamily: 'Courier New, monospace',
        fontSize: 11,
      }}
    >
      <Handle type="target" position={Position.Left} style={hs} />
      <Handle type="target" position={Position.Top} id="top" style={{ ...hs, opacity: 0 }} />
      <div className="font-semibold leading-tight" style={{ color: dim ? '#555' : color }}>{label}</div>
      {sub && <div style={{ fontSize: 9, color: dim ? '#444' : '#a1a1aa', marginTop: 2 }}>{sub}</div>}
      <Handle type="source" position={Position.Right} style={hs} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ ...hs, opacity: 0 }} />
    </div>
  )
}

const nodeTypes: NodeTypes = { custom: CustomNode }

// Color palette
const ROSE    = '#e11d48'
const EMERALD = '#10b981'
const VIOLET  = '#8b5cf6'
const AMBER   = '#f59e0b'
const SLATE   = '#64748b'

const nodes: Node[] = [
  // Real-time lane (rose → emerald for storage)
  { id: 'switch',      type: 'custom', position: { x: 0,    y: 0   }, data: { label: 'Switch',        sub: 'UPI Events',              color: ROSE    } },
  { id: 'kafka',       type: 'custom', position: { x: 175,  y: 0   }, data: { label: 'Kafka',          sub: '10 partitions RF3',       color: ROSE    } },
  { id: 'consumer',    type: 'custom', position: { x: 355,  y: 0   }, data: { label: 'Java Consumer',  sub: 'Spring Boot',             color: ROSE    } },
  { id: 'yuga_raw',    type: 'custom', position: { x: 545,  y: 0   }, data: { label: 'Yugabyte DB',    sub: 'Raw Switch Data',         color: EMERALD } },

  // Batch lane (violet)
  { id: 'npci',        type: 'custom', position: { x: 0,    y: 170 }, data: { label: 'NPCI',           sub: 'Cycle Files',             color: VIOLET  } },
  { id: 'cbs',         type: 'custom', position: { x: 0,    y: 255 }, data: { label: 'CBS',            sub: 'Cycle Files',             color: VIOLET  } },
  { id: 'sftp',        type: 'custom', position: { x: 175,  y: 210 }, data: { label: 'SFTP Server',    sub: 'File Ingestion',          color: VIOLET  } },
  { id: 'batch_loader',type: 'custom', position: { x: 355,  y: 210 }, data: { label: 'Batch Loader',   sub: 'Java Service',            color: VIOLET  } },

  // Recon core (amber)
  { id: 'redis',       type: 'custom', position: { x: 545,  y: 115 }, data: { label: 'Redis Cluster',  sub: 'Recon Dataset',           color: AMBER   } },
  { id: 'gears',       type: 'custom', position: { x: 730,  y: 115 }, data: { label: 'Redis Gears',    sub: 'Python UDF',              color: AMBER   } },
  { id: 'streams',     type: 'custom', position: { x: 900,  y: 40  }, data: { label: 'Redis Streams',  sub: 'Discrepancies',           color: AMBER   } },

  // Output (emerald)
  { id: 'reporting',   type: 'custom', position: { x: 1080, y: 0   }, data: { label: 'Reporting Svc',  sub: 'Consumer',                color: EMERALD } },
  { id: 'yuga_res',    type: 'custom', position: { x: 1265, y: 0   }, data: { label: 'Yugabyte DB',    sub: 'Recon Results',           color: EMERALD } },

  // Orchestrator (slate, dim)
  { id: 'orch',        type: 'custom', position: { x: 470,  y: 375 }, data: { label: 'Redis Orchestrator', sub: 'Settlement Date · Cycle · Job Status', color: SLATE, dim: true } },
]

const edges: Edge[] = [
  // Real-time lane
  { id: 'e1', source: 'switch',       target: 'kafka',        animated: true, style: { stroke: ROSE,    strokeWidth: 2 } },
  { id: 'e2', source: 'kafka',        target: 'consumer',     animated: true, style: { stroke: ROSE,    strokeWidth: 2 } },
  { id: 'e3', source: 'consumer',     target: 'yuga_raw',                     style: { stroke: EMERALD, strokeWidth: 2 } },
  // Cross-lane: Yugabyte raw → Redis (Switch data loaded into Redis for recon)
  { id: 'e4', source: 'yuga_raw',     target: 'redis',        type: 'smoothstep', style: { stroke: 'rgba(16,185,129,0.4)', strokeWidth: 1.5, strokeDasharray: '5 3' } },

  // Batch lane
  { id: 'e5', source: 'npci',         target: 'sftp',                         style: { stroke: VIOLET,  strokeWidth: 2 } },
  { id: 'e6', source: 'cbs',          target: 'sftp',                         style: { stroke: VIOLET,  strokeWidth: 2 } },
  { id: 'e7', source: 'sftp',         target: 'batch_loader',                 style: { stroke: VIOLET,  strokeWidth: 2 } },
  { id: 'e8', source: 'batch_loader', target: 'redis',        type: 'smoothstep', style: { stroke: VIOLET,  strokeWidth: 2 } },

  // Recon core
  { id: 'e9',  source: 'redis',   target: 'gears',    animated: true, style: { stroke: AMBER,   strokeWidth: 2 } },
  { id: 'e10', source: 'gears',   target: 'streams',  animated: true, style: { stroke: AMBER,   strokeWidth: 2 } },

  // Output
  { id: 'e11', source: 'streams',   target: 'reporting', type: 'smoothstep', style: { stroke: EMERALD, strokeWidth: 2 } },
  { id: 'e12', source: 'reporting', target: 'yuga_res',                       style: { stroke: EMERALD, strokeWidth: 2 } },

  // Orchestrator coordination (dashed, dim slate)
  { id: 'e13', source: 'orch', target: 'consumer',    sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', style: { stroke: 'rgba(100,116,139,0.35)', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e14', source: 'orch', target: 'batch_loader',sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', style: { stroke: 'rgba(100,116,139,0.35)', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e15', source: 'orch', target: 'gears',       sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', style: { stroke: 'rgba(100,116,139,0.35)', strokeWidth: 1.5, strokeDasharray: '5 3' } },
]

export function ReconDiagram() {
  const onInit = useCallback(() => {}, [])
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: 480, background: '#0d0d0d', border: '1px solid rgba(225,29,72,0.2)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={onInit}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag={false}
      >
        <Background color="rgba(225,29,72,0.05)" gap={20} />
        <Controls showInteractive={false} style={{ background: '#1a1a1a', border: '1px solid rgba(225,29,72,0.2)' }} />
      </ReactFlow>
    </div>
  )
}
