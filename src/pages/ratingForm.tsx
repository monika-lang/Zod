import { useState } from "react";
import { RatingSchema } from "../schemas/Schemas";


const RatingFormPage = () => {
    type RatingType = "1"|"2"|"3"|"4"|"5";
    type formDataType = {
        movieName: string,
        rating: RatingType,
        commentary: string
    }
    
        const [formData, SetFormData] = useState<formDataType>({movieName: "", rating:"5", commentary:""});
    
        const [validated, SetValidation] = useState(false);
    
        const [errors, SetErrors] = useState<Record<string, string>>();
        
        const SubmitionHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
            event.preventDefault();
    
            SetErrors({});

            const obj_formData = {
                movieName: formData.movieName,
                rating: formData.rating,
                commentary: formData.commentary || undefined
            }
    
            const results = RatingSchema.safeParse(obj_formData);
    
            let object_issues:Record<string, string> = {};
    
            if (!results.success) {
                const issues = results.error.issues;
                issues.map((value) => {
                    object_issues[value.path[0].toString()] = value.message;
                })
                SetErrors(object_issues);
                SetValidation(false);
            }
            else {
                SetValidation(true);
            }
            console.log(obj_formData);
        }
        
        return (
            <div className="flex flex-col gap-3 items-center justify-center">
                <p className="text-2xl">RATING FORM</p>
                <form action="post" className="flex flex-col items-center justify-center gap-6" onSubmit={SubmitionHandler}>
    
                    <div className="flex flex-col w-100">
                        <label htmlFor="name" className="text-xs">Movie name:</label>
                        <input type="text" value={formData.movieName} name="name" placeholder="Name" onChange={(e) => {SetFormData({movieName:e.target.value, rating: formData.rating, commentary:formData.commentary})}} className="p-2 border-2 border-blue-500 rounded-2xl"/>
                        <label htmlFor="name" className="text-xs text-red-500">{errors?.movieName}</label>
                    </div>
                    
                    <div className="flex flex-col w-100">
                        <label htmlFor="age">Rating (from 1 to 5):</label>
                        <select value={formData.rating} name="age" onChange={(e) => {SetFormData({movieName:formData.movieName, rating:e.target.value as RatingType, commentary:formData.commentary})}} className="p-2 border-2 border-blue-500 rounded-2xl">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label htmlFor="age" className="text-xs text-red-500">{errors?.rating}</label>
                    </div>
                    
                    <div className="flex flex-col w-100">
                        <label htmlFor="message">Type in a comment (optional): </label>
                        <input type="text" name="message" onChange={(e) => {SetFormData({movieName:formData.movieName, rating: formData.rating, commentary:e.target.value})}} className="p-2 border-2 border-blue-500 rounded-2xl"/>
                        <label htmlFor="message" className="text-xs text-red-500">{errors?.commentary}</label>
                    </div>
    
                    <input type="submit" value={"Submit"} className="border p-2 rounded-2xl border-blue-600 hover:bg-blue-300 focus:bg-blue-600 focus:text-white"/>
                </form>
                {validated ? (<p className="text-3xl text-green-500">The form's info is all correct. You can pass through.</p>) : null}
            </div>
            )
}

export default RatingFormPage;