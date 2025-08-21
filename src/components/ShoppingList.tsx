import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

// Datos de ejemplo para la lista de compras
const sampleShoppingList: ShoppingItem[] = [
  { id: "1", name: "Pechuga de pollo", quantity: "1 kg", category: "Proteínas", checked: false },
  { id: "2", name: "Salmón fresco", quantity: "500g", category: "Proteínas", checked: false },
  { id: "3", name: "Huevos", quantity: "12 unidades", category: "Proteínas", checked: false },
  { id: "4", name: "Proteína en polvo", quantity: "1 bote", category: "Suplementos", checked: false },
  { id: "5", name: "Quinoa", quantity: "500g", category: "Cereales", checked: false },
  { id: "6", name: "Avena", quantity: "1 kg", category: "Cereales", checked: false },
  { id: "7", name: "Brócoli", quantity: "2 unidades", category: "Vegetales", checked: false },
  { id: "8", name: "Espinacas", quantity: "200g", category: "Vegetales", checked: false },
  { id: "9", name: "Tomate cherry", quantity: "300g", category: "Vegetales", checked: false },
  { id: "10", name: "Calabacín", quantity: "3 unidades", category: "Vegetales", checked: false },
  { id: "11", name: "Aguacate", quantity: "4 unidades", category: "Grasas", checked: false },
  { id: "12", name: "Nueces", quantity: "200g", category: "Grasas", checked: false },
  { id: "13", name: "Aceite de oliva", quantity: "500ml", category: "Grasas", checked: false },
  { id: "14", name: "Plátanos", quantity: "6 unidades", category: "Frutas", checked: false },
  { id: "15", name: "Limones", quantity: "4 unidades", category: "Frutas", checked: false },
];

interface ShoppingListProps {
  onBack: () => void;
}

export default function ShoppingList({ onBack }: ShoppingListProps) {
  const [items, setItems] = useState<ShoppingItem[]>(sampleShoppingList);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const categories = Array.from(new Set(items.map(item => item.category)));
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Proteínas": return "🥩";
      case "Cereales": return "🌾";
      case "Vegetales": return "🥬";
      case "Frutas": return "🍎";
      case "Grasas": return "🥑";
      case "Suplementos": return "💊";
      default: return "🛒";
    }
  };

  const checkedCount = items.filter(item => item.checked).length;
  const totalItems = items.length;

  const exportList = () => {
    const listText = categories.map(category => {
      const categoryItems = items.filter(item => item.category === category);
      return `${getCategoryIcon(category)} ${category}:\n${categoryItems.map(item => 
        `- ${item.name} (${item.quantity})`
      ).join('\n')}`;
    }).join('\n\n');

    const blob = new Blob([listText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista-compras-menu-fit.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-card p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Lista de Compras</h1>
          <p className="text-muted-foreground">
            Todo lo que necesitas para tu menú semanal fit
          </p>
          <div className="mt-4">
            <div className="bg-card rounded-lg p-4 inline-block shadow-soft">
              <span className="text-2xl font-bold text-primary">{checkedCount}</span>
              <span className="text-muted-foreground"> / {totalItems} productos marcados</span>
            </div>
          </div>
        </div>

        {/* Shopping List by Category */}
        <div className="space-y-6 mb-8">
          {categories.map(category => {
            const categoryItems = items.filter(item => item.category === category);
            const categoryChecked = categoryItems.filter(item => item.checked).length;
            
            return (
              <Card key={category} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">{getCategoryIcon(category)}</span>
                      {category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {categoryChecked}/{categoryItems.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryItems.map(item => (
                      <div 
                        key={item.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                          item.checked 
                            ? 'bg-primary/10 border-primary/30' 
                            : 'bg-card border-border hover:border-primary/50'
                        }`}
                      >
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(item.id)}
                        />
                        <div className="flex-1">
                          <label 
                            htmlFor={item.id}
                            className={`font-medium cursor-pointer ${
                              item.checked ? 'line-through text-muted-foreground' : ''
                            }`}
                          >
                            {item.name}
                          </label>
                          <p className="text-sm text-muted-foreground">{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" onClick={onBack}>
            ← Volver al Menú
          </Button>
          <Button variant="hero" size="lg" onClick={exportList}>
            📱 Exportar Lista
          </Button>
          <Button variant="secondary" size="lg">
            🛒 Enviar a Supermercado
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <Card className="bg-gradient-primary">
            <CardContent className="p-6 text-white text-center">
              <h3 className="font-semibold mb-2">¡Vas muy bien!</h3>
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(checkedCount / totalItems) * 100}%` }}
                ></div>
              </div>
              <p className="text-white/90">
                {checkedCount === totalItems 
                  ? "¡Lista completa! 🎉" 
                  : `${totalItems - checkedCount} productos por marcar`
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}