'use server'

import { MealItemFormModel } from "@/models/meal-item";
import { saveMeals } from "../sqlite/meals"
import { redirect } from "next/navigation";

export async function onShareMealsFormSubmit(formData:FormData) {
    const meal: MealItemFormModel = {
        title: formData.get('title') as string,
        summary: formData.get('summary') as string,
        instructions: formData.get('instructions') as string,
        image: formData.get('image') as File,
        creator: formData.get('name') as string,
        creator_email: formData.get('email') as string
    }
    await saveMeals(meal);

    redirect("/meals")
}