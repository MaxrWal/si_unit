// src/app/api/units/route.ts
import { NextResponse } from "next/server";
import { siUnits } from "@data/siUnits";

// Simulate external API call for units
const fetchFromExternalAPI = async (unit: string) => {
  // Simulate fetching from an external API, returning a dynamic result.
  return { description: `Generated description for ${unit}` };
};

// API route handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const unit = searchParams.get("unit");

  if (!unit) {
    return NextResponse.json({ error: "Unit not provided" }, { status: 400 });
  }

  // return NextResponse.json({ description: `${JSON.stringify(unit)}` });

  // Check static table first
  const foundUnit = siUnits.find((item) => item.unit === unit);

  if (foundUnit) {
    // Return static result if unit is found
    return NextResponse.json({ description: foundUnit.description });
  }

  // If not found, query external API (or simulate it)
  const externalResponse = await fetchFromExternalAPI(unit);

  return NextResponse.json(externalResponse);
}
