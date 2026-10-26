import { describe, expect, it } from "vitest";
import { availableLanes, LANES } from "../lib/demo-data";

describe("demo booking", () => {
  it("has eight lanes", () => expect(LANES).toHaveLength(8));
  it("lanes 3 and 7 are occupied in the demo", () => expect(availableLanes()).toEqual([1, 2, 4, 5, 6, 8]));
});