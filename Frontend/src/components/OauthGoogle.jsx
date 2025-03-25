import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function OauthGoogle() {
    const handleGoogleSuccess = async (credentialsResponse) => {
        try {
            const res = await axios.post(
                `${backendUrl}/auth/google`,
                { accessToken: credentialsResponse.credential },
                { withCredentials: true }
            );
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                window.location.href = "/welcome";
            }
        } catch (error) {
            console.log("Google login failed:", error);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Google login error")}
                text="continue_with"
                shape="pill"
                theme="outline"
                size="large"
                width="300"
                logo_alignment="left"
            />
        </div>
    );
}
