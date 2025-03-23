"use client"
import { useDeletePartner, usePartners, useReorderPartners } from "@/api/queries/partners";
import { FC, useCallback, useEffect, useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowUp, ArrowDown, GripVertical, Trash2, Edit } from "lucide-react";
import { Toggle, Pagination } from "@/shared";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AdminPage } from "@/components";


// Sortable item component
const SortableItem = ({
  partner,
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
  partner: IPartner;
  index: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onToggle: (partner: IPartner) => void;
  onDelete: (partner: IPartner) => void;
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
  } = useSortable({ id: partner.id.toString() });

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
        <GripVertical size={16} className="md:w-[18px] md:h-[18px] text-[#344054] dark:text-[#CECFD2]" />
      </div>
      <div className="p-3 col-span-2 md:col-span-5">
        <h2 className="text-[#344054] dark:text-[#CECFD2] text-sm md:text-base truncate">{partner.name}</h2>
      </div>
      <div className="p-1 md:p-3 col-span-3 md:col-span-6 flex items-center justify-end md:justify-start space-x-1 md:space-x-4">
        <Toggle
          onClick={() => onToggle(partner)}
          isDisabled={isPending || isDeleting}
          isActive={partner.is_active}
        />
        <Link
          href={`/admin/partners/${partner.id}`}
          className="p-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-500 dark:text-blue-400"
          aria-label="Edit partner"
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
          onClick={() => onDelete(partner)}
          disabled={isPending || isDeleting}
          className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900 text-red-500 dark:text-red-400 disabled:opacity-50"
          aria-label="Delete partner"
        >
          <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
      </div>
    </div>
  );
};

const PartnersPage: FC = () => {
  const t = useTranslations();
  const { partners, nextPage, prevPage, page } = usePartners();
  const { reorderPartners, isPending } = useReorderPartners();
  const { deletePartner, isPending: isDeleting } = useDeletePartner();
  const [orderedPartners, setOrderedPartners] = useState<IPartner[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean, partner: IPartner | null }>({
    show: false,
    partner: null
  });

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  useEffect(() => {
    if (partners && partners.length > 0) {
      const sorted = [...partners].sort((a, b) => a.priority - b.priority);
      setOrderedPartners(sorted);
    }
  }, [partners]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setOrderedPartners((items) => {
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
      const newIndex = items.findIndex((item) => item.id.toString() === over.id);

      if (oldIndex === -1 || newIndex === -1) return items;

      // Get partners involved in the swap
      const draggedPartner = items[oldIndex];
      const targetPartner = items[newIndex];

      // Directly swap priorities between the two partners
      const draggedPriority = draggedPartner.priority;
      const targetPriority = targetPartner.priority;

      // Update the dragged partner's priority
      reorderPartners({
        id: draggedPartner.id,
        priority: targetPriority
      });

      // Also update the target partner's priority to ensure proper swapping
      reorderPartners({
        id: targetPartner.id,
        priority: draggedPriority
      });

      // Create a new array with the items in the correct visual order
      const newItems = arrayMove(items, oldIndex, newIndex);

      // Create a copy with the swapped priorities for the UI
      return newItems.map(item => {
        if (item.id === draggedPartner.id) {
          return { ...item, priority: targetPriority };
        }
        if (item.id === targetPartner.id) {
          return { ...item, priority: draggedPriority };
        }
        return item;
      });
    });
  }, [reorderPartners]);

  const movePartner = useCallback((index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) ||
      (direction === 'down' && index === orderedPartners.length - 1)) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // Get the partners involved in the swap
    const currentPartner = orderedPartners[index];
    const adjacentPartner = orderedPartners[targetIndex];

    // Get their priorities for swapping
    const currentPriority = currentPartner.priority;
    const adjacentPriority = adjacentPartner.priority;

    // Create a new array with swapped positions
    const newOrderedPartners = arrayMove([...orderedPartners], index, targetIndex);

    // Update the local state with swapped priorities for immediate visual feedback
    setOrderedPartners(
      newOrderedPartners.map(partner => {
        if (partner.id === currentPartner.id) {
          return { ...partner, priority: adjacentPriority };
        }
        if (partner.id === adjacentPartner.id) {
          return { ...partner, priority: currentPriority };
        }
        return partner;
      })
    );

    // When moving down or up, update both partners to ensure the swap happens correctly
    reorderPartners({
      id: currentPartner.id,
      priority: adjacentPriority
    });

    reorderPartners({
      id: adjacentPartner.id,
      priority: currentPriority
    });
  }, [orderedPartners, reorderPartners]);

  const togglePartnerActive = useCallback((partner: IPartner) => {
    reorderPartners({
      id: partner.id,
      is_active: !partner.is_active
    });

    setOrderedPartners(prev =>
      prev.map(p =>
        p.id === partner.id ? { ...p, is_active: !p.is_active } : p
      )
    );
  }, [reorderPartners]);

  const handleDeletePartner = useCallback((partner: IPartner) => {
    // Show confirmation dialog
    setConfirmDelete({ show: true, partner });
  }, []);

  const confirmDeletePartner = useCallback(() => {
    if (confirmDelete.partner) {
      deletePartner({ id: confirmDelete.partner.id });
      // Remove from local state immediately for better UX
      setOrderedPartners(prev => prev.filter(p => p.id !== confirmDelete.partner?.id));
      // Close the confirmation dialog
      setConfirmDelete({ show: false, partner: null });
    }
  }, [confirmDelete.partner, deletePartner]);

  const cancelDelete = useCallback(() => {
    setConfirmDelete({ show: false, partner: null });
  }, []);

  return (
    <section className="flex flex-col">
      <AdminPage
        title={t("section.partners")}
        addButtonLabel={t("button.add")}
        addButtonLink="/admin/partners/add"
      >
        <div className="grid grid-cols-6 md:grid-cols-12 bg-gray-50 dark:bg-[#161B26]">
          <div className="p-3 col-span-1 text-center font-medium text-[#344054] dark:text-[#CECFD2]">
            #
          </div>
          <div className="p-3 col-span-5 md:col-span-5 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("columns.partner")}
          </div>
          <div className="p-3 hidden md:block md:col-span-6 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("columns.actions")}
          </div>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={orderedPartners.map(partner => partner.id.toString())} strategy={verticalListSortingStrategy}>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orderedPartners.map((partner, index) => (
                <SortableItem
                  key={partner.id}
                  partner={partner}
                  index={index}
                  onMoveUp={(idx) => movePartner(idx, 'up')}
                  onMoveDown={(idx) => movePartner(idx, 'down')}
                  onToggle={togglePartnerActive}
                  onDelete={handleDeletePartner}
                  isFirst={index === 0}
                  isLast={index === orderedPartners.length - 1}
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
            length={partners?.length || 0}
          />
        </div>
      </AdminPage>

      {confirmDelete.show && confirmDelete.partner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#161B26] rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {`Are you sure you want to delete the partner "${confirmDelete.partner.name}"? This action cannot be undone.`}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletePartner}
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

export default PartnersPage; 