import React from 'react';
import { createClient } from '@supabase/supabase-js';

// Constants
const SUPABASE_CONFIG = {
  bucket: 'payments',
  url: 'https://amktmgnklpjhdoyopqzs.supabase.co',
  publicUrl: 'https://amktmgnklpjhdoyopqzs.supabase.co/storage/v1/object/public',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFta3RtZ25rbHBqaGRveW9wcXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5ODc5ODcsImV4cCI6MjA0NzU2Mzk4N30.ipQtOD0i3Jv6-GEuscpG8V_VHEnIBNtSy-yV0mqhOy8',
};

// Supabase client
const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);

// Custom hooks
export const useFileUpload = () => {
  const uploadFile = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = `payment_proof_${userId}_${Date.now()}.png`;

    const { data, error } = await supabase.storage
      .from(SUPABASE_CONFIG.bucket)
      .upload(fileName, blob, {
        contentType: 'image/png',
      });

    if (error) {
      console.error(error);
      return null;
    }

    return `${SUPABASE_CONFIG.publicUrl}/${data.path}`;
  };

  return { uploadFile };
};

export const useFileState = () => {
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  const [fileId, setFileId] = React.useState(null);

  const resetFile = () => {
    setFile(null);
    setFileName('');
    setFileId(null);
  };

  return { file, setFile, fileName, setFileName, fileId, setFileId, resetFile };
};