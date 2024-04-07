# geojson-to-gml-3

[![npm version](https://badge.fury.io/js/geojson-to-gml-3.svg)](https://badge.fury.io/js/geojson-to-gml-3)
![Build Status](https://img.shields.io/travis/SKalt/geojson-to-gml-3.2.1/master.svg)

A package to translate geojson geometries to GML 3.2.1.

---

Geography Markup Language (GML) is an OGC Standard.

More information may be found at http://www.opengeospatial.org/standards/gml

The most current schema are available at http://schemas.opengis.net/ .

---

Policies, Procedures, Terms, and Conditions of OGC(r) are available at http://www.opengeospatial.org/ogc/legal/ .

OGC and OpenGIS are registered trademarks of Open Geospatial Consortium.

## Installation

### pnpm

```sh
pnpm add geojson-to-gml-3
```

### npm

```sh
npm install geojson-to-gml-3
```

### yarn

```sh
yarn add geojson-to-gml-3
```

## Use

```ts
// convert any geometry
import turf from "@turf/helpers";
import gml from "geojson-to-gml-3";
console.log(gml(turf.point([0, 0]).geometry));
// -> "<gml:Point><gml:pos>0 0</gml:pos></gml:Point>"

// or for slimmer builds, import only what you need.
import { lineString } from "geojson-to-gml-3";

console.log(
  lineString(
    turf.lineString([
      [0, 1],
      [2, 3],
    ]).geometry,
  ),
);
// -> <gml:LineString><gml:posList>0 1 2 3</gml:posList>
```
