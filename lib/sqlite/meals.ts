import { MealItemFormModel, MealItemModel } from '@/models/meal-item';
import sql from 'better-sqlite3'
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';

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

export async function saveMeals(meal:MealItemFormModel) {
    const slug = slugify(meal.title, {lower: true});

    const extension = meal.image.name.split('.').pop();
    const filename = `${slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error)
            throw new Error("Saving image failed...")
    });

    const mealData: Omit<MealItemModel, 'id'> = {
        title: meal.title,
        slug: slug,
        image: `/images/${filename}`,
        summary: meal.summary,
        creator: meal.creator,
        instructions: xss(meal.instructions),
        creator_email: meal.creator_email,
    }

    db.prepare(`
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(mealData)

    await new Promise((resolve) => setTimeout(resolve, 2000));
}