import axios from 'axios';

const backendAPIURL = '/api'


abstract class BaseProvider {
    url!: string;
    writableFields!: string[];
    readOnlyFields!: string[];

    getList = async () => {
        let response = await axios.get(backendAPIURL + this.url );
        return response.data;
    }
    getObject = async (objectId: string) => {
        let response = await axios.get(backendAPIURL + this.url + objectId + '/');
        return response.data;
    }
};

export { BaseProvider };