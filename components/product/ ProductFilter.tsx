"use client"

interface ProductFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const ProductFilter: React.FC<ProductFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-4 p-4">
      <h2 className="text-xl font-bold">Filter by Category</h2>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="mt-2 p-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option> // Use index as key
        ))}
      </select>
    </div>
  )
}

export default ProductFilter
