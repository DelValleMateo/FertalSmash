import React from 'react';
import { Instagram, MessageCircle, Flame } from 'lucide-react';
import Link from 'next/link';

// Datos de las hamburguesas
const menuItems = [
  {
    id: 1,
    name: "La Triple Smash",
    description: "Para los que no le temen a nada. Potencia máxima de sabor.",
    ingredients: ["Carne x3", "Cheddar x3", "Bacon Crocante", "Salsa Fertal"],
    tag: "Best Seller",
    price: "$$$"
  },
  {
    id: 2,
    name: "La Doble Smash",
    description: "El equilibrio perfecto. La misma calidad, tamaño ideal.",
    ingredients: ["Carne x2", "Cheddar x2", "Bacon Crocante", "Salsa Fertal"],
    tag: "Clásica",
    price: "$$"
  }
];

// Tu número formateado para el enlace (sin espacios ni guiones)
const whatsappNumber = "5493446370092";
// Mensaje predeterminado para facilitar el pedido
const whatsappMessage = "Hola FertalSmash, quiero hacer un pedido 🍔";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-orange-500 selection:text-white">

      {/* --- BARRA DE NAVEGACIÓN --- */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo y Nombre */}
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-1.5 rounded-lg">
              <Flame size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">FertalSmash</span>
          </div>

          {/* Botones de Navegación */}
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-orange-500 transition-colors text-sm font-medium">
              Home
            </a>
            <a href="#menu" className="hover:text-orange-500 transition-colors text-sm font-medium">
              Menú
            </a>
            {/* Botón de Contacto (WhatsApp) */}
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all hover:scale-105"
            >
              <MessageCircle size={18} />
              <span className="hidden sm:inline">WhatsApp</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- SECCIÓN HERO (HOME) --- */}
      <section id="home" className="relative h-screen flex items-center justify-center pt-16">
        {/* Fondo con superposición oscura */}
        <div className="absolute inset-0 z-0">
          {/* Nota: Recuerda cambiar esta URL por una foto real de tus hamburguesas cuando las tengas */}
          <div className="w-full h-full bg-neutral-800 opacity-50 bg-[url('https://images.unsplash.com/photo-1586190848861-99c9f3c18b74?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            <span className="text-orange-500">SMASH</span> DE VERDAD.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Carne smasheada a la perfección, bordes crocantes y nuestra legendaria Salsa Fertal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#menu" className="bg-orange-600 hover:bg-orange-500 text-white text-lg font-bold py-3 px-8 rounded-full transition-all hover:scale-105">
              Ver Menú
            </a>
            <Link
              href="https://www.instagram.com/fertalsmash/"
              target="_blank"
              className="bg-neutral-800 hover:bg-neutral-700 text-white text-lg font-bold py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <Instagram size={20} />
              Instagram
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN MENÚ --- */}
      <section id="menu" className="py-20 px-4 bg-neutral-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro Menú</h2>
            <div className="h-1 w-20 bg-orange-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-400">Calidad sobre cantidad. Solo servimos lo mejor.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 hover:border-orange-500/50 transition-all hover:shadow-2xl hover:shadow-orange-900/20 group">
                {/* Imagen del producto */}
                <div className="h-64 bg-neutral-700 relative overflow-hidden">
                  <img
                    src={item.id === 1 ? "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800" : "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{item.name}</h3>
                    <span className="bg-orange-600/20 text-orange-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 italic">{item.description}</p>

                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-gray-300">Ingredientes:</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {item.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Botón de pedir específico para cada item */}
                  <Link
                    href={`https://wa.me/${whatsappNumber}?text=Hola%20FertalSmash,%20quiero%20pedir%20la%20${item.name.replace(/ /g, '%20')}`}
                    target="_blank"
                    className="w-full block text-center bg-white text-black hover:bg-orange-500 hover:text-white font-bold py-3 rounded-xl transition-colors"
                  >
                    Pedir Ahora
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-neutral-950 py-8 border-t border-neutral-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} FertalSmash. Gualeguaychú.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="https://www.instagram.com/fertalsmash/" target="_blank" className="text-neutral-500 hover:text-white transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" className="text-neutral-500 hover:text-white transition-colors">
              <MessageCircle size={20} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}