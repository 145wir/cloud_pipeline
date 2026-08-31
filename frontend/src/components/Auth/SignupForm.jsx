import { useState } from "react";
import styled from "styled-components";

import { useSignup } from "../../query/useAuth";


export default function SignupForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signupMutation = useSignup();


    const handleSubmit = (e) => {
        e.preventDefault();

        signupMutation.mutate(
            {
                email,
                password,
            },
            {
                onSuccess: () => {
                    alert("회원가입이 완료되었습니다.");
                    setEmail("");
                    setPassword("");
                },
            }
        );
    };


    return (
        <Container>

            <Title>회원가입</Title>

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
                    disabled={signupMutation.isPending}
                >
                    {signupMutation.isPending
                        ? "가입 중..."
                        : "회원가입"}
                </Button>

            </Form>

            {signupMutation.isError && (
                <Error>
                    {signupMutation.error.message}
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