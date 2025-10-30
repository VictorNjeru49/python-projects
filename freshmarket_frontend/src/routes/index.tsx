import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import ProductList from '@/components/ProductList'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
   <ProductList/>
  )
}
