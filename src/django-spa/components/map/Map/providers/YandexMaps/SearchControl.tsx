import React, { CSSProperties, FC, useMemo } from 'react'
import { SearchControl as YandexSearchControl } from 'react-yandex-maps'
import type ymaps from 'yandex-maps'

import { Place } from './types'
import { useAddEventsCallback } from './useAddEventsCallback'

interface SearchControlProps {
  inputStyle?: CSSProperties
  onPlaceChange?: (place: Place | undefined) => void
  placeholder?: string
}

/*
  TODO: Добавить поддержку inputStyle
  Для этого потребуется либо сделать целиком свой кастомный контрол поиска - https://yandex.com/dev/maps/jsbox/2.1/custom_control
  Либо заменить layout для формы встроенного:
    Язык шаблонов - https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Template.html
    Фабрика шаблонов - https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/templateLayoutFactory.html
    Получение доступа к фабрике - https://react-yandex-maps.vercel.app/provider-consumer/with-ymaps-hoc
    const Component = withYMaps(
      ({ ymaps }) => {
        const layout = ymaps.templateLayoutFactory.createClass(...)
        ...
      },
      true, ['templateLayoutFactory'])
 */

export const SearchControl: FC<SearchControlProps> = ({ placeholder, onPlaceChange }) => {
  const options: ymaps.control.ISearchControlParameters['options'] = useMemo(
    () => ({
      noCentering: true,
      noPlacemark: true,
      placeholderContent: placeholder,
    }),
    [placeholder]
  )

  const addEvents = useAddEventsCallback(
    (control: ymaps.control.SearchControl) => {
      control.events.add('resultshow', (event) => {
        const result = control.getResultsArray()[event.get('index') as number]
        onPlaceChange && onPlaceChange(result)
      })
    },
    [onPlaceChange]
  )

  /* У instanceRef некорректный тип: на самом деле там передаётся сам объект карты, а не Ref на него */
  return <YandexSearchControl options={options} instanceRef={addEvents as never} />
}
