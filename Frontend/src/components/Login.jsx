import { GoogleOAuthProvider } from "@react-oauth/google";
import { OauthGoogle } from "./OauthGoogle";

export function Login() {

    const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return (
        <GoogleOAuthProvider clientId={googleClientID}>
            <div className='flex flex-row bg-slate-600 p-10 justify-center w-full h-screen'>
                <div className='flex flex-col justify-center gap-5'>
                    <h1 className='font-extrabold text-5xl text-slate-300'>LOG IN </h1>
                    <OauthGoogle/>
                </div>
            </div>
        </GoogleOAuthProvider>
    )
}