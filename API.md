<a name="module_geojson-to-gml-3"></a>

## geojson-to-gml-3
A library of functions to convert geojson to GML.


* [geojson-to-gml-3](#module_geojson-to-gml-3)
    * _static_
        * [.config](#module_geojson-to-gml-3.config) : <code>Object</code>
        * [.point(coords, gmlId, params)](#module_geojson-to-gml-3.point) ⇒ <code>String</code>
        * [.lineString(coords, gmlId, params)](#module_geojson-to-gml-3.lineString) ⇒ <code>String</code>
        * [.linearRing(coords, gmlId, params)](#module_geojson-to-gml-3.linearRing) ⇒ <code>String</code>
        * [.polygon(coords, gmlId, params)](#module_geojson-to-gml-3.polygon) ⇒ <code>String</code>
        * [.multiPoint(coords, gmlId, params)](#module_geojson-to-gml-3.multiPoint) ⇒ <code>String</code>
        * [.multiLineString(coords, gmlId, params)](#module_geojson-to-gml-3.multiLineString) ⇒ <code>String</code>
        * [.multiPolygon(coords, gmlId, params)](#module_geojson-to-gml-3.multiPolygon) ⇒ <code>String</code>
        * [.makeTranslator(obj)](#module_geojson-to-gml-3.makeTranslator)
        * [.geometryCollection(coords, gmlId, params)](#module_geojson-to-gml-3.geometryCollection) ⇒ <code>String</code>
        * [.geomToGml(geom, gmlId, params, gmlIds)](#module_geojson-to-gml-3.geomToGml) ⇒ <code>String</code>
    * _inner_
        * [~allTypes](#module_geojson-to-gml-3..allTypes) : <code>Object</code>
        * [~orderCoords(coords)](#module_geojson-to-gml-3..orderCoords) ⇒ <code>Array.&lt;Number&gt;</code>
        * [~multi(name, memberName, geom, gmlId, params)](#module_geojson-to-gml-3..multi) ⇒ <code>String</code>
        * [~makeConverter(obj)](#module_geojson-to-gml-3..makeConverter) ⇒ <code>Object</code>
        * [~Params](#module_geojson-to-gml-3..Params) : <code>Object</code>

<a name="module_geojson-to-gml-3.config"></a>

### geojson-to-gml-3.config : <code>Object</code>
Configuration for this module.

**Kind**: static constant of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
<a name="module_geojson-to-gml-3.point"></a>

### geojson-to-gml-3.point(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson Point geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Number&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Params</code> | optional parameters |

<a name="module_geojson-to-gml-3.lineString"></a>

### geojson-to-gml-3.lineString(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson LineString geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Params</code> | optional parameters |

<a name="module_geojson-to-gml-3.linearRing"></a>

### geojson-to-gml-3.linearRing(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson LinearRing member of a polygon geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Params</code> | optional parameters |

<a name="module_geojson-to-gml-3.polygon"></a>

### geojson-to-gml-3.polygon(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson Polygon geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Params</code> | optional parameters |

<a name="module_geojson-to-gml-3.multiPoint"></a>

### geojson-to-gml-3.multiPoint(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson MultiPoint geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Params</code> | optional parameters |

<a name="module_geojson-to-gml-3.multiLineString"></a>

### geojson-to-gml-3.multiLineString(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson MultiLineString geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Params</code> | optional parameters |

<a name="module_geojson-to-gml-3.multiPolygon"></a>

### geojson-to-gml-3.multiPolygon(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson MultiPolygon geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Array.&lt;Number&gt;&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Params</code> | optional parameters |

<a name="module_geojson-to-gml-3.makeTranslator"></a>

### geojson-to-gml-3.makeTranslator(obj)
A helper to map geometry types to converter functions.

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | an object mapping camelcase-d geometry type names to converter functions for that type. |

**Example**  
```js
import {point, lineString} from 'geojson-to-gml-3';
const geomToGml = makeTranslator({point, lineString});
geomToGml({type: 'Point', coordinates: [0, 0]});
```
<a name="module_geojson-to-gml-3.geometryCollection"></a>

### geojson-to-gml-3.geometryCollection(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson GeometryCollection geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Object&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>String</code> | as string specifying SRS |
| params.srsDimension | <code>Number</code> \| <code>String</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="module_geojson-to-gml-3.geomToGml"></a>

### geojson-to-gml-3.geomToGml(geom, gmlId, params, gmlIds) ⇒ <code>String</code>
Translates any geojson geometry into GML 3.2.1

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a valid gml string describing the input geojson geometry  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>Object</code> | a geojson geometry object |
| geom.coordinates | <code>Array</code> | the nested array of coordinates forming the geometry |
| geom.geometries | <code>Array.&lt;Object&gt;</code> | for a GeometryCollection only, the array of member geometry objects |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id of the geometry |
| params | <code>object</code> | optional parameters |
| params.srsName | <code>String</code> | a string specifying the SRS |
| params.srsDimension | <code>String</code> | the dimensionality of each coordinate, i.e. 2 or 3. |
| gmlIds | <code>?Array.&lt;Number&gt;</code> \| <code>?Array.&lt;String&gt;</code> | an array of number/string gml:ids of the member geometries of a multigeometry. |

<a name="module_geojson-to-gml-3..allTypes"></a>

### geojson-to-gml-3~allTypes : <code>Object</code>
a namespace to switch between geojson-handling functions by geojson.type

**Kind**: inner constant of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
<a name="module_geojson-to-gml-3..orderCoords"></a>

### geojson-to-gml-3~orderCoords(coords) ⇒ <code>Array.&lt;Number&gt;</code>
reorder coordinates to lat, lng iff config.coordinateOrder is false.

**Kind**: inner method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>Array.&lt;Number&gt;</code> - An array of coordinates in the correct order.  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Number&gt;</code> | An array of coordinates,  [lng, lat, ...etc] |

<a name="module_geojson-to-gml-3..multi"></a>

### geojson-to-gml-3~multi(name, memberName, geom, gmlId, params) ⇒ <code>String</code>
A handler to compile geometries to multigeometries

**Kind**: inner method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml describing the input multigeometry  
**Throws**:

- <code>Error</code> if a member geometry cannot be converted to gml


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name of the target multigeometry |
| memberName | <code>String</code> | the gml:tag of each multigeometry member. |
| geom | <code>Array.&lt;Object&gt;</code> \| <code>Array</code> | an array of geojson geometries |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id of the multigeometry |
| params | <code>Params</code> | optional parameters. Omit gmlIds at your own risk, however. |

<a name="module_geojson-to-gml-3..makeConverter"></a>

### geojson-to-gml-3~makeConverter(obj) ⇒ <code>Object</code>
A helper to de-camelcase this module's geometry conversion methods

**Kind**: inner method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>Object</code> - a mapping of capitalized geometry types to converter functions  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | a mapping of camelcase geometry types to converter functions |

**Example**  
```js
makeConverter({lineString})
// returns {LineString: lineString}
```
<a name="module_geojson-to-gml-3..Params"></a>

### geojson-to-gml-3~Params : <code>Object</code>
Optional parameters for conversion of geojson to gml geometries

**Kind**: inner typedef of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| params.srsName | <code>String</code> | as string specifying SRS, e.g. 'EPSG:4326'. Only applies to multigeometries. |
| params.gmlIds | <code>?Array.&lt;Number&gt;</code> \| <code>?Array.&lt;String&gt;</code> | an array of number/string gml:ids of the member geometries. |
| params.srsDimension | <code>Number</code> \| <code>String</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

