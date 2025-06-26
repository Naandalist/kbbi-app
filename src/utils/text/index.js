function removeSuperscriptDigits(str) {
  // U+00B2–U+00B3  =>  ², ³
  // U+00B9         =>  ¹
  // U+2070–U+2079  =>  ⁰,¹,…,⁹
  const regex = /[\u00B2-\u00B3\u00B9\u2070-\u2079]/g;
  return str.replace(regex, '');
}

export {removeSuperscriptDigits};
