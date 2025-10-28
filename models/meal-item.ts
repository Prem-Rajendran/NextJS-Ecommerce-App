export interface MealItemModel {
    id: number
    title: string
    slug: string
    image: string
    summary: string
    creator: string
    instructions: string
    creator_email: string
}

export interface MealItemFormModel extends Omit<MealItemModel, 'image' | 'slug' | 'id'> {
    image: File
}