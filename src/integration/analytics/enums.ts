enum EventNameEnum {
  LINK_CLICK = 'link_click',
  RADIO_BUTTON_CHOICE = 'radio_button_choice',
  DATE_CHANGE = 'date_change',
  DATETIME_CHANGE = 'datetime_change',
  SELECT_OPTION_CHANGE = 'select_option_change',
  MULTISELECT_OPTION_CHANGE = 'multiselect_option_change',
  NESTED_SELECT_OPTION_CHANGE = 'nested_select_option_change',
  BUTTON_CLICK = 'button_click',
  FOREIGN_KEY_SELECT_OPTION_CHANGE = 'foreign_key_select_option_change',
  MULTI_SELECT_OPTION_CHANGE = 'multi_select_option_change',
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
