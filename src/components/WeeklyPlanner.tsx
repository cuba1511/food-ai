import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, ChefHat, Calendar } from "lucide-react";
import MealModal from "./MealModal";
import { DayMenu, Meal } from "./WeeklyMenu";

interface WeeklyPlannerProps {
  weeklyMenu: DayMenu[];
  userPreferences: any;
  onMealComplete: (dayIndex: number, mealType: string) => void;
  onViewMeal: (meal: Meal) => void;
}

export default function WeeklyPlanner({ 
  weeklyMenu, 
  userPreferences, 
  onMealComplete, 
  onViewMeal 
}: WeeklyPlannerProps) {
  const [completedMeals, setCompletedMeals] = useState<Set<string>>(new Set());

  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const mealTypes = [
    { key: 'breakfast', label: 'Desayuno', icon: '🌅' },
    { key: 'lunch', label: 'Almuerzo', icon: '☀️' },
    { key: 'dinner', label: 'Cena', icon: '🌙' }
  ];

  const toggleMealComplete = (dayIndex: number, mealType: string) => {
    const mealId = `${dayIndex}-${mealType}`;
    const newCompleted = new Set(completedMeals);
    
    if (newCompleted.has(mealId)) {
      newCompleted.delete(mealId);
    } else {
      newCompleted.add(mealId);
    }
    
    setCompletedMeals(newCompleted);
    onMealComplete(dayIndex, mealType);
  };

  const getCompletionProgress = () => {
    const totalMeals = weeklyMenu.length * 3;
    const completedCount = completedMeals.size;
    return (completedCount / totalMeals) * 100;
  };

  const getMealImage = (mealName: string) => {
    if (mealName.includes('Avena')) return '/src/assets/meals/avena-frutas.jpg';
    if (mealName.includes('Ensalada')) return '/src/assets/meals/ensalada-pollo-quinoa.jpg';
    if (mealName.includes('Salmón')) return '/src/assets/meals/salmon-vegetales.jpg';
    return '/src/assets/hero-food.jpg';
  };

  return (
    <div className="min-h-screen bg-gradient-card p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Planificador Semanal</h1>
          </div>
          <p className="text-muted-foreground mb-4">
            Mantén el seguimiento de tus comidas fit durante toda la semana
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso Semanal</span>
              <span className="text-sm text-muted-foreground">
                {completedMeals.size}/{weeklyMenu.length * 3} comidas
              </span>
            </div>
            <Progress value={getCompletionProgress()} className="h-2" />
          </div>
        </div>

        {/* Weekly Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {weekDays.map((day, dayIndex) => {
            const dayMenu = weeklyMenu[dayIndex];
            if (!dayMenu) return null;

            return (
              <Card key={day} className="relative">
                <CardHeader className="pb-4">
                  <CardTitle className="text-center text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mealTypes.map(({ key, label, icon }) => {
                    const meal = dayMenu[key as keyof DayMenu] as Meal;
                    const mealId = `${dayIndex}-${key}`;
                    const isCompleted = completedMeals.has(mealId);

                    return (
                      <div key={key} className="group">
                        <div 
                          className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                            isCompleted ? 'opacity-75 ring-2 ring-green-500' : 'hover:shadow-medium'
                          }`}
                          onClick={() => onViewMeal(meal)}
                        >
                          {/* Meal Image */}
                          <div className="aspect-video relative">
                            <img 
                              src={getMealImage(meal.name)}
                              alt={meal.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            {/* Completion Overlay */}
                            {isCompleted && (
                              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                                <div className="bg-green-500 rounded-full p-2">
                                  <Check className="h-6 w-6 text-white" />
                                </div>
                              </div>
                            )}
                            
                            {/* Meal Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">{icon}</span>
                                <span className="text-xs font-medium">{label}</span>
                              </div>
                              <h4 className="font-semibold text-sm leading-tight">{meal.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {meal.nutrition.calories} cal
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {meal.prepTime} min
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Complete Button */}
                        <Button
                          variant={isCompleted ? "default" : "outline"}
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => toggleMealComplete(dayIndex, key)}
                        >
                          {isCompleted ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Completado
                            </>
                          ) : (
                            <>
                              <ChefHat className="h-4 w-4 mr-2" />
                              Marcar como hecho
                            </>
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Weekly Summary */}
        <Card className="mt-8 bg-gradient-primary">
          <CardContent className="p-6 text-white">
            <h3 className="font-semibold mb-4 text-center">Resumen de la Semana</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{getCompletionProgress().toFixed(0)}%</div>
                <div className="text-white/80">Completado</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{weeklyMenu.length * 3}</div>
                <div className="text-white/80">Total Comidas</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{completedMeals.size}</div>
                <div className="text-white/80">Comidas Hechas</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{weeklyMenu.length * 3 - completedMeals.size}</div>
                <div className="text-white/80">Pendientes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}