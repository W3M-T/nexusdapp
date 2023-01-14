// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function preventExponetialNotation(x: any) {
  return ("" + +x).replace(
    /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function (a, b, c, d, e) {
      return e < 0
        ? b + "0." + Array(1 - e - c.length).join("0") + c + d
        : b + c + d + Array(e - d.length + 1).join("0");
    }
  );
}

export function isValidImageUrl(url: string): boolean {
  // Create a regular expression to match URLs that start with "/" or "https"
  const urlRegex = /^(\/|https:\/\/)/i;

  // Check if the URL is a valid URL
  return urlRegex.test(url);
}
