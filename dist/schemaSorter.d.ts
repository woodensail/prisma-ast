import { Block, Schema } from './getSchema';
export declare const schemaSorter: (schema: Schema, locales?: string | string[] | undefined, sortOrder?: string[]) => (a: Block, b: Block) => number;
