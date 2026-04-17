export interface TechItem {
  name: string
  icon: string
}

export interface SkillCategory {
  title: string
  icon: string
  items: TechItem[]
}

const devicon = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`

export const skillCategories: SkillCategory[] = [
  {
    title: 'Backend Development',
    icon: 'server',
    items: [
      { name: 'Java', icon: devicon('java') },
      { name: 'Spring Boot', icon: devicon('spring') },
      { name: 'Spring MVC', icon: devicon('spring') },
      { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Microservices', icon: devicon('docker') },
    ],
  },
  {
    title: 'Databases',
    icon: 'database',
    items: [
      { name: 'Redis', icon: devicon('redis') },
      { name: 'YugabyteDB', icon: 'https://www.yugabyte.com/images/ybsymbol_original.svg' },
      { name: 'DuckDB', icon: 'https://duckdb.org/images/DuckDB_Logo.png' },
      { name: 'MongoDB', icon: devicon('mongodb') },
      { name: 'MySQL', icon: devicon('mysql') },
    ],
  },
  {
    title: 'Message Processing',
    icon: 'stream',
    items: [
      { name: 'Apache Kafka', icon: devicon('apachekafka') },
      { name: 'Redis Streams', icon: devicon('redis') },
      { name: 'Apache Spark', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    items: [
      { name: 'Docker', icon: devicon('docker') },
      { name: 'Kubernetes', icon: devicon('kubernetes') },
      { name: 'Linux', icon: devicon('linux') },
      { name: 'Git', icon: devicon('git') },
      { name: 'Maven', icon: devicon('maven') },
    ],
  },
  {
    title: 'Languages',
    icon: 'code',
    items: [
      { name: 'Java', icon: devicon('java') },
      { name: 'Python', icon: devicon('python') },
      { name: 'JavaScript', icon: devicon('javascript') },
      { name: 'TypeScript', icon: devicon('typescript') },
      { name: 'C++', icon: devicon('cplusplus') },
    ],
  },
  {
    title: 'AI & Web',
    icon: 'robot',
    items: [
      { name: 'React', icon: devicon('react') },
      { name: 'Node.js', icon: devicon('nodejs') },
      { name: 'Streamlit', icon: 'https://streamlit.io/images/brand/streamlit-mark-color.svg' },
      { name: 'Llama3', icon: 'https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.svg' },
      { name: 'Langchain', icon: 'https://python.langchain.com/img/brand/wordmark.png' },
    ],
  },
]
