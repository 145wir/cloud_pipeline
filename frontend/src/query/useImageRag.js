import { useMutation } from "@tanstack/react-query";
import { imageRagApi } from "../api/imageRagApi";

export const useImageRag = () => {
    return useMutation({
        mutationFn: imageRagApi,
    });
};