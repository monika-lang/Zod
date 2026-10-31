import { useState } from "react"
import React from "react";
import { emailAndPassword } from "../schemas/Schemas";
import type { ZodError } from "zod";

const EmailAndPasswordPage = () => {

    const [errors, setErrors] = useState<ZodError | null>(null);
    const [formData, SetFormData] = useState({
        email: '',
        password: ''
    })

    const SubmitionHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const results = emailAndPassword.safeParse(formData);

        if (!results.success) {
            setErrors(results.error);
        }
    }

    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            {errors ? (
                <div>
                <p>Errors:</p>
                <ul>
                    {
                        errors?.issues.map((value, index) => {
                            return(
                                <li key={index} className="text-red-500">{value.message}</li>
                            )
                        })
                    }
                </ul>
            </div>
            ) : (<div></div>)}
            <form action="post" onSubmit={SubmitionHandler} className="flex flex-col items-center justify-center gap-6">

                {/* NOTE FROM DEV: type text was used in this input because otherwise the auto notification for email format wouldn't have alllowed the user to see the custom error show up*/}
                <input type="text" name="email" id="email" value={formData.email} className="border-2 p-3 w-80" onChange={(e) => {SetFormData({email: e.target.value, password:formData.password})}}/>


                <input type="password" name="password" id="password" value={formData.password} className="border-2 p-3 w-80" onChange={(e) => {SetFormData({email: formData.email, password:e.target.value})}}/>
                <input type="submit" value={"Submit"} className="border p-2"/>
            </form>
        </div>
    )
}

export default EmailAndPasswordPage;