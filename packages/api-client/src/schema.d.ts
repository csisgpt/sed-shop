export interface paths {
  "/api/v1/ping": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["PingResponseDto"];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    PingResponseDto: {
      status: 'ok';
      locale: string;
      version: string;
    };
  };
}

export interface operations {}
export interface external {} 
