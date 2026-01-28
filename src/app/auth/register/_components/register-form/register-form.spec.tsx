import { render, screen } from "@testing-library/react";
import { RegisterForm } from "./register-form";

describe("RegisterForm", () => {
  test("renders email and password fields and submit button", () => {
    render(<RegisterForm />);

    // Check for the AuthCard title
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();

    // Check for email field
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();

    // Check for password field
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });
});
