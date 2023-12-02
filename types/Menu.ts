interface Day {
  name: string;
  courses: Course[];
}

interface Course {
  name: string;
  meals: Meal[];
}

interface Meal {
  id: number;
  name: string;
  calories: number;
}
