import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Meal } from "./WeeklyMenu";

interface MealModalProps {
  meal: Meal;
  onClose: () => void;
}

export default function MealModal({ meal, onClose }: MealModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            {meal.name}
            <Badge variant="secondary">{meal.prepTime} minutos</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información Nutricional */}
          <div className="bg-gradient-card rounded-lg p-4">
            <h3 className="font-semibold mb-3">Información Nutricional</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-card rounded-lg p-3">
                <div className="text-2xl font-bold text-primary">{meal.nutrition.calories}</div>
                <div className="text-sm text-muted-foreground">Calorías</div>
              </div>
              <div className="bg-card rounded-lg p-3">
                <div className="text-2xl font-bold text-secondary">{meal.nutrition.protein}g</div>
                <div className="text-sm text-muted-foreground">Proteína</div>
              </div>
              <div className="bg-card rounded-lg p-3">
                <div className="text-2xl font-bold text-accent">{meal.nutrition.carbs}g</div>
                <div className="text-sm text-muted-foreground">Carbohidratos</div>
              </div>
              <div className="bg-card rounded-lg p-3">
                <div className="text-2xl font-bold text-primary-glow">{meal.nutrition.fat}g</div>
                <div className="text-sm text-muted-foreground">Grasas</div>
              </div>
            </div>
          </div>

          {/* Ingredientes */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              🛒 Ingredientes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {meal.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Pasos de Preparación */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              👨‍🍳 Preparación
            </h3>
            <div className="space-y-3">
              {meal.steps.map((step, index) => (
                <div key={index} className="flex gap-3 p-3 bg-card rounded-lg border">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1">
              🔄 Reemplazar Comida
            </Button>
            <Button variant="default" className="flex-1">
              ✏️ Editar Ingredientes
            </Button>
            <Button variant="secondary" className="flex-1">
              ⭐ Marcar Favorita
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}