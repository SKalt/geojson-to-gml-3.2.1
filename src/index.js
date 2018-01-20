/* eslint-disable no-console */
/**
 * A library of functions to convert geojson to GML.
 * @module geojson-to-gml-3
 */
/*
 Note this can only convert what geojson can store: simple feature types, not
 coverage, topology, etc.
 */
/**
 * Configuration for this module.
 * @type {Object}
 */
export const config = {
  /**
   * geojson coordinates are in longitude/easting, latitude/northing [,elevation]
   * order by [RFC-7946 § 3.1.1]{@link https://tools.ietf.org/html/rfc7946#section-3.1.1}.
   * however, you may use a CRS that follows a latitude/easting,
   * longitude/northing, [,elevation, [...etc]] order.
   * @type {Boolean}
   */
  coordinateOrder: true,
};

/**
 * reorder coordinates to lat, lng iff config.coordinateOrder is false.
 * @param  {Number[]} coords An array of coordinates,  [lng, lat, ...etc]
 * @return {Number[]} An array of coordinates in the correct order.
 */
function orderCoords(coords){
  if (config.coordinateOrder){
    return coords;
  }
  if (coords[2]){
    return [coords[1], coords[0], coords[2]];
  }
  return coords.reverse();
}



/** @private*/
function attrs(attrMappings){
  // return Object.entries()
  let results = '';
  for (let attrName in attrMappings){
    let value = attrMappings[attrName];
    results += (value ? ` ${attrName}="${value}"` : '');
  }
  return results;
}


/**
 * A handler to compile geometries to multigeometries
 * @function
 * @param {String} name the name of the target multigeometry
 * @param {String} memberName the gml:tag of each multigeometry member.
 * @param {Object[]|Array} geom an array of geojson geometries
 * @param {String|Number} gmlId the gml:id of the multigeometry
 * @param {Object} params optional parameters. Omit gmlIds at your own risk, however.
 * @param {String|undefined} params.srsName as string specifying SRS
 * @param {Number[]|String[]} params.gmlIds an array of number/string gml:ids of the member geometries.
 * @param {Number|String|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns {String} a string containing gml describing the input multigeometry
 * @throws {Error} if a member geometry cannot be converted to gml
 */
function multi(name, memberName, membercb, geom, gmlId, params={}){
  var {srsName, gmlIds} = params;
  let multi = `<gml:${name}${attrs({srsName, 'gml:id':gmlId})}>`;
  multi += `<gml:${memberName}>`;
  geom.forEach(function(member, i){
    let _gmlId = member.id || (gmlIds || [])[i] || '';
    if (name == 'MultiGeometry'){
      let memberType = member.type;
      member = member.coordinates;
      multi += membercb[memberType](member, _gmlId, params);
    } else {
      multi += membercb(member, _gmlId, params);
    }
  });
  multi += `</gml:${memberName}>`;
  return multi + `</gml:${name}>`;
}
/**
 * Converts an input geojson Point geometry to gml
 * @function
 * @param {Number[]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Object} params optional parameters
 * @param {String|undefined} params.srsName as string specifying SRS
 * @param {Number|String|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns {String} a string containing gml representing the input geometry
 */
export function Point(coords, gmlId, params={}){
  var {srsName:srsName, srsDimension:srsDimension} = params;
  return `<gml:Point${attrs({srsName:srsName, 'gml:id': gmlId})}>` +
    `<gml:pos${attrs({srsDimension})}>` +
    orderCoords(coords).join(' ') +
    '</gml:pos>' +
    '</gml:Point>';
}
/**
 * Converts an input geojson LineString geometry to gml
 * @function
 * @param {Number[][]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Object} params optional parameters
 * @param {String|undefined} params.srsName as string specifying SRS
 * @param {Number|String|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns {String} a string containing gml representing the input geometry
 */
export function LineString(coords, gmlId, params={}){
  var {srsName:srsName, srsDimension:srsDimension} = params;
  return `<gml:LineString${attrs({srsName, 'gml:id':gmlId})}>` +
    `<gml:posList${attrs({srsDimension})}>` +
    coords.map((e)=>orderCoords(e).join(' ')).join(' ') +
    '</gml:posList>' +
    '</gml:LineString>';
}
/**
 * Converts an input geojson LinearRing member of a polygon geometry to gml
 * @function
 * @param {Number[][]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Object} params optional parameters
 * @param {String|undefined} params.srsName as string specifying SRS
 * @param {Number|String|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns {String} a string containing gml representing the input geometry
 */
