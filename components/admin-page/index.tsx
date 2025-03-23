"use client";
import { FC, ReactNode } from "react";
import { Button } from "@/shared";
import Link from "next/link";

interface AdminPageProps {
  title: string;
  children: ReactNode;
  addButtonLabel?: string;
  addButtonLink?: string;
}

const AdminPage: FC<AdminPageProps> = ({
  title,
  children,
  addButtonLabel,
  addButtonLink,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#344054] dark:text-white">{title}</h1>
        {addButtonLabel && addButtonLink && (
          <Link href={addButtonLink}>
            <Button label={addButtonLabel} />
          </Link>
        )}
      </div>
      <div className="bg-white dark:bg-[#0C111D] rounded-lg shadow mb-6 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default AdminPage; 