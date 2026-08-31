const API_BASE_URL = "/api/auth";

export async function signup(email, password) {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const text = await response.text();

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        throw new Error(text || "회원가입 요청에 실패했습니다.");
    }

    if (!response.ok) {
        throw new Error(
            data.detail || data.message || "회원가입에 실패했습니다."
        );
    }

    return data;
}


export async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const text = await response.text();

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        throw new Error(text || "로그인 요청에 실패했습니다.");
    }

    if (!response.ok) {
        throw new Error(
            data.detail || data.message || "로그인에 실패했습니다."
        );
    }

    // 로그인 정보 저장
    localStorage.setItem("access_token", data.access_token);

    // 백엔드가 username을 보내면 username 저장
    // 없으면 email을 임시로 사용
    localStorage.setItem(
        "username",
        data.username || data.email || email
    );

    return data;
}


export function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
}


export function isLoggedIn() {
    return !!localStorage.getItem("access_token");
}


export function getUsername() {
    return localStorage.getItem("username");
}