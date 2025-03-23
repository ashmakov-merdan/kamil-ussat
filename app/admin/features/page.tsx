"use client"
import { useDeleteFeature, useFeatures, useReorderFeatures } from "@/api/queries/features";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowUp, ArrowDown, GripVertical, Trash2, Edit } from "lucide-react";
import { Pagination, Toggle } from "@/shared";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AdminPage } from "@/components";

// Feature interface
interface IFeature {
  id: number;
  name: string;
  priority: number;
  is_active: boolean;
  slug: string;
  files: {
    path: string;
    blurhash: string;
  }[];
}

// Sortable item component
const SortableItem = ({
  feature,
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
  feature: IFeature;
  index: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onToggle: (feature: IFeature) => void;
  onDelete: (feature: IFeature) => void;
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
  } = useSortable({ id: feature.id.toString() });

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
        <h2 className="text-[#344054] dark:text-[#CECFD2] text-sm md:text-base truncate">{feature.name}</h2>
      </div>
      <div className="p-1 md:p-3 col-span-3 md:col-span-6 flex items-center justify-end md:justify-start space-x-1 md:space-x-4">
        <Toggle
          onClick={() => onToggle(feature)}
          isDisabled={isPending || isDeleting}
          isActive={feature.is_active}
        />
        <Link
          href={`/admin/features/${feature.id}`}
          className="p-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-500 dark:text-blue-400"
          aria-label="Edit feature"
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
          onClick={() => onDelete(feature)}
          disabled={isPending || isDeleting}
          className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900 text-red-500 dark:text-red-400 disabled:opacity-50"
          aria-label="Delete feature"
        >
          <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
      </div>
    </div>
  );
};

