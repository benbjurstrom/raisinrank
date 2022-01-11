import { Theme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import { SxProps } from '@mui/system'
import makeBlockie from 'ethereum-blockies-base64'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Canister } from '../../utils/canisterResolver'

type Props = {
  address: string
  canister: Canister
  sx?: SxProps<Theme>
}

const Blockie = ({ address, canister, sx }: Props): JSX.Element => {
  const src = makeBlockie(address)
  return (
    <RouterLink to={`/${canister.slug}/hodlers/${address}`}>
      <Tooltip title={address}>
        <Avatar sx={sx} alt={address} src={src} />
      </Tooltip>
    </RouterLink>
  )
}

export default Blockie
