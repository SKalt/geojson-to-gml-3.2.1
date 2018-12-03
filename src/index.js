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
 * Optional parameters for conversion of geojson to gml geometries
 * @typedef {Object} Params
 * @property {?String} params.srsName as string specifying SRS, e.g. 'EPSG:4326'. Only applies to multigeometries.
 * @property {?Number[]|?String[]} params.gmlIds an array of number/string gml:ids of the member geometries.
 * @property {?Number|?String} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 */

/**
 * A handler to compile geometries to multigeometries
 * @function
 * @param {String} name the name of the target multigeometry
 * @param {String} memberName the gml:tag of each multigeometry member.
 * @param {Object[]|Array} geom an array of geojson geometries
 * @param {String|Number} gmlId the gml:id of the multigeometry
 * @param {Params} params optional parameters. Omit gmlIds at your own risk, however.
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
 * @param {Params} params optional parameters
 * @returns {String} a string containing gml representing the input geometry
 */
export function point(coords, gmlId, params={}){
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
 * @param {Params} params optional parameters
 * @returns {String} a string containing gml representing the input geometry
 */
export function lineString(coords, gmlId, params={}){
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
 * @param {Params} params optional parameters
 * @returns {String} a string containing gml representing the input geometry
 */
export function linearRing(coords, gmlId, params={}){
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
 * @param {Params} params optional parameters
 * @returns {String} a string containing gml representing the input geometry
 */
export function polygon(coords, gmlId, params={}){
  // geom.coordinates are arrays of LinearRings
  var {srsName} = params;
  let polygon = `<gml:Polygon${attrs({srsName, 'gml:id':gmlId})}>` +
        '<gml:exterior>' +
        linearRing(coords[0], undefined, params) +
        '</gml:exterior>';
  if (coords.length >= 2){
    for (let ring of coords.slice(1)){
      polygon += '<gml:interior>' +
        linearRing(ring, undefined, params) +
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
 * @param {Params} params optional parameters
 * @returns {String} a string containing gml representing the input geometry
 */
export function multiPoint(coords, gmlId, params={}){
  return multi('MultiPoint', 'pointMembers', point, coords, gmlId, params);
}

/**
 * Converts an input geojson MultiLineString geometry to gml
 * @function
 * @param {Number[][][]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Params} params optional parameters
 * @returns {String} a string containing gml representing the input geometry
 */
export function multiLineString(coords, gmlId, params={}){
  return multi('MultiCurve', 'curveMembers', lineString, coords, gmlId, params);
}
/**
 * Converts an input geojson MultiPolygon geometry to gml
 * @function
 * @param {Number[][][][]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Params} params optional parameters
 * @returns {String} a string containing gml representing the input geometry
 */
export function multiPolygon(coords, gmlId, params={}){
  return multi('MultiSurface', 'surfaceMembers', polygon, coords, gmlId, params);
}

/**
 * A helper to de-camelcase this module's geometry conversion methods
 * @param  {Object} obj a mapping of camelcase geometry types to converter functions
 * @return {Object} a mapping of capitalized geometry types to converter functions
 * @example
 * makeConverter({lineString})
 * // returns {LineString: lineString}
 */
function makeConverter(obj) {
  return Object.entries(obj).map(([type, converter]) => {
    return {[type[0].toUpperCase() + type.slice(1)]: converter};
  }).reduce((a, b) => Object.assign(a, b), {});

}
/**
* A helper to map geometry types to converter functions.
* @function
* @param {Object} obj an object mapping camelcase-d geometry type names to
* converter functions for that type.
* @example
* import {point, lineString} from 'geojson-to-gml-3';
* const geomToGml = makeTranslator({point, lineString});
* geomToGml({type: 'Point', coordinates: [0, 0]});
*/
export function makeTranslator(obj) {
  const converter = makeConverter(obj);
  return function (geom, gmlId, params){
    const warn = () => new Error(`unkown: ${geom.type} ` + [...arguments].join());
    const convert = converter[geom.type] || warn;
    return convert(
      geom.coordinates || geom.geometries,
      gmlId,
      params
    );
  };
}

/**
 * a namespace to switch between geojson-handling functions by geojson.type
 * @const
 * @type {Object}
 */
const allTypes = makeConverter({
  point, lineString, linearRing, polygon, multiPoint, multiLineString,
  multiPolygon
});
/**
 * Converts an input geojson GeometryCollection geometry to gml
 * @function
 * @param {Object[]} coords the coordinates member of the geojson geometry
 * @param {String|Number} gmlId the gml:id
 * @param {Object} params optional parameters
 * @param {?String} params.srsName as string specifying SRS
 * @param {?Number|?String} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @returns {String} a string containing gml representing the input geometry
 */
export function geometryCollection(geoms, gmlId, params={}) {
  return multi(
    'MultiGeometry', 'geometryMembers', allTypes, geoms, gmlId,
    params
  );
}

/**
 * Translates any geojson geometry into GML 3.2.1
 * @public
 * @function
 * @param {Object} geom a geojson geometry object
 * @param {?Array} geom.coordinates the nested array of coordinates forming the geometry
 * @param {?Object[]} geom.geometries for a GeometryCollection only, the array of member geometry objects
 * @param {String|Number} gmlId the gml:id of the geometry
 * @param {object} params optional parameters
 * @param {?String} params.srsName a string specifying the SRS
 * @param {?String} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @param {?Number[]|?String[]} gmlIds  an array of number/string gml:ids of the member geometries of a multigeometry.
 * @returns {String} a valid gml string describing the input geojson geometry
 */
export const geomToGml = makeTranslator(
  Object.assign({geometryCollection}, allTypes)
);
