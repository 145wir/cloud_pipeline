import { useState } from "react";
import styled from "styled-components";

import { useLogin } from "../../query/useAuth";


export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useLogin();


    const handleSubmit = (e) => {
        e.preventDefault();

        loginMutation.mutate(
            {
                email,
                password,
            },
            {
                onSuccess: (data) => {
                    localStorage.setItem(
                        "access_token",
                        data.access_token
                    );

                    localStorage.setItem(
                        "username",
                        data.username || email
                    );

                    alert("로그인 성공");

                    // 로그인 성공 후 메인 페이지로 이동 + UI 갱신
                    window.location.href = "/";
                },
            }
        );
    };


    return (
        <Container>

            <Title>로그인</Title>

            <Form onSubmit={handleSubmit}>

                <Input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                >
                    {loginMutation.isPending
                        ? "로그인 중..."
                        : "로그인"}
                </Button>

            </Form>

            {loginMutation.isError && (
                <Error>
                    {loginMutation.error.message}
                </Error>
            )}

        </Container>
    );
}


const Container = styled.div`
    width: 400px;
    margin: 100px auto;
`;

const Title = styled.h1`
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Input = styled.input`
    padding: 12px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 12px;
    cursor: pointer;
`;

const Error = styled.p`
    text-align: center;
`;