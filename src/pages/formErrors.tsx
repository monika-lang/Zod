import React, { useState } from "react"
import { formErrorsSchema } from "../schemas/Schemas";


const FormErrors = () => {
    const [formData, SetFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [errors, SetErrors] = useState<Record<string, string>>();

    const SubmitionHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const results = formErrorsSchema.safeParse(formData);

        let object_issues:Record<string, string> = {};

        if (!results.success) {
            const issues = results.error.issues;
            issues.map((value) => {
                object_issues[value.path[0].toString()] = value.message;
            })
        }
        SetErrors(object_issues);
    }

    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <form action="post" className="flex flex-col items-center justify-center gap-6" onSubmit={SubmitionHandler}>

                <div className="flex flex-col">
                    <input type="text" name="username" id="username" className="border-2 p-1 w-80 rounded-2xl border-blue-600" placeholder="Username" value={formData.username} onChange={(e) => {SetFormData({username:e.target.value, email:formData.email, password:formData.password})}}/>
                <label htmlFor="username" className="text-xs text-red-500">{errors?.username}</label>
                </div>
                
                {/* NOTE FROM DEV: type text was used in this input because otherwise the auto notification for email format wouldn't have alllowed the user to see the custom error show up*/}
                <div className="flex flex-col">
                <input type="text" formNoValidate name="email" id="email" className="border-2 p-1 w-80 rounded-2xl border-blue-600" placeholder="Email" value={formData.email} onChange={(e) => {SetFormData({username:formData.username, email:e.target.value, password:formData.password})}}/>
                <label htmlFor="email" className="text-xs text-red-500">{errors?.email}</label>
                </div>
                
                <div className="flex flex-col">
                <input type="password" name="password" id="password" className="border-2 p-1 w-80 rounded-2xl border-blue-600" placeholder="Password" value={formData.password} onChange={(e) => {SetFormData({username:formData.username, email:formData.email, password:e.target.value})}}/>
                <label htmlFor="password" className="text-xs text-red-500">{errors?.password}</label>
                </div>

                <input type="submit" value={"Submit"} className="border p-2 rounded-2xl border-blue-600 hover:bg-blue-300 focus:bg-blue-600 focus:text-white"/>
            </form>
        </div>
    )
}

export default FormErrors;