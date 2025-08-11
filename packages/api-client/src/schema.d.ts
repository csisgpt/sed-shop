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
  "/api/v1/products": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["ProductListResponse"];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["ProductPublic"];
        };
      };
      responses: {
        201: {
          content: {
            "application/json": components["schemas"]["ProductPublic"];
          };
        };
      };
    };
  };
  "/api/v1/products/{slug}": {
    get: {
      parameters: {
        path: { slug: string };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["ProductPublic"];
          };
        };
      };
    };
  };
  "/api/v1/products/{id}": {
    patch: {
      parameters: { path: { id: string } };
      requestBody: {
        content: {
          "application/json": components["schemas"]["ProductPublic"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["ProductPublic"];
          };
        };
      };
    };
    delete: {
      parameters: { path: { id: string } };
      responses: {
        200: unknown;
      };
    };
  };
  "/api/v1/categories": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["CategoryPublic"][];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["CategoryPublic"];
        };
      };
      responses: {
        201: {
          content: {
            "application/json": components["schemas"]["CategoryPublic"];
          };
        };
      };
    };
  };
  "/api/v1/categories/{slug}": {
    get: {
      parameters: { path: { slug: string } };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["CategoryPublic"];
          };
        };
      };
    };
  };
  "/api/v1/categories/{id}": {
    patch: {
      parameters: { path: { id: string } };
      requestBody: {
        content: {
          "application/json": components["schemas"]["CategoryPublic"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["CategoryPublic"];
          };
        };
      };
    };
    delete: {
      parameters: { path: { id: string } };
      responses: {
        200: unknown;
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
    CategoryPublic: {
      id: string;
      name: string;
      slug: string;
      parentId?: string | null;
    };
    ProductImagePublic: {
      url: string;
      alt?: string | null;
      position?: number | null;
    };
    ProductVariantPublic: {
      id: string;
      sku?: string | null;
      price: number;
      compareAtPrice?: number | null;
      stock: number;
    };
    ProductPublic: {
      id: string;
      title: string;
      slug: string;
      description?: string | null;
      published: boolean;
      category?: components["schemas"]["CategoryPublic"] | null;
      images?: components["schemas"]["ProductImagePublic"][] | null;
      variants?: components["schemas"]["ProductVariantPublic"][] | null;
      minPrice?: number | null;
      maxPrice?: number | null;
    };
    ProductListResponse: {
      items: components["schemas"]["ProductPublic"][];
      total: number;
      page: number;
      limit: number;
    };
  };
}

export interface operations {}
export interface external {}

