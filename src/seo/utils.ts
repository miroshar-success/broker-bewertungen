export const removeAllIframeTags = (value) => {
  if (!value) {
    return value;
  }
  return value.replace(
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    '',
  );
};
