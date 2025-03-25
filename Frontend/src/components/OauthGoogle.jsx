import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function OauthGoogle(){

    const navigate = useNavigate();


    const handleGoogleSuccess = async (credentialsResponse) => {
        try{
            const res = await axios.post(`${backendUrl}/auth/google`,{
                accessToken : credentialsResponse.credential
            } , { withCredentials : true });
            if(res.status === 200){
                localStorage.setItem("token", res.data.token);
                console.log('logged in');
                if(res.data.hasApiKey){
                    navigate("/dashboard");
                }
                else{
                    navigate("/getkey");
                }
            }
        } catch(error){
            console.log(error);
            console.log("Google log in faild");
        }
    }


    return(
        <div>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={()=> console.log("Google error")}/>
        </div>
    )
}