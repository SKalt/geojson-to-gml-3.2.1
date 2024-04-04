// functions to render safe XML, GML strings
import { CoordinateOrder } from ".";
export type SafeXml = string & { readonly __safe: unique symbol };
export const SafeXml = (str: string) => str as SafeXml;
export type GmlStr = SafeXml & { readonly __gmlStr: unique symbol };
export const GmlStr = (str: string) => str as GmlStr;

export const gmlPos = (
  coords: number[],
  srsDimension?: string | number,
  order: CoordinateOrder = CoordinateOrder.LON_LAT
): string => {
  let result = "";
  result += `<gml:pos${attrs({ srsDimension })}>`;
  result += /**/ orderCoords(coords, order).join(" ");
  result += "</gml:pos>";
  return result;
};
type SafeAttrValue = string & { readonly __safe: unique symbol };
const SafeAttrValue = (str: string) => str as SafeAttrValue;
const escapeAttrValue = (str: string): SafeAttrValue => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    switch (c) {
      case '"':
        c = "&quot;";
      case "'":
        c = "&apos;";
      case "&":
        c = "&amp;";
      case "<":
        c = "&lt;";
      case ">":
        c = "&gt;";
    }
    result += c;
  }
  return SafeAttrValue(result);
};

/**
 * re-validate/re-sanitize the attribute types to guard against XML injection
 * attacks.
 */
export const attrs = ({
  "gml:id": gmlId,
  srsDimension,
  srsName,
}: {
  "gml:id"?: any;
  srsDimension?: any;
  srsName?: any;
}): SafeAttrValue => {
  let result = "";
  for (let [attrName, value] of Object.entries({
    "gml:id": gmlId,
    srsDimension,
    srsName,
  })) {
    if (value === undefined || value === null)
      continue; // skip undefined/null values
    else if (typeof value === "number") {
      // note that srsDimension is a positive number, but we aren't checking
      // that here
      if (Number.isFinite(value))
        result += SafeAttrValue(` ${attrName}="${value}"`);
      else throw new Error(`invalid ${attrName}: ${value}`);
    } else if (typeof value === "string") {
      result += SafeAttrValue(` ${attrName}="${escapeAttrValue(value)}"`);
    } else {
      value;
      // FIXME: else serialize object?
      throw new Error(`invalid ${attrName}: ${value}`);
    }
  }
  return SafeAttrValue(result);
};

/**
 * reorder coordinates to lat, lng iff config.coordinateOrder is false.
 * @see https://macwright.com/lonlat/
 * @param  coords An array of coordinates,  [lng, lat, ...etc]
 * @return An array of coordinates in the correct order.
 */
function orderCoords(coords: number[], order: CoordinateOrder): number[] {
  switch (order) {
    case CoordinateOrder.LAT_LON:
      let [lon, lat, ...rest] = coords;
      return [lat, lon, ...rest];
    case CoordinateOrder.LON_LAT:
      return coords;
    default:
      throw new Error("invalid order: " + order);
  }
}
