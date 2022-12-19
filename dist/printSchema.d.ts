import * as Types from './getSchema';
export interface PrintOptions {
    sort?: boolean;
    locales?: string | string[];
    sortOrder?: Array<'generator' | 'datasource' | 'model' | 'enum'>;
}
export declare function printSchema(schema: Types.Schema, options?: PrintOptions): string;
