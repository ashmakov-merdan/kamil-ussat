"use client"
import { useUsers } from "@/api/queries/users";
import { AdminPage } from "@/components";
import { Pagination } from "@/shared";
import { useTranslations } from "next-intl";
import { FC, useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

type StatusType = 'active' | 'blocked' | 'deactive';

interface StatusDropdownProps {
  status: StatusType;
  onChangeStatus: (status: StatusType) => void;
}

const StatusDropdown: FC<StatusDropdownProps> = ({ status, onChangeStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions: { label: string; value: StatusType; color: string }[] = [
    { label: "Active", value: 'active', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    { label: "Blocked", value: 'blocked', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
    { label: "Deactive", value: 'deactive', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
  ];

  const currentStatus = statusOptions.find(option => option.value === status) || statusOptions[0];

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white dark:bg-[#0C111D] border border-gray-200 dark:border-gray-700"
      >
        <span className={`px-2 py-1 rounded-full text-xs ${currentStatus.color}`}>
          {currentStatus.label}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-[#0C111D] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChangeStatus(option.value);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-[#161B26]"
            >
              <span className={`px-2 py-1 rounded-full text-xs ${option.color}`}>
                {option.label}
              </span>
              {status === option.value && (
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const UserItem: FC<{ user: IUser }> = ({ user }) => {
  const isAdmin = user.role === 'admin';

  return (
    <div className="grid grid-cols-6 md:grid-cols-12 items-center px-3 py-4">
      <div className="col-span-1 text-center text-sm text-[#344054] dark:text-[#CECFD2]">
        {user.id}
      </div>
      <div className="col-span-5 md:col-span-4 flex flex-col">
        <h3 className="text-sm font-medium text-[#344054] dark:text-[#CECFD2]">
          {user.first_name} {user.last_name}
        </h3>
      </div>
      <div className="hidden md:block md:col-span-5 text-sm text-[#344054] dark:text-[#CECFD2]">
        {user.email}
      </div>
      <div className="hidden md:block md:col-span-2 text-sm text-[#344054] dark:text-[#CECFD2]">
        <span className={`px-2 py-1 rounded-full text-xs ${isAdmin ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
          {user.role}
        </span>
      </div>
    </div>
  );
};

const UsersPage: FC = () => {
  const { users, page, prevPage, nextPage, status, onChangeStatus } = useUsers();
  const t = useTranslations();

  return (
    <section id={"users"}>
      <AdminPage title={t("section.users")}>
        <div className="flex justify-end p-3 bg-gray-50 dark:bg-[#161B26]">
          <StatusDropdown
            status={status}
            onChangeStatus={onChangeStatus}
          />
        </div>
        <div className="grid grid-cols-6 md:grid-cols-12 bg-gray-50 dark:bg-[#161B26]">
          <div className="p-3 col-span-1 text-center font-medium text-[#344054] dark:text-[#CECFD2]">
            #
          </div>
          <div className="p-3 col-span-5 md:col-span-4 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("fields.name")}
          </div>
          <div className="p-3 hidden md:block md:col-span-5 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("fields.email")}
          </div>
          <div className="p-3 hidden md:block md:col-span-2 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("fields.role")}
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
            />
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={page}
            nextPage={nextPage}
            prevPage={prevPage}
            length={users?.length || 0}
          />
        </div>
      </AdminPage>
    </section>
  );
};

export default UsersPage;