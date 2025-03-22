"use client"
import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface FileUploadResponse {
  payload: {
    filePath: string;
    blurhash: string;
  }
}

interface UploadedFile {
  path: string;
  blurhash: string;
}

interface UploadCallbacks {
  onSuccess?: (data: FileUploadResponse) => void;
  onError?: (error: any) => void;
}

const useFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["upload-files"],
    mutationFn: async (data: FormData): Promise<FileUploadResponse> => {
      const res = await api.post('/manager/files', data);
      return res.data;
    },
    onSuccess: (data) => {
      const { filePath, blurhash } = data.payload;

      const newFile = {
        path: filePath,
        blurhash
      };

      setUploadedFiles(prev => [...prev, newFile]);
      setFiles([]);
      toast.success("File uploaded successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to upload file");
    }
  });

  // Enhanced upload function that accepts callbacks
  const upload = (formData: FormData, callbacks?: UploadCallbacks) => {
    mutate(formData, {
      onSuccess: (data) => {
        // Call custom success callback if provided
        if (callbacks?.onSuccess) {
          callbacks.onSuccess(data);
        }
      },
      onError: (error) => {
        // Call custom error callback if provided
        if (callbacks?.onError) {
          callbacks.onError(error);
        }
      }
    });
  };

  return {
    files,
    setFiles,
    upload,
    uploadedFiles: uploadedFiles.map(({ path, blurhash }) => ({ path, blurhash })),
    setUploadedFiles,
    isUploading: isPending
  };
};

export default useFiles;