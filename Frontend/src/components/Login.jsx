import { GoogleOAuthProvider } from "@react-oauth/google";
import { OauthGoogle } from "./OauthGoogle";

const logoPath = "/images/logo.png";

export function Login() {
    const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    return (
        <GoogleOAuthProvider clientId={googleClientID}>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3A5BEF] via-[#5E3BEF] to-[#8A3FFC] p-4">
                <div className="bg-white rounded-xl shadow-2xl p-12 w-full max-w-lg h-[600px] mx-4 flex flex-col">
                    {/* Logo/Title section with reduced bottom margin */}
                    <div className="text-center space-y-6 mb-8">
                        <div className="flex justify-center">
                            <img 
                                src={logoPath}
                                alt="Code Compass AI Logo" 
                                className="h-20 w-auto transition-transform duration-300 hover:scale-105" 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-gray-900">
                                Code Compass AI
                            </h1>
                            <p className="text-gray-600 font-medium">
                                Create an account
                            </p>
                        </div>
                    </div>

                    {/* Google OAuth Button moved higher */}
                    <div className="mt-8 flex items-center justify-center">
                        <div className="w-full transform transition-all duration-300 hover:scale-[1.01]">
                            <OauthGoogle />
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}