interface IContact {
  id: number
  link: string
  type: ContactType
  priority: number
  is_active: boolean
}

type ContactType = 
  | "instagram" 
  | "github" 
  | "telegram" 
  | "whatsapp" 
  | "facebook" 
  | "address" 
  | "phone" 