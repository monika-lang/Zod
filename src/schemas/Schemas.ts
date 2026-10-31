import {z} from "zod"

export const emailAndPassword = z.object({
    email: z.email("Email format must be: username@mail.ext"),
    password: z.string().min(6, "Password must be atleast 6 characters long.")
})

export const formErrorsSchema = z.object({
    username: z.string()
    .min(6, "Username must be atleast 6 characters long")
    .max(100, "Username cannot be more than 100 characters long."),

    email: z.email("EMAIL MUST BE INCLUDED").regex(/.+@[a-z]+.[a-z]+/, "EMAIL PATTERN DOES NOT MATCH"),

    password: z.string()
    .min(6, "PASSWORD MUST BE AT LEAST 6 CHARACTERS LONG")
    .max(50, "PASSWORD CANNOT BE LONGER THAN 50 CHARACTERS")
});

export const programmerProfileSchema = z.object({
    name: z.string().regex(/[A-Z][a-z]+/, "NAME MUST START FROM CAPITAL LETTER AND MUST ONLY HAVE LETTERS"),
    age: z.number().min(15, "User must be at least 15 years old."),
    language: z.enum(["C++", "C#", "Javascript", "Python"], "PLEASE SELECT AN OPTION")
})

export const ageChecker = z.coerce.number().min(18, "User must be atleast 18 years old").max(65, "User must not be older than 65.");

export const AutoClearerSchema = [z.string()
    .regex(/^([A-z\w\d])+$/, "Username must not contain any whitespace characters"),
    z.string()
    .regex(/^([A-z\w\d])+$/, "Password must not contain any whitespace characters")];

export const RatingSchema = z.object({
    movieName: z.string().trim().min(1, "This field cannot be empty"),
    rating: z.enum(["1","2","3","4","5"]),
    commentary: z.string().min(5, "This field must have atleast 5 characters").optional()
})