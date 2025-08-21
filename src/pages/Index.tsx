import { useState } from "react";
import Hero from "@/components/Hero";
import OnboardingForm from "@/components/OnboardingForm";
import WeeklyMenu from "@/components/WeeklyMenu";
import ShoppingList from "@/components/ShoppingList";

type AppState = "landing" | "onboarding" | "menu" | "shopping";

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

  const handleBackToMenu = () => {
    setCurrentState("menu");
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
        />
      )}
      
      {currentState === "shopping" && (
        <ShoppingList onBack={handleBackToMenu} />
      )}
    </div>
  );
};

export default Index;