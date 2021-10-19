import { SelectParams, SelectResult, SelectStatus, useSelectResult, useSelectParams } from './Contexts'

/**
 * Компонент для кастомизации стандартного функционала SelectView.
 * Используя render-props в children с пробросом всего состояния SelectView
 * в качестве параметров, позволяет реализовывать любую непредусмотренную логику.
 */
export function SelectRaw({ children: render }: SelectRawProps): JSX.Element {
  const { result, status } = useSelectResult()
  const [params, onParamsChange] = useSelectParams()

  return render({ result, status, params, onParamsChange })
}

interface SelectRawProps {
  /** render-prop */
  children: (props: {
    result: SelectResult | null
    status: SelectStatus
    params: SelectParams
    onParamsChange: (p: SelectParams) => void
  }) => JSX.Element
}
