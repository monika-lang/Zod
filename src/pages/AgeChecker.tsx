import { useRef, useState } from "react"
import { ageChecker } from "../schemas/Schemas";

const AgeSubmitter = () => {


    const ageRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [validation, SetValidation] = useState(false);

    const SubmitionHandler = (event:React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const results = ageChecker.safeParse(ageRef.current?.value);

        if (!results.success) {
            setError(results.error.issues[0].message);
        }
        else{
            SetValidation(true);
        }
    }

    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <form action="post" className="flex flex-col items-center justify-center gap-6" onSubmit={SubmitionHandler}>

                <div className="flex flex-col w-100"> 
                    <label htmlFor="age" className="text-xs">Age:</label>
                    <input type="number" name="age" id="age" ref={ageRef} className="p-2 border-2 border-blue-500 rounded-2xl"/>
                    <label htmlFor="age" className="text-xs text-red-500">{error}</label>
                </div>

                <input type="submit" value={"Submit"} className="border p-2 rounded-2xl border-blue-600 hover:bg-blue-300 focus:bg-blue-600 focus:text-white"/>
            </form>
            <p className="text-2xl text-green-500">{validation ? "Everything's alright" : null}</p>
        </div>
    )
}

export default AgeSubmitter;