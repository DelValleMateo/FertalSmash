"use client";

import React, { useState } from 'react';
import { Instagram, MessageCircle, ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// --- TUS IMÁGENES ---
import dobleSmashImg from './assets/hamburdoble.jpeg';
import tripleSmashImg from './assets/hamburtriple.jpeg';
import logoImg from './assets/logo.jpeg';
import fondoburger from './assets/fondo.jpeg';

// Datos de las hamburguesas (Precios convertidos a números para sumar)
const menuItems = [
  {
    id: 1,
    name: "La Triple Smash",
    description: "Para los que no le temen a nada. Potencia máxima de sabor.",
    ingredients: ["Carne x3", "Cheddar x3", "Bacon Crocante", "Salsa Fertal"],
    price: 10000, // Número real
    image: tripleSmashImg
  },
  {
    id: 2,
    name: "La Doble Smash",
    description: "El equilibrio perfecto. La misma calidad, tamaño ideal.",
    ingredients: ["Carne x2", "Cheddar x2", "Bacon Crocante", "Salsa Fertal"],
    price: 9000, // Número real
    image: dobleSmashImg
  }
];

const whatsappNumber = "5493446370092";

export default function Home() {
  // --- LÓGICA DEL CARRITO ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Agregar item
  const addToCart = (item: any) => {
    setCart((prev: any) => {
      const existing = prev.find((i: any) => i.id === item.id);
      if (existing) {
        return prev.map((i: any) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true); // Abrir carrito al agregar
  };

  // Quitar item
  const removeFromCart = (itemId: number) => {
    setCart((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter((item: any) => item.quantity > 0);
    });
  };

  // Cálculos
  const total = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);

  // Enviar pedido a WhatsApp
  const sendOrder = () => {
    let message = "Hola FertalSmash! 🍔\nQuiero realizar el siguiente pedido:\n\n";
    cart.forEach((item: any) => {
      message += `▪️ ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString()})\n`;
    });
    message += `\n💰 *TOTAL: $${total.toLocaleString()}*`;
    message += "\n\n(Espero confirmación)";

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-orange-500 selection:text-white pb-24">

      {/* --- BARRA DE NAVEGACIÓN --- */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">

          {/* Logo y Nombre */}
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-grey-500">
              <Image
                src={logoImg}
                alt="Logo FertalSmash"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">FertalSmash</span>
          </div>

          {/* Botones de Navegación */}
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-orange-500 transition-colors text-sm font-medium hidden sm:block">
              Home
            </a>
            <a href="#menu" className="hover:text-orange-500 transition-colors text-sm font-medium hidden sm:block">
              Menú
            </a>

            {/* BOTÓN CARRITO (Nuevo) */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 hover:bg-neutral-800 rounded-full transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* --- SECCIÓN HERO (HOME) --- */}
      <section id="home" className="relative h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src={fondoburger}
            alt="Fondo hamburguesas"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
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
              <div key={item.id} className="bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 hover:border-orange-500/50 transition-all hover:shadow-2xl hover:shadow-orange-900/20 group flex flex-col">

                <div className="aspect-square bg-neutral-700 relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{item.name}</h3>
                    <span className="bg-orange-600/20 text-orange-400 text-sm font-bold px-2 py-1 rounded uppercase tracking-wider">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 italic flex-grow">{item.description}</p>

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

                  {/* CAMBIO: Botón Agregar al Carrito en vez de WhatsApp directo */}
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-white text-black hover:bg-orange-500 hover:text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Agregar al Pedido
                  </button>
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

      {/* --- MODAL DEL CARRITO (NUEVO) --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          {/* Fondo oscuro - Cierra al clickear fuera */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>

          {/* Panel Lateral */}
          <div className="relative w-full max-w-md bg-neutral-900 h-full border-l border-neutral-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">

            {/* Cabecera */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingCart className="text-orange-500" /> Tu Pedido
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-800 rounded-full">
                <X size={24} />
              </button>
            </div>

            {/* Lista de Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4">
                  <ShoppingCart size={48} className="opacity-20" />
                  <p>Tu carrito está vacío</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-orange-500 hover:underline">Ir al menú</button>
                </div>
              ) : (
                cart.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 bg-neutral-800/50 p-4 rounded-xl border border-neutral-800">
                    <div className="flex-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-gray-400">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center bg-neutral-900 rounded-lg border border-neutral-700">
                      <button onClick={() => removeFromCart(item.id)} className="p-2 hover:text-red-500 transition-colors">
                        {item.quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="p-2 hover:text-green-500 transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer con Total y Enviar */}
            {cart.length > 0 && (
              <div className="p-6 bg-neutral-900 border-t border-neutral-800 pb-10">
                <div className="flex justify-between items-center mb-6 text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-orange-500">${total.toLocaleString()}</span>
                </div>
                <button
                  onClick={sendOrder}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle size={24} />
                  Enviar Pedido a WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}