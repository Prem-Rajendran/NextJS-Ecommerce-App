import { MealItemModel } from '@/models/meal-item';
import sql from 'better-sqlite3'

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const rand = Math.random()

    if (rand < 0.1)
        throw new Error("Failed to get meals from database")

    return db.prepare('SELECT * FROM meals').all() as MealItemModel[];
}

export async function getMeal(slug: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as MealItemModel;
}