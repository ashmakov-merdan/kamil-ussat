"use client"
import { FC, useMemo, useState } from "react";
import { setUserLocale } from "@/utils/locale";
import { useLocale } from "next-intl";

const languages = [
  { label: "Türkmen", value: "tk" },
  { label: "English", value: "en" },
  { label: "Русский", value: "ru" }
]

const LanguageDropdown: FC = () => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = useMemo<string>(() => {
    const language = languages.find((lang) => lang.value === locale);
    return language?.label || "";
  }, [locale]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (value: string) => {
    const locale = value as "en" | "ru" | "tk";
    setUserLocale(locale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-[#F2F4F7] dark:bg-[#1F242F] hover:bg-gray-100"
      >
        <span className="text-black dark:text-[#F5F5F6]">{currentLanguage}</span>
        <svg
          className={`w-4 h-4 text-black dark:text-[#F5F5F6] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-36 bg-[#F2F4F7] dark:bg-[#1F242F] border border-[#F2F4F7] dark:border-[#333741] rounded-lg shadow-lg z-10">
          {languages.map((language) => (
            <button
              key={language.value}
              onClick={() => selectLanguage(language.value)}
              className={`w-full flex items-center gap-3 text-left px-4 py-2 text-black dark:text-white hover:bg-[#F2F4F7]/40 ${currentLanguage === language.label ? 'bg-gray-50 dark:bg-[#1F242F]/70 font-medium' : ''
                }`}
            >
              <div className={`size-1.5 rounded-full ${currentLanguage === language.label ? "bg-purple-400" : "bg-[#D0D5DD]"}`} />
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;