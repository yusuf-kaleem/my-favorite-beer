import Filter from "./Filter";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Filter />", () => {
  it("confimr on click of filter icon filter inputs exits", () => {
    render(<Filter />);
    const button = screen.getByRole("img");
    fireEvent.click(button);
    expect(screen.getByText("fermentation type :")).toBeTruthy();
    expect(screen.getByText("bitterness :")).toBeTruthy();
    expect(screen.getByText("food pairing :")).toBeTruthy();
  });
});
