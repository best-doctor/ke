import { ListViewParams, ListViewData, ListViewStatus, useListData, useListParams } from './Contexts'

/**
 * Компонент для кастомизации стандартного функционала ListView.
 * Используя render-props в children с пробросом всего состояния ListView
 * в качестве параметров, позволяет реализовывать любую непредусмотренную логику.
 */
export function ListRaw({ children: render }: ListRawProps): JSX.Element {
  const { data, status } = useListData()
  const [params, onParamsChange] = useListParams()

  return render({ data, status, params, onParamsChange })
}

interface ListRawProps {
  /** render-prop */
  children: (props: {
    data: ListViewData | null
    status: ListViewStatus
    params: ListViewParams
    onParamsChange: (p: ListViewParams) => void
  }) => JSX.Element
}
