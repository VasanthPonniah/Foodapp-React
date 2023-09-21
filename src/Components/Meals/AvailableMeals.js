import React, { useEffect, useState } from "react";

import Card from "../UI/Card";

import classes from './AvailableMeals.module.css';
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const mealsUrl = "https://react-food-app-c576e-default-rtdb.firebaseio.com/meals.json" // meals.json is firebase specific...
const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [loadingState, setLoadingState] = useState(true)
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(mealsUrl);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const responseData = await response.json();

            const loadedMeals = [];
            for (let key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            };
            setMeals(loadedMeals);
            setLoadingState(false);
        }

        fetchMeals().catch(error => {
            setLoadingState(false);
            setHttpError(error.message)
        });

    }, [])

    if (loadingState) {
        return (
            <section className={classes.mealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }
    if (httpError)
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    // useEffect should return a asynchronous data or it should have a cleanup Function which runs synchronously

    const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
};

export default AvailableMeals;