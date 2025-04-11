export const filterStyles = (listStyles: (string | boolean | undefined)[]) =>
  listStyles.filter((style) => style).join(' ')
