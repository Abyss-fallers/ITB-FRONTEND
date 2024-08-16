export interface Skill {
  name: string
  level: number
}

export interface Project {
  title: string
  description: string
  link: string
  image: string
}

export interface Review {
  client: string
  comment: string
  rating: number
  clientImage: string
}

export interface ProfileProps {
  avatarUrl: string
  name: string
  nickname: string
  status: string
  bio: string
  skills: Skill[]
  projects: Project[]
  reviews: Review[]
}