export function LinearRing(coords, gmlId, params={}){
  var {srsName:srsName, srsDimension:srsDimension} = params;
  return `<gml:LinearRing${attrs({'gml:id':gmlId, srsName})}>` +
    `<gml:posList${attrs({srsDimension})}>` +
    coords.map((e)=>orderCoords(e).join(' ')).join(' ') +
    '</gml:posList>' +
    '</gml:LinearRing>';
}
/**
 * Converts an input geojson Polygon geometry to gml
 * @function
 * @param {Number[][][]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Object} params optional parameters
 * @param {String|undefined} params.srsName as string specifying SRS
 * @param {Number|String|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns {String} a string containing gml representing the input geometry
 */
export function Polygon(coords, gmlId, params={}){
  // geom.coordinates are arrays of LinearRings
  var {srsName} = params;
  let polygon = `<gml:Polygon${attrs({srsName, 'gml:id':gmlId})}>` +
        '<gml:exterior>' +
        LinearRing(coords[0]) +
        '</gml:exterior>';
  if (coords.length >= 2){
    for (let linearRing of coords.slice(1)){
      polygon += '<gml:interior>' +
        LinearRing(linearRing) +
        '</gml:interior>';
    }
  }
  polygon += '</gml:Polygon>';
  return polygon;
}
/**
 * Converts an input geojson MultiPoint geometry to gml
 * @function
 * @param {Number[][]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Object} params optional parameters
 * @param {String|undefined} params.srsName as string specifying SRS
 * @param {Number|String|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns {String} a string containing gml representing the input geometry
 */
export function MultiPoint(coords, gmlId, params={}){
  return multi('MultiPoint', 'pointMembers', Point, coords, gmlId, params);
}

/**
 * Converts an input geojson MultiLineString geometry to gml
 * @function
 * @param {Number[][][]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Object} params optional parameters
 * @param {String|undefined} params.srsName as string specifying SRS
 * @param {Number|String|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns {String} a string containing gml representing the input geometry
 */
export function MultiLineString(coords, gmlId, params={}){
  return multi('MultiCurve', 'curveMembers', LineString, coords, gmlId, params);
}
/**
 * Converts an input geojson MultiPolygon geometry to gml
 * @function
 * @param {Number[][][][]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Object} params optional parameters
 * @param {String|undefined} params.srsName as string specifying SRS
 * @param {Number|String|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns {String} a string containing gml representing the input geometry
 */
export function MultiPolygon(coords, gmlId, params={}){
  return multi('MultiSurface', 'surfaceMembers', Polygon, coords, gmlId, params);
}
/**
 * a namespace to switch between geojson-handling functions by geojson.type
 * @const
 * @type {Object}
 */
const converter = {
  Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString,
  MultiPolygon, GeometryCollection
};
/**
 * Converts an input geojson GeometryCollection geometry to gml
 * @function
 * @param {Object[]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Object} params optional parameters
 * @param {String|undefined} params.srsName as string specifying SRS
 * @param {Number|String|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns {String} a string containing gml representing the input geometry
 */
export function GeometryCollection(geoms, gmlId, params={}){
  return multi(
    'MultiGeometry', 'geometryMembers', converter, geoms, gmlId, params
  );
}

/**
 * Translates any geojson geometry into GML 3.2.1
 * @public
 * @function
 * @param {Object} geom a geojson geometry object
 * @param {Array|undefined} geom.coordinates the nested array of coordinates forming the geometry
 * @param {Object[]|undefined} geom.geometries for a GeometryCollection only, the array of member geometry objects
 * @param {String|Number} gmlId the gml:id of the geometry
 * @param {object} params optional parameters
 * @param {String|undefined} params.srsName a string specifying the SRS
 * @param {String|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @param {Number[]|String[]|undefined} gmlIds  an array of number/string gml:ids of the member geometries of a multigeometry.
 * @returns {String} a valid gml string describing the input geojson geometry
 */
export function geomToGml(geom, gmlId, params){
  const warn = () => new Error(`unkown: ${geom.type} ` + [...arguments].join());
  const convert = converter[geom.type] || warn;
  return convert(
    geom.coordinates || geom.geometries,
    gmlId,
    params
  );
}
