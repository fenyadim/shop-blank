import { DashboardHeader, ProductsTable } from '@/components/dashboard'

export const ProductsPage = () => {
  return (
    <>
      <DashboardHeader title="Товары" />
      <div className="px-3">
        <ProductsTable />
      </div>
    </>
  )
}
