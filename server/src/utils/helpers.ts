export function isNonEmptyString(
  value: string | undefined | null,
): value is string {
  return value !== undefined && value !== null && value.trim().length > 0;
}
