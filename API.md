<a name="module_geojson-to-gml-3"></a>

## geojson-to-gml-3
A library of functions to convert geojson to GML.


* [geojson-to-gml-3](#module_geojson-to-gml-3)
    * _static_
        * [.config](#module_geojson-to-gml-3.config) : <code>Object</code>
        * [.Point(coords, gmlId, params)](#module_geojson-to-gml-3.Point) ⇒ <code>String</code>
        * [.LineString(coords, gmlId, params)](#module_geojson-to-gml-3.LineString) ⇒ <code>String</code>
        * [.LinearRing(coords, gmlId, params)](#module_geojson-to-gml-3.LinearRing) ⇒ <code>String</code>
        * [.Polygon(coords, gmlId, params)](#module_geojson-to-gml-3.Polygon) ⇒ <code>String</code>
        * [.MultiPoint(coords, gmlId, params)](#module_geojson-to-gml-3.MultiPoint) ⇒ <code>String</code>
        * [.MultiLineString(coords, gmlId, params)](#module_geojson-to-gml-3.MultiLineString) ⇒ <code>String</code>
        * [.MultiPolygon(coords, gmlId, params)](#module_geojson-to-gml-3.MultiPolygon) ⇒ <code>String</code>
        * [.GeometryCollection(coords, gmlId, params)](#module_geojson-to-gml-3.GeometryCollection) ⇒ <code>String</code>
        * [.geomToGml(geom, gmlId, params, gmlIds)](#module_geojson-to-gml-3.geomToGml) ⇒ <code>String</code>
    * _inner_
        * [~converter](#module_geojson-to-gml-3..converter) : <code>Object</code>
        * [~orderCoords(coords)](#module_geojson-to-gml-3..orderCoords) ⇒ <code>Array.&lt;Number&gt;</code>
        * [~multi(name, memberName, geom, gmlId, params)](#module_geojson-to-gml-3..multi) ⇒ <code>String</code>

<a name="module_geojson-to-gml-3.config"></a>

### geojson-to-gml-3.config : <code>Object</code>
Configuration for this module.

**Kind**: static constant of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
<a name="module_geojson-to-gml-3.Point"></a>

### geojson-to-gml-3.Point(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson Point geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Number&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>String</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>Number</code> \| <code>String</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="module_geojson-to-gml-3.LineString"></a>

### geojson-to-gml-3.LineString(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson LineString geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>String</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>Number</code> \| <code>String</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="module_geojson-to-gml-3.LinearRing"></a>

### geojson-to-gml-3.LinearRing(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson LinearRing member of a polygon geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>String</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>Number</code> \| <code>String</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="module_geojson-to-gml-3.Polygon"></a>

### geojson-to-gml-3.Polygon(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson Polygon geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>String</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>Number</code> \| <code>String</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="module_geojson-to-gml-3.MultiPoint"></a>

### geojson-to-gml-3.MultiPoint(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson MultiPoint geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>String</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>Number</code> \| <code>String</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="module_geojson-to-gml-3.MultiLineString"></a>

### geojson-to-gml-3.MultiLineString(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson MultiLineString geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>String</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>Number</code> \| <code>String</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="module_geojson-to-gml-3.MultiPolygon"></a>

### geojson-to-gml-3.MultiPolygon(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson MultiPolygon geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Array.&lt;Number&gt;&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>String</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>Number</code> \| <code>String</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="module_geojson-to-gml-3.GeometryCollection"></a>

### geojson-to-gml-3.GeometryCollection(coords, gmlId, params) ⇒ <code>String</code>
Converts an input geojson GeometryCollection geometry to gml

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Object&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>String</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>Number</code> \| <code>String</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="module_geojson-to-gml-3.geomToGml"></a>

### geojson-to-gml-3.geomToGml(geom, gmlId, params, gmlIds) ⇒ <code>String</code>
Translates any geojson geometry into GML 3.2.1

**Kind**: static method of [<code>geojson-to-gml-3</code>](#module_geojson-to-gml-3)  
**Returns**: <code>String</code> - a valid gml string describing the input geojson geometry  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>Object</code> | a geojson geometry object |
| geom.coordinates | <code>Array</code> \| <code>undefined</code> | the nested array of coordinates forming the geometry |
| geom.geometries | <code>Array.&lt;Object&gt;</code> \| <code>undefined</code> | for a GeometryCollection only, the array of member geometry objects |
| gmlId | <code>String</code> \| <code>Number</code> | the gml:id of the geometry |
| params | <code>object</code> | optional parameters |
| params.srsName | <code>String</code> \| <code>undefined</code> | a string specifying the SRS |
| params.srsDimension | <code>String</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |
| gmlIds | <code>Array.&lt;Number&gt;</code> \| <code>Array.&lt;String&gt;</code> \| <code>undefined</code> | an array of number/string gml:ids of the member geometries of a multigeometry. |

<a name="module_geojson-to-gml-3..converter"></a>

### geojson-to-gml-3~converter : <code>Object</code>
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
| params | <code>Object</code> | optional parameters. Omit gmlIds at your own risk, however. |
| params.srsName | <code>String</code> \| <code>undefined</code> | as string specifying SRS |
| params.gmlIds | <code>Array.&lt;Number&gt;</code> \| <code>Array.&lt;String&gt;</code> | an array of number/string gml:ids of the member geometries. |
| params.srsDimension | <code>Number</code> \| <code>String</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

