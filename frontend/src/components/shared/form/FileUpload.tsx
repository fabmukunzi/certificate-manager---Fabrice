import React, { FC } from 'react';
import './styles.css';
import Button from '../button';
import { useTranslate } from '@/contexts/AppContext';
import { useToast } from '@/contexts/ToastContext';

interface FileUploadProps {
  label: string;
  accept: string;
  name: string;
  onChangeValue: (name: string, value: string | Date) => void;
  previewUrl?: string;
}

const FileUpload: FC<FileUploadProps> = ({
  label,
  name,
  accept,
  onChangeValue,
  previewUrl,
}) => {
  const { translate } = useTranslate();
  const { showToast } = useToast();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const fileSizeLimit = 5 * 1024 * 1024;
      if (file.size > fileSizeLimit) {
        showToast(
          'error',
          translate(
            'File size exceeds the 5MB limit. Please upload a smaller file.',
          ),
        );
        return;
      }
    }
    if (file && file.type === accept) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onChangeValue(name, reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      showToast('error', '❌ Please upload a valid file.');
    }
  };
  const handleRemoveFile = () => {
    onChangeValue(name, '');
  };
  return (
    <div className="file-upload">
      <div>
        <label htmlFor="file-upload" className="button">
          {label}
        </label>
        <input
          hidden
          type="file"
          id="file-upload"
          accept={accept}
          onChange={handleFileChange}
        />
        <Button
          onClick={handleRemoveFile}
          label={translate('Remove')}
          type="button"
          className="delete-button"
        />
      </div>
      <iframe
        height={350}
        width={80}
        style={{ zIndex: '99' }}
        src={previewUrl}
        title="File Preview"
      ></iframe>
    </div>
  );
};

export default FileUpload;
