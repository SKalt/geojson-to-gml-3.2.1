# geojson-to-gml-3.2.1
![Build Status](https://travis-ci.org/SKalt/geojson-to-gml-2.1.2.svg?branch=master)

A package to translate geojson geometries to GML 3.2.1.
___

Geography Markup Language (GML) is an OGC Standard.

More information may be found at http://www.opengeospatial.org/standards/gml

The most current schema are available at http://schemas.opengis.net/ .
___

Policies, Procedures, Terms, and Conditions of OGC(r) are available at http://www.opengeospatial.org/ogc/legal/ .

OGC and OpenGIS are registered trademarks of Open Geospatial Consortium.


## Constants

<dl>
<dt><a href="#converter">converter</a></dt>
<dd><p>a namespace to switch between geojson-handling functions by geojson.type</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#enforceGmlId">enforceGmlId()</a></dt>
<dd><p>checks outer scope for gmlId argument/variable</p>
</dd>
<dt><a href="#multi">multi(name, memberName, geom, gmlId, params)</a> ⇒ <code>string</code></dt>
<dd><p>A handler to compile geometries to multigeometries</p>
</dd>
<dt><a href="#Point">Point(coords, gmlId, params)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an input geojson Point geometry to gml</p>
</dd>
<dt><a href="#LineString">LineString(coords, gmlId, params)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an input geojson LineString geometry to gml</p>
</dd>
<dt><a href="#LinearRing">LinearRing(coords, gmlId, params)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an input geojson LinearRing member of a polygon geometry to gml</p>
</dd>
<dt><a href="#Polygon">Polygon(coords, gmlId, params)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an input geojson Polygon geometry to gml</p>
</dd>
<dt><a href="#MultiPoint">MultiPoint(coords, gmlId, params)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an input geojson MultiPoint geometry to gml</p>
</dd>
<dt><a href="#MultiLineString">MultiLineString(coords, gmlId, params)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an input geojson MultiLineString geometry to gml</p>
</dd>
<dt><a href="#MultiPolygon">MultiPolygon(coords, gmlId, params)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an input geojson MultiPolygon geometry to gml</p>
</dd>
<dt><a href="#GeometryCollection">GeometryCollection(coords, gmlId, params)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an input geojson GeometryCollection geometry to gml</p>
</dd>
<dt><a href="#geomToGml">geomToGml(geom, gmlId, params, gmlIds)</a> ⇒ <code>string</code></dt>
<dd><p>Translates any geojson geometry into GML 3.2.1</p>
</dd>
</dl>

<a name="converter"></a>

## converter
a namespace to switch between geojson-handling functions by geojson.type

**Kind**: global constant  
<a name="enforceGmlId"></a>

## enforceGmlId()
checks outer scope for gmlId argument/variable

**Kind**: global function  
<a name="multi"></a>

## multi(name, memberName, geom, gmlId, params) ⇒ <code>string</code>
A handler to compile geometries to multigeometries

**Kind**: global function  
**Returns**: <code>string</code> - a string containing gml describing the input multigeometry  
**Throws**:

- <code>Error</code> if a member geometry cannot be converted to gml


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the target multigeometry |
| memberName | <code>string</code> | the gml:tag of each multigeometry member. |
| geom | <code>Array.&lt;Object&gt;</code> \| <code>Array</code> | an array of geojson geometries |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id of the multigeometry |
| params | <code>Object</code> | optional parameters. Omit gmlIds at your own risk, however. |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.gmlIds | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> | an array of number/string gml:ids of the member geometries. |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="Point"></a>

## Point(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson Point geometry to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;number&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="LineString"></a>

## LineString(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson LineString geometry to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="LinearRing"></a>

## LinearRing(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson LinearRing member of a polygon geometry to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="Polygon"></a>

## Polygon(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson Polygon geometry to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="MultiPoint"></a>

## MultiPoint(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiPoint geometry to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="MultiLineString"></a>

## MultiLineString(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiLineString geometry to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="MultiPolygon"></a>

## MultiPolygon(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiPolygon geometry to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="GeometryCollection"></a>

## GeometryCollection(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson GeometryCollection geometry to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Object&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="geomToGml"></a>

## geomToGml(geom, gmlId, params, gmlIds) ⇒ <code>string</code>
Translates any geojson geometry into GML 3.2.1

**Kind**: global function  
**Returns**: <code>string</code> - a valid gml string describing the input geojson geometry  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>Object</code> | a geojson geometry object |
| geom.coordinates | <code>Array</code> \| <code>undefined</code> | the nested array of coordinates forming the geometry |
| geom.geometries | <code>Array.&lt;Object&gt;</code> \| <code>undefined</code> | for a GeometryCollection only, the array of member geometry objects |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id of the geometry |
| params | <code>object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | a string specifying the SRS |
| params.srsDimension | <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |
| gmlIds | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| <code>undefined</code> | an array of number/string gml:ids of the member geometries of a multigeometry. |

