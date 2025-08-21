import { useState } from "react";
import Hero from "@/components/Hero";
import OnboardingForm from "@/components/OnboardingForm";
import WeeklyMenu from "@/components/WeeklyMenu";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import ShoppingList from "@/components/ShoppingList";
import { sampleWeeklyMenu } from "@/components/WeeklyMenu";

type AppState = "landing" | "onboarding" | "menu" | "planner" | "shopping";

interface UserPreferences {
  goal: string;
  dietaryPreferences: string[];
  ingredients: string;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  const handleOnboardingComplete = (data: UserPreferences) => {
    setUserPreferences(data);
    setCurrentState("menu");
  };

  const handleGenerateShoppingList = () => {
    setCurrentState("shopping");
  };

  const handleViewPlanner = () => {
    setCurrentState("planner");
  };

  const handleBackToMenu = () => {
    setCurrentState("menu");
  };

  const handleMealComplete = (dayIndex: number, mealType: string) => {
    // Lógica para marcar comida como completada
    console.log(`Meal completed: Day ${dayIndex}, ${mealType}`);
  };

  const handleViewMeal = (meal: any) => {
    // Podríamos abrir un modal o navegar a detalle
    console.log('Viewing meal:', meal);
  };

  // Simular click en "Crear Mi Menú Gratis" desde el Hero
  const startOnboarding = () => {
    setCurrentState("onboarding");
  };

  return (
    <div className="min-h-screen">
      {currentState === "landing" && (
        <div onClick={startOnboarding}>
          <Hero />
        </div>
      )}
      
      {currentState === "onboarding" && (
        <OnboardingForm onComplete={handleOnboardingComplete} />
      )}
      
      {currentState === "menu" && userPreferences && (
        <WeeklyMenu 
          userPreferences={userPreferences}
          onGenerateShoppingList={handleGenerateShoppingList}
          onViewPlanner={handleViewPlanner}
        />
      )}
      
      {currentState === "planner" && userPreferences && (
        <WeeklyPlanner
          weeklyMenu={sampleWeeklyMenu}
          userPreferences={userPreferences}
          onMealComplete={handleMealComplete}
          onViewMeal={handleViewMeal}
        />
      )}
      
      {currentState === "shopping" && (
        <ShoppingList onBack={handleBackToMenu} />
      )}
    </div>
  );
};

export default Index;