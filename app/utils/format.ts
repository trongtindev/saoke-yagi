export const { format: formatNumber } = Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

export const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(
    `(${searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`,
    'gi',
  );
  return text.replace(regex, '<mark>$1</mark>');
};
