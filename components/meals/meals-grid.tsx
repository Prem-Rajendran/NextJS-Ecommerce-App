import React from 'react'
import styles from './meals-grid.module.css'
import { MealItemModel } from '@/models/meal-item'
import MealItem from './meal-item'

interface MealsGridProps {
    meals: MealItemModel[]
}

const MealsGrid: React.FC<MealsGridProps> = ({ meals }) => {
    return (
        <ul className={styles.meals}>
            {meals.map(meal => (
                <li key={meal.id}>
                    <MealItem {...meal} />
                </li>
            ))}
        </ul>
    )
}

export default MealsGrid;