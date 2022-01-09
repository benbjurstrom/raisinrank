// material
import { Box } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import { Transaction } from '../db'
import Label from './Label'

const ProductImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  borderRadius: theme.shape.borderRadiusMd
}))

type TransactionCardProps = {
  transaction: Transaction
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'relative',
        height: 120,
        width: 120,
        borderRadius: theme.shape.borderRadiusMd
      }}
    >
      <Label
        variant="filled"
        color={'primary'}
        sx={{
          bottom: 2,
          left: 2,
          zIndex: 9,
          position: 'absolute',
          fontSize: 10
        }}
      >
        {transaction.tokenIndex}
      </Label>
      <ProductImgStyle
        src={`https://${transaction.canisterId}.raw.ic0.app/?cc=0&type=thumbnail&tokenid=${transaction.tokenId}`}
      />
    </Box>
  )
}
