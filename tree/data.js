const data = {
  type: "File",
  start: 0,
  end: 6,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 6
    }
  },
  program: {
    type: "Program",
    start: 0,
    end: 6,
    loc: {
      start: {
        line: 1,
        column: 0
      },
      end: {
        line: 1,
        column: 6
      }
    },
    sourceType: "module",
    body: [
      {
        type: "VariableDeclaration",
        start: 0,
        end: 6,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
          }
        },
        declarations: [
          {
            type: "VariableDeclarator",
            start: 4,
            end: 5,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            },
            id: {
              type: "Identifier",
              start: 4,
              end: 5,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 5
                },
                identifierName: "i"
              },
              name: "i"
            },
            init: null
          }
        ],
        kind: "var"
      }
    ],
    directives: []
  },
  comments: [],
  tokens: [
    {
      type: {
        label: "var",
        keyword: "var",
        beforeExpr: false,
        startsExpr: false,
        rightAssociative: false,
        isLoop: false,
        isAssign: false,
        prefix: false,
        postfix: false,
        binop: null,
        updateContext: null
      },
      value: "var",
      start: 0,
      end: 3,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 3
        }
      }
    },
    {
      type: {
        label: "name",
        beforeExpr: false,
        startsExpr: true,
        rightAssociative: false,
        isLoop: false,
        isAssign: false,
        prefix: false,
        postfix: false,
        binop: null
      },
      value: "i",
      start: 4,
      end: 5,
      loc: {
        start: {
          line: 1,
          column: 4
        },
        end: {
          line: 1,
          column: 5
        }
      }
    },
    {
      type: {
        label: ";",
        beforeExpr: true,
        startsExpr: false,
        rightAssociative: false,
        isLoop: false,
        isAssign: false,
        prefix: false,
        postfix: false,
        binop: null,
        updateContext: null
      },
      start: 5,
      end: 6,
      loc: {
        start: {
          line: 1,
          column: 5
        },
        end: {
          line: 1,
          column: 6
        }
      }
    },
    {
      type: {
        label: "eof",
        beforeExpr: false,
        startsExpr: false,
        rightAssociative: false,
        isLoop: false,
        isAssign: false,
        prefix: false,
        postfix: false,
        binop: null,
        updateContext: null
      },
      start: 6,
      end: 6,
      loc: {
        start: {
          line: 1,
          column: 6
        },
        end: {
          line: 1,
          column: 6
        }
      }
    }
  ]
};
module.exports = {
  data
};
