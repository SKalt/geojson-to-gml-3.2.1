
/* 
Note this can only convert what geojson can store: simple feature types and
 not coverage, topology, etc.
 */
/** @private*/
function attrs(attrMappings){
    let results = '';
    for (let attrName in attrMappings){
	let value = attrMappings[attrName];
	results += (value ? ` ${attrName}="${value}"` : '');
    }
    return results;
}

/**
 * checks outer scope for gmlId argument/variable
 * @function 
 */
function enforceGmlId(){
    if (!gmlId){
	console.warn('No gmlId supplied');
    }
};

/** @const 
 * @desc a namespace to switch between geojson-handling functions by geojson.type
 */
var converter = {
    /**
     * A handler to compile geometries to multigeometries
     * @method 
     * @memeberof converter~
     * @param {string} name the name of the target multigeometry
     * @param {string} memberName the gml:tag of each multigeometry member.
     * @param {Object[]|Array} geom an array of geojson geometries
     * @param {string|number} gmlId the gml:id of the multigeometry
     * @param {Object} params optional parameters. Omit gmlIds at your own risk, however.
     * @param {string|undefined} params.srsName as string specifying SRS
     * @param {number[]|string[]} params.gmlIds an array of number/string gml:ids of the member geometries.
     * @param {number|string|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
     * @returns {string} a string containing gml describing the input multigeometry
     * @throws {Error} if a member geometry cannot be converted to gml
     */
    '_multi': function(name, memberName, geom, gmlId, params={}){
	var {srsName:srsName, srsDimension:srsDimension, gmlIds:gmlIds} = params;
	let multi = `<gml:${name}${attrs({srsName, 'gml:id':gmlId})}>`;
	for (var i = 0; i < geom.length; i ++){
	    var member = geom[i];
	    var memberType, _gmlId;
	    if (name == 'MultiGeometry'){
		_gmlId = member.id || (gmlIds || [])[i] || '';
		memberType = member.type;
		member = member.coordinates;
	    } else {
		_gmlId = (gmlIds || [])[i] || '';
		memberType = {'MultiPoint':'Point',
			      'MultiCurve':'LineString',
			      'MultiSurface':'Polygon'}[name];
	    }
	    if (!this[memberType]){throw new Error(`memberType:${memberType}`);}
	    multi += `<gml:${memberName}>` +
		this[memberType](member, _gmlId, params) +
		     `</gml:${memberName}>`;
	}
	multi += `</gml:${name}>`;
	return multi;
    },
    /**
     * Converts an input geojson Point geometry to gml
     * @method 
     * @memberof converter~
     * @param {number[]} coords the coordinates member of the geojson geometry
     * @param {string|number} gmlId the gml:id
     * @param {Object} params optional parameters
     * @param {string|undefined} params.srsName as string specifying SRS
     * @param {number|string|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
     * @returns {string} a string containing gml representing the input geometry
     */
    'Point': function(coords, gmlId, params={}){
	var {srsName:srsName, srsDimension:srsDimension} = params;
	return `<gml:Point${attrs({srsName:srsName, 'gml:id': gmlId})}>` +
	         `<gml:pos${attrs({srsDimension})}>` +
	            coords.reverse().join(' ') +
	          '</gml:pos>' +
	        '</gml:Point>';
    },
    /**
     * Converts an input geojson LineString geometry to gml
     * @method 
     * @memberof converter~
     * @param {number[][]} coords the coordinates member of the geojson geometry
     * @param {string|number} gmlId the gml:id
     * @param {Object} params optional parameters
     * @param {string|undefined} params.srsName as string specifying SRS
     * @param {number|string|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
     * @returns {string} a string containing gml representing the input geometry
     */
    'LineString': function(coords, gmlId, params={}){
	var {srsName:srsName, srsDimension:srsDimension} = params;
	return `<gml:LineString${attrs({srsName, 'gml:id':gmlId})}>` +
	    `<gml:posList${attrs({srsDimension})}>` +
	            coords.map((e)=>e.reverse().join(' ')).join(' ') + 
	          '</gml:posList>' +
	       '</gml:LineString>';
    },
    /**
     * Converts an input geojson LinearRing member of a polygon geometry to gml
     * @method 
     * @memberof converter~
     * @param {number[][]} coords the coordinates member of the geojson geometry
     * @param {string|number} gmlId the gml:id
     * @param {Object} params optional parameters
     * @param {string|undefined} params.srsName as string specifying SRS
     * @param {number|string|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
     * @returns {string} a string containing gml representing the input geometry
     */
    'LinearRing': function(coords, gmlId, params={}){
	var {srsName:srsName, srsDimension:srsDimension} = params;
	return `<gml:LinearRing${attrs({'gml:id':gmlId, srsName})}>` +
	          `<gml:posList${attrs({srsDimension})}>` +
	            coords.map((e)=>e.reverse().join(' ')).join(' ') + 
	          '</gml:posList>' + 
	       '</gml:LinearRing>';
    },
    /**
     * Converts an input geojson Polygon geometry to gml
     * @method 
     * @memberof converter~
     * @param {number[][][]} coords the coordinates member of the geojson geometry
     * @param {string|number} gmlId the gml:id
     * @param {Object} params optional parameters
     * @param {string|undefined} params.srsName as string specifying SRS
     * @param {number|string|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
     * @returns {string} a string containing gml representing the input geometry
     */
    'Polygon': function(coords, gmlId, params={}){
	// geom.coordinates are arrays of LinearRings
	var {srsName:srsName, srsDimension:srsDimension} = params;
	let polygon = `<gml:Polygon${attrs({srsName, 'gml:id':gmlId})}>` +
		       '<gml:exterior>' +
		          this.LinearRing(coords[0]) +
	               '</gml:exterior>';
	if (coords.length >= 2){
	    for (let linearRing of coords.slice(1)){
		polygon += '<gml:interior>' +
		             this.LinearRing(linearRing) + 
		           '</gml:interior>';
	    }
	}
	polygon += '</gml:Polygon>';
	return polygon;
    },
    /**
     * Converts an input geojson MultiPoint geometry to gml
     * @method 
     * @memberof converter~
     * @param {number[][]} coords the coordinates member of the geojson geometry
     * @param {string|number} gmlId the gml:id
     * @param {Object} params optional parameters
     * @param {string|undefined} params.srsName as string specifying SRS
     * @param {number|string|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
     * @returns {string} a string containing gml representing the input geometry
     */
    'MultiPoint': function(coords, gmlId, params={}){
	return this._multi('MultiPoint', 'pointMember', coords, gmlId, params);
    },
    /**
     * Converts an input geojson MultiLineString geometry to gml
     * @method 
     * @memberof converter~
     * @param {number[][][]} coords the coordinates member of the geojson geometry
     * @param {string|number} gmlId the gml:id
     * @param {Object} params optional parameters
     * @param {string|undefined} params.srsName as string specifying SRS
     * @param {number|string|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
     * @returns {string} a string containing gml representing the input geometry
     */
    'MultiLineString': function(coords, gmlId, params={}){
	return this._multi('MultiCurve', 'curveMember', coords, gmlId, params);
    },
    /**
     * Converts an input geojson MultiPolygon geometry to gml
     * @method 
     * @memberof converter~
     * @param {number[][][][]} coords the coordinates member of the geojson geometry
     * @param {string|number} gmlId the gml:id
     * @param {Object} params optional parameters
     * @param {string|undefined} params.srsName as string specifying SRS
     * @param {number|string|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
     * @returns {string} a string containing gml representing the input geometry
     */
    'MultiPolygon': function(coords, gmlId, params={}){
	return this._multi('MultiSurface', 'surfaceMember',
			   coords, gmlId, params);
    },
    /**
     * Converts an input geojson GeometryCollection geometry to gml
     * @method 
     * @memberof converter~
     * @param {Object[]} coords the coordinates member of the geojson geometry
     * @param {string|number} gmlId the gml:id
     * @param {Object} params optional parameters
     * @param {string|undefined} params.srsName as string specifying SRS
     * @param {number|string|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
     * @returns {string} a string containing gml representing the input geometry
     */
    'GeometryCollection': function(geoms, gmlId, params={}){
	return this._multi('MultiGeometry', 'geometryMember',
			   geoms, gmlId, params);
    }
};

/**
 * Translates any geojson geometry into GML 3.2.1
 * @public 
 * @function 
 * @param {Object} geom a geojson geometry object
 * @param {Array|undefined} geom.coordinates the nested array of coordinates forming the geometry
 * @param {Object[]|undefined} geom.geometries for a GeometryCollection only, the array of member geometry objects
 * @param {string|number} gmlId the gml:id of the geometry
 * @param {object} params optional parameters
 * @param {string|undefined} params.srsName a string specifying the SRS
 * @param {string|undefined} params.srsDimension the dimensionality of each coordinate, i.e. 2 or 3.
 * @param {number[]|string[]|undefined} gmlIds  an array of number/string gml:ids of the member geometries of a multigeometry.
 * @returns {string} a valid gml string describing the input geojson geometry
 */
function geomToGml(geom, gmlId, params){
    return converter[geom.type](
	geom.coordinates || geom.geometries,
	gmlId,
	params
    ); 
}
exports.geomToGml = geomToGml;
