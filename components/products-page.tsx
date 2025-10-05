"use client"

import { useState } from "react"
import { Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "./cart-context"

const allProducts = [
  // Componentes Pasivos
  {
    id: 1,
    name: "Resistencias de Carbón 1/4W",
    category: "Componentes Pasivos",
    price: 25.0,
    originalPrice: 30.0,
    image: "/electronic-resistors-kit-colorful-components.jpg",
    description: "Kit de 100 resistencias de diferentes valores",
    inStock: true,
    isOffer: true,
  },
  {
    id: 2,
    name: "Capacitores Electrolíticos",
    category: "Componentes Pasivos",
    price: 45.0,
    image: "/electronic-resistors-capacitors-components.jpg",
    description: "Set de capacitores de 10µF a 1000µF",
    inStock: true,
    isOffer: false,
  },
  {
    id: 3,
    name: "Inductores Toroidales",
    category: "Componentes Pasivos",
    price: 85.0,
    image: "/electronic-resistors-capacitors-components.jpg",
    description: "Inductores de alta calidad para filtros",
    inStock: true,
    isOffer: false,
  },
  // Componentes Activos
  {
    id: 4,
    name: "Arduino Uno R3",
    category: "Componentes Activos",
    price: 320.0,
    originalPrice: 380.0,
    image: "/arduino-uno-microcontroller-board-blue-electronic.jpg",
    description: "Microcontrolador para proyectos de ingeniería",
    inStock: true,
    isOffer: true,
  },
  {
    id: 5,
    name: "Transistores NPN/PNP",
    category: "Componentes Activos",
    price: 35.0,
    image: "/electronic-transistors-components-black-plastic-to.jpg",
    description: "Kit de transistores para amplificación",
    inStock: true,
    isOffer: false,
  },
  {
    id: 6,
    name: "Circuitos Integrados 74HC",
    category: "Componentes Activos",
    price: 120.0,
    image: "/electronic-transistors-diodes-integrated-circuits.jpg",
    description: "Serie completa de compuertas lógicas",
    inStock: false,
    isOffer: false,
  },
  // Fuentes de Energía
  {
    id: 7,
    name: "Fuente Variable 0-30V",
    category: "Fuentes de Energía",
    price: 850.0,
    originalPrice: 950.0,
    image: "/batteries-power-supplies-breadboard-electronic.jpg",
    description: "Fuente regulable con display digital",
    inStock: true,
    isOffer: true,
  },
  {
    id: 8,
    name: "Baterías Recargables Li-ion",
    category: "Fuentes de Energía",
    price: 180.0,
    image: "/batteries-power-supplies-breadboard-electronic.jpg",
    description: "Pack de 4 baterías 18650 con cargador",
    inStock: true,
    isOffer: false,
  },
  // Instrumentación
  {
    id: 9,
    name: "Multímetro Digital Fluke",
    category: "Instrumentación",
    price: 1200.0,
    originalPrice: 1400.0,
    image: "/digital-multimeter-yellow-black-electronic-measure.jpg",
    description: "Multímetro profesional de alta precisión",
    inStock: true,
    isOffer: true,
  },
  {
    id: 10,
    name: "Osciloscopio USB 2 Canales",
    category: "Instrumentación",
    price: 2500.0,
    image: "/multimeter-oscilloscope-electronic-measurement-too.jpg",
    description: "Osciloscopio portátil para análisis de señales",
    inStock: true,
    isOffer: false,
  },
  // Accesorios
  {
    id: 11,
    name: "Protoboard 830 Puntos",
    category: "Accesorios",
    price: 65.0,
    image: "/white-breadboard-protoboard-830-points-electronic-.jpg",
    description: "Protoboard de alta calidad para prototipos",
    inStock: true,
    isOffer: false,
  },
  {
    id: 12,
    name: "Cables Jumper Macho-Hembra",
    category: "Accesorios",
    price: 40.0,
    originalPrice: 50.0,
    image: "/colorful-jumper-wires-cables-electronic-connection.jpg",
    description: "Set de 120 cables de conexión",
    inStock: true,
    isOffer: true,
  },
]

const categories = [
  "Todos",
  "Componentes Pasivos",
  "Componentes Activos",
  "Fuentes de Energía",
  "Instrumentación",
  "Accesorios",
]

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showOffers, setShowOffers] = useState(false)
  const { dispatch } = useCart()

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
    const matchesOffers = !showOffers || product.isOffer

    return matchesSearch && matchesCategory && matchesOffers
  })

  const addToCart = (product: (typeof allProducts)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Catálogo de Productos</h1>
          <p className="text-slate-300">
            Encuentra todos los componentes electrónicos que necesitas para tus proyectos
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800"
                }
              >
                {category}
              </Button>
            ))}
            <Button
              variant={showOffers ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOffers(!showOffers)}
              className={
                showOffers ? "bg-green-600 hover:bg-green-700" : "border-slate-600 text-slate-300 hover:bg-slate-800"
              }
            >
              <Filter className="h-4 w-4 mr-1" />
              Solo Ofertas
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 ${viewMode === "list" ? "flex flex-row" : ""}`}
            >
              <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                <div className={`relative ${viewMode === "list" ? "h-32" : "h-48"}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  {product.isOffer && <Badge className="absolute top-2 right-2 bg-red-600 text-white">Oferta</Badge>}
                  {!product.inStock && <Badge className="absolute top-2 left-2 bg-gray-600 text-white">Agotado</Badge>}
                </div>
              </div>

              <div className="flex-1">
                <CardHeader className={viewMode === "list" ? "pb-2" : ""}>
                  <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                  <CardDescription className="text-slate-300">{product.description}</CardDescription>
                  <Badge variant="outline" className="w-fit text-blue-400 border-blue-400">
                    {product.category}
                  </Badge>
                </CardHeader>

                <CardContent className={viewMode === "list" ? "py-2" : ""}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-400">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-slate-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600"
                  >
                    {product.inStock ? "Agregar al Carrito" : "Agotado"}
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No se encontraron productos que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
