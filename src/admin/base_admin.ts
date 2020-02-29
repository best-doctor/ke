import { BaseProvider } from "../provider/base_provider";
import { BaseField } from './base_fields'; 

export {BaseAdmin};


class FieldPosition {
    topLeft!: number[];
    lowRight!: number[];
}


abstract class FieldDescription {
    name!: string;
    readOnly!: boolean;
    fieldType!: BaseField;
    position?: FieldPosition;
    className?: string;
};


abstract class BaseAdmin {
    provider!: BaseProvider;
    fields!: FieldDescription[];
}
