import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MealModal from "./MealModal";

export interface Meal {
  id: string;
  name: string;
  ingredients: string[];
  steps: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  prepTime: number;
}

export interface DayMenu {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

// Datos de ejemplo para el MVP
const sampleWeeklyMenu: DayMenu[] = [
  {
    day: "Lunes",
    breakfast: {
      id: "b1",
      name: "Avena con Frutas y Proteína",
      ingredients: ["Avena (50g)", "Plátano (1 mediano)", "Proteína en polvo (1 scoop)", "Nueces (10g)", "Canela"],
      steps: ["Cocinar avena con agua", "Agregar proteína en polvo", "Decorar con plátano y nueces", "Espolvorear canela"],
      nutrition: { calories: 420, protein: 28, carbs: 45, fat: 12 },
      prepTime: 10
    },
    lunch: {
      id: "l1", 
      name: "Ensalada de Pollo y Quinoa",
      ingredients: ["Pechuga de pollo (150g)", "Quinoa (80g)", "Espinacas (100g)", "Tomate cherry (100g)", "Aguacate (1/2)", "Aceite de oliva (1 cda)"],
      steps: ["Cocinar quinoa", "Asar pollo a la plancha", "Mezclar vegetales", "Servir con aderezo de aceite de oliva"],
      nutrition: { calories: 520, protein: 42, carbs: 35, fat: 18 },
      prepTime: 20
    },
    dinner: {
      id: "d1",
      name: "Salmón con Vegetales al Vapor",
      ingredients: ["Salmón (120g)", "Brócoli (150g)", "Calabacín (100g)", "Zanahoria (80g)", "Limón", "Hierbas finas"],
      steps: ["Cocinar salmón al horno", "Vapor los vegetales", "Sazonar con limón y hierbas", "Servir caliente"],
      nutrition: { calories: 380, protein: 35, carbs: 15, fat: 20 },
      prepTime: 25
    }
  },
  // Agregar más días para completar la semana...
];

interface WeeklyMenuProps {
  userPreferences: any;
  onGenerateShoppingList: () => void;
}

export default function WeeklyMenu({ userPreferences, onGenerateShoppingList }: WeeklyMenuProps) {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [currentDay, setCurrentDay] = useState(0);

  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  // Para el MVP, mostraremos solo un día de ejemplo
  const dayMenu = sampleWeeklyMenu[0];

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      default: return '🍽️';
    }
  };

  const MealCard = ({ meal, type }: { meal: Meal; type: string }) => (
    <Card 
      className="cursor-pointer hover:shadow-medium transition-all duration-200 border hover:border-primary/50"
      onClick={() => setSelectedMeal(meal)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-2xl">{getMealTypeIcon(type)}</span>
            {type === 'breakfast' ? 'Desayuno' : type === 'lunch' ? 'Almuerzo' : 'Cena'}
          </CardTitle>
          <Badge variant="secondary">{meal.prepTime} min</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2">{meal.name}</h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <span>🔥 {meal.nutrition.calories} cal</span>
          <span>🥩 {meal.nutrition.protein}g proteína</span>
          <span>🌾 {meal.nutrition.carbs}g carbos</span>
          <span>🥑 {meal.nutrition.fat}g grasas</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {meal.ingredients.slice(0, 3).join(", ")}
          {meal.ingredients.length > 3 && "..."}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-card p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Tu Menú Semanal Fit</h1>
          <p className="text-muted-foreground">
            Objetivo: {userPreferences?.goal === 'fat_loss' ? 'Pérdida de Grasa' : 
                      userPreferences?.goal === 'muscle_gain' ? 'Ganancia Muscular' : 
                      'Nutrición Equilibrada'}
          </p>
        </div>

        {/* Day Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-card rounded-lg p-1 shadow-soft">
            {weekDays.map((day, index) => (
              <Button
                key={day}
                variant={index === currentDay ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentDay(index)}
                className="mx-1"
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MealCard meal={dayMenu.breakfast} type="breakfast" />
          <MealCard meal={dayMenu.lunch} type="lunch" />
          <MealCard meal={dayMenu.dinner} type="dinner" />
        </div>

        {/* Daily Totals */}
        <Card className="mb-8 bg-gradient-primary">
          <CardContent className="p-6 text-white">
            <h3 className="font-semibold mb-4 text-center">Totales del Día</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">1,320</div>
                <div className="text-white/80">Calorías</div>
              </div>
              <div>
                <div className="text-2xl font-bold">105g</div>
                <div className="text-white/80">Proteína</div>
              </div>
              <div>
                <div className="text-2xl font-bold">95g</div>
                <div className="text-white/80">Carbohidratos</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50g</div>
                <div className="text-white/80">Grasas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={onGenerateShoppingList}>
            📝 Generar Lista de Compras
          </Button>
          <Button variant="outline" size="lg">
            🔄 Regenerar Menú
          </Button>
          <Button variant="secondary" size="lg">
            💾 Guardar Menú
          </Button>
        </div>
      </div>

      {selectedMeal && (
        <MealModal 
          meal={selectedMeal} 
          onClose={() => setSelectedMeal(null)} 
        />
      )}
    </div>
  );
}