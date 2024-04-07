// ©️ Steven Kalt
// Spdx-License-Identifier: PolyForm-Noncommercial-1.0.0 OR PolyForm-Free-Trial-1.0.0

/**
 * A library of functions to convert geojson to GML.
 * @module geojson-to-gml-3
 */
import type {
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from "geojson";

/*
 Note this can only convert what geojson can store: simple feature types, not
 coverage, topology, etc.
 */

type GeojsonConverter<Geom extends Geometry = Geometry> = (
  geom: Geom,
  params: Params,
) => string;

export const xmlns = "http://www.opengis.net/gml/3.2";

/** Optional parameters for conversion of geojson to gml geometries */
export type Params = {
  xmlns?: string;
  gmlId?: string | number | null;
  /** defaults to longitude, latitude */
  order?: CoordinateOrder;
  /** a string specifying SRS, e.g. 'EPSG:4326'. Only applies to multigeometries. */
  srsName?: string;
  /** an array of number/string `gml:ids` of member geometries, if any. */
  gmlIds?: Array<number | string>;
  /** the dimensionality of each coordinate, i.e. 2 or 3. */
  srsDimension?: number; // used to be |string
};

type CoordinateConverter<G extends Exclude<Geometry, GeometryCollection>> = (
  geom: G["coordinates"],
  params: Params,
) => string;

/**
 * geojson coordinates are in longitude/easting, latitude/northing [,elevation]
 * order by [RFC-7946 § 3.1.1]{@link https://tools.ietf.org/html/rfc7946#section-3.1.1}.
 * however, you may use a CRS that follows a latitude/easting,
 * longitude/northing, [,elevation, [...etc]] order.
 * @see https://macwright.com/lonlat/
 */
export enum CoordinateOrder {
  /** Geojson's default order */
  LON_LAT = "lon,lat",
  LAT_LON = "lat,lon",
}

// TODO: document
export const geometry = (geom: Geometry, params: Params = {}): string => {
  switch (geom.type) {
    case "Point":
      return point(geom, params);
    case "LineString":
      return lineString(geom, params);
    case "Polygon":
      return polygon(geom, params);
    case "MultiPoint":
      return multiPoint(geom, params);
    case "MultiLineString":
      return multiLineString(geom, params);
    case "MultiPolygon":
      return multiPolygon(geom, params);
    case "GeometryCollection":
      return geometryCollection(geom, params);
    default:
      throw new Error(`unknown geometry type: ${(geom as any).type}`);
  }
};

type ElementOf<T> = T extends Array<infer U> ? U : never;

export type MultiGeometry =
  | MultiPoint
  | MultiLineString
  | MultiPolygon
  | GeometryCollection;

type Associate<G extends Geometry, Kind, Value> = G extends Kind
  ? Value
  : never;

type GmlName<G extends MultiGeometry> =
  | Associate<G, MultiPoint, "MultiPoint">
  | Associate<G, MultiLineString, "MultiCurve">
  | Associate<G, MultiPolygon, "MultiSurface">
  | Associate<G, GeometryCollection, "MultiGeometry">;

type MemberName<G extends MultiGeometry> =
  | Associate<G, MultiPoint, "pointMembers">
  | Associate<G, MultiLineString, "curveMembers">
  | Associate<G, MultiPolygon, "surfaceMembers">
  | Associate<G, GeometryCollection, "geometryMembers">;

type MemberKey<G extends MultiGeometry> = keyof G &
  (G extends GeometryCollection ? "geometries" : "coordinates");
type MemberKind<G extends MultiGeometry> = ElementOf<G[MemberKey<G>]>;

type ConverterFn<Collection extends MultiGeometry> = (
  geom: MemberKind<Collection>,
  params: Params,
) => string;

/**
 * A handler to compile geometries to multigeometries
 * @function
 * @param elementName the name of the GML element corresponding to the input json {@link MultiGeometry}
 * @param memberElementName the inner element holding the member geometries.
 * @param key the key of the geojson object that points to the array of member
 * geometries or coordinates
 * @param renderMember a callback to render each member geometry to GML
 * @returns a function to render the specified multigeometry collection kind into GML
 * @throws if a member geometry cannot be converted to GML
 */
function multi<Collection extends MultiGeometry>(
  elementName: GmlName<Collection>,
  memberElementName: MemberName<Collection>,
  key: MemberKey<Collection>,
  renderMember: ConverterFn<Collection>,
): GeojsonConverter<Collection> {
  return (geom: Collection, params: Params = {}) => {
    let { srsName, gmlId = null, gmlIds = [], xmlns = null, ...rest } = params;
    let members = "";
    const _members = geom[key] as MemberKind<Collection>[];
    for (let i = 0; i < _members.length; i++) {
      members += renderMember(_members[i], {
        gmlId: gmlIds[i] ?? null,
        ...rest,
      });
    }
    let result = "";
    result += `<gml:${elementName}${attrs({ srsName, "gml:id": gmlId, "xmlns:gml": xmlns })}>`;
    result += /**/ `<gml:${memberElementName}>`;
    result += /*   */ members;
    result += /**/ `</gml:${memberElementName}>`;
    result += `</gml:${elementName}>`;
    return result;
  };
}

const gmlPoint: CoordinateConverter<Point> = (
  coordinates: number[],
  params: Params = {},
) => {
  let {
    srsName,
    srsDimension,
    order = CoordinateOrder.LON_LAT,
    gmlId = null,
    xmlns = null,
  } = params;
  let result = "";
  result += `<gml:Point${attrs({ srsName, "gml:id": gmlId, "xmlns:gml": xmlns })}>`;
  result += /**/ gmlPos(coordinates, srsDimension, order);
  result += "</gml:Point>";
  return result;
};

/**
 * Converts an input geojson Point geometry to GML
 * @function
 * @param geom the {@link Point} to render to GML
 * @param params @see Params
 * @returns a GML string representing the input Point
 */
export const point: GeojsonConverter<Point> = (
  geom: Point,
  params: Params = {},
): string => gmlPoint(geom.coordinates, params);

const gmlLineStringCoords = (
  coordinates: LineString["coordinates"],
  order: CoordinateOrder = CoordinateOrder.LON_LAT,
) => {
  let result = "";
  let _order = coordOrder(order);
  for (let pos of coordinates) {
    for (let n of _order(pos)) {
      result += `${n} `;
    }
  }
  return result.trim();
};

const gmlLineString: CoordinateConverter<LineString> = (
  coordinates: LineString["coordinates"],
  params: Params = {},
): string => {
  let {
    srsName,
    srsDimension,
    gmlId = null,
    order = CoordinateOrder.LON_LAT,
    xmlns = null,
  } = params;
  let result = "";
  result += `<gml:LineString${attrs({ srsName, "gml:id": gmlId, "xmlns:gml": xmlns })}>`;
  result += /**/ `<gml:posList${attrs({ srsDimension })}>`;
  result += /*  */ gmlLineStringCoords(coordinates, order);
  result += /**/ `</gml:posList>`;
  result + "</gml:LineString>";
  return result;
};
/** Convert an input geojson LineString geometry to gml
 * @function
 * @param line the coordinates member of the geojson geometry
 * @param gmlId the gml:id
 * @param params optional parameters; @see {@link Params}
 * @returns a string containing gml representing the input geometry
 */
export const lineString: GeojsonConverter<LineString> = (
  line: LineString,
  params: Params = {},
): string => gmlLineString(line.coordinates, params);

/** Construct a gml:LinearRing from an array of coordinates
 * @function
 * @param coords the coordinates member of the geojson geometry
 * @param gmlId the gml:id
 * @param params optional parameters
 * @returns a string containing gml representing the input geometry
 */
function gmlLinearRing(coords: number[][], params: Params = {}): string {
  let {
    srsName,
    srsDimension,
    gmlId = null,
    order = CoordinateOrder.LON_LAT,
  } = params;
  const _order = coordOrder(order);
  return (
    `<gml:LinearRing${attrs({ "gml:id": gmlId, srsName })}>` +
    /**/ `<gml:posList${attrs({ srsDimension })}>` +
    /*  */ coords.map((e) => _order(e).join(" ")).join(" ") +
    /**/ "</gml:posList>" +
    "</gml:LinearRing>"
  );
}

const gmlPolygon: CoordinateConverter<Polygon> = (
  coordinates: Polygon["coordinates"],
  params: Params = {},
): string => {
  let { srsName, gmlId = null, xmlns = null, ...rest } = params;
  // geom.coordinates are arrays of LinearRings
  let [poly, ...rings] = coordinates;

  let exterior = "";
  exterior += "<gml:exterior>";
  exterior += /**/ gmlLinearRing(poly, rest);
  exterior += "</gml:exterior>";

  let interior = "";
  for (let ring of rings) {
    interior += "<gml:interior>";
    interior += /**/ gmlLinearRing(ring, rest);
    interior += "</gml:interior>";
  }
  let result = "";
  result += `<gml:Polygon${attrs({ srsName, "gml:id": gmlId, "xmlns:gml": xmlns })}>`;
  result += /**/ exterior;
  result += /**/ interior;
  result += "</gml:Polygon>";
  return result;
};

/**
 * Converts an input geojson Polygon geometry to gml
 * @function
 * @param geom the {@link Polygon} to convert to gml
 * @param params @see Params
 * @returns a string containing gml representing the input geometry
 */
export const polygon: GeojsonConverter<Polygon> = (
  geom: Polygon,
  params: Params = {},
): string => gmlPolygon(geom.coordinates, params);

/**
 * Converts an input geojson MultiPoint geometry to gml
 * @function
 * @param geom the {@link MultiPoint} to convert to gml
 * @param params @see Params
 * @returns a string containing gml representing the input geometry
 */
export const multiPoint: GeojsonConverter<MultiPoint> = multi<MultiPoint>(
  "MultiPoint",
  "pointMembers", // see file://./../spec/geometryAggregates.xsd#pointMembers
  "coordinates",
  gmlPoint,
);

/**
 * Converts an input geojson MultiLineString geometry to gml
 * @function
 * @param coords the coordinates member of the geojson geometry
 * @param params @see Params
 * @returns a string containing gml representing the input geometry
 */
export const multiLineString: GeojsonConverter<MultiLineString> =
  multi<MultiLineString>(
    "MultiCurve", // see file://./../spec/geometryAggregates.xsd#MultiCurveType
    "curveMembers", // see file://./../spec/geometryBasic0d1d.xsd#CurveArrayPropertyType
    "coordinates",
    gmlLineString,
  );
/**
 * Converts an input geojson MultiPolygon geometry to GML
 * @function
 * @param geom the {@link MultiPolygon} to convert to GML
 * @param params @see Params
 * @returns a string containing GML representing the input geometry
 */
export const multiPolygon: GeojsonConverter<MultiPolygon> = multi<MultiPolygon>(
  "MultiSurface", // see file://./../spec/geometryAggregates.xsd#MultiSurface
  "surfaceMembers",
  "coordinates",
  gmlPolygon,
);

/**
 * Converts an input geojson GeometryCollection geometry to GML
 * @function
 * @param geom the {@link GeometryCollection} to convert to GML
 * @param params @see Params
 * @returns a string containing GML representing the input geometry
 */
const geometryCollection: GeojsonConverter<GeometryCollection> =
  multi<GeometryCollection>(
    "MultiGeometry",
    "geometryMembers",
    "geometries",
    geometry,
  );
// see file://./../spec/geometryAggregates.xsd#MultiGeometry
// see file://./../spec/geometryAggregates.xsd#GeometryArrayPropertyType
// see file://./../spec/geometryBasic0d1d.xsd#GeometryArrayPropertyType

const gmlPos = (
  coords: number[],
  srsDimension?: string | number,
  order: CoordinateOrder = CoordinateOrder.LON_LAT,
): string => {
  let result = "";
  result += `<gml:pos${attrs({ srsDimension })}>`;
  result += /**/ coordOrder(order)(coords).join(" ");
  result += "</gml:pos>";
  return result;
};

/**
 * XML attribute values must match /"([^<&"]|&\w+;)*"/
 * Thus, escape `&`, `<`, ` and just to be sure, `'` and `>`
 * @see https://www.w3.org/TR/REC-xml/#NT-Attribute
 * @see https://www.w3.org/TR/REC-xml/#NT-AttValue
 */
const escapeAttrValue = (str: string) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    switch (c) {
      case '"':
        c = "&quot;";
      case "&":
        c = "&amp;";
      case "<":
        c = "&lt;";
      case ">":
        c = "&gt;";
      case "'":
        c = "&apos;";
    }
    result += c;
  }
  return result;
};

