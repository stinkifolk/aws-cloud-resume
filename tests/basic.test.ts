import { describe, expect, it } from "vitest";
import { parseVisitorCount } from "../src/app/lib/visitor-counter";

describe("parseVisitorCount", () => {
  it("should extract valid visits count from response", () => {
    expect(parseVisitorCount({ visits: 7 })).toBe(7);
  });

  it("should extract valid count fallback from response", () => {
    expect(parseVisitorCount({ count: 10 })).toBe(10);
  });

  it("should return null for invalid string value", () => {
    expect(parseVisitorCount({ visits: "7" })).toBeNull();
  });

  it("should return null when visitor count is missing", () => {
    expect(parseVisitorCount({})).toBeNull();
  });

  it("should return null for null response", () => {
    expect(parseVisitorCount(null)).toBeNull();
  });

  it("should return null for NaN value", () => {
    expect(parseVisitorCount({ visits: NaN })).toBeNull();
  });
});