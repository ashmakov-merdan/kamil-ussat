import { redirect } from "next/navigation";
import { FC } from "react";

const AdminPage: FC = () => {
  return redirect("/admin/services");
};

export default AdminPage;