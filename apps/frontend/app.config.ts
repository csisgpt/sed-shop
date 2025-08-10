import { defineAppConfig } from 'nuxt/schema';

export default defineAppConfig({
  title: 'فروشگاه سِد',
  description: 'فروشگاه اینترنتی نمونه',
  titleTemplate: (title?: string) => (title ? `${title} · sed-shop` : 'sed-shop')
});
