import { CstNode, IToken } from '@chevrotain/types';
import * as Types from './getSchema';
declare const BasePrismaVisitor: new (...args: any[]) => import("@chevrotain/types").ICstVisitor<any, any>;
export declare class PrismaVisitor extends BasePrismaVisitor {
    constructor();
    schema(ctx: CstNode & {
        list: CstNode[];
    }): Types.Schema;
    component(ctx: CstNode & {
        type: [IToken];
        componentName: [IToken];
        block: [CstNode];
    }): Types.Block;
    break(): Types.Break;
    comment(ctx: CstNode & {
        text: [IToken];
    }): Types.Comment;
    block(ctx: CstNode & {
        list: CstNode[];
    }): Types.Block[];
    assignment(ctx: CstNode & {
        assignmentName: [IToken];
        assignmentValue: [CstNode];
    }): Types.Assignment;
    field(ctx: CstNode & {
        fieldName: [IToken];
        fieldType: [CstNode];
        array: [IToken];
        optional: [IToken];
        attributeList: CstNode[];
        comment: [IToken];
    }): Types.Field;
    attribute(ctx: CstNode & {
        modelAttribute: [IToken];
        fieldAttribute: [IToken];
        groupName: [IToken];
        attributeName: [IToken];
        attributeArg: CstNode[];
    }): Types.Attr;
    attributeArg(ctx: CstNode & {
        value: [CstNode];
    }): Types.AttributeArgument;
    func(ctx: CstNode & {
        funcName: [IToken];
        value: CstNode[];
        keyedArg: CstNode[];
    }): Types.Func;
    array(ctx: CstNode & {
        value: CstNode[];
    }): Types.RelationArray;
    keyedArg(ctx: CstNode & {
        keyName: [IToken];
        value: [CstNode];
    }): Types.KeyValue;
    value(ctx: CstNode & {
        value: [IToken] | [CstNode];
    }): Types.Value;
    enum(ctx: CstNode & {
        enumName: [IToken];
        comment: [IToken];
    }): Types.Enumerator;
}
export {};
