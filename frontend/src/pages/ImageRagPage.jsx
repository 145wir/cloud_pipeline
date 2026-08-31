import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useImageRag } from "../query/useImageRag";
import ImageUpload from "../components/ImageRag/ImageUpload";
import ImageResult from "../components/ImageRag/ImageResult";


export default function ImageRagPage() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const {
        mutate,
        data,
        isPending,
        isError,
        error,
        reset,
    } = useImageRag();


    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        if (!selectedFile.type.startsWith("image/")) {
            alert("이미지 파일만 선택할 수 있습니다.");
            return;
        }

        setFile(selectedFile);

        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);

        reset();
    };


    const handleSubmit = () => {
        if (!file) {
            alert("이미지를 먼저 선택해주세요.");
            return;
        }

        mutate(file);
    };


    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);


    return (
        <Page>
            <ImageUpload
                file={file}
                preview={preview}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
                isLoading={isPending}
            />

            {isError && (
                <ErrorMessage>
                    {error?.message || "이미지 분석에 실패했습니다."}
                </ErrorMessage>
            )}

            <ImageResult
                result={data?.result}
            />
        </Page>
    );
}


const Page = styled.div`
    min-height: 100vh;
    padding: 40px 20px;
    box-sizing: border-box;
`;

const ErrorMessage = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 20px auto;
    padding: 15px;

    box-sizing: border-box;

    border-radius: 8px;

    background: #ffecec;
    color: #d00;
`;