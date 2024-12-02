"use client";

import { useState } from "react";
import { Loader } from "@/components/Loader";
import { useLoading } from "@/app/providers/LoadingProvider";
import { uploadFile } from "@/app/lib/api";
import { RiArrowRightLine } from "react-icons/ri";
import { HiDocumentText } from "react-icons/hi2";
import { useDropzone } from 'react-dropzone';
import { Button, Callout, Heading, Text } from "@radix-ui/themes";

export default function UploadPage() {
  const { setIsLoading } = useLoading();
  const [error, setError] = useState<string>(undefined);
  const [file, setFile] = useState<File>(undefined);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0]
        setFile(file);
    },
    accept: {
        "application/pdf": [],
      },
  });

  const handleUpload = async () => {
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await uploadFile(file);
      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
        setIsLoading(false);
        return;
      }

      window.location.href = `/chat/`;
    } catch (err) {
      setError("Upload failed");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-full flex-col items-center justify-between p-6 sm:p-12 md:p-24 bg-stone-900">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <div className="m-auto relative">
            <Loader />
            <div className="text-center m-auto">
                {error && (
                <Callout.Root mb="6" color="red">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
                )}
            <Heading as="h1" size="8" mb="4">
                Upload PDF
            </Heading>
            <Text as="p" mb="4">
                Upload a PDF to start the chat conversation with your file.
            </Text>
            <div
                {...getRootProps()}
               className="flex flex-col items-center justify-center w-full h-64 sm:h-80 border-2 border-dashed border-stone-700 bg-stone-800 rounded-lg"
                >
                <input {...getInputProps()} role="fileInput" />
                <HiDocumentText className="text-5xl" />
                <Text as="p" mb="4" className="text-sm sm:text-base">
                    {!file
                        ? "Drag and drop a file, or click here to browse"
                        : file.name} 
                </Text>
            </div>
            <div className="mt-4 sm:mt-6">
                <Button
                disabled={!file}
                className="w-full"
                onClick={handleUpload}
                size="3"
                >
                    <RiArrowRightLine />
                    Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}