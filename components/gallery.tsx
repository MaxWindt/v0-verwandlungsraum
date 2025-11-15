"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [infoTimeout, setInfoTimeout] = useState<NodeJS.Timeout | null>(null)

  const images = [
    { id: 1, src: "/images/workspace1.png", alt: "Kunsttherapie Impression 1" },
    { id: 2, src: "/images/workspace2.png", alt: "Kunsttherapie Impression 2" },
    { id: 3, src: "/images/workspace3.png", alt: "Kunsttherapie Impression 3" },
    { id: 4, src: "/images/meditation.png", alt: "Kunsttherapie Impression 4" },
    { id: 5, src: "/images/clay-face.jpg", alt: "Tonskulptur - Gesicht" },
    { id: 6, src: "/images/clay-animals.jpg", alt: "Tonskulpturen - Tiere" },
    { id: 7, src: "/images/therapy-space.jpg", alt: "Therapieraum mit Mandala" },
    { id: 8, src: "/images/art-materials.jpg", alt: "Kunsttherapie Materialien" },
    { id: 9, src: "/images/group-artwork.jpg", alt: "Gruppenarbeit Kunsttherapie" },
  ]

  const openLightbox = (imageIndex: number) => {
    setSelectedImage(imageIndex)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    setShowInfo(false)
    if (infoTimeout) {
      clearTimeout(infoTimeout)
      setInfoTimeout(null)
    }
    document.body.style.overflow = "unset"
  }

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
    }
  }

  const handleMouseMove = () => {
    setShowInfo(true)
    if (infoTimeout) {
      clearTimeout(infoTimeout)
    }
    const timeout = setTimeout(() => {
      setShowInfo(false)
    }, 3000)
    setInfoTimeout(timeout)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
  }

  useEffect(() => {
    return () => {
      if (infoTimeout) {
        clearTimeout(infoTimeout)
      }
    }
  }, [infoTimeout])

  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-orange-400">Impressionen</h2>
            <div className="heading-underline"></div>
            <p className="text-lg">Einblicke in die kreative Arbeit</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative h-64 rounded-3xl overflow-hidden hover-lift cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-800/70 via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 border-2 border-amber-300">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          onMouseMove={handleMouseMove}
          onClick={handleBackdropClick}
          tabIndex={0}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-amber-300 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            aria-label="Schließen"
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            aria-label="Nächstes Bild"
          >
            <ChevronRight size={48} />
          </button>

          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-amber-800/70 px-4 py-2 rounded-full transition-opacity duration-300 pointer-events-none ${
              showInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            {selectedImage + 1} / {images.length}
          </div>

          <div
            className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-center transition-opacity duration-300 pointer-events-none ${
              showInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-lg font-medium bg-amber-800/70 px-4 py-2 rounded-lg">{images[selectedImage].alt}</p>
          </div>
        </div>
      )}
    </section>
  )
}
