/**
 * Sanitizes user input to prevent XSS attacks
 * Removes HTML tags and dangerous characters
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";

  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>'"&]/g, (match) => {
      // Escape dangerous characters
      const escapeMap: { [key: string]: string } = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "&": "&amp;",
      };
      return escapeMap[match] || match;
    });
}

/**
 * Sanitizes an array of strings
 */
export function sanitizeArray(arr: string[]): string[] {
  return arr.map(sanitizeInput).filter((item) => item.length > 0);
}

/**
 * Validates and sanitizes numeric input
 */
export function sanitizeNumericInput(input: string): string {
  if (typeof input !== "string") return "";

  // Remove any non-numeric characters except decimal point
  const cleaned = input.replace(/[^0-9.]/g, "");

  // Ensure only one decimal point
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    return parts[0] + "." + parts.slice(1).join("");
  }

  return cleaned;
}

/**
 * Validates file name to prevent directory traversal
 */
export function sanitizeFileName(fileName: string): string {
  if (typeof fileName !== "string") return "";

  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, "") // Only allow safe characters
    .replace(/\.{2,}/g, ".") // Remove multiple dots
    .replace(/^\.+|\.+$/g, "") // Remove leading/trailing dots
    .substring(0, 255); // Limit length
}
