import { BaseAdmin, FieldType, Point } from "../typings";

class PatientAdmin implements BaseAdmin {
  fields = [
    {
      name: "firstName",
      fieldType: FieldType.String,
      readOnly: false,
      className: "md-col-5",
      position: { topLeft: [1, 1] as Point, lowRight: [2, 5] as Point }
    }
  ];
}

export default PatientAdmin;
