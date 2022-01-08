import { merge } from 'lodash'
import ReactApexChart from 'react-apexcharts'

//
import BaseOptionChart from './BaseOptionChart'

// ----------------------------------------------------------------------

type Props = {
  data: any[]
}

export default function MarketDepthChart({ data }: Props) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { show: false },
    title: {
      text: 'Market Depth'
    },
    xaxis: {
      title: {
        text: 'Price Range'
      }
    },
    yaxis: {
      title: {
        text: 'Listings'
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
    <ReactApexChart
      type="bar"
      series={[{ data, name: 'Listings' }]}
      options={chartOptions}
      height={320}
    />
  )
}
