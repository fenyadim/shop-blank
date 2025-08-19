'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Edit, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { routeConfig } from '@/config/route'
import { trpc } from '@/providers/trpc-provider'

import { COLUMNS } from './products.const'
import { Product } from './products.type'

export const ProductsTable = () => {
  const { data } = trpc.products.findAll.useQuery()

  const utils = trpc.useUtils()

  const deleteMutation = trpc.products.delete.useMutation({
    onSuccess: () => {
      utils.products.invalidate()
    },
  })

  const handleDeleteClick = useCallback(async (id: string) => {
    deleteMutation.mutateAsync({ id })
  }, [])

  const columsWithAction: ColumnDef<Product>[] = [
    ...COLUMNS,
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original

        return (
          <div className="flex gap-2">
            <Button size="icon" variant="secondary">
              <Edit />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => handleDeleteClick(product.id)}
            >
              <Trash />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: data ?? [],
    columns: columsWithAction,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card className="overflow-hidden w-2/3">
      <CardHeader>
        <Button className="w-min" asChild>
          <Link href={routeConfig.newProduct()}>
            Добавить <Plus />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="overflow-hidden p-0 border border-x-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
