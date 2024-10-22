import { useState } from "react";

// List of SI base units
const siBaseUnits = [
  { symbol: "s", name: "Time (seconds)" },
  { symbol: "m", name: "Length (meters)" },
  { symbol: "kg", name: "Mass (kilograms)" },
  { symbol: "A", name: "Electric current (amperes)" },
  { symbol: "K", name: "Temperature (kelvin)" },
  { symbol: "mol", name: "Amount of substance (moles)" },
  { symbol: "cd", name: "Luminous intensity (candelas)" },
];

const HomePage = () => {
  // State for exponents of each SI unit
  const [exponents, setExponents] = useState({
    s: 0,
    m: 0,
    kg: 0,
    A: 0,
    K: 0,
    mol: 0,
    cd: 0,
  });

  // Function to update the exponent when the user changes it
  const handleExponentChange = (unit: string, newValue: number) => {
    setExponents((prevState) => ({
      ...prevState,
      [unit]: newValue,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SI Unit Exponent Selector</h1>

      <p>
        Adjust the exponents of the SI base units below, and see the combined
        result in real-time!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {siBaseUnits.map((unit) => (
          <div key={unit.symbol} style={{ display: "flex", alignItems: "center" }}>
            <label style={{ marginRight: "10px" }}>
              {unit.name} ({unit.symbol})
            </label>
            <input
              type="number"
              value={exponents[unit.symbol as keyof typeof exponents]}
              onChange={(e) =>
                handleExponentChange(unit.symbol, parseInt(e.target.value) || 0)
              }
              style={{ width: "50px", textAlign: "center" }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Resulting Unit:</h2>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          {Object.entries(exponents)
            .filter(([unit, exp]) => exp !== 0) // Filter out units with exponent 0
            .map(([unit, exp]) => `${unit}^${exp}`) // Display unit^exponent
            .join(" · ") || "Dimensionless"}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
