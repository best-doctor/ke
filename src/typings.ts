export enum FieldType {
  String = "string",
  Integer = "integer",
  ForeignKey = "FK"
}
export type Point = [number, number];
type Position = {
  topLeft: Point;
  lowRight: Point;
};
type Field = {
  name: string;
  fieldType: FieldType;
  readOnly: boolean;
  className: string;
  position: Position;
};
export interface BaseAdmin {
  fields: Field[];
}
