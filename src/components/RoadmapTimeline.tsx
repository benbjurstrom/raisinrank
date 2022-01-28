// material
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@mui/lab'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    id: '1',
    title: 'Current Listings Page',
    description:
      'Show current listings sorted by most recent. Show seller account and previous listing price. Provide graphs of transaction volume.',
    status: 'Complete'
  },
  {
    id: '2',
    title: 'Holder Index Page',
    description:
      'Show the total number of unique holders. List all holder accounts with the number of assets held by each.',
    status: `Complete`
  },
  {
    id: '3',
    title: 'Holder Details Page',
    description:
      'Show all assets held by any given account. Label each asset with the purchase price and the current listing price.',
    status: `Complete`
  },
  {
    id: '4',
    title: 'Transaction History Page',
    description:
      'Filter and sort transactions by buyer, seller, price, and time. Export filtered transactions to csv.',
    status: `Complete`
  },
  {
    id: '5',
    title: 'Asset Details Page',
    description:
      'Linkable details page for each individual asset. Display listing info, owner info, and transaction history. Provide outbound links to dgdg.app and rankradar.io if applicable.',
    status: `In Progress`
  },
  {
    id: '6',
    title: 'Auto Data Refresh',
    description: 'Automatically refresh the data at a user defined interval.',
    status: `Coming Soon`
  },
  {
    id: '7',
    title: 'Enhance Transaction History Page',
    description:
      "Include the seller's original purchase price and time of purchase with each transaction record along with the daily USD spot price.",
    status: `Coming Soon`
  },
  {
    id: '8',
    title: 'Enhance Listing Page',
    description:
      'Optional table view that allows sorting and filtering by price, seller, and listing time.',
    status: `Coming Soon`
  },
  {
    id: '9',
    title: 'Integrate CAP',
    description:
      'Show asset history and activity for all collections that have integrated with cap.ooo.',
    status: `Coming Soon`
  },
  {
    id: '10',
    title: 'Integrate DAB',
    description: 'Automatically add CAP integrated collections from the dab.ooo NFT list.',
    status: `Coming Soon`
  }
]

// ----------------------------------------------------------------------

type OrderItemProps = {
  item: {
    id: string
    title: string
    description: string
    status: string
  }
  isLast: boolean
}

function OrderItem({ item, isLast }: OrderItemProps) {
  const { status, title, description } = item
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (status === 'Coming Soon' && 'primary') ||
            (status === 'Complete' && 'success') ||
            (status === 'In Progress' && 'warning') ||
            'error'
          }
          variant={status === 'Complete' ? 'filled' : 'outlined'}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">
          {title}{' '}
          {status === 'In Progress' ? (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              ({status})
            </Typography>
          ) : (
            ''
          )}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  )
}

export default function RoadmapTimeline() {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="RaisinRank Roadmap" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === TIMELINES.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}
