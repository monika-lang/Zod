import { useState } from "react";
import { programmerProfileSchema } from "../schemas/Schemas";

const ProgrammerProfile = () => {
    
    type LanguageType = "C++" | "C#" | "Javascript" | "Python" | "";

    type formDataType = {
        name?: string,
        age?: number,
        language?: LanguageType
    }

    const [formData, SetFormData] = useState<formDataType>({name: "", age:0, language:""});

    const [validated, SetValidation] = useState(false);

    const [errors, SetErrors] = useState<Record<string, string>>();
    
    const SubmitionHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        SetErrors({});

        const results = programmerProfileSchema.safeParse(formData);

        let object_issues:Record<string, string> = {};

        if (!results.success) {
            const issues = results.error.issues;
            issues.map((value) => {
                object_issues[value.path[0].toString()] = value.message;
            })
            SetErrors(object_issues);
        }
        else {
            SetValidation(true);
        }
    }
    
    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <form action="post" className="flex flex-col items-center justify-center gap-6" onSubmit={SubmitionHandler}>

                <div className="flex flex-col w-100">
                    <label htmlFor="name" className="text-xs">Name:</label>
                    <input type="text" value={formData?.name} name="name" placeholder="Name" onChange={(e) => {SetFormData({name:e.target.value, age: formData?.age, language:formData?.language})}} className="p-2 border-2 border-blue-500 rounded-2xl"/>
                    <label htmlFor="name" className="text-xs text-red-500">{errors?.name}</label>
                </div>
                
                <div className="flex flex-col w-100">
                    <label htmlFor="age">Age:</label>
                    <input type="number" value={formData!.age} name="age" onChange={(e) => {SetFormData({name:formData?.name, age: Number(e.target.value), language:formData?.language})}} className="p-2 border-2 border-blue-500 rounded-2xl"/>
                    <label htmlFor="age" className="text-xs text-red-500">{errors?.age}</label>
                </div>
                
                <div className="flex flex-col w-100">
                    <label htmlFor="language">Select a programming language you specialize in: </label>
                    <select name="language" onChange={(e) => {SetFormData({name:formData?.name, age: formData?.age, language:e.target.value as LanguageType})}} className="p-2 border-2 border-blue-500 rounded-2xl">
                        <option value="">Select an option</option>
                        <option value="C++">C++</option>
                        <option value="C#">C#</option>
                        <option value="Javascript">JS</option>
                        <option value="Python">Python</option>
                    </select>
                    <label htmlFor="language" className="text-xs text-red-500">{errors?.language}</label>
                </div>

                <input type="submit" value={"Submit"} className="border p-2 rounded-2xl border-blue-600 hover:bg-blue-300 focus:bg-blue-600 focus:text-white"/>
            </form>
            {validated ? (<div><p className="text-3xl text-green-500">The form's info is all correct. You can pass through.</p></div>) : null}
        </div>
    )
}

export default ProgrammerProfile;