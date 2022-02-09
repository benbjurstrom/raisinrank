import { parseISO } from 'date-fns'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import locale from 'date-fns/locale/en-US'

type Props = {
  dateString: string
  className?: string
}

const formatDistanceLocale = {
  lessThanXSeconds: '{{count}}s',
  xSeconds: '{{count}}s',
  halfAMinute: '30s',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y'
}

function formatDistance(token: string, count: string, options: any) {
  options = options || {}

  // @ts-ignore
  const result = formatDistanceLocale[token].replace('{{count}}', count)

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      return result + ' ago'
    }
  }

  return result
}

const DateTime2 = ({ dateString, className }: Props): JSX.Element => {
  const date = parseISO(dateString)

  const timeAgo = formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance
    }
  })

  return (
    <time dateTime={dateString} className={className}>
      {timeAgo}
    </time>
  )
}

export default DateTime2
