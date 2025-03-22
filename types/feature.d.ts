interface IFeature {
  id: number
  name: string | LanguageType
  description: string | LanguageType
  slug: string
  files: FileType[]
  is_active: boolean
  priority: number
}