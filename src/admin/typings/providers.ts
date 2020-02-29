export abstract class BaseProvider {
    url!: string;
    writableFields!: string[];
    readOnlyFields!: string[];

    abstract getList: () => Object[];
    abstract getObject: (objectId: string) => Object;

    abstract create = (data: Object) => Object;
    abstract update = (data: Object) => Object;
    abstract delete = (data: Object) => Object;
};

