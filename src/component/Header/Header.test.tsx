import Header from "./Header";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Header />", () => {
  it("confimr header name exits", () => {
    render(<Header />);
    expect(screen.getByText("My Favorite Beer")).toBeTruthy();
  });
});
