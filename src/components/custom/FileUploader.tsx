"use client";

import { useFileUpload } from "@/hooks/useFileUpload";
import { usePathname } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

interface FileUploaderProps {
  innerText: string;
  extensions?: string;
}

const FileUploader = ({ innerText, extensions }: FileUploaderProps) => {
  const { setFileData, resetFileData } = useFileUpload();
  const pathname = usePathname();

  const [selectedFiles, setSelectedFiles] = useState({
    fileName: "",
    contentType: "",
    fileSize: "",
    documentBody: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    resetFileData();
  }, [pathname]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      setSelectedFiles({
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size.toString(),
        documentBody: await readFileAsBase64(file),
      });

      setFileData({
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size.toString(),
        documentBody: await readFileAsBase64(file),
        name: "MedicalRequestAttach",
        healthProgramCode: "150",
      });
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file as base64."));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        multiple={false}
        className="hidden"
        onChange={handleFileChange}
        accept={extensions ? extensions : ".jpeg, .png, .pdf"}
      />
      <div className="flex flex-col flex-wrap md:flex-row">
        <button
          type="button"
          className="bg-red-400 hover:opacity-70 text-white font-bold py-3 uppercase px-4 rounded-lg flex items-center justify-center"
          onClick={handleUploadClick}
        >
          {innerText}
          <FiUpload className="text-white ml-2" size="1.2em" />
        </button>
        <div className="mt-3 md:ml-3">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.fileName.length > 0 && (
              <div className="bg-gray-300 rounded-xl px-5 py-2">
                <span className="text-gray-700 text-sm">
                  {selectedFiles.fileName.substring(0, 20) +
                    "..." +
                    selectedFiles.fileName.split(".").pop()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
