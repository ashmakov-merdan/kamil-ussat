interface IUser {
  id: number
  first_name: string
  last_name: string
  phonenumber: number
  email: string
  is_super_user: boolean
  role: "admin" | "user"
  status: "active"
}