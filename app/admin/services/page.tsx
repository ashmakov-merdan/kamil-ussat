"use client"
import { useDeleteService, useReorderServices, useServices } from "@/api/queries/services";
import { FC, useCallback, useEffect, useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowUp, ArrowDown, GripVertical, Trash2, Edit } from "lucide-react";
import { Pagination, Toggle } from "@/shared";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AdminPage } from "@/components";

// Sortable item component
const SortableItem = ({
  service,
  index,
  onMoveUp,
  onMoveDown,
  onToggle,
  onDelete,
  isFirst,
  isLast,
  isPending,
  isDeleting
}: {
  service: IService;
  index: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onToggle: (service: IService) => void;
  onDelete: (service: IService) => void;
  isFirst: boolean;
  isLast: boolean;
  isPending: boolean;
  isDeleting: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: service.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-6 md:grid-cols-12 items-center hover:bg-gray-50 dark:hover:bg-[#161B26] ${isDragging ? 'opacity-50 bg-gray-100 dark:bg-[#161B26]' : ''
        }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="p-3 col-span-1 flex justify-center cursor-grab"
      >
        <GripVertical size={18} className="text-[#344054] dark:text-[#CECFD2]" />
      </div>
      <div className="p-3 col-span-2 md:col-span-5">
        <h2 className="text-[#344054] dark:text-[#CECFD2] text-sm md:text-base truncate">{service.name}</h2>
      </div>
      <div className="p-1 md:p-3 col-span-3 md:col-span-6 flex items-center justify-end md:justify-start space-x-1 md:space-x-4">
        <Toggle
          onClick={() => onToggle(service)}
          isDisabled={isPending || isDeleting}
          isActive={service.is_active}
        />
        <Link
          href={`/admin/services/${service.id}`}
          className="p-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-500 dark:text-blue-400"
          aria-label="Edit service"
        >
          <Edit size={16} className="md:w-[18px] md:h-[18px]" />
        </Link>
        <button
          onClick={() => onMoveUp(index)}
          disabled={isFirst || isPending || isDeleting}
          className="p-1 hidden sm:block rounded-md hover:bg-gray-100 dark:hover:bg-[#161B26] disabled:opacity-50"
          aria-label="Move up"
        >
          <ArrowUp size={16} className="md:w-[18px] md:h-[18px] text-[#344054] dark:text-[#CECFD2]" />
        </button>
        <button
          onClick={() => onMoveDown(index)}
          disabled={isLast || isPending || isDeleting}
          className="p-1 hidden sm:block rounded-md hover:bg-gray-100 dark:hover:bg-[#161B26] disabled:opacity-50"
          aria-label="Move down"
        >
          <ArrowDown size={16} className="md:w-[18px] md:h-[18px] text-[#344054] dark:text-[#CECFD2]" />
        </button>
        <button
          onClick={() => onDelete(service)}
          disabled={isPending || isDeleting}
          className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900 text-red-500 dark:text-red-400 disabled:opacity-50"
          aria-label="Delete service"
        >
          <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
      </div>
    </div>
  );
};

