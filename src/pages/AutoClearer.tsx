import React, {useState} from "react"
import { AutoClearerSchema } from "../schemas/Schemas";
import type { ZodSafeParseResult } from "zod";


const AutoClearerPage = () => {

    const [username, password] = AutoClearerSchema;

    const [usernameError, SetUsernameError] = useState("");
    const [passwordError, SetPasswordError] = useState("");

    const ChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        
        let name = event.target.name;

        let results:ZodSafeParseResult<string>|null = null;

        let stateSetter:React.Dispatch<React.SetStateAction<string>>|null = null; 

        if (name === "username") {
            results = username.safeParse(event.target.value);
            stateSetter = SetUsernameError;
        }
        else {
            results = password.safeParse(event.target.value);
            stateSetter = SetPasswordError;
        }

        if (!results!.success) {
            event.target.value = "";
            stateSetter(results!.error.issues[0].message);
            console.log("WRONG");
        }
        else {
            stateSetter("");
            console.log("RIGHT")
        }
    }

    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <form action="post" className="flex flex-col items-center justify-center gap-6">

                <div className="flex flex-col w-100">
                    <label htmlFor="username" className="text-xs">Name:</label>
                    <input type="text" name="username" className="p-2 border-2 border-blue-500 rounded-2xl" onChange={ChangeHandler}/>
                    <label htmlFor="username" className="text-xs text-red-500">{usernameError}</label>
                </div>
                
                <div className="flex flex-col w-100">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" className="p-2 border-2 border-blue-500 rounded-2xl" onChange={ChangeHandler}/>
                    <label htmlFor="username" className="text-xs text-red-500">{passwordError}</label>
                </div>

                <input type="submit" value={"Submit"} className="border p-2 rounded-2xl border-blue-600 hover:bg-blue-300 focus:bg-blue-600 focus:text-white"/>
            </form>
        </div>
    )
}

export default AutoClearerPage;