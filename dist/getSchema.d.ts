export declare function getSchema(source: string): Schema;
export interface Schema {
    type: 'schema';
    list: Block[];
}
export declare type Block = Model | Datasource | Generator | Enum | Comment | Break;
export interface Model {
    type: 'model';
    name: string;
    properties: Array<Property | Comment | Break>;
}
export interface Datasource {
    type: 'datasource';
    name: string;
    assignments: Array<Assignment | Comment | Break>;
}
export interface Generator {
    type: 'generator';
    name: string;
    assignments: Array<Assignment | Comment | Break>;
}
export interface Enum {
    type: 'enum';
    name: string;
    enumerators: Array<Enumerator | Comment | Break>;
}
export interface Comment {
    type: 'comment';
    text: string;
}
export interface Break {
    type: 'break';
}
export declare type Property = GroupedModelAttribute | ModelAttribute | Field;
export interface Assignment {
    type: 'assignment';
    key: string;
    value: Value;
}
export interface Enumerator {
    type: 'enumerator';
    name: string;
    value?: Value;
    comment?: string;
}
export interface ModelAttribute {
    type: 'attribute';
    kind: 'model';
    group?: string;
    name: string;
    args: AttributeArgument[];
}
export declare type GroupedModelAttribute = ModelAttribute & {
    group: string;
};
export interface Field {
    type: 'field';
    name: string;
    fieldType: string | Func;
    array?: boolean;
    optional?: boolean;
    attributes?: Attribute[];
    comment?: string;
}
export declare type Attr = Attribute | GroupedAttribute | ModelAttribute | GroupedModelAttribute;
export interface Attribute {
    type: 'attribute';
    kind: 'field';
    group?: string;
    name: string;
    args?: AttributeArgument[];
}
export declare type GroupedAttribute = Attribute & {
    group: string;
};
export interface AttributeArgument {
    type: 'attributeArgument';
    value: KeyValue | Value | Func;
}
export interface KeyValue {
    type: 'keyValue';
    key: string;
    value: Value;
}
export interface Func {
    type: 'function';
    name: string;
    params: Value[];
}
export interface RelationArray {
    type: 'array';
    args: string[];
}
export declare type Value = string | number | boolean | Func | RelationArray | Array<Value>;
