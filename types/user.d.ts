interface IUser {
  id: number
  first_name: string
  last_name: string
  phonenumber: number
  email: string
  role: "admin" | "user"
}