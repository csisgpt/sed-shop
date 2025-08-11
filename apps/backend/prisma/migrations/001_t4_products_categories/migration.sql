-- Migration for T4 products & categories
-- Renames and schema adjustments

ALTER TABLE "Category" RENAME COLUMN "deleted_at" TO "deletedAt";
ALTER TABLE "Product" RENAME COLUMN "deleted_at" TO "deletedAt";
ALTER TABLE "ProductVariant" RENAME COLUMN "deleted_at" TO "deletedAt";
ALTER TABLE "Image" RENAME COLUMN "deleted_at" TO "deletedAt";

ALTER TABLE "Image" RENAME TO "ProductImage";

ALTER TABLE "ProductVariant" RENAME COLUMN "attributes" TO "attrs";
ALTER TABLE "ProductVariant" ALTER COLUMN "price" TYPE INTEGER USING ("price"::integer);
ALTER TABLE "ProductVariant" ALTER COLUMN "compareAtPrice" TYPE INTEGER USING ("compareAtPrice"::integer);
