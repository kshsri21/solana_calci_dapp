/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/cdemo.json`.
 */
export type Cdemo = {
  "address": "BFE9WxmarY7Mw1xPHa4Q2jt963eNzcqXd7v8teG6hv7h",
  "metadata": {
    "name": "cdemo",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "add",
      "discriminator": [
        41,
        249,
        249,
        146,
        197,
        111,
        56,
        181
      ],
      "accounts": [
        {
          "name": "calci",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "a",
          "type": "i64"
        },
        {
          "name": "b",
          "type": "i64"
        }
      ]
    },
    {
      "name": "div",
      "discriminator": [
        187,
        113,
        0,
        90,
        4,
        119,
        173,
        119
      ],
      "accounts": [
        {
          "name": "calci",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "a",
          "type": "i64"
        },
        {
          "name": "b",
          "type": "i64"
        }
      ]
    },
    {
      "name": "initializeResult",
      "discriminator": [
        150,
        212,
        176,
        141,
        183,
        117,
        137,
        138
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "calci",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "mul",
      "discriminator": [
        184,
        108,
        70,
        19,
        157,
        55,
        49,
        207
      ],
      "accounts": [
        {
          "name": "calci",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "a",
          "type": "i64"
        },
        {
          "name": "b",
          "type": "i64"
        }
      ]
    },
    {
      "name": "sub",
      "discriminator": [
        24,
        41,
        208,
        39,
        211,
        133,
        97,
        210
      ],
      "accounts": [
        {
          "name": "calci",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "a",
          "type": "i64"
        },
        {
          "name": "b",
          "type": "i64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "resultValue",
      "discriminator": [
        79,
        225,
        63,
        225,
        238,
        251,
        153,
        2
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "divisionByZero"
    }
  ],
  "types": [
    {
      "name": "resultValue",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "result",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
