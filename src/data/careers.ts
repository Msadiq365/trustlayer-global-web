export interface JobOpening {
  id: string
  title: string
  department: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  description: string
  requirements: string[]
  posted: string
}

export const jobOpenings: JobOpening[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for a Senior Full Stack Developer to join our engineering team and help build the next generation of digital solutions.',
    requirements: [
      '5+ years of experience with React/Next.js',
      'Experience with Python FastAPI or similar',
      'Knowledge of cloud platforms (AWS, Azure, or GCP)',
      'Experience with PostgreSQL or similar databases',
      'Excellent problem-solving skills',
    ],
    posted: 'March 20, 2025',
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    description: 'We are seeking a Product Manager to lead the development of our digital products and drive innovation.',
    requirements: [
      '3+ years of product management experience',
      'Experience with fintech or digital products',
      'Strong analytical and communication skills',
      'Ability to work with cross-functional teams',
      'Experience with agile methodologies',
    ],
    posted: 'March 15, 2025',
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We need a DevOps Engineer to help us build and maintain our cloud infrastructure and deployment pipelines.',
    requirements: [
      '3+ years of DevOps experience',
      'Experience with Docker and Kubernetes',
      'Knowledge of CI/CD pipelines',
      'Experience with cloud providers (AWS, Azure, or GCP)',
      'Strong scripting skills (Bash, Python)',
    ],
    posted: 'March 10, 2025',
  },
]