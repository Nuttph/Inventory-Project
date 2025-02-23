"use client"
import { useState } from "react";
// import Link from "next/link";
import Login from "./components/Login";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUploadResult(`File uploaded successfully: ${data.file}`);
      } else {
        setUploadResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setUploadResult('Upload failed');
      console.log(error)
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
      <Login />
      <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadResult && <p>{uploadResult}</p>}
    </div>
    </div>
  );
}