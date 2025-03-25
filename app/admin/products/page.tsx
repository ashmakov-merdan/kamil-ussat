"use client"
import { useDeleteProduct, useProducts, useReorderProducts } from "@/api/queries/products";
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
  product,
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
  product: IProduct;
  index: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onToggle: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
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
  } = useSortable({ id: product.id.toString() });

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
        <h2 className="text-[#344054] dark:text-[#CECFD2] text-sm md:text-base truncate">{product.name}</h2>
      </div>
      <div className="p-1 md:p-3 col-span-3 md:col-span-6 flex items-center justify-end md:justify-start space-x-1 md:space-x-4">
        <Toggle
          onClick={() => onToggle(product)}
          isDisabled={isPending || isDeleting}
          isActive={product.is_active}
        />
        <Link
          href={`/admin/products/${product.id}`}
          className="p-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-500 dark:text-blue-400"
          aria-label="Edit product"
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
          onClick={() => onDelete(product)}
          disabled={isPending || isDeleting}
          className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900 text-red-500 dark:text-red-400 disabled:opacity-50"
          aria-label="Delete product"
        >
          <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
      </div>
    </div>
  );
};

const ProductsPage: FC = () => {
  const t = useTranslations();
  const { products, nextPage, prevPage, page } = useProducts();
  const { reorderProducts, isPending } = useReorderProducts();
  const { deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const [orderedProducts, setOrderedProducts] = useState<IProduct[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean, product: IProduct | null }>({
    show: false,
    product: null
  });

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  useEffect(() => {
    if (products && products.length > 0) {
      const sorted = [...products].sort((a, b) => a.priority - b.priority);
      setOrderedProducts(sorted);
    }
  }, [products]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setOrderedProducts((items) => {
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
      const newIndex = items.findIndex((item) => item.id.toString() === over.id);

      if (oldIndex === -1 || newIndex === -1) return items;

      const draggedProduct = items[oldIndex];
      const targetProduct = items[newIndex];

      const draggedPriority = draggedProduct.priority;
      const targetPriority = targetProduct.priority;


      reorderProducts({
        id: draggedProduct.id,
        priority: targetPriority
      });

      reorderProducts({
        id: targetProduct.id,
        priority: draggedPriority
      });

      const newItems = arrayMove(items, oldIndex, newIndex);

      return newItems.map(item => {
        if (item.id === draggedProduct.id) {
          return { ...item, priority: targetPriority };
        }
        if (item.id === targetProduct.id) {
          return { ...item, priority: draggedPriority };
        }
        return item;
      });
    });
  }, [reorderProducts]);

  const moveProduct = useCallback((index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) ||
      (direction === 'down' && index === orderedProducts.length - 1)) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    const currentProduct = orderedProducts[index];
    const adjacentProduct = orderedProducts[targetIndex];

    const currentPriority = currentProduct.priority;
    const adjacentPriority = adjacentProduct.priority;

    const newOrderedProducts = arrayMove([...orderedProducts], index, targetIndex);

    setOrderedProducts(
      newOrderedProducts.map(product => {
        if (product.id === currentProduct.id) {
          return { ...product, priority: adjacentPriority };
        }
        if (product.id === adjacentProduct.id) {
          return { ...product, priority: currentPriority };
        }
        return product;
      })
    );

    if (direction === 'down') {
      reorderProducts({
        id: currentProduct.id,
        priority: adjacentPriority
      });

      reorderProducts({
        id: adjacentProduct.id,
        priority: currentPriority
      });
    } else {
      reorderProducts({
        id: currentProduct.id,
        priority: adjacentPriority
      });
    }
  }, [orderedProducts, reorderProducts]);

  const toggleProductActive = useCallback((product: IProduct) => {
    reorderProducts({
      id: product.id,
      is_active: !product.is_active
    });

    setOrderedProducts(prev =>
      prev.map(p =>
        p.id === product.id ? { ...p, is_active: !p.is_active } : p
      )
    );
  }, [reorderProducts]);

  const handleDeleteProduct = useCallback((product: IProduct) => {
    setConfirmDelete({ show: true, product });
  }, []);

  const confirmDeleteProduct = useCallback(() => {
    if (confirmDelete.product) {
      deleteProduct({ id: confirmDelete.product.id });
      setOrderedProducts(prev => prev.filter(p => p.id !== confirmDelete.product?.id));
      setConfirmDelete({ show: false, product: null });
    }
  }, [confirmDelete.product, deleteProduct]);

  const cancelDelete = useCallback(() => {
    setConfirmDelete({ show: false, product: null });
  }, []);

  return (
    <AdminPage 
      title={t("section.products")} 
      addButtonLabel={t("button.add")}
      addButtonLink="/admin/products/add"
    >
      <div className="bg-white dark:bg-[#0B101B] rounded-md shadow overflow-hidden">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={orderedProducts.map(product => product.id.toString())} strategy={verticalListSortingStrategy}>
            <div>
              {orderedProducts.map((product, index) => (
                <SortableItem
                  key={product.id}
                  product={product}
                  index={index}
                  onMoveUp={() => moveProduct(index, 'up')}
                  onMoveDown={() => moveProduct(index, 'down')}
                  onToggle={toggleProductActive}
                  onDelete={handleDeleteProduct}
                  isFirst={index === 0}
                  isLast={index === orderedProducts.length - 1}
                  isPending={isPending}
                  isDeleting={isDeleting}
                />
              ))}
              {orderedProducts.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  {t("placeholder.no-products")}
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
        <Pagination
          prevPage={prevPage}
          nextPage={nextPage}
          currentPage={page}
          length={products.length}
        />
      </div>

      {confirmDelete.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0B101B] rounded-md p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
              {t("admin.confirm_delete")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {t("admin.confirm_delete_description")}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {t("admin.cancel")}
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                {t("admin.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminPage>
  );
};

export default ProductsPage;