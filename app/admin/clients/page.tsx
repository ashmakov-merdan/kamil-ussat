"use client"
import { useDeleteClient, useClients, useReorderClients } from "@/api/queries/clients";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowUp, ArrowDown, GripVertical, Trash2, Edit } from "lucide-react";
import { Button } from "@/shared";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Client interface
interface IClient {
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
  client, 
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
  client: IClient;
  index: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onToggle: (client: IClient) => void;
  onDelete: (client: IClient) => void;
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
  } = useSortable({ id: client.id.toString() });
  
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
        <h2 className="text-[#344054] dark:text-[#CECFD2]">{client.name}</h2>
      </div>
      <div className="p-3 col-span-6 flex items-center space-x-4">
        <button
          onClick={() => onToggle(client)}
          disabled={isPending || isDeleting}
          className="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none"
          aria-pressed={client.is_active}
        >
          <span
            className={`${client.is_active
              ? 'bg-green-600 dark:bg-green-500'
              : 'bg-gray-200 dark:bg-gray-700'
              } absolute inset-0 rounded-full transition-colors duration-200 ease-in-out`}
          />
          <span
            className={`${client.is_active
              ? 'translate-x-6'
              : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
          />
        </button>
        <Link 
          href={`/admin/clients/${client.id}`} 
          className="p-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-500 dark:text-blue-400"
          aria-label="Edit client"
        >
          <Edit size={18} />
        </Link>
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
          onClick={() => onDelete(client)}
          disabled={isPending || isDeleting}
          className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900 text-red-500 dark:text-red-400 disabled:opacity-50"
          aria-label="Delete client"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const ClientsPage: FC = () => {
  const router = useRouter();
  const { clients, nextPage, prevPage, page, isLoading } = useClients();
  const { reorderClients, isPending } = useReorderClients();
  const { deleteClient, isPending: isDeleting } = useDeleteClient();
  const [orderedClients, setOrderedClients] = useState<IClient[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean, client: IClient | null }>({
    show: false,
    client: null
  });

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  useEffect(() => {
    if (clients && clients.length > 0) {
      const sorted = [...clients].sort((a, b) => a.priority - b.priority);
      setOrderedClients(sorted);
    }
  }, [clients]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }
    
    setOrderedClients((items) => {
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
      const newIndex = items.findIndex((item) => item.id.toString() === over.id);
      
      if (oldIndex === -1 || newIndex === -1) return items;
      
      // Get clients involved in the swap
      const draggedClient = items[oldIndex];
      const targetClient = items[newIndex];
      
      // Directly swap priorities between the two clients
      const draggedPriority = draggedClient.priority;
      const targetPriority = targetClient.priority;
      
      console.log(`Swapping priorities: ${draggedClient.name}(${draggedPriority}) ↔ ${targetClient.name}(${targetPriority})`);
      
      // Update the dragged client's priority
      reorderClients({
        id: draggedClient.id,
        priority: targetPriority
      });
      
      // Also update the target client's priority to ensure proper swapping
      reorderClients({
        id: targetClient.id,
        priority: draggedPriority
      });
      
      // Create a new array with the items in the correct visual order
      const newItems = arrayMove(items, oldIndex, newIndex);
      
      // Create a copy with the swapped priorities for the UI
      return newItems.map(item => {
        if (item.id === draggedClient.id) {
          return { ...item, priority: targetPriority };
        }
        if (item.id === targetClient.id) {
          return { ...item, priority: draggedPriority };
        }
        return item;
      });
    });
  }, [reorderClients]);

  const moveClient = useCallback((index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) ||
      (direction === 'down' && index === orderedClients.length - 1)) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Get the clients involved in the swap
    const currentClient = orderedClients[index];
    const adjacentClient = orderedClients[targetIndex];
    
    // Get their priorities for swapping
    const currentPriority = currentClient.priority;
    const adjacentPriority = adjacentClient.priority;
    
    console.log(`Moving ${direction}: ${currentClient.name}(${currentPriority}) ↔ ${adjacentClient.name}(${adjacentPriority})`);
    
    // Create a new array with swapped positions
    const newOrderedClients = arrayMove([...orderedClients], index, targetIndex);
    
    // Update the local state with swapped priorities for immediate visual feedback
    setOrderedClients(
      newOrderedClients.map(client => {
        if (client.id === currentClient.id) {
          return { ...client, priority: adjacentPriority };
        }
        if (client.id === adjacentClient.id) {
          return { ...client, priority: currentPriority };
        }
        return client;
      })
    );
    
    // When moving down or up, update both clients to ensure the swap happens correctly
    reorderClients({
      id: currentClient.id,
      priority: adjacentPriority
    });
    
    reorderClients({
      id: adjacentClient.id,
      priority: currentPriority
    });
  }, [orderedClients, reorderClients]);

  const toggleClientActive = useCallback((client: IClient) => {
    reorderClients({
      id: client.id,
      is_active: !client.is_active
    });

    setOrderedClients(prev =>
      prev.map(c =>
        c.id === client.id ? { ...c, is_active: !c.is_active } : c
      )
    );
  }, [reorderClients]);

  const handleDeleteClient = useCallback((client: IClient) => {
    // Show confirmation dialog
    setConfirmDelete({ show: true, client });
  }, []);

  const confirmDeleteClient = useCallback(() => {
    if (confirmDelete.client) {
      deleteClient({ id: confirmDelete.client.id });
      // Remove from local state immediately for better UX
      setOrderedClients(prev => prev.filter(c => c.id !== confirmDelete.client?.id));
      // Close the confirmation dialog
      setConfirmDelete({ show: false, client: null });
    }
  }, [confirmDelete.client, deleteClient]);

  const cancelDelete = useCallback(() => {
    setConfirmDelete({ show: false, client: null });
  }, []);

  const renderClients = useMemo(() => {
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

    if (orderedClients.length === 0) {
      return (
        <div className="p-6 text-center border dark:border-[#1F242F] rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No clients found. Add your first client.</p>
        </div>
      );
    }

    return (
      <div className="border dark:border-[#1F242F] rounded-lg divide-y-[1px] divide-[#EAECF0] dark:divide-[#1F242F] overflow-hidden">
        <div className="grid grid-cols-12 dark:bg-[#161B26]">
          <div className="p-3 col-span-1">
            <h2 className="text-[#344054] dark:text-[#CECFD2]">#</h2>
          </div>
          <div className="p-3 col-span-5">
            <h2 className="text-[#344054] dark:text-[#CECFD2]">Client</h2>
          </div>
          <div className="p-3 col-span-6">
            <h2 className="text-[#344054] dark:text-[#CECFD2]">Actions</h2>
          </div>
        </div>
        
        <DndContext 
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={orderedClients.map(client => client.id.toString())} 
            strategy={verticalListSortingStrategy}
          >
            <div className="divide-y divide-[#EAECF0] dark:divide-[#1F242F]">
              {orderedClients.map((client, index) => (
                <SortableItem 
                  key={client.id.toString()}
                  client={client}
                  index={index}
                  onMoveUp={(idx) => moveClient(idx, 'up')}
                  onMoveDown={(idx) => moveClient(idx, 'down')}
                  onToggle={toggleClientActive}
                  onDelete={handleDeleteClient}
                  isFirst={index === 0}
                  isLast={index === orderedClients.length - 1}
                  isPending={isPending}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        
        <div className="p-3 flex justify-between items-center">
          <button 
            type="button" 
            onClick={prevPage} 
            disabled={page <= 1}
            className="px-3 py-2 rounded-lg text-sm text-[#344054] dark:text-[#CECFD2] bg-[#FFFFFF] dark:bg-[#161B26] border border-[#D0D5DD] dark:border-[#333741] disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm text-[#344054] dark:text-[#CECFD2] font-medium">Page {page}</p>
          <button 
            type="button" 
            onClick={nextPage}
            className="px-3 py-2 rounded-lg text-sm text-[#344054] dark:text-[#CECFD2] bg-[#FFFFFF] dark:bg-[#161B26] border border-[#D0D5DD] dark:border-[#333741] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  }, [
    orderedClients, 
    handleDragEnd, 
    moveClient, 
    toggleClientActive, 
    handleDeleteClient,
    isPending, 
    isDeleting,
    sensors, 
    page,
    prevPage, 
    nextPage,
    isLoading
  ]);

  return (
    <section id={"clients"} className="space-y-6">
      <div className="px-4 py-3 bg-[#F9FAFB] dark:bg-[#161B26] w-full inline-flex justify-between items-center gap-4 rounded-lg">
        <h2 className="text-xl text-black dark:text-white font-semibold">Clients</h2>
        <Button label="Add client" onClick={() => router.push("/admin/clients/add")} />
      </div>
      <div className="grid">{renderClients}</div>

      {/* Delete Confirmation Modal */}
      {confirmDelete.show && confirmDelete.client && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#161B26] rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete the client "{confirmDelete.client.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteClient}
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

export default ClientsPage;
