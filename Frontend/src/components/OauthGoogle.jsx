import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function OauthGoogle(){



    const handleGoogleSuccess = async (credentialsResponse) => {
        console.log(credentialsResponse);
        console.log(credentialsResponse.credential);
        try{
            const res = await axios.post(`${backendUrl}/auth/google`,{
                accessToken : credentialsResponse.credential
            } , { withCredentials : true });
            if(res.status === 200){
                localStorage.setItem("token", res.data.token);
                console.log('logged in');
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