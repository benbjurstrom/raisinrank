import { Box, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  DataGrid,
  GridColDef,
  GridOverlay,
  GridRenderCellParams,
  GridToolbar
} from '@mui/x-data-grid'
import { parseISO } from 'date-fns'
import React from 'react'

import { Transaction } from '../db'
import { Canister } from '../utils/canisterResolver'
import { getIcpTwoDecimals } from '../utils/helpers'
import Blockie from './elements/Blockie'
import DateTime2 from './elements/DateTime2'
import TransactionCard from './TransactionCard'

type TransactionListProps = {
  transactions: Transaction[]
  canister: Canister
  hideImage?: boolean
  height?: number
}

const StyledGridOverlay = styled(GridOverlay)(({ theme }) => ({
  flexDirection: 'column'
}))

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <Box sx={{ mt: 1 }}>No Transactions</Box>
    </StyledGridOverlay>
  )
}

export default function TransactionList({
  transactions,
  canister,
  hideImage = false,
  height = 900
}: TransactionListProps) {
  const columns: GridColDef[] = [
    {
      field: 'tokenIndex',
      headerName: 'NFT',
      width: 150,
      renderCell: (params: GridRenderCellParams<Transaction>) => {
        return <TransactionCard transaction={params.row} />
      },
      hide: hideImage
    },
    {
      align: 'left',
      headerAlign: 'left',
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
        <Tooltip title={params.row.soldAt}>
          <DateTime2 dateString={params.row.soldAt} />
        </Tooltip>
      )
    },
    {
      field: 'sellerId',
      headerName: 'Seller',
      renderCell: (params: GridRenderCellParams<Transaction>) => (
        <Blockie canister={canister} address={params.row.sellerId} />
      )
    },
    {
      field: 'buyerId',
      headerName: 'Buyer',
      renderCell: (params: GridRenderCellParams<Transaction>) => (
        <Blockie canister={canister} address={params.row.buyerId} />
      )
    }
  ]

  const list = transactions.map((transaction) => {
    return {
      ...transaction,
      price: getIcpTwoDecimals(transaction.price),
      dateTime: parseISO(transaction.soldAt)
    }
  })

  return (
    <div style={{ height: height, width: '100%' }}>
      <DataGrid
        rowHeight={150}
        rows={list}
        columns={columns}
        disableColumnSelector={true}
        disableDensitySelector={true}
        components={{
          Toolbar: GridToolbar,
          NoRowsOverlay: CustomNoRowsOverlay
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
