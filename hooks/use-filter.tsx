"use client"
import { useLocale } from "next-intl";
import { useState } from "react";

const useFilter = () => {
  const locale = useLocale();
  const [ filters, setFilters ] = useState<Record<string, unknown>>({
    order_direction: "asc",
    order_by: "priority",
    lang: locale
  });
  
  const onSelectOrderDirection = (direction: "asc" | "desc") => {
    setFilters(prev => ({
      ...prev,
      order_direction: direction
    }))
  };

  const onSelectOrderBy = (order_by: string) => {
    setFilters(prev => ({
      ...prev,
      order_by
    }))
  };

  const onToggleActive = () => {
    setFilters(prev => ({
      ...prev,
      is_active: !prev.is_active
    }))
  }

  return { filters, onSelectOrderDirection, onSelectOrderBy, onToggleActive };
};

export default useFilter;