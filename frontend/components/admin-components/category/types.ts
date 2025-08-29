export interface Subcategory {
  id: number
  name: string
  slug: string
  productCount: number
  isActive: boolean
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  productCount: number
  isActive: boolean
  subcategories?: Subcategory[]
}

export interface FormData {
  name: string
  description: string
  parentCategory: string
  isActive: boolean
}
