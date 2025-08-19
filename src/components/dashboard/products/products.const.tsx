import { ColumnDef } from '@tanstack/react-table'

import { Product } from './products.type'

export const COLUMNS: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Название',
  },
  {
    accessorKey: 'description',
    header: 'Описание',
  },
  {
    accessorKey: 'image',
    header: 'Изображение',
  },
  {
    accessorKey: 'price',
    header: 'Цена',
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата создания',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Дата обновления',
  },
]
