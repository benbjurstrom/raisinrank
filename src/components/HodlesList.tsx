import { Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getCanisterFromSlug } from '../utils/canisterResolver'
import { HodleCollection } from '../utils/updateHodles'
import Blockie from './elements/Blockie'

type HodleListProps = {
  hodleCollection: HodleCollection[]
}

export default function HodlesList({ hodleCollection }: HodleListProps) {
  const { collection } = useParams()
  const canister = getCanisterFromSlug(collection)
  const navigate = useNavigate()

  const columns: GridColDef[] = [
    {
      field: 'count',
      headerName: 'Count'
    },
    {
      field: 'ownerId',
      headerName: 'Account',
      width: 220,
      renderCell: (params: GridRenderCellParams<HodleCollection>) => (
        <Stack direction="row" alignItems="center" spacing={3}>
          <Blockie canister={canister} address={params.row.ownerId} />
          <Typography sx={{ display: 'block', maxWidth: 100 }} noWrap>
            {params.row.ownerId}
          </Typography>
        </Stack>
      )
    }
  ]

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
        onRowClick={(r) => navigate(`/${canister.slug}/hodlers/${r.row.ownerId}`)}
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
