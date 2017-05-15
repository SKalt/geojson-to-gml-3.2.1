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
<dt><a href="#geomToGml">geomToGml(geom, gmlId, params, gmlIds)</a> ⇒ <code>string</code></dt>
<dd><p>Translates any geojson geometry into GML 3.2.1</p>
</dd>
</dl>

<a name="converter"></a>

## converter
a namespace to switch between geojson-handling functions by geojson.type

**Kind**: global constant  

* [converter](#converter)
    * [~_multi(name, memberName, geom, gmlId, params)](#converter.._multi) ⇒ <code>string</code>
    * [~Point(coords, gmlId, params)](#converter..Point) ⇒ <code>string</code>
    * [~LineString(coords, gmlId, params)](#converter..LineString) ⇒ <code>string</code>
    * [~LinearRing(coords, gmlId, params)](#converter..LinearRing) ⇒ <code>string</code>
    * [~Polygon(coords, gmlId, params)](#converter..Polygon) ⇒ <code>string</code>
    * [~MultiPoint(coords, gmlId, params)](#converter..MultiPoint) ⇒ <code>string</code>
    * [~MultiLineString(coords, gmlId, params)](#converter..MultiLineString) ⇒ <code>string</code>
    * [~MultiPolygon(coords, gmlId, params)](#converter..MultiPolygon) ⇒ <code>string</code>
    * [~GeometryCollection(coords, gmlId, params)](#converter..GeometryCollection) ⇒ <code>string</code>

<a name="converter.._multi"></a>

### converter~_multi(name, memberName, geom, gmlId, params) ⇒ <code>string</code>
A handler to compile geometries to multigeometries

**Kind**: inner method of [<code>converter</code>](#converter)  
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

<a name="converter..Point"></a>

### converter~Point(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson Point geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;number&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..LineString"></a>

### converter~LineString(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson LineString geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..LinearRing"></a>

### converter~LinearRing(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson LinearRing member of a polygon geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..Polygon"></a>

### converter~Polygon(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson Polygon geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..MultiPoint"></a>

### converter~MultiPoint(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiPoint geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..MultiLineString"></a>

### converter~MultiLineString(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiLineString geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..MultiPolygon"></a>

### converter~MultiPolygon(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiPolygon geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..GeometryCollection"></a>

### converter~GeometryCollection(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson GeometryCollection geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Object&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="enforceGmlId"></a>

## enforceGmlId()
checks outer scope for gmlId argument/variable

**Kind**: global function  
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

