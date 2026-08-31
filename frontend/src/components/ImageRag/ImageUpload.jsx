import React from "react";
import styled from "styled-components";

export default function ImageUpload({
                                        file,
                                        preview,
                                        onFileChange,
                                        onSubmit,
                                        isLoading,
                                    }) {
    return (
        <Container>
            <Title>Image RAG</Title>

            <Description>
                분석할 이미지를 업로드하세요.
            </Description>

            <UploadBox>
                <HiddenInput
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                />

                <UploadLabel htmlFor="image-upload">
                    {file ? "이미지 변경" : "이미지 선택"}
                </UploadLabel>

                {file && (
                    <FileName>
                        {file.name}
                    </FileName>
                )}
            </UploadBox>

            {preview && (
                <PreviewWrapper>
                    <Preview
                        src={preview}
                        alt="업로드 이미지 미리보기"
                    />
                </PreviewWrapper>
            )}

            <AnalyzeButton
                onClick={onSubmit}
                disabled={!file || isLoading}
            >
                {isLoading ? "분석 중..." : "이미지 분석"}
            </AnalyzeButton>
        </Container>
    );
}


const Container = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 40px;
    box-sizing: border-box;
`;

const Title = styled.h1`
    margin: 0 0 10px;
    font-size: 32px;
`;

const Description = styled.p`
    margin: 0 0 30px;
    color: #666;
`;

const UploadBox = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    border: 1px dashed #aaa;
    border-radius: 12px;
`;

const HiddenInput = styled.input`
    display: none;
`;

const UploadLabel = styled.label`
    display: inline-block;
    padding: 10px 18px;
    border-radius: 8px;
    background: #222;
    color: white;
    cursor: pointer;

    &:hover {
        opacity: 0.85;
    }
`;

const FileName = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const PreviewWrapper = styled.div`
    margin-top: 25px;
    display: flex;
    justify-content: center;
`;

const Preview = styled.img`
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
    border-radius: 12px;
`;

const AnalyzeButton = styled.button`
    width: 100%;
    margin-top: 25px;
    padding: 14px;

    border: none;
    border-radius: 8px;

    background: #222;
    color: white;

    font-size: 16px;
    cursor: pointer;

    &:disabled {
        background: #aaa;
        cursor: not-allowed;
    }
`;