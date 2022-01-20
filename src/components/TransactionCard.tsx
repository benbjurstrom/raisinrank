// material
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Transaction } from '../db'
import Image1 from './elements/Image1'
import Label from './Label'

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
      <Image1 tokenId={transaction.tokenId} tokenIndex={transaction.tokenIndex} />
    </Box>
  )
}
