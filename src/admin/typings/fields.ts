abstract class BaseField {}

class StringField extends BaseField {}

class NumberField extends BaseField {}

class DateField extends BaseField {}

class IntegerField extends BaseField {}

class ForeignKeyField extends BaseField {}

export {
  BaseField,
  StringField,
  NumberField,
  IntegerField,
  DateField,
  ForeignKeyField
};
