import Table from "./Table";
import { render, screen } from "@testing-library/react";

describe("<Table />", () => {
  it("initially do data should be rendered", () => {
    render(<Table />);
    expect(screen.findByText("No Data")).toBeTruthy();
  });
});
