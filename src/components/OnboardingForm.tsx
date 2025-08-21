import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OnboardingData {
  goal: string;
  dietaryPreferences: string[];
  ingredients: string;
}

interface OnboardingFormProps {
  onComplete: (data: OnboardingData) => void;
}

export default function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState("");

  const goals = [
    { id: "fat_loss", label: "Pérdida de Grasa", icon: "🔥" },
    { id: "muscle_gain", label: "Ganancia Muscular", icon: "💪" },
    { id: "balanced", label: "Nutrición Equilibrada", icon: "⚖️" },
  ];

  const dietOptions = [
    "Vegano",
    "Vegetariano", 
    "Sin Lactosa",
    "Sin Gluten",
    "Keto",
    "Mediterránea",
    "Sin Restricciones"
  ];

  const handleDietaryChange = (option: string, checked: boolean) => {
    if (checked) {
      setDietaryPreferences([...dietaryPreferences, option]);
    } else {
      setDietaryPreferences(dietaryPreferences.filter(p => p !== option));
    }
  };

  const handleComplete = () => {
    onComplete({
      goal,
      dietaryPreferences,
      ingredients
    });
  };

  return (
    <div className="min-h-screen bg-gradient-card flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Personaliza Tu Menú Fit
          </CardTitle>
          <p className="text-muted-foreground">
            Paso {step} de 3 - Cuéntanos sobre tus objetivos
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">¿Cuál es tu objetivo principal?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {goals.map((goalOption) => (
                  <button
                    key={goalOption.id}
                    onClick={() => setGoal(goalOption.id)}
                    className={`p-6 rounded-lg border-2 transition-all text-center ${
                      goal === goalOption.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{goalOption.icon}</div>
                    <div className="font-semibold">{goalOption.label}</div>
                  </button>
                ))}
              </div>
              <Button 
                onClick={() => setStep(2)} 
                disabled={!goal}
                variant="gradient"
                className="w-full"
              >
                Continuar
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">¿Tienes alguna preferencia alimenticia?</h3>
              <div className="grid grid-cols-2 gap-4">
                {dietOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={dietaryPreferences.includes(option)}
                      onCheckedChange={(checked) => 
                        handleDietaryChange(option, checked as boolean)
                      }
                    />
                    <label htmlFor={option} className="text-sm font-medium">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={() => setStep(1)} 
                  variant="outline" 
                  className="flex-1"
                >
                  Atrás
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  variant="gradient"
                  className="flex-1"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                ¿Qué ingredientes tienes disponibles en casa?
              </h3>
              
              {/* Start from scratch option */}
              <div className="flex items-center space-x-2 p-4 border rounded-lg bg-muted/50">
                <Checkbox
                  id="startFromScratch"
                  checked={ingredients === "EMPEZAR_DE_CERO"}
                  onCheckedChange={(checked) => 
                    setIngredients(checked ? "EMPEZAR_DE_CERO" : "")
                  }
                />
                <div className="flex-1">
                  <Label htmlFor="startFromScratch" className="font-medium cursor-pointer">
                    🛒 Empezar de cero
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    No tengo ingredientes, voy a comprar todo lo necesario
                  </p>
                </div>
              </div>

              {ingredients !== "EMPEZAR_DE_CERO" && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Lista los ingredientes que ya tienes, separados por comas. 
                    Esto nos ayudará a sugerir recetas que puedas hacer ahora.
                  </p>
                  <Textarea
                    placeholder="Ej: pollo, arroz, brócoli, huevos, avena, plátanos..."
                    value={ingredients === "EMPEZAR_DE_CERO" ? "" : ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    rows={4}
                  />
                </>
              )}
              
              <p className="text-sm text-muted-foreground">
                {ingredients === "EMPEZAR_DE_CERO" 
                  ? "Generaremos un menú completo y una lista de compras con todo lo necesario."
                  : "Esto nos ayudará a sugerir recetas que puedas preparar inmediatamente."
                }
              </p>

              <div className="flex gap-4">
                <Button 
                  onClick={() => setStep(2)} 
                  variant="outline" 
                  className="flex-1"
                >
                  Atrás
                </Button>
                <Button 
                  onClick={handleComplete} 
                  variant="hero"
                  className="flex-1"
                >
                  Generar Mi Menú
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}