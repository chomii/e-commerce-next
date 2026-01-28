import { render, screen, fireEvent } from "@testing-library/react";
import { NavBar } from "./nav-bar";

describe("NavBar", () => {
  test("renders logo image", () => {
    render(<NavBar />);
    // The logo is an <img> inside a <Box> for md+ screens
    const logo = screen.getByAltText(/Next.js logo/i);
    expect(logo).toBeInTheDocument();
  });

  test("renders navigation buttons for pages", () => {
    render(<NavBar />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.some((btn) => btn.textContent === "Products")).toBe(true);
    expect(buttons.some((btn) => btn.textContent === "Pricing")).toBe(true);
    expect(buttons.some((btn) => btn.textContent === "Blog")).toBe(true);
  });

  test("renders user avatar button", () => {
    render(<NavBar />);
    // The avatar is always present
    expect(
      screen.getByRole("button", { name: /open settings/i }),
    ).toBeInTheDocument();
  });

  test("opens user menu when avatar is clicked", () => {
    render(<NavBar />);
    const avatarButton = screen.getByRole("button", { name: /open settings/i });
    fireEvent.click(avatarButton);
    // After clicking, the user menu should be open and show settings
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
