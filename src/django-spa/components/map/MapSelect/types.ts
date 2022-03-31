import { MapListItem } from '../MapList'

export interface MapSelectOption<T> {
  marker: Omit<MapListItem, 'info'> & { info: (isSelected: boolean, onSelect: () => void) => MapListItem['info'] }
  value: T
}
