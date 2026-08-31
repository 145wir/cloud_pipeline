import React from "react";
import styled from "styled-components";

export default function ImageResult({ result }) {
    if (!result) {
        return null;
    }

    return (
        <Container>
            <Title>분석 결과</Title>

            <Result>
                {result}
            </Result>
        </Container>
    );
}


const Container = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 30px auto 0;
    padding: 25px;

    box-sizing: border-box;

    border-radius: 12px;
    background: #f5f5f5;
`;

const Title = styled.h2`
    margin: 0 0 15px;
    font-size: 22px;
`;

const Result = styled.div`
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
`;