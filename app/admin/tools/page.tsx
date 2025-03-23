"use client"
import { useDeleteTool, useReorderTools, useTools } from "@/api/queries/tools";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowUp, ArrowDown, GripVertical, Trash2, Edit } from "lucide-react";
import { Button, Pagination, Toggle } from "@/shared";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AdminPage } from "@/components";

// Sortable item component
const SortableItem = ({
  tool,
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
  tool: ITool;
  index: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onToggle: (tool: ITool) => void;
  onDelete: (tool: ITool) => void;
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
  } = useSortable({ id: tool.id.toString() });

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
        <h2 className="text-[#344054] dark:text-[#CECFD2] text-sm md:text-base truncate">{tool.name}</h2>
      </div>
      <div className="p-1 md:p-3 col-span-3 md:col-span-6 flex items-center justify-end md:justify-start space-x-1 md:space-x-4">
        <Toggle 
          onClick={() => onToggle(tool)}
          isDisabled={isPending || isDeleting}
          isActive={tool.is_active}
        />
        <Link
          href={`/admin/tools/${tool.id}`}
          className="p-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-500 dark:text-blue-400"
          aria-label="Edit tool"
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
          onClick={() => onDelete(tool)}
          disabled={isPending || isDeleting}
          className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900 text-red-500 dark:text-red-400 disabled:opacity-50"
          aria-label="Delete tool"
        >
          <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
      </div>
    </div>
  );
};

const ToolsPage: FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const { tools, nextPage, prevPage, page } = useTools();
  const { reorderTools, isPending } = useReorderTools();
  const { deleteTool, isPending: isDeleting } = useDeleteTool();
  const [orderedTools, setOrderedTools] = useState<ITool[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean, tool: ITool | null }>({
    show: false,
    tool: null
  });

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  useEffect(() => {
    if (tools && tools.length > 0) {
      const sorted = [...tools].sort((a, b) => a.priority - b.priority);
      setOrderedTools(sorted);
    }
  }, [tools]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setOrderedTools((items) => {
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
      const newIndex = items.findIndex((item) => item.id.toString() === over.id);

      if (oldIndex === -1 || newIndex === -1) return items;

      const draggedTool = items[oldIndex];
      const targetTool = items[newIndex];

      const draggedPriority = draggedTool.priority;
      const targetPriority = targetTool.priority;


      reorderTools({
        id: draggedTool.id,
        priority: targetPriority
      });

      reorderTools({
        id: targetTool.id,
        priority: draggedPriority
      });

      const newItems = arrayMove(items, oldIndex, newIndex);

      return newItems.map(item => {
        if (item.id === draggedTool.id) {
          return { ...item, priority: targetPriority };
        }
        if (item.id === targetTool.id) {
          return { ...item, priority: draggedPriority };
        }
        return item;
      });
    });
  }, [reorderTools]);

  const moveTool = useCallback((index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) ||
      (direction === 'down' && index === orderedTools.length - 1)) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    const currentTool = orderedTools[index];
    const adjacentTool = orderedTools[targetIndex];

    const currentPriority = currentTool.priority;
    const adjacentPriority = adjacentTool.priority;

    const newOrderedTools = arrayMove([...orderedTools], index, targetIndex);

    setOrderedTools(
      newOrderedTools.map(tool => {
        if (tool.id === currentTool.id) {
          return { ...tool, priority: adjacentPriority };
        }
        if (tool.id === adjacentTool.id) {
          return { ...tool, priority: currentPriority };
        }
        return tool;
      })
    );

    if (direction === 'down') {
      reorderTools({
        id: currentTool.id,
        priority: adjacentPriority
      });

      reorderTools({
        id: adjacentTool.id,
        priority: currentPriority
      });
    } else {
      reorderTools({
        id: currentTool.id,
        priority: adjacentPriority
      });
    }
  }, [orderedTools, reorderTools]);

  const toggleToolActive = useCallback((tool: ITool) => {
    reorderTools({
      id: tool.id,
      is_active: !tool.is_active
    });

    setOrderedTools(prev =>
      prev.map(t =>
        t.id === tool.id ? { ...t, is_active: !t.is_active } : t
      )
    );
  }, [reorderTools]);

  const handleDeleteTool = useCallback((tool: ITool) => {
    setConfirmDelete({ show: true, tool });
  }, []);

  const confirmDeleteTool = useCallback(() => {
    if (confirmDelete.tool) {
      deleteTool({ id: confirmDelete.tool.id });
      setOrderedTools(prev => prev.filter(t => t.id !== confirmDelete.tool?.id));
      setConfirmDelete({ show: false, tool: null });
    }
  }, [confirmDelete.tool, deleteTool]);

  const cancelDelete = useCallback(() => {
    setConfirmDelete({ show: false, tool: null });
  }, []);

  return (
    <section className="flex flex-col">
      <AdminPage
        title={t("section.features")}
        addButtonLabel={t("button.add")}
        addButtonLink="/admin/tools/add"
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
          <SortableContext items={orderedTools.map(tool => tool.id.toString())} strategy={verticalListSortingStrategy}>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orderedTools.map((tool, index) => (
                <SortableItem
                  key={tool.id}
                  tool={tool}
                  index={index}
                  onMoveUp={(idx) => moveTool(idx, 'up')}
                  onMoveDown={(idx) => moveTool(idx, 'down')}
                  onToggle={toggleToolActive}
                  onDelete={handleDeleteTool}
                  isFirst={index === 0}
                  isLast={index === orderedTools.length - 1}
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
            length={tools?.length || 0}
          />
        </div>
      </AdminPage>

      {confirmDelete.show && confirmDelete.tool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#161B26] rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete the tool "{confirmDelete.tool.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTool}
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

export default ToolsPage;