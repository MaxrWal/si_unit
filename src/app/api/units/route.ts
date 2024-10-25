// src/app/api/units/route.ts
import { NextResponse } from "next/server";
import { siUnits } from "@data/siUnits";

// Simulate external API call for units
const fetchFromExternalAPI = async (unit: string) => {
  // Simulate fetching from an external API, returning a dynamic result.
  return { description: `Generated description for ${unit}` };
};

// Helper function to construct unit string
const constructUnitString = (params: URLSearchParams) => {
  const units = ['s', 'm', 'kg', 'A', 'K', 'mol', 'cd'];
  return units
    .map((unit) => {
      const exponent = params.get(unit);
      return exponent && exponent !== "0" ? `${unit}^${exponent}` : null;
    })
    .filter(Boolean) // Remove null values
    .join(" · ") || "Dimensionless";
};

// API route handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Construct the unit string from the query parameters
  const unitString = constructUnitString(searchParams);

  // return NextResponse.json({ description: unitString });
  console.log(unitString)

  // Check static table first
  const foundUnit = siUnits.find((item) => item.unit === unitString);

  if (foundUnit) {
    // Return static result if unit is found
    return NextResponse.json({ description: foundUnit.description });
  }

  // If not found, query external API (or simulate it)
  const externalResponse = await fetchFromExternalAPI(unitString);

  return NextResponse.json(externalResponse);
}
