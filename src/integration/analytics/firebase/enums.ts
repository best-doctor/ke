enum EventNameEnum {
  LINK_CLICK = 'link_click',
  SELECT_OPTION_CHANGE = 'select_option_change',
  NESTED_SELECT_OPTION_CHANGE = 'nested_select_option_change',
  BUTTON_CLICK = 'button_click',
  FOREIGN_KEY_SELECT_OPTION_CHANGE = 'foreign_key_select_option_change',
  INPUT_CHANGE = 'input_change',
}

enum WidgetTypeEnum {
  ACTION = 'action',
  INPUT = 'input',
  FILTER = 'filter',
  SORTING = 'sorting',
  PAGINATION = 'pagination',
}

export { EventNameEnum, WidgetTypeEnum }
