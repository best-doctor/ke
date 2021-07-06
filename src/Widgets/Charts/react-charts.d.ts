declare module 'react-charts' {
  export function Chart(props: ChartProps): JSX.Element

  export interface ChartProps {
    data: ChartData
    axes?: Axes
    series?: Series
  }

  export type ChartData = SimpleChartData | SeriesChartData

  export type Axes = [Axe, Axe]

  export interface Series {
    type?: 'area' | 'bar' | 'bubble' | 'line'
    showPoints?: boolean
  }

  type SimpleChartData = [x: number, y: number][][]

  type SeriesChartData = DataSeries[]

  interface DataSeries {
    label: string
    data: { x: number; y: number }[]
  }

  interface Axe {
    primary?: boolean
    type: 'linear' | 'ordinal' | 'time' | 'utc' | 'log'
    position: 'top' | 'right' | 'bottom' | 'left'
    show?: boolean
  }
}
