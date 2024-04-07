// FIXME: write snapshot tests using jest
// TODO: prettify the output using prettier + prettier-xml
import type {
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from "geojson";
import gml, { xmlns } from "../src/index";
import { expect, it } from "vitest";

// create geojson examples

//http://geojson.org/geojson-spec.html#id5

// http://geojson.org/geojson-spec.html#id6

//http://geojson.org/geojson-spec.html#id7

//http://geojson.org/geojson-spec.html#geometrycollection

it("renders a Point correctly", () => {
  const point: Point = { type: "Point", coordinates: [102.0, 0.5] };
  expect(gml(point)).toMatchFileSnapshot("./snapshots/point.gml");
});
it("renders a LineString correctly", () => {
  const line: LineString = {
    type: "LineString",
    coordinates: [
      [102.0, 0.0],
      [103.0, 1.0],
      [104.0, 0.0],
      [105.0, 1.0],
    ],
  };
  expect(gml(line)).toMatchFileSnapshot("./snapshots/line.gml");
});
it("renders a Polygon correctly", () => {
  const polygon: Polygon = {
    type: "Polygon",
    coordinates: [
      [
        [100.0, 0.0],
        [101.0, 0.0],
        [101.0, 1.0],
        [100.0, 1.0],
        [100.0, 0.0],
      ],
    ],
  };
  expect(gml(polygon)).toMatchFileSnapshot("./snapshots/polygon.gml");
});
it("renders a MultiPoint correctly", () => {
  const multipoint: MultiPoint = {
    type: "MultiPoint",
    coordinates: [
      [100.0, 0.0],
      [101.0, 1.0],
    ],
  };
  expect(gml(multipoint)).toMatchFileSnapshot("./snapshots/multipoint.gml");
});
it("renders a MultiLineString correctly", () => {
  const multiLineString: MultiLineString = {
    type: "MultiLineString",
    coordinates: [
      [
        [100.0, 0.0],
        [101.0, 1.0],
      ],
      [
        [102.0, 2.0],
        [103.0, 3.0],
      ],
    ],
  };
  expect(gml(multiLineString)).toMatchFileSnapshot(
    "./snapshots/multilinestring.gml",
  );
});
it("renders a MultiPolygon correctly", () => {
  const multipolygon: MultiPolygon = {
    type: "MultiPolygon",
    coordinates: [
      [
        [
          [102.0, 2.0],
          [103.0, 2.0],
          [103.0, 3.0],
          [102.0, 3.0],
          [102.0, 2.0],
        ],
      ],
      [
        [
          [100.0, 0.0],
          [101.0, 0.0],
          [101.0, 1.0],
          [100.0, 1.0],
          [100.0, 0.0],
        ],
        [
          [100.2, 0.2],
          [100.8, 0.2],
          [100.8, 0.8],
          [100.2, 0.8],
          [100.2, 0.2],
        ],
      ],
    ],
  };
  expect(gml(multipolygon)).toMatchFileSnapshot("./snapshots/multipolygon.gml");
});

it("renders a GeometryCollection correctly", () => {
  const geometryCollection: GeometryCollection = {
    type: "GeometryCollection",
    geometries: [
      { type: "Point", coordinates: [100.0, 0.0] },
      {
        type: "LineString",
        coordinates: [
          [101.0, 0.0],
          [102.0, 1.0],
        ],
      },
    ],
  };
  expect(gml(geometryCollection)).toMatchFileSnapshot(
    "./snapshots/geometrycollection.gml",
  );
});
