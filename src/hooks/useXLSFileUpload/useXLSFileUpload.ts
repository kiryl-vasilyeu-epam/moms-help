import { readExcelFile } from "@/helpers";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export type ParseFunction<T> = (data: unknown[][]) => T
export interface FileUploadState<T> {
  fileName: string | null;
  handleFileChange: (file: File) => void;
  isReady: boolean;
  processFiles: () => T | null;
  clearFiles: () => void;
  loading: boolean;
}

export const useXLSFileUpload = <T>(parseFunction: ParseFunction<T>): FileUploadState<T> => {
  const { t } = useTranslation();
  const [fileData, setFileData] = useState<unknown[][] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = useCallback(async (file: File) => {
    setLoading(true);
    try {
      const data = await readExcelFile(file);
      setFileData(data);
      setFileName(file.name);
    } catch (error) {
      console.error('Failed to read file:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const processFiles = useCallback(() => {
    if (!fileData) return null;

    const items = parseFunction(fileData);

    return items;
  }, [fileData, parseFunction]);

  const clearFiles = useCallback(() => {
    setFileData(null);
    setFileName(t('fileNotSelected'));
  }, [t]);

  const isReady = fileData !== null;

  return {
    fileName,
    handleFileChange,
    processFiles,
    clearFiles,
    isReady,
    loading
  };
};
