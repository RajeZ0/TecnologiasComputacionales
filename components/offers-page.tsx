"use client"
import { Clock, Percent, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "./cart-context"

const offerProducts = [
  {
    id: 1,
    name: "Resistencias de Carbón 1/4W",
    originalPrice: 30.0,
    offerPrice: 25.0,
    discount: 17,
    image: "/electronic-resistors-kit-colorful-components.jpg",
    description: "Kit de 100 resistencias de diferentes valores",
    timeLeft: "2 días",
    rating: 4.8,
    soldCount: 156,
  },
  {
    id: 4,
    name: "Arduino Uno R3",
    originalPrice: 380.0,
    offerPrice: 320.0,
    discount: 16,
    image: "/arduino-uno-microcontroller-board-blue-electronic.jpg",
    description: "Microcontrolador para proyectos de ingeniería",
    timeLeft: "5 días",
    rating: 4.9,
    soldCount: 89,
  },
  {
    id: 7,
    name: "Fuente Variable 0-30V",
    originalPrice: 950.0,
    offerPrice: 850.0,
    discount: 11,
    image: "/batteries-power-supplies-breadboard-electronic.jpg",
    description: "Fuente regulable con display digital",
    timeLeft: "1 día",
    rating: 4.7,
    soldCount: 34,
  },
  {
    id: 9,
    name: "Multímetro Digital Fluke",
    originalPrice: 1400.0,
    offerPrice: 1200.0,
    discount: 14,
    image: "/digital-multimeter-yellow-black-electronic-measure.jpg",
    description: "Multímetro profesional de alta precisión",
    timeLeft: "3 días",
    rating: 5.0,
    soldCount: 67,
  },
  {
    id: 12,
    name: "Cables Jumper Macho-Hembra",
    originalPrice: 50.0,
    offerPrice: 40.0,
    discount: 20,
    image: "/colorful-jumper-wires-cables-electronic-connection.jpg",
    description: "Set de 120 cables de conexión",
    timeLeft: "4 días",
    rating: 4.6,
    soldCount: 203,
  },
]

export function OffersPage() {
  const { dispatch } = useCart()

  const addToCart = (product: (typeof offerProducts)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.offerPrice,
        image: product.image,
      },
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Percent className="h-10 w-10 text-red-500" />
            Ofertas Especiales
          </h1>
          <p className="text-slate-300 text-lg">¡Aprovecha estos descuentos por tiempo limitado!</p>
        </div>

        {/* Featured Offer */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/30 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <Image
                  src={offerProducts[0].image || "/placeholder.svg"}
                  alt={offerProducts[0].name}
                  width={800}
                  height={600}
                  className="w-full h-64 lg:h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-red-600 text-white text-lg px-4 py-2">
                  OFERTA DEL DÍA - {offerProducts[0].discount}% OFF
                </Badge>
                <h2 className="text-3xl font-bold text-white mb-4">{offerProducts[0].name}</h2>
                <p className="text-slate-300 mb-6">{offerProducts[0].description}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{offerProducts[0].rating}</span>
                  </div>
                  <div className="text-slate-300">{offerProducts[0].soldCount} vendidos</div>
                  <div className="flex items-center gap-2 text-red-400">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">Termina en {offerProducts[0].timeLeft}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-green-400">${offerProducts[0].offerPrice}</span>
                  <span className="text-2xl text-slate-400 line-through">${offerProducts[0].originalPrice}</span>
                  <Badge className="bg-red-600 text-white">
                    Ahorras ${offerProducts[0].originalPrice - offerProducts[0].offerPrice}
                  </Badge>
                </div>

                <Button
                  onClick={() => addToCart(offerProducts[0])}
                  className="bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                >
                  Agregar al Carrito - ¡Oferta Limitada!
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Other Offers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offerProducts.slice(1).map((product) => (
            <Card
              key={product.id}
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group"
            >
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={320}
                  className="w-full h-48 object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                <Badge className="absolute top-2 right-2 bg-red-600 text-white">-{product.discount}%</Badge>
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {product.timeLeft}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-white text-lg group-hover:text-blue-400 transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-slate-300">{product.description}</CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{product.rating}</span>
                  </div>
                  <span className="text-slate-400 text-sm">{product.soldCount} vendidos</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-green-400">${product.offerPrice}</span>
                  <span className="text-lg text-slate-400 line-through">${product.originalPrice}</span>
                </div>
                <Badge className="bg-red-600/20 text-red-400 border-red-600">
                  Ahorras ${product.originalPrice - product.offerPrice}
                </Badge>
              </CardContent>

              <CardFooter>
                <Button onClick={() => addToCart(product)} className="w-full bg-red-600 hover:bg-red-700">
                  Aprovechar Oferta
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border-blue-500/30 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">¿No encontraste lo que buscabas?</h3>
            <p className="text-slate-300 mb-6">
              Suscríbete a nuestro boletín y sé el primero en enterarte de nuevas ofertas y productos
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">Suscribirse a Ofertas</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