const FeaturesPage: FC = () => {
  const t = useTranslations();
  const { features, nextPage, prevPage, page, isLoading } = useFeatures();
  const { reorderFeatures, isPending } = useReorderFeatures();
  const { deleteFeature, isPending: isDeleting } = useDeleteFeature();
  const [orderedFeatures, setOrderedFeatures] = useState<IFeature[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean, feature: IFeature | null }>({
    show: false,
    feature: null
  });

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  useEffect(() => {
    if (features && features.length > 0) {
      const sorted = [...features].sort((a, b) => a.priority - b.priority);
      setOrderedFeatures(sorted);
    }
  }, [features]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setOrderedFeatures((items) => {
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
      const newIndex = items.findIndex((item) => item.id.toString() === over.id);

      if (oldIndex === -1 || newIndex === -1) return items;

      // Get features involved in the swap
      const draggedFeature = items[oldIndex];
      const targetFeature = items[newIndex];

      // Directly swap priorities between the two features
      const draggedPriority = draggedFeature.priority;
      const targetPriority = targetFeature.priority;

      // Update the dragged feature's priority
      reorderFeatures({
        id: draggedFeature.id,
        priority: targetPriority
      });

      // Also update the target feature's priority to ensure proper swapping
      reorderFeatures({
        id: targetFeature.id,
        priority: draggedPriority
      });

      // Create a new array with the items in the correct visual order
      const newItems = arrayMove(items, oldIndex, newIndex);

      // Create a copy with the swapped priorities for the UI
      return newItems.map(item => {
        if (item.id === draggedFeature.id) {
          return { ...item, priority: targetPriority };
        }
        if (item.id === targetFeature.id) {
          return { ...item, priority: draggedPriority };
        }
        return item;
      });
    });
  }, [reorderFeatures]);

  const moveFeature = useCallback((index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) ||
      (direction === 'down' && index === orderedFeatures.length - 1)) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // Get the features involved in the swap
    const currentFeature = orderedFeatures[index];
    const adjacentFeature = orderedFeatures[targetIndex];

    // Get their priorities for swapping
    const currentPriority = currentFeature.priority;
    const adjacentPriority = adjacentFeature.priority;

    // Create a new array with swapped positions
    const newOrderedFeatures = arrayMove([...orderedFeatures], index, targetIndex);

    // Update the local state with swapped priorities for immediate visual feedback
    setOrderedFeatures(
      newOrderedFeatures.map(feature => {
        if (feature.id === currentFeature.id) {
          return { ...feature, priority: adjacentPriority };
        }
        if (feature.id === adjacentFeature.id) {
          return { ...feature, priority: currentPriority };
        }
        return feature;
      })
    );

    // When moving down or up, update both features to ensure the swap happens correctly
    reorderFeatures({
      id: currentFeature.id,
      priority: adjacentPriority
    });

    reorderFeatures({
      id: adjacentFeature.id,
      priority: currentPriority
    });
  }, [orderedFeatures, reorderFeatures]);

  const toggleFeatureActive = useCallback((feature: IFeature) => {
    reorderFeatures({
      id: feature.id,
      is_active: !feature.is_active
    });

    setOrderedFeatures(prev =>
      prev.map(f =>
        f.id === feature.id ? { ...f, is_active: !f.is_active } : f
      )
    );
  }, [reorderFeatures]);

  const handleDeleteFeature = useCallback((feature: IFeature) => {
    // Show confirmation dialog
    setConfirmDelete({ show: true, feature });
  }, []);

  const confirmDeleteFeature = useCallback(() => {
    if (confirmDelete.feature) {
      deleteFeature({ id: confirmDelete.feature.id });
      // Remove from local state immediately for better UX
      setOrderedFeatures(prev => prev.filter(f => f.id !== confirmDelete.feature?.id));
      // Close the confirmation dialog
      setConfirmDelete({ show: false, feature: null });
    }
  }, [confirmDelete.feature, deleteFeature]);

  const cancelDelete = useCallback(() => {
    setConfirmDelete({ show: false, feature: null });
  }, []);

  const renderFeatures = useMemo(() => {
    if (isLoading) {
      return (
        <div className="p-6 space-y-4 border dark:border-[#1F242F] rounded-lg">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      );
    }

    if (orderedFeatures.length === 0) {
      return (
        <div className="p-6 text-center border dark:border-[#1F242F] rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">{t("placeholder.no-services")}</p>
        </div>
      );
    }

    return (
      <section className="flex flex-col">
        <AdminPage
          title={t("section.services")}
          addButtonLabel={t("button.add")}
          addButtonLink="/admin/features/add"
        >
          <div className="grid grid-cols-6 md:grid-cols-12 bg-gray-50 dark:bg-[#161B26]">
            <div className="p-3 col-span-1 text-center font-medium text-[#344054] dark:text-[#CECFD2]">
              #
            </div>
            <div className="p-3 col-span-5 md:col-span-5 font-medium text-[#344054] dark:text-[#CECFD2]">
              {t("columns.service")}
            </div>
            <div className="p-3 hidden md:block md:col-span-6 font-medium text-[#344054] dark:text-[#CECFD2]">
              {t("columns.actions")}
            </div>
          </div>

          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={orderedFeatures.map(feature => feature.id.toString())} strategy={verticalListSortingStrategy}>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {orderedFeatures.map((feature, index) => (
                  <SortableItem
                    key={feature.id}
                    feature={feature}
                    index={index}
                    onMoveUp={(idx) => moveFeature(idx, 'up')}
                    onMoveDown={(idx) => moveFeature(idx, 'down')}
                    onToggle={toggleFeatureActive}
                    onDelete={handleDeleteFeature}
                    isFirst={index === 0}
                    isLast={index === orderedFeatures.length - 1}
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
              length={features?.length || 0}
            />
          </div>
        </AdminPage>

        {confirmDelete.show && confirmDelete.feature && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#161B26] rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {`Are you sure you want to delete the feature "${confirmDelete.feature.name}"? This action cannot be undone.`}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteFeature}
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
  }, [
    t,
    cancelDelete,
    orderedFeatures,
    handleDragEnd,
    moveFeature,
    toggleFeatureActive,
    handleDeleteFeature,
    isPending,
    isDeleting,
    sensors,
    page,
    features,
    prevPage,
    nextPage,
    isLoading,
    confirmDelete,
    confirmDeleteFeature
  ]);

  return (
    <section id={"features"} className="space-y-6">
      <div className="grid">{renderFeatures}</div>
    </section>
  );
};

export default FeaturesPage;