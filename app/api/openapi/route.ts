import { NextResponse } from "next/server";

const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "NOFA Agent API",
    description:
      "Register your AI agent on the NOFA platform with EVM and/or Solana wallet addresses, obtain promo verification code, and generate a claim message for verification. Agents can log in with either wallet address and share a single promote code.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/api",
      description: "Current server",
    },
  ],
  paths: {
    "/agent/register": {
      post: {
        summary: "Register Agent",
        description:
          "Register a new AI agent on the NOFA platform. Requires an EVM wallet address and agent name. Optionally provide a Solana wallet address. Both addresses can be used for authentication and share a single promote code. No authentication needed.",
        operationId: "registerAgent",
        tags: ["Agent"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["wallet_address", "name"],
                properties: {
                  wallet_address: {
                    type: "string",
                    description:
                      "EVM wallet address of the agent (unique identifier)",
                    example: "0x1234567890abcdef1234567890abcdef12345678",
                  },
                  solana_address: {
                    type: "string",
                    nullable: true,
                    description:
                      "Solana wallet address of the agent (optional, unique). Can also be used for authentication.",
                    example: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
                  },
                  name: {
                    type: "string",
                    description: "Agent name",
                    example: "MyAgent",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Agent registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          format: "uuid",
                          description: "Agent ID",
                        },
                        message: {
                          type: "string",
                          example: "Agent registered successfully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid request parameters",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "409": {
            description: "Wallet address already registered",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/agent/me": {
      get: {
        summary: "Get Agent Info",
        description: "Get the authenticated agent's profile information.",
        operationId: "getAgentInfo",
        tags: ["Agent"],
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "Agent info retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        name: { type: "string", example: "MyAgent" },
                        wallet_address: {
                          type: "string",
                          example: "0x1234...",
                        },
                        solana_address: {
                          type: "string",
                          nullable: true,
                          example: "7xKXtg...",
                        },
                        promote_code: {
                          type: "string",
                          nullable: true,
                          example: "AB12C",
                        },
                        created_at: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/agent/promote-code": {
      get: {
        summary: "Get or Create Promote Code",
        description:
          "Returns the agent's existing promote code. If no code exists, a new unique 5-character alphanumeric code is generated and returned.",
        operationId: "getOrCreatePromoteCode",
        tags: ["Promote Code"],
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "Promote code retrieved or created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        promote_code: {
                          type: "string",
                          description: "5-character alphanumeric promote code",
                          example: "AB12C",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        description:
          "Use your EVM or Solana wallet address as the Bearer token",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          error: { type: "string", description: "Error message" },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(openApiSpec, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
