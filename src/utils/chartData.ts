import { Listing } from '../db'

export const getBigListings = (listings: Listing[]) => {
  return listings.reduce(
    function (acc, listing) {
      const x = Number(listing.price) / 100000000
      switch (true) {
        case x < 10:
          acc[0].y += 1
          break
        case x < 20:
          acc[1].y += 1
          break
        case x < 50:
          acc[2].y += 1
          break
        case x < 75:
          acc[3].y += 1
          break
        case x < 100:
          acc[4].y += 1
          break
        case x < 150:
          acc[5].y += 1
          break
        case x < 200:
          acc[6].y += 1
          break
        case x < 500:
          acc[7].y += 1
          break
        default:
          acc[8].y += 1
          break
      }
      return acc
    },
    [
      {
        x: '< 10',
        y: 0
      },
      {
        x: '< 20',
        y: 0
      },
      {
        x: '< 50',
        y: 0
      },
      {
        x: '< 75',
        y: 0
      },
      {
        x: '< 100',
        y: 0
      },
      {
        x: '< 150',
        y: 0
      },
      {
        x: '<200',
        y: 0
      },
      {
        x: '<500',
        y: 0
      },
      {
        x: '500+',
        y: 0
      }
    ]
  )
}

export const getSmallListings = (listings: Listing[]) => {
  return listings.reduce(
    function (acc, listing) {
      const x = Number(listing.price) / 100000000
      switch (true) {
        case x < 1:
          acc[0].y += 1
          break
        case x < 1.5:
          acc[1].y += 1
          break
        case x < 2:
          acc[2].y += 1
          break
        case x < 5:
          acc[3].y += 1
          break
        case x < 10:
          acc[4].y += 1
          break
        case x < 20:
          acc[5].y += 1
          break
        case x < 50:
          acc[6].y += 1
          break
        case x < 100:
          acc[7].y += 1
          break
        default:
          acc[8].y += 1
          break
      }
      return acc
    },
    [
      {
        x: '< 1',
        y: 0
      },
      {
        x: '< 1.5',
        y: 0
      },
      {
        x: '< 2',
        y: 0
      },
      {
        x: '< 5',
        y: 0
      },
      {
        x: '< 10',
        y: 0
      },
      {
        x: '< 20',
        y: 0
      },
      {
        x: '< 50',
        y: 0
      },
      {
        x: '< 100',
        y: 0
      },
      {
        x: '100+',
        y: 0
      }
    ]
  )
}
