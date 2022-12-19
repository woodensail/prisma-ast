import * as schema from './getSchema';
import { PrintOptions } from './printSchema';
declare type ReplaceReturnType<Original extends (...args: any) => any, NewReturn> = (...a: Parameters<Original>) => NewReturn;
declare type ExtractKeys = 'getSchema' | 'getSubject' | 'getParent' | 'print';
declare type NeutralKeys = 'break' | 'comment' | 'attribute' | 'enumerator';
declare type DatasourceOrGeneratorKeys = 'assignment';
declare type EnumKeys = 'enumerator';
declare type FieldKeys = 'attribute';
declare type ModelKeys = 'blockAttribute' | 'field';
declare type PrismaSchemaSubset<Universe extends keyof ConcretePrismaSchemaBuilder, Method> = ReplaceReturnType<ConcretePrismaSchemaBuilder[Universe], PrismaSchemaBuilder<Exclude<keyof ConcretePrismaSchemaBuilder, Method>>>;
declare type PrismaSchemaBuilder<K extends keyof ConcretePrismaSchemaBuilder> = {
    [U in K]: U extends ExtractKeys ? ConcretePrismaSchemaBuilder[U] : U extends NeutralKeys ? ConcretePrismaSchemaBuilder[U] : U extends 'datasource' ? PrismaSchemaSubset<U, 'datasource' | EnumKeys | FieldKeys | ModelKeys> : U extends 'generator' ? PrismaSchemaSubset<U, EnumKeys | FieldKeys | ModelKeys> : U extends 'model' ? PrismaSchemaSubset<U, DatasourceOrGeneratorKeys | EnumKeys | FieldKeys> : U extends 'field' ? PrismaSchemaSubset<U, DatasourceOrGeneratorKeys | EnumKeys> : U extends 'enum' ? PrismaSchemaSubset<U, DatasourceOrGeneratorKeys | ModelKeys | FieldKeys> : PrismaSchemaSubset<U, DatasourceOrGeneratorKeys | EnumKeys | FieldKeys | ModelKeys | 'comment'>;
};
declare type Arg = string | {
    name: string;
    function?: Arg[];
};
export declare class ConcretePrismaSchemaBuilder {
    private schema;
    private _subject;
    private _parent;
    constructor(source?: string);
    print(options?: PrintOptions): string;
    getSchema(): schema.Schema;
    generator(name: string, provider: string): this;
    drop(name: string): this;
    datasource(provider: string, url: string | {
        env: string;
    }): this;
    model(name: string): this;
    enum(name: string, enumeratorNames?: string[]): this;
    enumerator(value: string): this;
    private getSubject;
    private getParent;
    blockAttribute(name: string, args?: string | string[] | Record<string, schema.Value>): this;
    attribute<T extends schema.Field>(name: string, args?: Arg[] | Record<string, string[]>): this;
    assignment<T extends schema.Generator | schema.Datasource>(key: string, value: string): this;
    private blockInsert;
    break(): this;
    comment(text: string, node?: boolean): this;
    schemaComment(text: string, node?: boolean): this;
    field(name: string, fieldType: string | schema.Func): this;
    then<R extends schema.Block>(callback: (subject: R) => R): this;
}
export declare function createPrismaSchemaBuilder(source?: string): PrismaSchemaBuilder<Exclude<keyof ConcretePrismaSchemaBuilder, DatasourceOrGeneratorKeys | EnumKeys | FieldKeys | ModelKeys>>;
export {};
