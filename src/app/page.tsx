"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import "katex/dist/katex.min.css";
import { constructUnitString } from "@utils/unitStringConstructor";

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
  const [exponents, setExponents] = useState({
    s: 0,
    m: 0,
    kg: 0,
    A: 0,
    K: 0,
    mol: 0,
    cd: 0,
  });
  
  const [unitDetails, setUnitDetails] = useState<{
    name: string | null;
    quantity: string | null;
    SISymbol: string | null;
    quantitySymbol: string | null;
    alternateSIExpression: string | null;
    duplicates: string | null;
    dimension: string | null;
    description: string | null;
    field: string | null;
    examples: string[] | null;
  } | null>(null);

  const handleExponentChange = (unit: string, newValue: number) => {
    setExponents((prevState) => {
      const newState = {
        ...prevState,
        [unit]: newValue,
      };
      fetchUnitDescription(newState);
      return newState;
    });
  };

  const getResultingUnit = (currentExponents = exponents) => {
    return constructUnitString(
      new URLSearchParams(
        Object.entries(currentExponents)
          .filter(([_unit, exp]) => exp !== 0)
          .reduce((params, [unit, exp]) => {
            params[unit] = exp.toString();
            return params;
          }, {} as Record<string, string>)
      )
    );
  };

  const fetchUnitDescription = async (currentExponents = exponents) => {
    const queryParams = new URLSearchParams(
      Object.entries(currentExponents)
        .filter(([_unit, exp]) => exp !== 0)
        .reduce((params, [unit, exp]) => {
          params[unit] = exp.toString();
          return params;
        }, {} as Record<string, string>)
    );

    try {
      const response = await fetch(`/api/units?${queryParams.toString()}`);
      const data = await response.json();

      // Set both fetched data and request data to state, use request data as fallback
      setUnitDetails({
        name: data.name || `Requested Unit: ${getResultingUnit(currentExponents)}`,
        quantity: data.quantity || `Requested Quantity: ${getResultingUnit(currentExponents)}`,
        SISymbol: data.SISymbol || `Requested SI Symbol: ${getResultingUnit(currentExponents)}`,
        quantitySymbol: data.quantitySymbol || `Requested Quantity Symbol: ${getResultingUnit(currentExponents)}`,
        alternateSIExpression: data.alternateSIExpression || `Requested Alternate Expression: ${getResultingUnit(currentExponents)}`,
        duplicates: data.duplicates || `Requested Duplicates: ${getResultingUnit(currentExponents)}`,
        dimension: data.dimension || `Requested Dimension: ${getResultingUnit(currentExponents)}`,
        description: data.description || `Requested Description: ${getResultingUnit(currentExponents)}`,
        field: data.field || `Requested Field: ${getResultingUnit(currentExponents)}`,
        examples: data.examples || [`Requested Examples: ${getResultingUnit(currentExponents)}`],
      });
    } catch (_error) {
      setUnitDetails({
        name: `Requested Unit: ${getResultingUnit(currentExponents)}`,
        quantity: `Requested Quantity: ${getResultingUnit(currentExponents)}`,
        SISymbol: `Requested SI Symbol: ${getResultingUnit(currentExponents)}`,
        quantitySymbol: `Requested Quantity Symbol: ${getResultingUnit(currentExponents)}`,
        alternateSIExpression: `Requested Alternate Expression: ${getResultingUnit(currentExponents)}`,
        duplicates: `Requested Duplicates: ${getResultingUnit(currentExponents)}`,
        dimension: `Requested Dimension: ${getResultingUnit(currentExponents)}`,
        description: `Requested Description: ${getResultingUnit(currentExponents)}`,
        field: `Requested Field: ${getResultingUnit(currentExponents)}`,
        examples: [`Requested Examples: ${getResultingUnit(currentExponents)}`],
      });
    }
  };

  return (
    <div className="flex flex-row space-x-10 p-8">
      <div className="flex flex-col space-y-4">
        {siBaseUnits.map((unit) => (
          <div
            key={unit.symbol}
            className="flex flex-col items-center justify-center border border-gray-500 p-4 w-36 h-28"
          >
            <label className="text-center text-xs">
              {unit.name}
              <div className="flex flex-col items-center mt-2">
                <span className="text-lg">
                  {unit.symbol}
                  <sup>n</sup>, n = {exponents[unit.symbol as keyof typeof exponents]}
                </span>
                <div className="flex flex-col mt-2 space-y-1">
                  <ChevronUpIcon
                    className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() =>
                      handleExponentChange(
                        unit.symbol,
                        exponents[unit.symbol as keyof typeof exponents] + 1
                      )
                    }
                  />
                  <ChevronDownIcon
                    className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() =>
                      handleExponentChange(
                        unit.symbol,
                        exponents[unit.symbol as keyof typeof exponents] - 1
                      )
                    }
                  />
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between border border-gray-500 p-6 w-96 h-auto">
        <h2 className="text-2xl">Resulting Unit:</h2>
        <BlockMath math={getResultingUnit() === "Dimensionless" ? "Dimensionless" : getResultingUnit()} />
        
        <div className="flex flex-col space-y-4 mt-4">
          <div className="border border-gray-300 p-4 w-full">
            <strong>Name:</strong> {unitDetails?.name}
          </div>
          <div className="border border-gray-300 p-4 w-full">
            <strong>Quantity:</strong> {unitDetails?.quantity}
          </div>
          <div className="border border-gray-300 p-4 w-full">
            <strong>SI Symbol:</strong> {unitDetails?.SISymbol}
          </div>
          <div className="border border-gray-300 p-4 w-full">
            <strong>Quantity Symbol:</strong> {unitDetails?.quantitySymbol}
          </div>
          <div className="border border-gray-300 p-4 w-full">
            <strong>Alternate SI Expression:</strong> {unitDetails?.alternateSIExpression}
          </div>
          <div className="border border-gray-300 p-4 w-full">
            <strong>Duplicates:</strong> {unitDetails?.duplicates}
          </div>
          <div className="border border-gray-300 p-4 w-full">
            <strong>Dimension:</strong> {unitDetails?.dimension}
          </div>
          <div className="border border-gray-300 p-4 w-full">
            <strong>Description:</strong> {unitDetails?.description}
          </div>
          <div className="border border-gray-300 p-4 w-full">
            <strong>Field:</strong> {unitDetails?.field}
          </div>
          <div className="border border-gray-300 p-4 w-full">
            <strong>Examples:</strong> {unitDetails?.examples?.join(', ')}
          </div>
        </div>

        <button
          onClick={() => fetchUnitDescription()}
          className="px-4 py-2 mt-4 border border-gray-500 rounded bg-gray-100 hover:bg-gray-200"
        >
          Fetch Description
        </button>
      </div>
    </div>
  );
};

export default HomePage;
