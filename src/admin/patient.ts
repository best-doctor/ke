import { BaseAdmin } from "./base_admin";
import { StringField, IntegerField, ForeignKeyField } from "./base_fields";

export {PatientAdmin };


class PatientAdmin extends BaseAdmin {
    fields = [
		{
			name: 'firstName',
			fieldType: StringField,
			readOnly: false,
			className: "md-col-5",
			position: {topLeft: [1, 1], lowRight: [2, 5]},
        },
        {name: 'lastName', fieldType: StringField, readOnly: false},
		{name: 'age', fieldType: IntegerField, readOnly: true},
        {name: 'user', fieldType: ForeignKeyField, readOnly: false},
		{name: 'user__email', fieldType: StringField, readOnly: true},
	]
};
