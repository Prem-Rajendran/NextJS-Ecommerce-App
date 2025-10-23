import { getMeal } from '@/lib/sqlite/meals'
import styles from './page.module.css'
import Image from 'next/image'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

interface MealsSlugProps {
    params: Promise<{slug: string}>
}

export default async function RecipeDetails(props : MealsSlugProps) {
    return (
        <Suspense fallback={<p className={styles.loading}>Fetching Meals...</p>}>
            <MealsSlug {...props}/>
        </Suspense>
    )
}

async function MealsSlug({ params } : MealsSlugProps) {
    const { slug } = await params
    const meals = await getMeal(slug);

    if (!meals) notFound(); 

    const modifiedInstructions = meals.instructions.replaceAll(/\n/g, "<br>")

    return (
        <>
            <header className={styles.header}>
                <div className={styles.image}>
                    <Image src={meals.image} alt='profile image' fill/>
                </div>
                <div className={styles.headerText}>
                    <h1>{meals.title}</h1>
                    <p className={styles.creator}>
                        by{' '}<a href={`mailto:${meals.creator_email}`}>{meals.creator}</a>
                    </p>
                    <p className={styles.summary}>{meals.summary}</p>
                </div>
            </header>
            <main>
                <p className={styles.instructions} dangerouslySetInnerHTML={{
                    __html: modifiedInstructions
                }}></p>
            </main>
        </>
    )
}