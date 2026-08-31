export const imageRagApi = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch("/image-rag/", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        let errorMessage = "이미지 분석에 실패했습니다.";

        try {
            const errorData = await response.json();

            if (errorData.detail) {
                errorMessage = errorData.detail;
            }
        } catch (error) {
            // JSON 응답이 아닌 경우 기본 메시지 사용
        }

        throw new Error(errorMessage);
    }

    return response.json();
};