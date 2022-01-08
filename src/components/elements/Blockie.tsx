import { Theme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import { SxProps } from '@mui/system'
import { format, parseISO } from 'date-fns'
import makeBlockie from 'ethereum-blockies-base64'
import React from 'react'

type Props = {
  address: string
  sx?: SxProps<Theme>
}

const Blockie = ({ address, sx }: Props): JSX.Element => {
  const src = makeBlockie(address)
  return (
    <Tooltip title={address}>
      <Avatar sx={sx} alt="Remy Sharp" src={src} />
    </Tooltip>
  )
}

export default Blockie
