import { BaseProvider } from "./providers";
import { BaseField } from "./fields";

type FieldPosition = {
  topLeft: number[];
  lowRight: number[];
};

export abstract class FieldDescription {
  name!: string;
  readOnly!: boolean;
  fieldType!: BaseField;
  position?: FieldPosition;
  className?: string;
}

export abstract class BaseAdmin {
  provider!: BaseProvider;
  fields!: FieldDescription[];
}
