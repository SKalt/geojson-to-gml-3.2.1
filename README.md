# geojson-to-gml-3
[![npm version](https://badge.fury.io/js/geojson-to-gml-3.svg)](https://badge.fury.io/js/geojson-to-gml-3)
![Build Status](https://travis-ci.org/SKalt/geojson-to-gml-2.1.2.svg?branch=master)


A package to translate geojson geometries to GML 3.2.1.
___

Geography Markup Language (GML) is an OGC Standard.

More information may be found at http://www.opengeospatial.org/standards/gml

The most current schema are available at http://schemas.opengis.net/ .
___

Policies, Procedures, Terms, and Conditions of OGC(r) are available at http://www.opengeospatial.org/ogc/legal/ .

OGC and OpenGIS are registered trademarks of Open Geospatial Consortium.

## Installation
```
npm install geojson-to-gml-3
```
## Use
```
// convert any geometry
import turf from '@turf/helpers';
import {geomToGml} from 'geojso-to-gml-3';
geomToGml(turf.point([0,0]).geometry)

// or for ultra-slim builds, import only what you need.
import {Point, Line} from 'geojson-to-gml-3';
const geomToGml = (geom, gmlId, params) =>{
  return {Point, Line}[geom.type](geom, gmlId, params);
};
geomToGml(turf.point([0,0]).geometry)
```
## Contribute

Contributions are welcome! Please submit issues, reference them in your PR, and
make sure to add tests for any contributions you make.
