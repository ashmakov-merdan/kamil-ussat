import { Navigation, Sidebar } from "@/components";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode
}

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <main>
      <Navigation />
      <div className="relative container mx-auto flex gap-x-6 min-h-screen pt-24 pb-6">
        <Sidebar />
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  )
};

export default AdminLayout;