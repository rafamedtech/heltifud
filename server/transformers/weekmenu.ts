import { weekdayTransformer } from './weekday';

export function weekMenuTransformer(weekMenu: any) {
  return weekMenu.map((day: any) => ({
    id: day.id,
    dayOfWeek: weekdayTransformer(day.dayOfWeek),
    breakfast: mealTransformer(day.breakfast),
    lunch: mealTransformer(day.lunch),
    dinner: mealTransformer(day.dinner),
  }));
}

function mealTransformer(meal: any) {
  return {
    mainDish: dishTransformer(meal.mainDish),
    side1: dishTransformer(meal.side1),
    side2: dishTransformer(meal.side2),
  };
}

function dishTransformer(dish: any) {
  if (!dish) return null;
  return {
    name: dish.name,
    calories: dish.calories,
    type: dish.type,
  };
}
