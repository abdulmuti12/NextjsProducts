'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, AlertCircle } from 'lucide-react'

interface ProductFormData {
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string
  brand: string
  sku: string
  weight: number
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
  minimumOrderQuantity: number
}

interface ApiResponse {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
  minimumOrderQuantity: number
}

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<ApiResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<ProductFormData>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      tags: '',
      brand: '',
      sku: '',
      weight: 0,
      warrantyInformation: '',
      shippingInformation: '',
      availabilityStatus: 'In Stock',
      returnPolicy: '',
      minimumOrderQuantity: 1,
    },
  })

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      const payload = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()),
        price: Number(data.price),
        discountPercentage: Number(data.discountPercentage),
        rating: Number(data.rating),
        stock: Number(data.stock),
        weight: Number(data.weight),
        minimumOrderQuantity: Number(data.minimumOrderQuantity),
      }

      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to add product')
      }

      const result = await response.json()
      setSuccessMessage(result)
      form.reset()
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Fill in the form below to add a new product to the catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: 'Title is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BMW Pencil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: 'Description is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Product description..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  rules={{ required: 'Category is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., electronics" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Pricing Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pricing</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    rules={{ required: 'Price is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount %</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" min="0" max="100" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                        </FormControl>
                        <FormDescription>Percentage discount (0-100)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Inventory Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Inventory</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="stock"
                    rules={{ required: 'Stock is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minimumOrderQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Order Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="1" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="availabilityStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability Status</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., In Stock" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product Details</h3>
                
                <FormField
                  control={form.control}
                  name="brand"
                  rules={{ required: 'Brand is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BMW" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  rules={{ required: 'SKU is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU (Stock Keeping Unit) *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BMW-PEN-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (0-5)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" min="0" max="5" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., writing, office, quality (comma-separated)" {...field} />
                      </FormControl>
                      <FormDescription>Separate multiple tags with commas</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                
                <FormField
                  control={form.control}
                  name="warrantyInformation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Warranty Information</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 1 year manufacturer warranty..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingInformation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Information</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Free shipping on orders over $50..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Return Policy</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 30 days return policy..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Adding Product...' : 'Add Product'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Success Message */}
      {successMessage && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-900">Product Added Successfully!</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-green-800">
              <p><strong>Product ID:</strong> {successMessage.id}</p>
              <p><strong>Title:</strong> {successMessage.title}</p>
              <p><strong>Category:</strong> {successMessage.category}</p>
              <p><strong>Price:</strong> ${successMessage.price}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
