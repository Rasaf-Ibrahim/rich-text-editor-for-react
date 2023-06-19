import { useState } from 'react';

export function useUploadImage() {

  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const uploadImage = async (formData) => {

    setStatus('loading');

    try {
    
      const response = await fetch(`localhost:3000/api/v1/image/upload-one`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      const result = await response.json()
      setData(result)
      setStatus('success')

    } catch (error) {
      setError(error)
      setStatus('error')
    }
  }

  return {
    uploadImage,
    status,
    data,
    error,
  }
  
}
