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

const useFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["upload-files"],
    mutationFn: async (data: FormData): Promise<FileUploadResponse> => {
      const res = await api.post('/manager/files', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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

  const upload = (formData: FormData) => {
    mutate(formData);
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