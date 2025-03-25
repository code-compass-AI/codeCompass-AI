import { useState } from "react"

export function GetKey() {
    const [apiKey, setApiKey] = useState('');
    return (
        <div className="bg-slate-600 flex flex-row justify-center w-screen h-screen">
            <div className="bg-white p-10">
                <h1 className="text-5xl">GET YOUR API KEY</h1>
                <p>Follow the steps to get your API key</p>
                <ol>
                    <li><b> Create an Account on Mistral AI </b></li>
                    <ol>
                        
                        <li>Go to OpenRouter<a href="https://openrouter.ai/" target="_blank">click here</a></li>
                        <li>Click on "Sign Up"</li>
                        <li>Register using Google or Email & Password</li>
                    </ol>

                    <br /><br />

                    <li><b>Access API Key</b></li>
                    <ol>
                        <li>After logging in, navigate to the API Keys section:</li>
                        <ul>
                            <li>Click on your profile (top-right corner)</li>
                            <li>Select "API Keys"</li>
                        </ul>
                        <li>Click on "Generate New API Key"</li>
                        <li>Copy the generated API key (you won’t be able to see it again later).</li>
                    </ol>
                    <br /><br />
                    <li><b>Generate & Copy Your API Key</b></li>
                    <ol>
                        <li>Give your API key a name (e.g., "MyApp Key").</li>
                        <li>Click Generate.</li>
                        <li>Once generated, copy the API key. <br></br>⚠️ Important: You won’t be able to see it again, so save it securely.</li>
                    </ol>
                    <br /><br />
                    <li>Provide Your API Key in Our App</li>
                    <p>please enter your api key in the input field and click submit</p>
                </ol>
                <br /><br />
                <input className=" rounded-sm border border-slate-700" 
                    placeholder="Enter your API key here"
                    onChange={(e) => {
                    setApiKey(e.target.value);
                }} />
                <br /><br />
                <button onClick={() => {
                    console.log(apiKey);
                }}>Submit</button>
            </div>


        </div>
    )
}