"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import Image from "next/image"

interface CartDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { state, dispatch } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      alert("¡Compra realizada con éxito! Gracias por tu pedido.")
      dispatch({ type: "CLEAR_CART" })
      setIsCheckingOut(false)
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Cart Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-2xl z-50 max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-400" />
              Carrito ({state.itemCount})
            </h3>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-white">
              ✕
            </Button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Tu carrito está vacío</p>
              <p className="text-sm text-slate-500 mt-1">Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/30"
                >
                  <div className="relative h-12 w-12 rounded-md overflow-hidden bg-slate-700">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                    <p className="text-sm text-blue-400 font-semibold">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity - 1 },
                        })
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="text-white font-medium w-8 text-center">{item.quantity}</span>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="p-4 border-t border-slate-700/50 bg-slate-900/80">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-white">Total:</span>
              <span className="text-xl font-bold text-green-400">${state.total.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-2.5"
              >
                {isCheckingOut ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Procesando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Finalizar Compra
                  </div>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => dispatch({ type: "CLEAR_CART" })}
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Vaciar Carrito
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
