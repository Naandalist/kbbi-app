export const removeTrailingDigits = str => {
  // Apply the regex to replace digits at the end of words with nothing
  return str.replace(/(\w+)(\d+)(?=\s|$)/g, '$1');
};
