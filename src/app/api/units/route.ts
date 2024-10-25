//src/app/api/units/route.ts

import { NextResponse } from "next/server";
import { siUnits } from "@data/siUnits";
import { constructUnitString } from "@utils/unitStringConstructor";

// Simulate external API call for units
const fetchFromExternalAPI = async (unit: string) => {
  // Simulate fetching from an external API, returning a dynamic result.
  return { description: `Generated description for ${unit}` };
};

// API route handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Construct the unit string from the query parameters
  const unitString = constructUnitString(searchParams);

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
