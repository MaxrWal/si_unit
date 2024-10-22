import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the SI Unit Exponent Selector", () => {
    render(<HomePage />);
    
    // Check if the input elements for the base units are rendered
    expect(screen.getByLabelText(/Time \(seconds\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Length \(meters\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mass \(kilograms\)/i)).toBeInTheDocument();
  });

  it("updates the Resulting Unit when exponents are changed", () => {
    render(<HomePage />);

    // Get the input elements
    const timeInput = screen.getByLabelText(/Time \(seconds\)/i);
    const lengthInput = screen.getByLabelText(/Length \(meters\)/i);

    // Initially, the result should be "Dimensionless"
    expect(screen.getByText(/Dimensionless/i)).toBeInTheDocument();

    // Simulate user entering new exponents
    fireEvent.change(timeInput, { target: { value: "-1" } });
    fireEvent.change(lengthInput, { target: { value: "2" } });

    // The result should now update to reflect the changes
    expect(screen.getByText(/s\^-1 · m\^2/i)).toBeInTheDocument();
  });
});
