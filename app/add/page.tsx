import { AddProductForm } from '@/components/add-product-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Add Product | v0 App',
  description: 'Add a new product to the catalog',
}

export default function AddProductPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <AddProductForm />
      </div>
    </main>
  )
}
