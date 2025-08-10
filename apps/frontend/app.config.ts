export default defineAppConfig({
  titleTemplate: (title?: string) =>
    (title ? `${title} · sed-shop` : 'sed-shop')
});
