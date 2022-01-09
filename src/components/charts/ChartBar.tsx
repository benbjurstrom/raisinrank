import { Card } from '@mui/material'
import { styled } from '@mui/material/styles'
import { merge } from 'lodash'
import ReactApexChart from 'react-apexcharts'

import BaseOptionChart from './BaseOptionChart'

type Props = {
  data: any[]
  title: string
  xTitle: string
  yTitle: string
}

const RootStyle = styled(Card)(({ theme }) => ({
  padding: theme.spacing(6, 2, 2, 2)
}))

export default function ChartBar({ data, title, xTitle, yTitle }: Props) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { show: false },
    title: {
      text: title
    },
    yaxis: {
      title: {
        text: yTitle
      }
    },
    plotOptions: {
      bar: { barHeight: '30%' }
    },
    dataLabels: {
      enabled: true
    },
    tooltip: {
      theme: 'dark'
    }
  })

  return (
    <RootStyle>
      <ReactApexChart
        type="bar"
        series={[{ data, name: 'Listings' }]}
        options={chartOptions}
        height={280}
      />
    </RootStyle>
  )
}
