export default function ParseDate(
  date: { seconds: string | number } | Date | string
): Date | null {
  if (typeof date === "string") {
    // Parse from string
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  } else if (date instanceof Date) {
    // It's already a Date object
    return date;
  } else if (date && typeof date === "object" && "seconds" in date) {
    // Assuming 'seconds' is a Unix timestamp
    if (typeof date.seconds === "string") {
      return new Date((parseFloat(date.seconds ?? "0") || 0) * 1000);
    } else {
      return new Date((date.seconds ?? 0) * 1000);
    }
  }
  return null;
}
