//utils/unitStringConstructor.ts

export const constructUnitString = (params: URLSearchParams) => {
    const units = ['s', 'm', 'kg', 'A', 'K', 'mol', 'cd'];
    return units
      .map((unit) => {
        const exponent = params.get(unit);
        return exponent && exponent !== "0" ? `${unit}^${exponent}` : null;
      })
      .filter(Boolean) // Remove null values
      .join(" · ") || "Dimensionless";
  };