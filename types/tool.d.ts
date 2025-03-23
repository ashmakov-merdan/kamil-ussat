interface ITool {
  id: number
  name: string
  description: string
  slug: string
  files: FileType[]
  is_active: boolean
  priority: number
}