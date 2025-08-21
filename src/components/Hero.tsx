import { Button } from "@/components/ui/button";
import heroFood from "@/assets/hero-food.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroFood})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
          Tu Menú Fit Personalizado
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Genera automáticamente menús semanales saludables basados en tus objetivos, 
          preferencias y los ingredientes que tienes en casa.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            Crear Mi Menú Gratis
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary">
            Ver Ejemplo
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-lg mb-2">Objetivos Personalizados</h3>
            <p className="text-white/80">Pérdida de grasa, ganancia muscular o nutrición equilibrada</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-2">🥗</div>
            <h3 className="font-semibold text-lg mb-2">Preferencias Respetadas</h3>
            <p className="text-white/80">Vegano, vegetariano, sin lactosa y más opciones</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-lg mb-2">Lista de Compras</h3>
            <p className="text-white/80">Genera automáticamente qué necesitas comprar</p>
          </div>
        </div>
      </div>
    </section>
  );
}