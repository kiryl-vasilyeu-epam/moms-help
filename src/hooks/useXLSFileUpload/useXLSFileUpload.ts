import { readExcelFile } from "@/helpers";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export type ParseFunction<T, A> = (data: unknown[][], args: A) => T
export interface FileUploadState<T> {
  fileName: string | null;
  handleFileChange: (file: File) => void;
  isReady: boolean;
  processFiles: (<A>(parseFunction: ParseFunction<T, A>, args: A) => T | null);
  clearFiles: () => void;
  loading: boolean;
}

export const useXLSFileUpload = <T>(): FileUploadState<T> => {
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

  const processFiles = useCallback(<A, >(parseFunction: ParseFunction<T, A>, args: A) => {
    if (!fileData) return null;

    const items = parseFunction(fileData, args);

    return items;
  }, [fileData]);

  const clearFiles = useCallback(() => {
    setFileData(null);
    setFileName(t('fileUpload.fileNotSelected'));
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
