/** Tiny classnames joiner — no dependency needed for our needs. */
export function cx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
