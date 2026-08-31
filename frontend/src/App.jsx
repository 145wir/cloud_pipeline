import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";

import { useState } from "react";
import styled from "styled-components";

import ImageRagPage from "./pages/ImageRagPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";


function Header() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("access_token")
    );

    const [username, setUsername] = useState(
        localStorage.getItem("username")
    );

    // 로그인 성공 시 호출
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setUsername(localStorage.getItem("username"));
    };

    // 로그아웃
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");

        setIsLoggedIn(false);
        setUsername(null);

        navigate("/");
    };

    return (
        <HeaderContainer>
            <Logo>
                <Link to="/">Image RAG</Link>
            </Logo>

            <Nav>
                {isLoggedIn ? (
                    <>
                        <LogoutButton onClick={handleLogout}>
                            로그아웃
                        </LogoutButton>

                        <UserCard>
                            {username || "사용자"}
                        </UserCard>
                    </>
                ) : (
                    <>
                        <NavButton as={Link} to="/login">
                            로그인
                        </NavButton>

                        <NavButton as={Link} to="/signup">
                            회원가입
                        </NavButton>
                    </>
                )}
            </Nav>
        </HeaderContainer>
    );
}


export default function App() {
    return (
        <BrowserRouter>
            <AppContainer>
                <Header />

                <Main>
                    <Routes>
                        <Route path="/" element={<ImageRagPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Routes>
                </Main>
            </AppContainer>
        </BrowserRouter>
    );
}


const AppContainer = styled.div`
    min-height: 100vh;
    background: #ffffff;
`;

const HeaderContainer = styled.header`
    height: 60px;
    border-bottom: 1px solid #e5e5e5;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 32px;
    box-sizing: border-box;
`;

const Logo = styled.div`
    font-size: 20px;
    font-weight: 700;

    a {
        color: #111;
        text-decoration: none;
    }
`;

const Nav = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const NavButton = styled.button`
    height: 44px;
    padding: 0 18px;

    border: 1px solid #ddd;
    border-radius: 8px;

    background: #fff;
    color: #222;

    font-size: 15px;
    text-decoration: none;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &:hover {
        background: #f7f7f7;
    }
`;

const LogoutButton = styled(NavButton)`
    cursor: pointer;
`;

const UserCard = styled.div`
    min-width: 120px;
    height: 44px;

    padding: 0 16px;
    box-sizing: border-box;

    border: 1px solid #ddd;
    border-radius: 8px;

    background: #f8f9fa;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    font-weight: 600;
    color: #333;
`;

const Main = styled.main`
    width: 100%;
`;