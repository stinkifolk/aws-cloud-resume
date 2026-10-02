export function parseVisitorCount(data: unknown): number | null {
  if (
    typeof data === "object" &&
    data !== null &&
    "visits" in data &&
    typeof data.visits === "number" &&
    !Number.isNaN(data.visits)
  ) {
    return data.visits;
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "count" in data &&
    typeof data.count === "number" &&
    !Number.isNaN(data.count)
  ) {
    return data.count;
  }

  return null;
}
