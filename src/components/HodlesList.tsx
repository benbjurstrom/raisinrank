import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import React from 'react'

import { HodleCollection } from '../utils/updateHodles'
import Blockie from './elements/Blockie'

const columns: GridColDef[] = [
  {
    field: 'count',
    headerName: 'Count'
  },
  {
    field: 'ownerId',
    headerName: 'Owner',
    renderCell: (params: GridRenderCellParams<HodleCollection>) => (
      <Blockie address={params.row.ownerId} />
    )
  }
]

type HodleListProps = {
  hodleCollection: HodleCollection[]
}

export default function HodlesList({ hodleCollection }: HodleListProps) {
  return (
    <div style={{ height: 900, width: '100%' }}>
      <DataGrid
        getRowId={(r) => r.ownerId}
        rows={hodleCollection}
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
