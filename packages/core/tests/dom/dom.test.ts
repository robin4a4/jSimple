import $ from "../../src";
import { expect, test } from "vitest";
import { getByLabelText, getByText } from "@testing-library/dom";

test("select", () => {
  const div = document.createElement("div");
  div.setAttribute("id", "divId");
  expect($.select("#divId")).toContain(div);
});
