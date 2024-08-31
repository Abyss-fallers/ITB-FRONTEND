export interface EditSectionProps {
  label: string
  items: any[]
  fieldNames: string[]
  fieldLabels: string[]
  stateSetter: React.Dispatch<React.SetStateAction<any[]>>
  isEditMode: boolean
  onSave: () => void
  toggleEdit: () => void
}

export interface Language {
  name: string
  level: string
}

export interface Skill {
  name: string
  experience: string
}

export interface Education {
  country: string
  university: string
  title: string
  major: string
  year: number
}

export interface Certification {
  certificate: string
  certifiedFrom: string
  year: number
}
