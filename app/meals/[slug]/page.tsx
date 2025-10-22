export default async function MealsSlug({ params } : { params : Promise<{slug: string}>}) {
    const { slug } = await params
    return (
        <main>
            <h1>Meals: {slug}</h1>
        </main>
    )
}