"use client"
import { useUsers, useDeleteUser, useCreate, useUpdate } from "@/api/queries/users";
import { AdminPage } from "@/components";
import { Button, Input, Pagination } from "@/shared";
import { useTranslations } from "next-intl";
import { FC, useState, useEffect, useRef } from "react";
import { ChevronDown, Plus, Edit, Trash2, X } from "lucide-react";
import { Controller } from "react-hook-form";

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

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  user?: IUser;
}

const CreateUserModal: FC<UserModalProps> = ({ isOpen, onClose, title }) => {
  const { methods, onSubmit, isSubmitting } = useCreate();
  const t = useTranslations();
  const { control, formState: { errors } } = methods;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-[#0C111D] rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#344054] dark:text-[#CECFD2]">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#344054] dark:text-[#CECFD2] mb-1">{t("fields.firstName")}</label>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#161B26] text-[#344054] dark:text-[#CECFD2]"
                />
              )}
            />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#344054] dark:text-[#CECFD2] mb-1">{t("fields.lastName")}</label>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#161B26] text-[#344054] dark:text-[#CECFD2]"
                />
              )}
            />
            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#344054] dark:text-[#CECFD2] mb-1">{t("fields.role")}</label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#161B26] text-[#344054] dark:text-[#CECFD2]"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              )}
            />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#344054] dark:text-[#CECFD2] mb-1">{t("fields.birthdate")}</label>
            <Controller
              name="birthdate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#161B26] text-[#344054] dark:text-[#CECFD2]"
                />
              )}
            />
            {errors.birthdate && <p className="text-red-500 text-xs mt-1">{errors.birthdate.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#344054] dark:text-[#CECFD2] mb-1">{t("fields.password")}</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#161B26] text-[#344054] dark:text-[#CECFD2]"
                />
              )}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              label={t("button.cancel")}
              type={"button"}
              variant={"flat"}
              onClick={onClose}
            />
            <Button 
              label={t("button.save")}
              type={"submit"}
              loading={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdateUserModal: FC<UserModalProps> = ({ isOpen, onClose, title, user }) => {
  const { methods, onSubmit, isSubmitting } = useUpdate(user?.id, user);
  const t = useTranslations();
  const { control, formState: { errors } } = methods;

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-[#0C111D] rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#344054] dark:text-[#CECFD2]">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Controller
              name="first_name"
              control={control}
              render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                <Input
                  id={"first_name"}
                  label={t("fields.firstName")}
                  defaultValue={value}
                  onChange={onChange}
                  isInvalid={invalid}
                  errorMessage={error?.message ? error.message : ""}
                />
              )}
            />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
          </div>

          <div>
            <Controller
              name="last_name"
              control={control}
              render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                <Input
                  id={"last_name"}
                  label={t("fields.lastName")}
                  defaultValue={value}
                  onChange={onChange}
                  isInvalid={invalid}
                  errorMessage={error?.message ? error.message : ""}
                />
              )}
            />
            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#344054] dark:text-[#CECFD2] mb-1">{t("fields.role")}</label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#161B26] text-[#344054] dark:text-[#CECFD2]"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              )}
            />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#344054] dark:text-[#CECFD2] mb-1">{t("fields.status")}</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#161B26] text-[#344054] dark:text-[#CECFD2]"
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                  <option value="deactive">Deactive</option>
                </select>
              )}
            />
            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              type={"button"}
              onClick={onClose}
              label={t("button.cancel")}
              variant={"flat"}
            />
            <Button
              type="submit"
              loading={isSubmitting}
              label={t("button.save")}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md disabled:opacity-50"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const UserItem: FC<{
  user: IUser;
  onEdit: (user: IUser) => void;
  onDelete: (id: number) => void;
}> = ({ user, onEdit, onDelete }) => {
  const isAdmin = user.role === 'admin';

  return (
    <div className="grid grid-cols-6 md:grid-cols-12 items-center px-3 py-4">
      <div className="col-span-1 text-center text-sm text-[#344054] dark:text-[#CECFD2]">
        {user.id}
      </div>
      <div className="col-span-3 md:col-span-3 flex flex-col">
        <h3 className="text-sm font-medium text-[#344054] dark:text-[#CECFD2]">
          {user.first_name} {user.last_name}
        </h3>
      </div>
      <div className="hidden md:block md:col-span-4 text-sm text-[#344054] dark:text-[#CECFD2]">
        {user.email}
      </div>
      <div className="hidden md:block md:col-span-2 text-sm text-[#344054] dark:text-[#CECFD2]">
        <span className={`px-2 py-1 rounded-full text-xs ${isAdmin ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
          {user.role}
        </span>
      </div>
      <div className="col-span-2 md:col-span-2 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(user)}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const UsersPage: FC = () => {
  const { users, page, prevPage, nextPage, status, onChangeStatus } = useUsers();
  const { deleteUser } = useDeleteUser();
  const t = useTranslations();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleOpenUpdateModal = (user: IUser) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(undefined);
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm(t("confirmations.deleteUser"))) {
      deleteUser(id);
    }
  };

  return (
    <section id={"users"}>
      <AdminPage title={t("section.users")}>
        <div className="flex justify-end gap-3 p-3 bg-gray-50 dark:bg-[#161B26]">
          <StatusDropdown
            status={status}
            onChangeStatus={onChangeStatus}
          />
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center space-x-1 px-3 py-2 bg-purple-600 text-white rounded-md"
          >
            <Plus className="w-4 h-4" />
            <span>{t("button.add")}</span>
          </button>
        </div>
        <div className="grid grid-cols-6 md:grid-cols-12 bg-gray-50 dark:bg-[#161B26]">
          <div className="p-3 col-span-1 text-center font-medium text-[#344054] dark:text-[#CECFD2]">
            #
          </div>
          <div className="p-3 col-span-3 md:col-span-3 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("fields.name")}
          </div>
          <div className="p-3 hidden md:block md:col-span-4 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("fields.email")}
          </div>
          <div className="p-3 hidden md:block md:col-span-2 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("fields.role")}
          </div>
          <div className="p-3 col-span-2 md:col-span-2 text-right font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("columns.actions")}
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onEdit={handleOpenUpdateModal}
              onDelete={handleDeleteUser}
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

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        title={"Create user"}
      />

      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        title={"Update user"}
        user={selectedUser}
      />
    </section>
  );
};

export default UsersPage;