export const removeTrailingDigits = str => {
  // Apply the regex to replace digits at the end of words with nothing
  return str.replace(/(\w+)(\d+)(?=\s|$)/g, '$1');
};

function levenshteinDistance(a, b) {
  // Early termination for empty strings
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Use smaller string as target to reduce matrix size
  if (a.length > b.length) [a, b] = [b, a];

  // Use single array with rolling updates instead of swapping
  const row = Array(a.length + 1).fill(0);
  for (let i = 0; i <= a.length; i++) row[i] = i;

  // Main calculation
  for (let j = 1; j <= b.length; j++) {
    let prev = j;
    for (let i = 1; i <= a.length; i++) {
      const current = Math.min(
        row[i] + 1,
        prev + 1,
        row[i - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      row[i - 1] = prev;
      prev = current;
    }
    row[a.length] = prev;
  }

  return row[a.length];
}

export const fuzzySearch = (array, wordToFind, options = {}) => {
  const {
    maxDistance = 3, // Maximum acceptable distance
    limit = 5, // Maximum number of results
    threshold = 0.4, // Similarity threshold (0-1)
    cache = new Map(), // Cache for repeated searches
    indexing = true, // Enable indexing for repeated searches
  } = options;

  // Early termination for empty inputs
  if (!array?.length || !wordToFind) return [];

  // Case normalization for better matching
  const normalizedQuery = wordToFind.toLowerCase();
  const cacheKey = normalizedQuery;

  // Use cached results if available
  if (indexing && cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  // Use a min-heap for storing top matches (more efficient than sorting entire array)
  const matches = [];

  // Calculate maximum allowed distance based on query length
  const dynamicMaxDistance = Math.min(
    maxDistance,
    Math.ceil(normalizedQuery.length * (1 - threshold)),
  );

  // Process items with early termination opportunities
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const normalizedItem = item.toLowerCase();

    // Quick check: exact match
    if (normalizedItem === normalizedQuery) {
      matches.unshift({word: item, distance: 0});
      continue;
    }

    // Quick rejection based on length difference
    const lengthDiff = Math.abs(normalizedItem.length - normalizedQuery.length);
    if (lengthDiff > dynamicMaxDistance) {
      continue;
    }

    // Quick acceptance for common prefix/suffix
    const prefix = normalizedItem.slice(0, 3);
    if (
      normalizedQuery.startsWith(prefix) ||
      normalizedItem.startsWith(normalizedQuery.slice(0, 3))
    ) {
      // Higher chance of relevance - compute actual distance
    } else if (lengthDiff > 1) {
      // Skip further checks for items with significant length difference
      continue;
    }

    // Calculate distance only if item passes preliminary checks
    const distance = levenshteinDistance(normalizedQuery, normalizedItem);

    // Only consider items within acceptable distance
    if (distance <= dynamicMaxDistance) {
      matches.push({word: item, distance});
    }
  }

  // Sort by distance
  matches.sort((a, b) => a.distance - b.distance);

  // Limit results
  const results = matches.slice(0, limit).map(match => match.word);

  // Cache results for future queries
  if (indexing) {
    cache.set(cacheKey, results);
  }

  return results;
};

export const sanitizeJsonResponse = jsonData => {
  let data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

  // Make a deep copy to avoid modifying the original
  data = JSON.parse(JSON.stringify(data));

  // Get the istilah value to use as replacement
  const istilahValue = data.istilah || '';

  // Replace "Lampiran" in entri field
  if (data.entri === 'Lampiran') {
    data.entri = istilahValue;
  }

  // Replace "Lampiran" in each lema field
  if (Array.isArray(data.data)) {
    data.data = data.data.map(item => {
      if (item.lema === 'Lampiran') {
        return {
          ...item,
          lema: istilahValue,
        };
      }
      return item;
    });
  }

  return data;
};
