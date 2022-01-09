import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import React from 'react'

import { Transaction } from '../db'
import Blockie from './elements/Blockie'
import DateTime2 from './elements/DateTime2'
import Price1 from './elements/Price1'
import TransactionCard from './TransactionCard'

const columns: GridColDef[] = [
  {
    field: 'tokenIndex',
    headerName: 'NFT',
    width: 150,
    renderCell: (params: GridRenderCellParams<Transaction>) => {
      return <TransactionCard transaction={params.row} />
    }
  },
  {
    field: 'price',
    headerName: 'Price',
    renderCell: (params: GridRenderCellParams<Transaction>) => <Price1 price={params.row.price} />
  },
  {
    field: 'soldAt',
    headerName: 'Sold',
    renderCell: (params: GridRenderCellParams<Transaction>) => (
      <DateTime2 dateString={params.row.soldAt} />
    )
  },
  {
    field: 'sellerId',
    headerName: 'Seller',
    renderCell: (params: GridRenderCellParams<Transaction>) => (
      <Blockie address={params.row.sellerId} />
    )
  },
  {
    field: 'buyerId',
    headerName: 'Buyer',
    renderCell: (params: GridRenderCellParams<Transaction>) => (
      <Blockie address={params.row.buyerId} />
    )
  }
]

type TransactionListProps = {
  transactions: Transaction[]
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div style={{ height: 900, width: '100%' }}>
      <DataGrid
        rowHeight={150}
        rows={transactions}
        columns={columns}
        components={{
          Toolbar: GridToolbar
        }}
        // filterModel={{
        //   items: [
        //     { id: '1', columnField: 'sellerId', operatorValue: 'equals', value: '' },
        //     { id: '2', columnField: 'buyerId', operatorValue: 'equals', value: '' }
        //   ]
        // }}
      />
    </div>
  )
}
