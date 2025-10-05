"use client"

import type React from "react"

import { useState } from "react"
import { Search, ShoppingCart, Menu, X, User } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "./cart-context"
import { CartDropdown } from "./cart-dropdown"
import { SearchDropdown } from "./search-dropdown"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { state } = useCart()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setIsSearchOpen(value.length > 0)
  }

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setIsSearchOpen(true)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/uaemex-logo.png"
              alt="UAEMEX Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <span className="text-xl font-bold text-white">ElectroUAEMEX</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-slate-300 hover:text-blue-400 transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("productos")}
              className="text-slate-300 hover:text-blue-400 transition-colors"
            >
              Productos
            </button>
            <button
              onClick={() => window.open("/productos", "_blank")}
              className="text-slate-300 hover:text-green-400 transition-colors text-sm"
            >
              Ver Todos
            </button>
            <button
              onClick={() => scrollToSection("ofertas")}
              className="text-slate-300 hover:text-blue-400 transition-colors"
            >
              Ofertas
            </button>
            <button
              onClick={() => window.open("/ofertas", "_blank")}
              className="text-slate-300 hover:text-green-400 transition-colors text-sm"
            >
              Ver Ofertas
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-slate-300 hover:text-blue-400 transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar componentes..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
              />
              <SearchDropdown isOpen={isSearchOpen} query={searchQuery} onClose={() => setIsSearchOpen(false)} />
            </div>
          </div>

          {/* Cart and User Actions */}
          <div className="flex items-center space-x-4">
            {/* User Account Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={() => alert("Funcionalidad de cuenta en desarrollo")}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Cart Button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center animate-pulse">
                    {state.itemCount}
                  </span>
                )}
              </Button>

              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 bg-slate-900/95 py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Buscar componentes..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="text-slate-300 hover:text-blue-400 transition-colors py-2 text-left"
                >
                  Inicio
                </button>
                <button
                  onClick={() => scrollToSection("productos")}
                  className="text-slate-300 hover:text-blue-400 transition-colors py-2 text-left"
                >
                  Productos
                </button>
                <button
                  onClick={() => window.open("/productos", "_blank")}
                  className="text-slate-300 hover:text-green-400 transition-colors text-sm py-2 text-left"
                >
                  Ver Todos
                </button>
                <button
                  onClick={() => scrollToSection("ofertas")}
                  className="text-slate-300 hover:text-blue-400 transition-colors py-2 text-left"
                >
                  Ofertas
                </button>
                <button
                  onClick={() => window.open("/ofertas", "_blank")}
                  className="text-slate-300 hover:text-green-400 transition-colors text-sm py-2 text-left"
                >
                  Ver Ofertas
                </button>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="text-slate-300 hover:text-blue-400 transition-colors py-2 text-left"
                >
                  Contacto
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
