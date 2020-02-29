import {BaseProvider} from '../admin/typings/providers';

class PatientProvider extends BaseProvider {
    url = '/patients/';
    writableFields = ['first_name', 'last_name', 'birth_date', 'age', 'user'];
    readOnlyFields = [];
}

export {PatientProvider};

let ptProvider = new PatientProvider();
console.log(ptProvider.getList());