/**
 * re-validate/re-sanitize the attribute values to guard against XML injection
 * attacks. All attribute keys are known to be save at compile time.
 */
const attrs = (dict: Record<string, string | number | undefined | null>) => {
  let result = "";
  for (let [attrName, value] of Object.entries(dict)) {
    if (value === undefined || value === null)
      continue; // skip undefined/null values
    else if (typeof value === "number") {
      // note that srsDimension must be a positive number, but we aren't
      // checking that here
      if (Number.isFinite(value)) result += ` ${attrName}="${value}"`;
      else throw new Error(`invalid ${attrName}: ${value}`);
    } else if (typeof value === "string" && value) {
      result += ` ${attrName}="${escapeAttrValue(value)}"`;
    } else {
      throw new Error(`invalid ${attrName}: '${value}'`);
    }
  }
  return result;
};

/**
 * As an optimization, generate a function to reorder coordinates.
 * @see https://macwright.com/lonlat/
 * @param  coords An array of coordinates,  [lng, lat, ...etc]
 * @return An array of coordinates in the correct order.
 */
const coordOrder = (order: CoordinateOrder) => {
  switch (order) {
    case CoordinateOrder.LAT_LON:
      return ([lon, lat, ...rest]: number[]) => [lat, lon, ...rest];
    case CoordinateOrder.LON_LAT:
      return (coords: number[]) => coords;
    default:
      throw new Error("invalid order: " + order);
  }
};

export default geometry;
