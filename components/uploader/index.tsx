"use client"
import { FC, useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadIcon } from "../icons";
import { useFormContext } from "react-hook-form";
import useFiles from "@/api/queries/files";

interface UploadedFile {
  path: string;
  blurhash: string;
}

interface FileUploadResponse {
  payload: {
    filePath: string;
    blurhash: string;
  }
}

const Uploader: FC = () => {
  // Get form context and file upload hooks
  const { setValue, watch } = useFormContext<any>();
  const formFiles = watch("files") || [] as UploadedFile[];
  const { upload, isUploading } = useFiles();
  
  // UI state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  // Handle file input from button click
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(Array.from(e.target.files));
      
      // Clear the input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle file drop
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Upload files directly to API
  const uploadFiles = (filesToUpload: File[]) => {
    filesToUpload.forEach(file => {
      const formData = new FormData();
      formData.append("file", file);
      
      // Upload directly without state management
      upload(formData, {
        onSuccess: (data: FileUploadResponse) => {
          const { filePath, blurhash } = data.payload;
          
          // Update form values directly with new file
          const newFile = { path: filePath, blurhash };
          const updatedFiles = [...formFiles, newFile];
          setValue("files", updatedFiles);
        }
      });
    });
  };

  // Remove file from form
  const removeFile = (index: number) => {
    const updatedFiles = [...formFiles];
    updatedFiles.splice(index, 1);
    setValue("files", updatedFiles);
  };

  // Drag event handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Drag and drop reordering handlers
  const handleFileItemDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleFileItemDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;
    
    const reorderedFiles = [...formFiles];
    const draggedFile = reorderedFiles[draggedItem];
    reorderedFiles.splice(draggedItem, 1);
    reorderedFiles.splice(index, 0, draggedFile);
    
    // Update form state directly
    setValue("files", reorderedFiles);
    
    // Update the drag index to the new position
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="w-full">
      <div
        className={`w-full py-4 flex flex-col justify-center items-center border ${
          isDragging ? 'border-[#6941C6] bg-[#F9F5FF] dark:bg-[#1D1B31]' : 'border-[#EAECF0] dark:border-[#1F242F]'
        } rounded-lg transition-colors mb-4`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="size-10 flex justify-center items-center rounded-lg border border-[#EAECF0] dark:border-[#1F242F]">
          <UploadIcon size={20} />
        </div>
        <div className="text-center">
          <label 
            htmlFor="uploader" 
            className="text-[#6941C6] dark:text-[#CECFD2] font-semibold cursor-pointer"
          >
            Click to upload
          </label>
          <p className="text-[#475467] dark:text-[#94969C]">
            {isDragging ? 'Drop your files here' : 'Or drag and drop - SVG, PNG, JPG or GIF'}
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          id="uploader"
          multiple
          ref={fileInputRef}
          onChange={handleFileInput}
          accept=".svg,.png,.jpg,.jpeg,.gif"
        />
      </div>

      {formFiles.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-[#344054] dark:text-[#CECFD2] mb-2">
            Uploaded files ({formFiles.length}) {isUploading && <span className="text-[#6941C6] ml-2">• Uploading...</span>}
          </p>
          <div className="space-y-2">
            {formFiles.map((file: UploadedFile, index: number) => (
              <div
                key={`file-${index}-${file.path}`}
                className={`flex items-center p-2 border border-[#EAECF0] dark:border-[#1F242F] rounded-lg ${
                  draggedItem === index ? 'opacity-50' : 'opacity-100'
                }`}
                draggable
                onDragStart={() => handleFileItemDragStart(index)}
                onDragOver={(e) => handleFileItemDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                <div className="size-10 mr-3 flex-shrink-0 overflow-hidden rounded-md border border-[#EAECF0] dark:border-[#333741]">
                  {file.path ? (
                    <img 
                      src={file.path} 
                      alt="Uploaded file" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-50 dark:bg-gray-800">
                      <span className="text-xs text-[#475467] dark:text-[#94969C]">File</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#344054] dark:text-[#CECFD2] truncate">
                    {file.path ? file.path.split('/').pop() : "File"}
                  </p>
                </div>
                <button
                  type="button"
                  className="ml-auto text-[#475467] dark:text-[#94969C] hover:text-red-500 dark:hover:text-red-400"
                  onClick={() => removeFile(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div 
                  className="ml-2 px-1 cursor-grab"
                  title="Drag to reorder"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#475467] dark:text-[#94969C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Uploader;