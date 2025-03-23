import { Navigation, Sidebar } from "@/components";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode
}

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <main>
      <Navigation />
      <div className="relative container mx-auto flex flex-col md:flex-row gap-x-6 gap-y-6 min-h-screen pt-24 pb-6 px-4 md:px-6">
        <div className="w-full md:w-auto md:sticky md:top-24 md:h-fit">
          <Sidebar />
        </div>
        <div className="w-full overflow-x-auto">
          {children}
        </div>
      </div>
    </main>
  )
};

export default AdminLayout;