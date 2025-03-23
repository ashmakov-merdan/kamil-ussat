import { FC } from "react";

interface Props {
  onClick: () => void
  isDisabled: boolean
  isActive: boolean
}

const Toggle: FC<Props> = ({ onClick, isDisabled, isActive }) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="relative inline-flex h-5 md:h-6 w-9 items-center rounded-full focus:outline-none"
      aria-pressed={isActive}
    >
      <span
        className={`${isActive
          ? 'bg-green-600 dark:bg-green-500'
          : 'bg-gray-200 dark:bg-gray-700'
          } absolute inset-0 rounded-full transition-colors duration-200 ease-in-out`}
      />
      <span
        className={`${isActive
          ? 'translate-x-5'
          : 'translate-x-1'
          } inline-block size-3 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
      />
    </button>
  )
};

export default Toggle;