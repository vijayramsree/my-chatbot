/* eslint-disable @next/next/no-img-element */
// Upload Page: Designed with a visually appealing UI and integrated with the app's theme.
// Drag and Drop Feature: Implemented using the react-dropzone package for seamless file handling.
// File Management: Supports uploading and managing various file formats. i.e Now allow only PDF files

"use client";

import { useState } from "react";
import { Loader } from "@/components/Loader";
import { useLoading } from "@/app/providers/LoadingProvider";
import { uploadFile } from "@/app/lib/api";
import { RiArrowRightLine } from "react-icons/ri";
import { HiDocumentText } from "react-icons/hi2";
import { useDropzone } from 'react-dropzone';
import { Button, Callout, Heading, Text } from "@radix-ui/themes";
import cn from "classnames";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function UploadPage() {
  const { setIsLoading } = useLoading();
  const [error, setError] = useState<string>(undefined);
  const [file, setFile] = useState<File>(undefined);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds the limit; it must not be larger than 5MB.");
        setFile(undefined);
        return;
      }
      setError(undefined)
      setFile(file);
    },
    accept: {
      "application/pdf": [],
    },
    multiple: undefined,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined
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
    } catch {
      setError("Upload failed");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-[90%] flex-col items-center justify-between p-6 sm:p-12 md:p-24">
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
                <img data-testid="NM" src="https://www.northwesternmutual.com/template/assets/3.8.17/images/logos/logo-horizontal-navy.svg" alt="NM" />
            </Heading>
            <Text as="p" mb="4">
                Upload a PDF to start the chat conversation with your file.
            </Text>
            <div
                {...getRootProps()}
                className={cn(
                    "flex flex-col items-center justify-center w-full h-64 sm:h-80 border-2 border-dashed border-stone-700 rounded-lg",
                    file ? "bg-blue-200" : "bg-gray-200"
                  )}>
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