import { format, parseISO } from 'date-fns'

type Props = {
  dateString: string
  className?: string
}

const DateTime1 = ({ dateString, className }: Props): JSX.Element => {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString} className={className}>
      {format(date, 'hh:mma MM/d/yyyy')}
    </time>
  )
}

export default DateTime1
