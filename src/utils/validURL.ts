export const isValidUrl = (url: string): boolean => {
  const urlPattern = /(^https?:\/\/)?[a-zА-ЯЁ0-9~_\-\.]+\.[a-zА-ЯЁ]{2,9}(\/|:|\?)?([!-~А-ЯЁ]*)?$/i;
  return urlPattern.test(url);
};