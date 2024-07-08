export const formatNumber = (
  value: number,
  locale: string = "en-US",
  currency: string = "USD"
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
