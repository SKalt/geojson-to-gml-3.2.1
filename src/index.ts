import {
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from "geojson";
/**
 * A library of functions to convert geojson to GML.
 * @module geojson-to-gml-3
 */

/*
 Note this can only convert what geojson can store: simple feature types, not
 coverage, topology, etc.
 */

/**
 * geojson coordinates are in longitude/easting, latitude/northing [,elevation]
 * order by [RFC-7946 § 3.1.1]{@link https://tools.ietf.org/html/rfc7946#section-3.1.1}.
 * however, you may use a CRS that follows a latitude/easting,
 * longitude/northing, [,elevation, [...etc]] order.
 * @see https://macwright.com/lonlat/
 */
export enum CoordinateOrder {
  /** Geojson's default order */
  LON_LAT,
  LAT_LON,
}

export const enum GmlGeometryType {
  MultiCurve = "MultiCurve",
  MultiGeometry = "MultiGeometry",
  MultiPoint = "MultiPoint",
  /** A multipolygon */
  MultiSurface = "MultiSurface", // see file://./../spec/geometryAggregates.xsd#surfaceMembers
}
/** for members of a multi-geometry */
const enum GmlMemberType {
  /** components of a geojson LineString */
  CurveMembers = "curveMembers",
  /** components of a geojson MultiPoint */
  PointMembers = "pointMembers",
  /** components of a geojson MultiPolygon */
  SurfaceMembers = "surfaceMembers",
  /** components of a geojson MultiGeometry */
  GeometryMembers = "geometryMembers",
}

/**
 * Optional parameters for conversion of geojson to gml geometries
 */
export type Params = {
  /** a string specifying SRS, e.g. 'EPSG:4326'. Only applies to multigeometries. */
  srsName?: string;
  /** an array of number/string `gml:ids` of the member geometries. */
  gmlIds?: number[] | string[];
  /** the dimensionality of each coordinate, i.e. 2 or 3. */
  srsDimension?: number; // used to be |string
};

// TODO: document
export const geometry = (
  geom: Geometry,
  gmlId: string | number | null = null,
  params: Params = {},
  order: CoordinateOrder = CoordinateOrder.LON_LAT
): string => {
  switch (geom.type) {
    case "Point":
      return point(geom, gmlId, params, order);
    case "LineString":
      return lineString(geom, gmlId, params, order);
    case "Polygon":
      return polygon(geom, gmlId, params, order);
    case "MultiPoint":
      return multiPoint(geom, gmlId, params, order);
    case "MultiLineString":
      return multiLineString(geom, gmlId, params);
    case "MultiPolygon":
      return multiPolygon(geom, gmlId, params);
    case "GeometryCollection":
      return geometryCollection(geom, gmlId, params);
    default:
      throw new Error(`unknown geometry type: ${(geom as any).type}`);
  }
};

type ElementOf<T> = T extends Array<infer U> ? U : never;

type ConverterFn<
  Collection extends MultiPoint | MultiLineString | MultiPolygon,
> = (
  geom: ElementOf<Collection["coordinates"]>,
  gmlId: string | number | null,
  params: Params,
  order: CoordinateOrder
) => string;

/**
 * A handler to compile geometries to multigeometries
 * @function
 * @param name the name of the target multigeometry
 * @param memberName the gml:tag of each multigeometry member.
 * @param geom an array of geojson geometries
 * @param gmlId the gml:id of the multigeometry
 * @param params optional parameters. Omit gmlIds at your own risk, however.
 * @returns a string containing gml describing the input multigeometry
 * @throws if a member geometry cannot be converted to gml
 */
function multi<Collection extends MultiPoint | MultiLineString | MultiPolygon>(
  name: GmlGeometryType,
  memberName: string, // FIXME: enumerate
  memberCallback: ConverterFn<Collection>
) {
  return (
    geom: Collection,
    gmlId: string | number | null = null,
    params: Params = {},
    order: CoordinateOrder = CoordinateOrder.LON_LAT
  ) => {
    let { srsName, gmlIds = [] } = params;
    let members = "";
    for (let i = 0; i < geom.coordinates.length; i++) {
      members += memberCallback(
        geom.coordinates[i] as ElementOf<Collection["coordinates"]>,
        gmlIds[i] ?? null,
        params,
        order
      );
    }
    let result = "";
    result += `<gml:${name}${attrs({ srsName, "gml:id": gmlId })}>`;
    result += /**/ `<gml:${memberName}>`;
    result += /*   */ members;
    result += /**/ `</gml:${memberName}>`;
    result += `</gml:${name}>`;
    return result;
  };
}

/** @see {@link } */
const gmlPointMembers = (
  coords: number[][],
  srsDimension?: string | number,
  order: CoordinateOrder = CoordinateOrder.LON_LAT
) => {
  return "";
};

const gmlPoint = (
  coordinates: number[],
  gmlId: string | number | null = null,
  params: Params = {},
  order: CoordinateOrder = CoordinateOrder.LON_LAT
) => {
  let { srsName, srsDimension } = params;
  let result = "";
  result += `<gml:Point${attrs({ srsName, "gml:id": gmlId })}>`;
  result += /**/ gmlPos(coordinates, srsDimension, order);
  result += "</gml:Point>";
  return result;
};

/**
 * Converts an input geojson Point geometry to gml
 * @function
 * @param coords the coordinates member of the geojson geometry
 * @param gmlId the gml:id
 * @param params optional parameters
 * @param order coordinate order configuration
 * @returns a string containing gml representing the input geometry
 */
export function point(
  geom: Point,
  gmlId: string | number | null = null,
  params: Params = {},
  order: CoordinateOrder = CoordinateOrder.LON_LAT
): string {
  return gmlPoint(geom.coordinates, gmlId, params, order);
}

const gmlLineStringCoords = (
  coordinates: LineString["coordinates"],
  order: CoordinateOrder = CoordinateOrder.LON_LAT
) => {
  let result = "";
  for (let pos of coordinates) {
    for (let n of orderCoords(pos, order)) {
      result += `${n} `;
    }
  }
  return result;
};

const gmlLineString = (
  coordinates: LineString["coordinates"],
  gmlId: string | number | null,
  params: Params = {},
  order: CoordinateOrder = CoordinateOrder.LON_LAT
): string => {
  let { srsName, srsDimension } = params;
  let result = "";
  result += `<gml:LineString${attrs({ srsName, "gml:id": gmlId })}>`;
  result += /**/ `<gml:posList${attrs({ srsDimension })}>`;
  result += /*  */ gmlLineStringCoords(coordinates, order);
  result += /**/ `</gml:posList>`;
  result + "</gml:LineString>";
  return result;
};
/**
 * Converts an input geojson LineString geometry to gml
 * @function
 * @param line the coordinates member of the geojson geometry
 * @param gmlId the gml:id
 * @param params optional parameters; @see {@link Params}
 * @returns a string containing gml representing the input geometry
 */
export function lineString(
  line: LineString,
  gmlId: string | number | null = null,
  params: Params = {},
  order: CoordinateOrder = CoordinateOrder.LON_LAT
): string {
  return gmlLineString(line.coordinates, gmlId, params, order);
}

/**
 * Construct a gml:LinearRing from an array of coordinates
 * @function
 * @param coords the coordinates member of the geojson geometry
 * @param gmlId the gml:id
 * @param params optional parameters
 * @returns a string containing gml representing the input geometry
 */
export function linearRing(
  coords: number[][],
  gmlId?: string | number | null,
  params: Params = {},
  order: CoordinateOrder = CoordinateOrder.LON_LAT
): string {
  let { srsName, srsDimension } = params;
  return (
    `<gml:LinearRing${attrs({ "gml:id": gmlId, srsName })}>` +
    /**/ `<gml:posList${attrs({ srsDimension })}>` +
    /*  */ coords.map((e) => orderCoords(e, order).join(" ")).join(" ") +
    /**/ "</gml:posList>" +
    "</gml:LinearRing>"
  );
}

const gmlPolygon = (
  coordinates: Polygon["coordinates"],
  gmlId: string | number | null = null,
  params: Params = {},
  order: CoordinateOrder = CoordinateOrder.LON_LAT
): string => {
  let { srsName } = params;
  // geom.coordinates are arrays of LinearRings
  let [poly, ...rings] = coordinates;
  let polygon =
    `<gml:Polygon${attrs({ srsName, "gml:id": gmlId })}>` +
    /**/ "<gml:exterior>" +
    /*  */ linearRing(poly, null, params, order) +
    /**/ "</gml:exterior>";

  for (let ring of rings) {
    polygon +=
      "<gml:interior>" +
      /**/ linearRing(ring, undefined, params, order) +
      "</gml:interior>";
  }
  polygon += "</gml:Polygon>";
  return polygon;
};
/**
 * Converts an input geojson Polygon geometry to gml
 * @function
 * @param coords the coordinates member of the geojson geometry
 * @param gmlId the gml:id
 * @param params optional parameters
 * @returns a string containing gml representing the input geometry
 */
export function polygon(
  geom: Polygon,
  gmlId: string | number | null = null,
  params: Params = {},
  order: CoordinateOrder = CoordinateOrder.LON_LAT
): string {
  return gmlPolygon(geom.coordinates, gmlId, params, order);
}

/**
 * Converts an input geojson MultiPoint geometry to gml
 * @function
 * @param geom the {@link MultiPoint} to convert
 * @param gmlId the gml:id
 * @param params optional parameters
 * @returns a string containing gml representing the input geometry
 */
export const multiPoint = multi<MultiPoint>(
  GmlGeometryType.MultiPoint,
  "pointMembers", // see file://./../spec/geometryAggregates.xsd#pointMembers
  gmlPoint
);

/**
 * Converts an input geojson MultiLineString geometry to gml
 * @function
 * @param coords the coordinates member of the geojson geometry
 * @param gmlId the gml:id
 * @param params optional parameters
 * @returns a string containing gml representing the input geometry
 */
export const multiLineString =
  // see file://./../spec/geometryAggregates.xsd#MultiCurveType
  // see file://./../spec/geometryBasic0d1d.xsd#CurveArrayPropertyType
  multi<MultiLineString>(
    GmlGeometryType.MultiCurve,
    "curveMembers",
    gmlLineString
  );
/**
 * Converts an input geojson MultiPolygon geometry to gml
 * @function
 * @param coords the coordinates member of the geojson geometry
 * @param gmlId the gml:id
 * @param params optional parameters
 * @returns a string containing gml representing the input geometry
 */
export const multiPolygon = multi<MultiPolygon>(
  GmlGeometryType.MultiSurface,
  "surfaceMembers",
  gmlPolygon
);

// FIXME: why is this needed?
/**
 * A helper to de-camelCase this module's geometry conversion methods
 * @param  obj a mapping of camelCase geometry types to converter functions
 * @return a mapping of capitalized geometry types to converter functions
 * @example
 * makeConverter({lineString})
 * // returns {LineString: lineString}
 */
function makeConverter(obj: object): object {
  return Object.entries(obj)
    .map(([type, converter]) => {
      return { [type[0].toUpperCase() + type.slice(1)]: converter };
    })
    .reduce((a, b) => Object.assign(a, b), {});
}
/**
 * A helper to map geometry types to converter functions.
 * @function
 * @param obj an object mapping camelCased geometry type names to
 * converter functions for that type.
 * @example
 * import {point, lineString} from 'geojson-to-gml-3';
 * const geomToGml = makeTranslator({point, lineString});
 * geomToGml({type: 'Point', coordinates: [0, 0]});
 */
export function makeTranslator(obj: object) {
  const converter = makeConverter(obj);
  return function (geom, gmlId, params) {
    const warn = () =>
      new Error(`unknown: ${geom.type} ` + [...arguments].join());
    const convert = converter[geom.type] || warn;
    return convert(geom.coordinates || geom.geometries, gmlId, params);
  };
}

/**
 * Converts an input geojson GeometryCollection geometry to gml
 * @function
 * @param coords the coordinates member of the geojson geometry
 * @param gmlId the gml:id
 * @param params optional parameters
 * @param params.srsName as string specifying SRS
 * @param params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns a string containing gml representing the input geometry
 */
export function geometryCollection(
  collection: GeometryCollection,
  gmlId: string | number | null = null,
  params: Params = {},
  order: CoordinateOrder = CoordinateOrder.LON_LAT
): string {
  // see file://./../spec/geometryAggregates.xsd#MultiGeometry
  // see file://./../spec/geometryAggregates.xsd#GeometryArrayPropertyType
  // see file://./../spec/geometryBasic0d1d.xsd#GeometryArrayPropertyType
  let { gmlIds = [], srsName } = params;
  let members = "";
  for (let i = 0; i < collection.geometries.length; i++) {
    members += geometry(
      collection.geometries[i],
      gmlIds[i] ?? null,
      params,
      order
    );
  }
  let result = "";
  result += `<gml:MultiGeometry${attrs({ "gml:id": gmlId, srsName })}>`;
  result += /**/ `<gml:geometryMembers>`;
  result += /*   */ members;
  result += /**/ `</gml:geometryMembers>`;
  result += `</gml:MultiGeometry>`;
  return result;
}

const gmlPos = (
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
