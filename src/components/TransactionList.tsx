import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { parseISO } from 'date-fns'
import React from 'react'

import { Transaction } from '../db'
import { getIcpTwoDecimals } from '../utils/helpers'
import Blockie from './elements/Blockie'
import DateTime2 from './elements/DateTime2'
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
    type: 'number',
    renderCell: (params: GridRenderCellParams<Transaction>) => <span>{params.row.price} ICP</span>
  },
  {
    field: 'dateTime',
    type: 'dateTime',
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
  const list = transactions.map((transaction) => {
    return {
      ...transaction,
      price: getIcpTwoDecimals(transaction.price),
      dateTime: parseISO(transaction.soldAt)
    }
  })

  return (
    <div style={{ height: 900, width: '100%' }}>
      <DataGrid
        rowHeight={150}
        rows={list}
        columns={columns}
        disableColumnSelector={true}
        disableDensitySelector={true}
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
