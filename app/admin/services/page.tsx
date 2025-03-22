"use client"
import { useDeleteService, useReorderServices, useServices } from "@/api/queries/services";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowUp, ArrowDown, GripVertical, Trash2, Edit } from "lucide-react";
import { Button } from "@/shared";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      className={`grid grid-cols-12 items-center hover:bg-gray-50 dark:hover:bg-[#161B26] ${
        isDragging ? 'opacity-50 bg-gray-100 dark:bg-[#161B26]' : ''
      }`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="p-3 col-span-1 flex justify-center cursor-grab"
      >
        <GripVertical size={18} className="text-[#344054] dark:text-[#CECFD2]" />
      </div>
      <div className="p-3 col-span-5">
        <h2 className="text-[#344054] dark:text-[#CECFD2]">{service.name}</h2>
      </div>
      <div className="p-3 col-span-6 flex items-center space-x-4">
        <button
          onClick={() => onToggle(service)}
          disabled={isPending || isDeleting}
          className="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none"
          aria-pressed={service.is_active}
        >
          <span
            className={`${service.is_active
              ? 'bg-green-600 dark:bg-green-500'
              : 'bg-gray-200 dark:bg-gray-700'
              } absolute inset-0 rounded-full transition-colors duration-200 ease-in-out`}
          />
          <span
            className={`${service.is_active
              ? 'translate-x-6'
              : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
          />
        </button>
        {/* <Link 
          href={`/admin/services/${service.id}`} 
          className="p-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-500 dark:text-blue-400"
          aria-label="Edit service"
        >
          <Edit size={18} />
        </Link> */}
        <button
          onClick={() => onMoveUp(index)}
          disabled={isFirst || isPending || isDeleting}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#161B26] disabled:opacity-50"
          aria-label="Move up"
        >
          <ArrowUp size={18} className="text-[#344054] dark:text-[#CECFD2]" />
        </button>
        <button
          onClick={() => onMoveDown(index)}
          disabled={isLast || isPending || isDeleting}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#161B26] disabled:opacity-50"
          aria-label="Move down"
        >
          <ArrowDown size={18} className="text-[#344054] dark:text-[#CECFD2]" />
        </button>
        <button
          onClick={() => onDelete(service)}
          disabled={isPending || isDeleting}
          className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900 text-red-500 dark:text-red-400 disabled:opacity-50"
          aria-label="Delete service"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const Services: FC = () => {
  const router = useRouter();
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
    // Show confirmation dialog
    setConfirmDelete({ show: true, service });
  }, []);

  const confirmDeleteService = useCallback(() => {
    if (confirmDelete.service) {
      deleteService({ id: confirmDelete.service.id });
      // Remove from local state immediately for better UX
      setOrderedServices(prev => prev.filter(s => s.id !== confirmDelete.service?.id));
      // Close the confirmation dialog
      setConfirmDelete({ show: false, service: null });
    }
  }, [confirmDelete.service, deleteService]);

  const cancelDelete = useCallback(() => {
    setConfirmDelete({ show: false, service: null });
  }, []);

  const renderServices = useMemo(() => {
    return (
      <div className="border dark:border-[#1F242F] rounded-lg divide-y-[1px] divide-[#EAECF0] dark:divide-[#1F242F] overflow-hidden">
        <div className="grid grid-cols-12 dark:bg-[#161B26]">
          <div className="p-3 col-span-1">
            <h2 className="text-[#344054] dark:text-[#CECFD2]">#</h2>
          </div>
          <div className="p-3 col-span-5">
            <h2 className="text-[#344054] dark:text-[#CECFD2]">Service</h2>
          </div>
          <div className="p-3 col-span-6">
            <h2 className="text-[#344054] dark:text-[#CECFD2]">Actions</h2>
          </div>
        </div>
        
        {orderedServices.length > 0 && (
          <DndContext 
            sensors={sensors}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={orderedServices.map(service => service.id.toString())} 
              strategy={verticalListSortingStrategy}
            >
              <div className="divide-y divide-[#EAECF0] dark:divide-[#1F242F]">
                {orderedServices.map((service, index) => (
                  <SortableItem 
                    key={service.id.toString()}
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
        )}
        
        <div className="p-3 flex justify-between items-center">
          <button 
            type="button" 
            onClick={prevPage} 
            className="px-3 py-2 rounded-lg text-sm text-[#344054] dark:text-[#CECFD2] bg-[#FFFFFF] dark:bg-[#161B26] border border-[#D0D5DD] dark:border-[#333741]"
          >
            Previous
          </button>
          <p className="text-sm text-[#344054] dark:text-[#CECFD2] font-medium">Current Page: {page}</p>
          <button 
            type="button" 
            onClick={nextPage} 
            className="px-3 py-2 rounded-lg text-sm text-[#344054] dark:text-[#CECFD2] bg-[#FFFFFF] dark:bg-[#161B26] border border-[#D0D5DD] dark:border-[#333741]"
          >
            Next
          </button>
        </div>
      </div>
    )
  }, [
    orderedServices, 
    handleDragEnd, 
    moveService, 
    toggleServiceActive, 
    handleDeleteService,
    isPending, 
    isDeleting,
    sensors, 
    page, 
    prevPage, 
    nextPage
  ]);

  return (
    <section id={"services"} className="space-y-6">
      <div className="px-4 py-3 bg-[#F9FAFB] dark:bg-[#161B26] w-full inline-flex justify-between items-center gap-4 rounded-lg">
        <h2 className="text-xl text-black dark:text-white font-semibold">Services</h2>
        <Button label="Add service" onClick={() => router.push("/admin/services/add")} />
      </div>
      <div className="grid">{renderServices}</div>

      {/* Delete Confirmation Modal */}
      {confirmDelete.show && confirmDelete.service && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#161B26] rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete the service "{confirmDelete.service.name}"? This action cannot be undone.
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
  )
};

export default Services;