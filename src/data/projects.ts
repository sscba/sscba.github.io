export interface ProjectStat {
  value: string
  label: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  stats: ProjectStat[]
  tags: string[]
  accentColor: string
}

export const projects: Project[] = [
  {
    id: 'recon',
    title: 'Recon Engine',
    subtitle: 'Enterprise Payment Reconciliation Platform',
    description:
      'High-throughput payment reconciliation system built at MindGate Solutions. Processes real-time UPI events through Kafka streams and reconciles against batch NPCI/CBS files via Redis Gears — achieving microsecond-precision matching at scale.',
    stats: [
      { value: '70M+', label: 'Daily Transactions' },
      { value: '95%', label: 'Latency Reduction' },
      { value: '75%', label: 'Execution Improvement' },
      { value: '<1ms', label: 'Match Precision' },
    ],
    tags: ['Spring Boot', 'Apache Kafka', 'Redis Cluster', 'YugabyteDB', 'Microservices', 'Distributed Systems'],
    accentColor: '#c2773a',
  },
  {
    id: 'hyperstream',
    title: 'HyperStream Analytics POC',
    subtitle: 'Cost-Optimized Transaction Processing',
    description:
      'Proof-of-concept that replaced a 40-node Spark cluster with a single-node DuckDB vectorized engine for UPI transaction analytics. Demonstrated an 18x throughput increase and 70% infrastructure cost reduction.',
    stats: [
      { value: '18x', label: 'Performance Boost' },
      { value: '70%', label: 'Cost Reduction' },
      { value: '15min', label: 'vs 4hr Processing' },
      { value: '70M+', label: 'UPI Transactions' },
    ],
    tags: ['DuckDB', 'Apache Spark', 'Apache Kafka', 'Vectorized Processing', 'Single-Node Architecture', 'Python'],
    accentColor: '#d97706',
  },
  {
    id: 'intelliquery',
    title: 'IntelliQuery Dashboard',
    subtitle: 'AI-Powered Analytics Platform',
    description:
      'Natural language analytics interface with an automated RCA agent. Locally-hosted Llama3 8B converts analyst questions into validated DuckDB SQL, returning charts and root-cause insights in seconds instead of hours.',
    stats: [
      { value: 'NL→SQL', label: 'Query Interface' },
      { value: '2-3min', label: 'vs 1hr Analysis' },
      { value: 'Auto', label: 'RCA Agent' },
      { value: 'Local', label: 'LLM (No API cost)' },
    ],
    tags: ['Llama3 LLM', 'DuckDB', 'Streamlit', 'Langchain', 'NLP', 'AI/ML'],
    accentColor: '#8b5cf6',
  },
]
