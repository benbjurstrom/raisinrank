import { format, parseISO } from 'date-fns'

type Props = {
  dateString: string
  className?: string
}

const Date1 = ({ dateString, className }: Props): JSX.Element => {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString} className={className}>
      {format(date, 'LLLL	d, yyyy')}
    </time>
  )
}

export default Date1
