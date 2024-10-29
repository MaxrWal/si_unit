// src/app/api/units/route.ts

import { NextResponse } from "next/server";
import siUnitsData from "@data/siUnits.json";
import { constructUnitString } from "@utils/unitStringConstructor";

type SIUnitsDataType = Record<string, {
  name: string;
  quantity: string;
  SISymbol: string;
  quantitySymbol: string | null;
  alternateSIExpression: string | null;
  duplicates: string | null;
  dimension: string;
  description: string;
  field: string;
  examples: string[] | string;
}>;

const siUnits = siUnitsData as SIUnitsDataType;

// Simulate external API call for units
const fetchFromExternalAPI = async (unit: string) => {
  return { description: `Generated description for ${unit}` };
};

// API route handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Construct the unit string from the query parameters
  const unitString = constructUnitString(searchParams);

  // Check static table first
  const foundUnit = siUnits[unitString];

  if (foundUnit) {
    // Return detailed information if unit is found
    return NextResponse.json({
      name: foundUnit.name,
      quantity: foundUnit.quantity,
      SISymbol: foundUnit.SISymbol,
      quantitySymbol: foundUnit.quantitySymbol,
      alternateSIExpression: foundUnit.alternateSIExpression,
      duplicates: foundUnit.duplicates,
      dimension: foundUnit.dimension,
      description: foundUnit.description,
      field: foundUnit.field,
      examples: foundUnit.examples,
    });
  }

  // If not found, query external API (or simulate it)
  const externalResponse = await fetchFromExternalAPI(unitString);
  return NextResponse.json(externalResponse);
}
