import { FileUploadButtonProps } from './FileUploadButton.types';
import { useCallback, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';

export const useFileUploadButton = ({
  onFileSelect,
  label,
}: Pick<FileUploadButtonProps, 'onFileSelect' | 'label'>) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFileSelect(file);
      e.target.value = '';
    },
    [onFileSelect],
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0] as File | undefined;
      if (file) onFileSelect(file);
    },
    [onFileSelect],
  );

  const id = `file-upload-${label}`;

  return {
    handleFileInput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragging,
    id,
  };
};