const Services: FC = () => {
  const t = useTranslations();
  const { services, nextPage, prevPage, page } = useServices();
  const { reorderServices, isPending } = useReorderServices();
  const { deleteService, isPending: isDeleting } = useDeleteService();
  const [orderedServices, setOrderedServices] = useState<IService[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean, service: IService | null }>({
    show: false,
    service: null
  });

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  useEffect(() => {
    if (services && services.length > 0) {
      const sorted = [...services].sort((a, b) => a.priority - b.priority);
      setOrderedServices(sorted);
    }
  }, [services]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setOrderedServices((items) => {
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
      const newIndex = items.findIndex((item) => item.id.toString() === over.id);

      if (oldIndex === -1 || newIndex === -1) return items;

      const draggedService = items[oldIndex];
      const targetService = items[newIndex];

      const draggedPriority = draggedService.priority;
      const targetPriority = targetService.priority;


      reorderServices({
        id: draggedService.id,
        priority: targetPriority
      });

      reorderServices({
        id: targetService.id,
        priority: draggedPriority
      });

      const newItems = arrayMove(items, oldIndex, newIndex);

      return newItems.map(item => {
        if (item.id === draggedService.id) {
          return { ...item, priority: targetPriority };
        }
        if (item.id === targetService.id) {
          return { ...item, priority: draggedPriority };
        }
        return item;
      });
    });
  }, [reorderServices]);

  const moveService = useCallback((index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) ||
      (direction === 'down' && index === orderedServices.length - 1)) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    const currentService = orderedServices[index];
    const adjacentService = orderedServices[targetIndex];

    const currentPriority = currentService.priority;
    const adjacentPriority = adjacentService.priority;

    const newOrderedServices = arrayMove([...orderedServices], index, targetIndex);

    setOrderedServices(
      newOrderedServices.map(service => {
        if (service.id === currentService.id) {
          return { ...service, priority: adjacentPriority };
        }
        if (service.id === adjacentService.id) {
          return { ...service, priority: currentPriority };
        }
        return service;
      })
    );

    if (direction === 'down') {
      reorderServices({
        id: currentService.id,
        priority: adjacentPriority
      });

      reorderServices({
        id: adjacentService.id,
        priority: currentPriority
      });
    } else {
      reorderServices({
        id: currentService.id,
        priority: adjacentPriority
      });
    }
  }, [orderedServices, reorderServices]);

  const toggleServiceActive = useCallback((service: IService) => {
    reorderServices({
      id: service.id,
      is_active: !service.is_active
    });

    setOrderedServices(prev =>
      prev.map(s =>
        s.id === service.id ? { ...s, is_active: !s.is_active } : s
      )
    );
  }, [reorderServices]);

  const handleDeleteService = useCallback((service: IService) => {
    setConfirmDelete({ show: true, service });
  }, []);

  const confirmDeleteService = useCallback(() => {
    if (confirmDelete.service) {
      deleteService({ id: confirmDelete.service.id });
      setOrderedServices(prev => prev.filter(s => s.id !== confirmDelete.service?.id));
      setConfirmDelete({ show: false, service: null });
    }
  }, [confirmDelete.service, deleteService]);

  const cancelDelete = useCallback(() => {
    setConfirmDelete({ show: false, service: null });
  }, []);

  return (
    <section className="flex flex-col">
      <AdminPage
        title={t("section.features")}
        addButtonLabel={t("button.add")}
        addButtonLink="/admin/services/add"
      >
        <div className="grid grid-cols-6 md:grid-cols-12 bg-gray-50 dark:bg-[#161B26]">
          <div className="p-3 col-span-1 text-center font-medium text-[#344054] dark:text-[#CECFD2]">
            #
          </div>
          <div className="p-3 col-span-5 md:col-span-5 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("columns.feature")}
          </div>
          <div className="p-3 hidden md:block md:col-span-6 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("columns.actions")}
          </div>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={orderedServices.map(service => service.id.toString())} strategy={verticalListSortingStrategy}>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orderedServices.map((service, index) => (
                <SortableItem
                  key={service.id}
                  service={service}
                  index={index}
                  onMoveUp={(idx) => moveService(idx, 'up')}
                  onMoveDown={(idx) => moveService(idx, 'down')}
                  onToggle={toggleServiceActive}
                  onDelete={handleDeleteService}
                  isFirst={index === 0}
                  isLast={index === orderedServices.length - 1}
                  isPending={isPending}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={page}
            nextPage={nextPage}
            prevPage={prevPage}
            length={services?.length || 0}
          />
        </div>
      </AdminPage>

      {confirmDelete.show && confirmDelete.service && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#161B26] rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {`Are you sure you want to delete the service "${confirmDelete.service.name}"? This action cannot be undone.`}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteService}
                className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;