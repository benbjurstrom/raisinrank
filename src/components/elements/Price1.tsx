type Props = {
  price: string
  className?: string
}

const Price1 = ({ price, className }: Props): JSX.Element => {
  if (!price) {
    return <span>N/A</span>
  }

  return <span>{(Number(price) / 100000000).toFixed(2)} ICP</span>
}

export default Price1
