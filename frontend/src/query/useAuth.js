import { useMutation } from "@tanstack/react-query";

import {
    signup,
    login,
} from "../api/authApi";


export function useSignup() {
    return useMutation({
        mutationFn: ({ email, password }) =>
            signup(email, password),
    });
}


export function useLogin() {
    return useMutation({
        mutationFn: ({ email, password }) =>
            login(email, password),
    });
}