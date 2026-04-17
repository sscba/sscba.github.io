import { useEffect, useState } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Handle,
  Position,
  NodeProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { skillCategories } from '@/data/skills'

const COPPER = '#c2773a'

// ── Layout positions for each skill tier ──────────────────────────────
// Tiers: Client → API → Backend → Messaging → Data → AI/Cloud
const TIER_X: Record<number, number> = {
  0: 60,
  1: 260,
  2: 460,
  3: 660,
  4: 860,
  5: 1060,
}

const TIER_COLORS: Record<number, string> = {
  0: '#60a5fa', // blue  — Backend Dev
  1: '#10b981', // green — Databases
  2: '#c2773a', // copper — Messaging
  3: '#8b5cf6', // purple — Cloud/DevOps
  4: '#d97706', // amber — Languages
  5: '#f472b6', // pink  — AI & Web
}

// ── Custom node component ──────────────────────────────────────────────
function SkillNode({ data }: NodeProps) {
  const { label, color, items } = data as {
    label: string
    color: string
    items: { name: string; icon?: string }[]
  }

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(28,25,23,0.95) 0%, rgba(12,10,9,0.95) 100%)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${color}44`,
        borderTop: `2px solid ${color}88`,
        borderRadius: 14,
        padding: '16px',
        minWidth: 180,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = `0 12px 48px ${color}33, inset 0 1px 0 rgba(255,255,255,0.1)`
        el.style.borderColor = `${color}aa`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`
        el.style.borderColor = `${color}44`
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: color, border: 'none', width: 6, height: 16, borderRadius: 3, marginLeft: -4 }} />
      
      {/* Node Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }} />
        <p style={{ fontSize: '0.65rem', color: '#fafaf9', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
          {label}
        </p>
      </div>

      {/* Skill Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((item) => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: 6 }}>
            {item.icon && (
              <img 
                src={item.icon} 
                alt={item.name} 
                style={{ width: 14, height: 14, objectFit: 'contain' }} 
                onError={(e) => (e.currentTarget.style.display = 'none')} 
              />
            )}
            <span style={{ fontSize: '0.75rem', color: '#a8a29e', fontWeight: 400 }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <Handle type="source" position={Position.Right} style={{ background: color, border: 'none', width: 6, height: 16, borderRadius: 3, marginRight: -4 }} />
    </div>
  )
}

const nodeTypes = { skillNode: SkillNode }

// ── Build nodes from skill categories ─────────────────────────────────
function buildNodes(): Node[] {
  return skillCategories.map((cat, i) => ({
    id: `cat-${i}`,
    type: 'skillNode',
    position: {
      x: TIER_X[i] ?? i * 200,
      y: 80 + (i % 2) * 120, // slight vertical stagger per tier
    },
    data: {
      label: cat.title,
      color: TIER_COLORS[i] ?? COPPER,
      items: cat.items,
    },
    draggable: true,
  }))
}

// ── Build edges connecting adjacent tiers ─────────────────────────────
function buildEdges(): Edge[] {
  const edges: Edge[] = []
  for (let i = 0; i < skillCategories.length - 1; i++) {
    edges.push({
      id: `e-${i}-${i + 1}`,
      source: `cat-${i}`,
      target: `cat-${i + 1}`,
      animated: true,
      style: {
        stroke: TIER_COLORS[i] ?? COPPER,
        strokeWidth: 1.5,
        strokeDasharray: '4 4',
        opacity: 0.55,
      },
    })
  }
  // Extra cross-edges for a more connected look
  if (skillCategories.length > 3) {
    edges.push({
      id: 'e-cross-0-2',
      source: 'cat-0',
      target: 'cat-2',
      animated: true,
      style: { stroke: '#78716c', strokeWidth: 1, opacity: 0.3 },
    })
    edges.push({
      id: 'e-cross-1-3',
      source: 'cat-1',
      target: 'cat-3',
      animated: true,
      style: { stroke: '#78716c', strokeWidth: 1, opacity: 0.3 },
    })
  }
  return edges
}

const INITIAL_NODES = buildNodes()
const INITIAL_EDGES = buildEdges()

export function MicroservicesGraph() {
  const [nodes, , onNodesChange] = useNodesState(INITIAL_NODES)
  const [edges, , onEdgesChange] = useEdgesState(INITIAL_EDGES)
  const [visibleCount, setVisibleCount] = useState(0)

  // Stagger node appearance
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= INITIAL_NODES.length) clearInterval(interval)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const visibleNodes = nodes.slice(0, visibleCount)

  return (
    <div
      style={{
        height: '65vh',
        minHeight: 500,
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(194,119,58,0.15)',
        background: 'radial-gradient(circle at center, rgba(194,119,58,0.03) 0%, rgba(12,10,9,0.4) 100%)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <ReactFlow
        nodes={visibleNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable
        panOnDrag
        zoomOnScroll={false}
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={0.8} color="rgba(194,119,58,0.1)" />
      </ReactFlow>
    </div>
  )
}
