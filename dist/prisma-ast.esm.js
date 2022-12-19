import { Lexer, createToken, CstParser } from 'chevrotain';
import { EOL } from 'os';

var Identifier = /*#__PURE__*/createToken({
  name: 'Identifier',
  pattern: /[a-zA-Z]\w*/
});
var Datasource = /*#__PURE__*/createToken({
  name: 'Datasource',
  pattern: /datasource/,
  push_mode: 'block'
});
var Generator = /*#__PURE__*/createToken({
  name: 'Generator',
  pattern: /generator/,
  push_mode: 'block'
});
var Model = /*#__PURE__*/createToken({
  name: 'Model',
  pattern: /model/,
  push_mode: 'block'
});
var Enum = /*#__PURE__*/createToken({
  name: 'Enum',
  pattern: /enum/,
  push_mode: 'block'
});
var True = /*#__PURE__*/createToken({
  name: 'True',
  pattern: /true/,
  longer_alt: Identifier
});
var False = /*#__PURE__*/createToken({
  name: 'False',
  pattern: /false/,
  longer_alt: Identifier
});
var Null = /*#__PURE__*/createToken({
  name: 'Null',
  pattern: /null/,
  longer_alt: Identifier
});
var Comment = /*#__PURE__*/createToken({
  name: 'Comment',
  pattern: Lexer.NA
});
var DocComment = /*#__PURE__*/createToken({
  name: 'DocComment',
  pattern: /\/\/\/\s*(.+)/,
  categories: [Comment]
});
var LineComment = /*#__PURE__*/createToken({
  name: 'LineComment',
  pattern: /\/\/\s*(.+)/,
  categories: [Comment]
});
var Attribute = /*#__PURE__*/createToken({
  name: 'Attribute',
  pattern: Lexer.NA
});
var ModelAttribute = /*#__PURE__*/createToken({
  name: 'ModelAttribute',
  pattern: /@@/,
  label: "'@@'",
  categories: [Attribute]
});
var FieldAttribute = /*#__PURE__*/createToken({
  name: 'FieldAttribute',
  pattern: /@/,
  label: "'@'",
  categories: [Attribute]
});
var Dot = /*#__PURE__*/createToken({
  name: 'Dot',
  pattern: /\./,
  label: "'.'"
});
var QuestionMark = /*#__PURE__*/createToken({
  name: 'QuestionMark',
  pattern: /\?/,
  label: "'?'"
});
var LCurly = /*#__PURE__*/createToken({
  name: 'LCurly',
  pattern: /{/,
  label: "'{'"
});
var RCurly = /*#__PURE__*/createToken({
  name: 'RCurly',
  pattern: /}/,
  label: "'}'",
  pop_mode: true
});
var LRound = /*#__PURE__*/createToken({
  name: 'LRound',
  pattern: /\(/,
  label: "'('"
});
var RRound = /*#__PURE__*/createToken({
  name: 'RRound',
  pattern: /\)/,
  label: "')'"
});
var LSquare = /*#__PURE__*/createToken({
  name: 'LSquare',
  pattern: /\[/,
  label: "'['"
});
var RSquare = /*#__PURE__*/createToken({
  name: 'RSquare',
  pattern: /\]/,
  label: "']'"
});
var Comma = /*#__PURE__*/createToken({
  name: 'Comma',
  pattern: /,/,
  label: "','"
});
var Colon = /*#__PURE__*/createToken({
  name: 'Colon',
  pattern: /:/,
  label: "':'"
});
var Equals = /*#__PURE__*/createToken({
  name: 'Equals',
  pattern: /=/,
  label: "'='"
});
var StringLiteral = /*#__PURE__*/createToken({
  name: 'StringLiteral',
  pattern: /"(:?[^\\"\n\r]|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
});
var NumberLiteral = /*#__PURE__*/createToken({
  name: 'NumberLiteral',
  pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
});
var WhiteSpace = /*#__PURE__*/createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED
});
var LineBreak = /*#__PURE__*/createToken({
  name: 'LineBreak',
  pattern: /\n|\r\n/,
  line_breaks: true,
  label: 'LineBreak'
});
var naTokens = [Comment, DocComment, LineComment, LineBreak, WhiteSpace];
var multiModeTokens = {
  modes: {
    global: /*#__PURE__*/[].concat(naTokens, [Datasource, Generator, Model, Enum]),
    block: /*#__PURE__*/[].concat(naTokens, [Attribute, ModelAttribute, FieldAttribute, Dot, QuestionMark, LCurly, RCurly, LSquare, RSquare, LRound, RRound, Comma, Colon, Equals, True, False, Null, StringLiteral, NumberLiteral, Identifier])
  },
  defaultMode: 'global'
};
var PrismaLexer = /*#__PURE__*/new Lexer(multiModeTokens);

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var PrismaParser = /*#__PURE__*/function (_CstParser) {
  _inheritsLoose(PrismaParser, _CstParser);

  function PrismaParser() {
    var _this;

    _this = _CstParser.call(this, multiModeTokens) || this;
    _this["break"] = _this.RULE('break', function () {
      _this.CONSUME1(LineBreak);

      _this.CONSUME2(LineBreak);
    });
    _this.keyedArg = _this.RULE('keyedArg', function () {
      _this.CONSUME(Identifier, {
        LABEL: 'keyName'
      });

      _this.CONSUME(Colon);

      _this.SUBRULE(_this.value);
    });
    _this.array = _this.RULE('array', function () {
      _this.CONSUME(LSquare);

      _this.MANY_SEP({
        SEP: Comma,
        DEF: function DEF() {
          _this.SUBRULE(_this.value);
        }
      });

      _this.CONSUME(RSquare);
    });
    _this.func = _this.RULE('func', function () {
      _this.CONSUME(Identifier, {
        LABEL: 'funcName'
      });

      _this.CONSUME(LRound);

      _this.MANY_SEP({
        SEP: Comma,
        DEF: function DEF() {
          _this.OR([{
            ALT: function ALT() {
              return _this.SUBRULE(_this.keyedArg);
            }
          }, {
            ALT: function ALT() {
              return _this.SUBRULE(_this.value);
            }
          }]);
        }
      });

      _this.CONSUME(RRound);
    });
    _this.value = _this.RULE('value', function () {
      _this.OR([{
        ALT: function ALT() {
          return _this.CONSUME(StringLiteral, {
            LABEL: 'value'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(NumberLiteral, {
            LABEL: 'value'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE(_this.array, {
            LABEL: 'value'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE(_this.func, {
            LABEL: 'value'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(True, {
            LABEL: 'value'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(False, {
            LABEL: 'value'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(Null, {
            LABEL: 'value'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(Identifier, {
            LABEL: 'value'
          });
        }
      }]);
    });
    _this.property = _this.RULE('property', function () {
      _this.CONSUME(Identifier, {
        LABEL: 'propertyName'
      });

      _this.CONSUME(Equals);

      _this.SUBRULE(_this.value, {
        LABEL: 'propertyValue'
      });
    });
    _this.assignment = _this.RULE('assignment', function () {
      _this.CONSUME(Identifier, {
        LABEL: 'assignmentName'
      });

      _this.CONSUME(Equals);

      _this.SUBRULE(_this.value, {
        LABEL: 'assignmentValue'
      });
    });
    _this.field = _this.RULE('field', function () {
      _this.CONSUME(Identifier, {
        LABEL: 'fieldName'
      });

      _this.SUBRULE(_this.value, {
        LABEL: 'fieldType'
      });

      _this.OPTION1(function () {
        _this.OR([{
          ALT: function ALT() {
            _this.CONSUME(LSquare, {
              LABEL: 'array'
            });

            _this.CONSUME(RSquare, {
              LABEL: 'array'
            });
          }
        }, {
          ALT: function ALT() {
            return _this.CONSUME(QuestionMark, {
              LABEL: 'optional'
            });
          }
        }]);
      });

      _this.MANY(function () {
        _this.SUBRULE(_this.attribute, {
          LABEL: 'attributeList'
        });
      });

      _this.OPTION2(function () {
        _this.CONSUME(Comment, {
          LABEL: 'comment'
        });
      });
    });
    _this.block = _this.RULE('block', function (options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          componentType = _options.componentType;
      var isEnum = componentType === 'enum';
      var isModel = componentType === 'model';

      _this.CONSUME(LCurly);

      _this.CONSUME1(LineBreak);

      _this.MANY(function () {
        _this.OR([{
          ALT: function ALT() {
            return _this.SUBRULE(_this.comment, {
              LABEL: 'list'
            });
          }
        }, {
          GATE: function GATE() {
            return isModel;
          },
          ALT: function ALT() {
            return _this.SUBRULE(_this.property, {
              LABEL: 'list'
            });
          }
        }, {
          ALT: function ALT() {
            return _this.SUBRULE(_this.attribute, {
              LABEL: 'list'
            });
          }
        }, {
          GATE: function GATE() {
            return isModel;
          },
          ALT: function ALT() {
            return _this.SUBRULE(_this.field, {
              LABEL: 'list'
            });
          }
        }, {
          GATE: function GATE() {
            return isEnum;
          },
          ALT: function ALT() {
            return _this.SUBRULE(_this["enum"], {
              LABEL: 'list'
            });
          }
        }, {
          GATE: function GATE() {
            return !isModel;
          },
          ALT: function ALT() {
            return _this.SUBRULE(_this.assignment, {
              LABEL: 'list'
            });
          }
        }, {
          ALT: function ALT() {
            return _this.SUBRULE(_this["break"], {
              LABEL: 'list'
            });
          }
        }, {
          ALT: function ALT() {
            return _this.CONSUME2(LineBreak);
          }
        }]);
      });

      _this.CONSUME(RCurly);
    });
    _this["enum"] = _this.RULE('enum', function () {
      _this.CONSUME(Identifier, {
        LABEL: 'enumName'
      });

      _this.OPTION(function () {
        _this.CONSUME(Comment, {
          LABEL: 'comment'
        });
      });
    });
    _this.attribute = _this.RULE('attribute', function () {
      _this.OR1([{
        ALT: function ALT() {
          return _this.CONSUME(ModelAttribute, {
            LABEL: 'modelAttribute'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(FieldAttribute, {
            LABEL: 'fieldAttribute'
          });
        }
      }]);

      _this.OR2([{
        ALT: function ALT() {
          _this.CONSUME1(Identifier, {
            LABEL: 'groupName'
          });

          _this.CONSUME(Dot);

          _this.CONSUME2(Identifier, {
            LABEL: 'attributeName'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(Identifier, {
            LABEL: 'attributeName'
          });
        }
      }]);

      _this.OPTION(function () {
        _this.CONSUME(LRound);

        _this.MANY_SEP({
          SEP: Comma,
          DEF: function DEF() {
            _this.SUBRULE(_this.attributeArg);
          }
        });

        _this.CONSUME(RRound);
      });
    });
    _this.attributeArg = _this.RULE('attributeArg', function () {
      _this.OR([{
        ALT: function ALT() {
          return _this.SUBRULE(_this.keyedArg, {
            LABEL: 'value'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.SUBRULE(_this.value, {
            LABEL: 'value'
          });
        }
      }]);
    });
    _this.component = _this.RULE('component', function () {
      var type = _this.OR1([{
        ALT: function ALT() {
          return _this.CONSUME(Datasource, {
            LABEL: 'type'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(Generator, {
            LABEL: 'type'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(Model, {
            LABEL: 'type'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(Enum, {
            LABEL: 'type'
          });
        }
      }]);

      _this.OR2([{
        ALT: function ALT() {
          _this.CONSUME1(Identifier, {
            LABEL: 'groupName'
          });

          _this.CONSUME(Dot);

          _this.CONSUME2(Identifier, {
            LABEL: 'componentName'
          });
        }
      }, {
        ALT: function ALT() {
          return _this.CONSUME(Identifier, {
            LABEL: 'componentName'
          });
        }
      }]);

      _this.SUBRULE(_this.block, {
        ARGS: [{
          componentType: type.image
        }]
      });
    });
    _this.comment = _this.RULE('comment', function () {
      _this.CONSUME(Comment, {
        LABEL: 'text'
      });
    });
    _this.schema = _this.RULE('schema', function () {
      _this.MANY(function () {
        _this.OR([{
          ALT: function ALT() {
            return _this.SUBRULE(_this.comment, {
              LABEL: 'list'
            });
          }
        }, {
          ALT: function ALT() {
            return _this.SUBRULE(_this.component, {
              LABEL: 'list'
            });
          }
        }, {
          ALT: function ALT() {
            return _this.SUBRULE(_this["break"], {
              LABEL: 'list'
            });
          }
        }, {
          ALT: function ALT() {
            return _this.CONSUME(LineBreak);
          }
        }]);
      });
    });

    _this.performSelfAnalysis();

    return _this;
  }

  return PrismaParser;
}(CstParser);
var parser = /*#__PURE__*/new PrismaParser();

var BasePrismaVisitor = /*#__PURE__*/parser.getBaseCstVisitorConstructorWithDefaults();
var PrismaVisitor = /*#__PURE__*/function (_BasePrismaVisitor) {
  _inheritsLoose(PrismaVisitor, _BasePrismaVisitor);

  function PrismaVisitor() {
    var _this;

    _this = _BasePrismaVisitor.call(this) || this;

    _this.validateVisitor();

    return _this;
  }

  var _proto = PrismaVisitor.prototype;

  _proto.schema = function schema(ctx) {
    var _ctx$list,
        _this2 = this;

    var list = ((_ctx$list = ctx.list) == null ? void 0 : _ctx$list.map(function (item) {
      return _this2.visit([item]);
    })) || [];
    return {
      type: 'schema',
      list: list
    };
  };

  _proto.component = function component(ctx) {
    var _ctx$type = ctx.type,
        type = _ctx$type[0].image;
    var _ctx$componentName = ctx.componentName,
        name = _ctx$componentName[0].image;
    var list = this.visit(ctx.block);

    switch (type) {
      case 'datasource':
        return {
          type: 'datasource',
          name: name,
          assignments: list
        };

      case 'generator':
        return {
          type: 'generator',
          name: name,
          assignments: list
        };

      case 'model':
        return {
          type: 'model',
          name: name,
          properties: list
        };

      case 'enum':
        return {
          type: 'enum',
          name: name,
          enumerators: list
        };

      default:
        throw new Error("Unexpected block type: " + type);
    }
  };

  _proto["break"] = function _break() {
    return {
      type: 'break'
    };
  };

  _proto.comment = function comment(ctx) {
    var _ctx$text = ctx.text,
        comment = _ctx$text[0].image;
    return {
      type: 'comment',
      text: comment
    };
  };

  _proto.block = function block(ctx) {
    var _ctx$list2,
        _this3 = this;

    return (_ctx$list2 = ctx.list) == null ? void 0 : _ctx$list2.map(function (item) {
      return _this3.visit([item]);
    });
  };

  _proto.assignment = function assignment(ctx) {
    var value = this.visit(ctx.assignmentValue);
    var _ctx$assignmentName = ctx.assignmentName,
        key = _ctx$assignmentName[0].image;
    return {
      type: 'assignment',
      key: key,
      value: value
    };
  };

  _proto.field = function field(ctx) {
    var _this4 = this,
        _ctx$comment,
        _ctx$comment$;

    var fieldType = this.visit(ctx.fieldType);
    var _ctx$fieldName = ctx.fieldName,
        name = _ctx$fieldName[0].image;
    var attributes = ctx.attributeList && ctx.attributeList.map(function (item) {
      return _this4.visit([item]);
    });
    var comment = (_ctx$comment = ctx.comment) == null ? void 0 : (_ctx$comment$ = _ctx$comment[0]) == null ? void 0 : _ctx$comment$.image;
    return {
      type: 'field',
      name: name,
      fieldType: fieldType,
      array: ctx.array != null,
      optional: ctx.optional != null,
      attributes: attributes,
      comment: comment
    };
  };

  _proto.attribute = function attribute(ctx) {
    var _this5 = this;

    var _ctx$attributeName = ctx.attributeName,
        name = _ctx$attributeName[0].image;

    var _ref = ctx.groupName || [{}],
        group = _ref[0].image;

    var args = ctx.attributeArg && ctx.attributeArg.map(function (attr) {
      return _this5.visit(attr);
    });
    var kind = ctx.modelAttribute != null ? 'model' : 'field';
    return {
      type: 'attribute',
      name: name,
      kind: kind,
      group: group,
      args: args
    };
  };

  _proto.attributeArg = function attributeArg(ctx) {
    var value = this.visit(ctx.value);
    return {
      type: 'attributeArgument',
      value: value
    };
  };

  _proto.func = function func(ctx) {
    var _this6 = this;

    var _ctx$funcName = ctx.funcName,
        name = _ctx$funcName[0].image;
    var params = ctx.value && ctx.value.map(function (item) {
      return _this6.visit([item]);
    });
    var keyedParams = ctx.keyedArg && ctx.keyedArg.map(function (item) {
      return _this6.visit([item]);
    });
    var pars = (params || keyedParams) && [].concat(params != null ? params : [], keyedParams != null ? keyedParams : []);
    return {
      type: 'function',
      name: name,
      params: pars
    };
  };

  _proto.array = function array(ctx) {
    var _this7 = this;

    var args = ctx.value && ctx.value.map(function (item) {
      return _this7.visit([item]);
    });
    return {
      type: 'array',
      args: args
    };
  };

  _proto.keyedArg = function keyedArg(ctx) {
    var _ctx$keyName = ctx.keyName,
        key = _ctx$keyName[0].image;
    var value = this.visit(ctx.value);
    return {
      type: 'keyValue',
      key: key,
      value: value
    };
  };

  _proto.value = function value(ctx) {
    if (isToken(ctx.value)) {
      var _ctx$value = ctx.value,
          image = _ctx$value[0].image;
      return image;
    }

    return this.visit(ctx.value);
  };

  _proto["enum"] = function _enum(ctx) {
    var _ctx$comment2, _ctx$comment2$;

    var _ctx$enumName = ctx.enumName,
        name = _ctx$enumName[0].image;
    var comment = (_ctx$comment2 = ctx.comment) == null ? void 0 : (_ctx$comment2$ = _ctx$comment2[0]) == null ? void 0 : _ctx$comment2$.image;
    return {
      type: 'enumerator',
      name: name,
      comment: comment
    };
  };

  return PrismaVisitor;
}(BasePrismaVisitor);

function isToken(node) {
  return 'image' in node[0];
}

function getSchema(source) {
  var lexingResult = PrismaLexer.tokenize(source);
  parser.input = lexingResult.tokens;
  var cstNode = parser.schema();
  if (parser.errors.length > 0) throw parser.errors[0];
  var visitor = new PrismaVisitor();
  return visitor.visit(cstNode);
}

var unsorted = ['break', 'comment'];
var defaultSortOrder = ['generator', 'datasource', 'model', 'enum', 'break', 'comment'];
var schemaSorter = function schemaSorter(schema, locales, sortOrder) {
  if (sortOrder === void 0) {
    sortOrder = defaultSortOrder;
  }

  return function (a, b) {
    var aUnsorted = unsorted.indexOf(a.type) !== -1;
    var bUnsorted = unsorted.indexOf(b.type) !== -1;

    if (aUnsorted !== bUnsorted) {
      return schema.list.indexOf(a) - schema.list.indexOf(b);
    }

    if (sortOrder !== defaultSortOrder) sortOrder = sortOrder.concat(defaultSortOrder);
    var typeIndex = sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type);
    if (typeIndex !== 0) return typeIndex;
    if ('name' in a && 'name' in b) return a.name.localeCompare(b.name, locales);
    return 0;
  };
};

function printSchema(schema, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$sort = _options.sort,
      sort = _options$sort === void 0 ? false : _options$sort,
      _options$locales = _options.locales,
      locales = _options$locales === void 0 ? undefined : _options$locales,
      _options$sortOrder = _options.sortOrder,
      sortOrder = _options$sortOrder === void 0 ? undefined : _options$sortOrder;
  var blocks = schema.list;

  if (sort) {
    blocks = schema.list = blocks.filter(function (block) {
      return block.type !== 'break';
    });
    var sorter = schemaSorter(schema, locales, sortOrder);
    blocks.sort(sorter);
  }

  return blocks.map(printBlock).filter(Boolean).join(EOL).replace(/(\r?\n\s*){3,}/g, EOL + EOL) + EOL;
}

function printBlock(block) {
  switch (block.type) {
    case 'comment':
      return printComment(block);

    case 'datasource':
      return printDatasource(block);

    case 'enum':
      return printEnum(block);

    case 'generator':
      return printGenerator(block);

    case 'model':
      return printModel(block);

    case 'break':
      return printBreak();

    default:
      throw new Error("Unrecognized block type");
  }
}

function printComment(comment) {
  return comment.text;
}

function printBreak() {
  return EOL;
}

function printDatasource(db) {
  var children = computeAssignmentFormatting(db.assignments);
  return "\ndatasource " + db.name + " {\n  " + children + "\n}";
}

function printEnum(enumerator) {
  var children = enumerator.enumerators.map(printEnumerator).filter(Boolean).join(EOL + "  ").replace(/(\r?\n\s*){3,}/g, EOL + EOL + "  ");
  return "\nenum " + enumerator.name + " {\n  " + children + "\n}";
}

function printEnumerator(enumerator) {
  switch (enumerator.type) {
    case 'enumerator':
      return [enumerator.name, enumerator.comment].filter(Boolean).join(' ');

    case 'attribute':
      return printAttribute(enumerator);

    case 'comment':
      return printComment(enumerator);

    case 'break':
      return printBreak();

    default:
      throw new Error("Unexpected enumerator type");
  }
}

function printGenerator(generator) {
  var children = computeAssignmentFormatting(generator.assignments);
  return "\ngenerator " + generator.name + " {\n  " + children + "\n}";
}

function printModel(model) {
  var children = computePropertyFormatting(model.properties);
  return "\nmodel " + model.name + " {\n  " + children + "\n}";
}

function printAssignment(node, keyLength) {
  if (keyLength === void 0) {
    keyLength = 0;
  }

  switch (node.type) {
    case 'comment':
      return printComment(node);

    case 'break':
      return printBreak();

    case 'assignment':
      return node.key.padEnd(keyLength) + " = " + printValue(node.value);

    default:
      throw new Error("Unexpected assignment type");
  }
}

function printProperty(node, nameLength, typeLength) {
  if (nameLength === void 0) {
    nameLength = 0;
  }

  if (typeLength === void 0) {
    typeLength = 0;
  }

  switch (node.type) {
    case 'attribute':
      return printAttribute(node);

    case 'field':
      return printField(node, nameLength, typeLength);

    case 'comment':
      return printComment(node);

    case 'break':
      return printBreak();

    default:
      throw new Error("Unrecognized property type");
  }
}

function printAttribute(attribute) {
  var args = attribute.args && attribute.args.length > 0 ? "(" + attribute.args.map(printAttributeArg).filter(Boolean).join(', ') + ")" : '';
  var name = [attribute.name];
  if (attribute.group) name.unshift(attribute.group);
  return "" + (attribute.kind === 'field' ? '@' : '@@') + name.join('.') + args;
}

function printAttributeArg(arg) {
  return printValue(arg.value);
}

function printField(field, nameLength, typeLength) {
  if (nameLength === void 0) {
    nameLength = 0;
  }

  if (typeLength === void 0) {
    typeLength = 0;
  }

  var name = field.name.padEnd(nameLength);
  var fieldType = printFieldType(field).padEnd(typeLength);
  var attrs = field.attributes ? field.attributes.map(printAttribute) : [];
  var comment = field.comment;
  return [name, fieldType].concat(attrs).filter(Boolean).join(' ').trim() + (comment ? " " + comment : '');
}

function printFieldType(field) {
  var suffix = field.array ? '[]' : field.optional ? '?' : '';

  if (typeof field.fieldType === 'object') {
    switch (field.fieldType.type) {
      case 'function':
        {
          return "" + printFunction(field.fieldType) + suffix;
        }

      default:
        throw new Error("Unexpected field type");
    }
  }

  return "" + field.fieldType + suffix;
}

function printFunction(func) {
  var params = func.params ? func.params.map(printValue) : '';
  return func.name + "(" + params + ")";
}

function printValue(value) {
  switch (typeof value) {
    case 'object':
      {
        if ('type' in value) {
          switch (value.type) {
            case 'keyValue':
              return value.key + ": " + printValue(value.value);

            case 'function':
              return printFunction(value);

            case 'array':
              return "[" + (value.args != null ? value.args.map(printValue).join(', ') : '') + "]";

            default:
              throw new Error("Unexpected value type");
          }
        }

        throw new Error("Unexpected object value");
      }

    default:
      return String(value);
  }
}

function computeAssignmentFormatting(list) {
  var pos = 0;
  var listBlocks = list.reduce(function (memo, current, index, arr) {
    if (current.type === 'break') return memo;
    if (index > 0 && arr[index - 1].type === 'break') memo[++pos] = [];
    memo[pos].push(current);
    return memo;
  }, [[]]);
  var keyLengths = listBlocks.map(function (lists) {
    return lists.reduce(function (max, current) {
      return Math.max(max, current.type === 'assignment' ? current.key.length : 0);
    }, 0);
  });
  return list.map(function (item, index, arr) {
    if (index > 0 && item.type !== 'break' && arr[index - 1].type === 'break') keyLengths.shift();
    return printAssignment(item, keyLengths[0]);
  }).filter(Boolean).join(EOL + "  ").replace(/(\r?\n\s*){3,}/g, EOL + EOL + "  ");
}

function computePropertyFormatting(list) {
  var pos = 0;
  var listBlocks = list.reduce(function (memo, current, index, arr) {
    if (current.type === 'break') return memo;
    if (index > 0 && arr[index - 1].type === 'break') memo[++pos] = [];
    memo[pos].push(current);
    return memo;
  }, [[]]);
  var nameLengths = listBlocks.map(function (lists) {
    return lists.reduce(function (max, current) {
      return Math.max(max, current.type === 'field' ? current.name.length : 0);
    }, 0);
  });
  var typeLengths = listBlocks.map(function (lists) {
    return lists.reduce(function (max, current) {
      return Math.max(max, current.type === 'field' ? printFieldType(current).length : 0);
    }, 0);
  });
  return list.map(function (prop, index, arr) {
    if (index > 0 && prop.type !== 'break' && arr[index - 1].type === 'break') {
      nameLengths.shift();
      typeLengths.shift();
    }

    return printProperty(prop, nameLengths[0], typeLengths[0]);
  }).filter(Boolean).join(EOL + "  ").replace(/(\r?\n\s*){3,}/g, EOL + EOL + "  ");
}

var ConcretePrismaSchemaBuilder = /*#__PURE__*/function () {
  function ConcretePrismaSchemaBuilder(source) {
    if (source === void 0) {
      source = '';
    }

    this.schema = getSchema(source);
  }

  var _proto = ConcretePrismaSchemaBuilder.prototype;

  _proto.print = function print(options) {
    if (options === void 0) {
      options = {};
    }

    return printSchema(this.schema, options);
  };

  _proto.getSchema = function getSchema() {
    return this.schema;
  };

  _proto.generator = function generator(name, provider) {
    var generator = this.schema.list.reduce(function (memo, block) {
      return block.type === 'generator' && block.name === name ? block : memo;
    }, {
      type: 'generator',
      name: name,
      assignments: [{
        type: 'assignment',
        key: 'provider',
        value: "\"" + provider + "\""
      }]
    });
    this.schema.list.push(generator);
    this._subject = generator;
    return this;
  };

  _proto.drop = function drop(name) {
    var index = this.schema.list.findIndex(function (block) {
      return 'name' in block && block.name === name;
    });
    this.schema.list.splice(index, 1);
    return this;
  };

  _proto.datasource = function datasource(provider, url) {
    var datasource = {
      type: 'datasource',
      name: 'db',
      assignments: [{
        type: 'assignment',
        key: 'url',
        value: typeof url === 'string' ? "\"" + url + "\"" : {
          type: 'function',
          name: 'env',
          params: ["\"" + url.env + "\""]
        }
      }, {
        type: 'assignment',
        key: 'provider',
        value: provider
      }]
    };
    var existingIndex = this.schema.list.findIndex(function (block) {
      return block.type === 'datasource';
    });
    this.schema.list.splice(existingIndex, existingIndex !== -1 ? 1 : 0, datasource);
    this._subject = datasource;
    return this;
  };

  _proto.model = function model(name) {
    var model = {
      type: 'model',
      name: name,
      properties: []
    };
    this.schema.list.push(model);
    this._subject = model;
    return this;
  };

  _proto["enum"] = function _enum(name, enumeratorNames) {
    if (enumeratorNames === void 0) {
      enumeratorNames = [];
    }

    var e = {
      type: 'enum',
      name: name,
      enumerators: enumeratorNames.map(function (name) {
        return {
          type: 'enumerator',
          name: name
        };
      })
    };
    this.schema.list.push(e);
    this._subject = e;
    return this;
  };

  _proto.enumerator = function enumerator(value) {
    var subject = this.getSubject();

    if (!subject || !('type' in subject) || subject.type !== 'enum') {
      throw new Error('Subject must be a prisma model!');
    }

    subject.enumerators.push({
      type: 'enumerator',
      name: value
    });
    return this;
  };

  _proto.getSubject = function getSubject() {
    return this._subject;
  };

  _proto.getParent = function getParent() {
    return this._parent;
  };

  _proto.blockAttribute = function blockAttribute(name, args) {
    var subject = this.getSubject();

    if (!subject || !('type' in subject) || subject.type !== 'model') {
      var parent = this.getParent();
      if (!parent || !('type' in parent) || parent.type !== 'model') throw new Error('Subject must be a prisma model!');
      subject = this._subject = parent;
    }

    var attributeArgs = function () {
      if (!args) return [];
      if (typeof args === 'string') return [{
        type: 'attributeArgument',
        value: "\"" + args + "\""
      }];
      if (Array.isArray(args)) return [{
        type: 'attributeArgument',
        value: {
          type: 'array',
          args: args
        }
      }];
      return Object.entries(args).map(function (_ref) {
        var key = _ref[0],
            value = _ref[1];
        return {
          type: 'attributeArgument',
          value: {
            type: 'keyValue',
            key: key,
            value: value
          }
        };
      });
    }();

    var property = {
      type: 'attribute',
      kind: 'model',
      name: name,
      args: attributeArgs
    };
    subject.properties.push(property);
    return this;
  };

  _proto.attribute = function attribute(name, args) {
    var parent = this.getParent();
    var subject = this.getSubject();

    if (!parent || !('type' in parent) || parent.type !== 'model') {
      throw new Error('Parent must be a prisma model!');
    }

    if (!subject || !('type' in subject) || subject.type !== 'field') {
      throw new Error('Subject must be a prisma field!');
    }

    if (!subject.attributes) subject.attributes = [];
    var attribute = subject.attributes.reduce(function (memo, attr) {
      return attr.type === 'attribute' && attr.name === name ? attr : memo;
    }, {
      type: 'attribute',
      kind: 'field',
      name: name
    });

    if (Array.isArray(args)) {
      var mapArg = function mapArg(arg) {
        var _arg$function$map, _arg$function;

        return typeof arg === 'string' ? arg : {
          type: 'function',
          name: arg.name,
          params: (_arg$function$map = (_arg$function = arg["function"]) == null ? void 0 : _arg$function.map(mapArg)) != null ? _arg$function$map : []
        };
      };

      if (args.length > 0) attribute.args = args.map(function (arg) {
        return {
          type: 'attributeArgument',
          value: mapArg(arg)
        };
      });
    } else if (typeof args === 'object') {
      attribute.args = Object.entries(args).map(function (_ref2) {
        var key = _ref2[0],
            value = _ref2[1];
        return {
          type: 'attributeArgument',
          value: {
            type: 'keyValue',
            key: key,
            value: {
              type: 'array',
              args: value
            }
          }
        };
      });
    }

    if (!subject.attributes.includes(attribute)) subject.attributes.push(attribute);
    return this;
  };

  _proto.assignment = function assignment(key, value) {
    var subject = this.getSubject();
    if (!subject || !('type' in subject) || !['generator', 'datasource'].includes(subject.type)) throw new Error('Subject must be a prisma generator or datasource!');

    function tap(subject, callback) {
      callback(subject);
      return subject;
    }

    var assignment = subject.assignments.reduce(function (memo, assignment) {
      return assignment.type === 'assignment' && assignment.key === key ? tap(assignment, function (a) {
        a.value = "\"" + value + "\"";
      }) : memo;
    }, {
      type: 'assignment',
      key: key,
      value: "\"" + value + "\""
    });
    if (!subject.assignments.includes(assignment)) subject.assignments.push(assignment);
    return this;
  };

  _proto.blockInsert = function blockInsert(statement) {
    var subject = this.getSubject();
    var allowed = ['datasource', 'enum', 'generator', 'model'];

    if (!subject || !('type' in subject) || !allowed.includes(subject.type)) {
      var parent = this.getParent();

      if (!parent || !('type' in parent) || !allowed.includes(parent.type)) {
        throw new Error('Subject must be a prisma block!');
      }

      subject = this._subject = parent;
    }

    switch (subject.type) {
      case 'datasource':
        {
          subject.assignments.push(statement);
          break;
        }

      case 'enum':
        {
          subject.enumerators.push(statement);
          break;
        }

      case 'generator':
        {
          subject.assignments.push(statement);
          break;
        }

      case 'model':
        {
          subject.properties.push(statement);
          break;
        }
    }

    return this;
  };

  _proto["break"] = function _break() {
    var lineBreak = {
      type: 'break'
    };
    return this.blockInsert(lineBreak);
  };

  _proto.comment = function comment(text, node) {
    if (node === void 0) {
      node = false;
    }

    var comment = {
      type: 'comment',
      text: "//" + (node ? '/' : '') + " " + text
    };
    return this.blockInsert(comment);
  };

  _proto.schemaComment = function schemaComment(text, node) {
    if (node === void 0) {
      node = false;
    }

    var comment = {
      type: 'comment',
      text: "//" + (node ? '/' : '') + " " + text
    };
    this.schema.list.push(comment);
    return this;
  };

  _proto.field = function field(name, fieldType) {
    var subject = this.getSubject();

    if (!subject || !('type' in subject) || subject.type !== 'model') {
      var parent = this.getParent();
      if (!parent || !('type' in parent) || parent.type !== 'model') throw new Error('Subject must be a prisma model!');
      subject = this._subject = parent;
    }

    var field = {
      type: 'field',
      name: name,
      fieldType: fieldType
    };
    subject.properties.push(field);
    this._parent = subject;
    this._subject = field;
    return this;
  };

  _proto.then = function then(callback) {
    callback(this._subject);
    return this;
  };

  return ConcretePrismaSchemaBuilder;
}();
function createPrismaSchemaBuilder(source) {
  return new ConcretePrismaSchemaBuilder(source);
}

export { ConcretePrismaSchemaBuilder, createPrismaSchemaBuilder, getSchema, printSchema };
//# sourceMappingURL=prisma-ast.esm.js.map
