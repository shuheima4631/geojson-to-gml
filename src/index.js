//////////////////////////////////////////////////////////////////////////////////////////////////////
/*
https://github.com/shuheima4631/geojson-to-gml/
GNU General Public License v3.0
https://github.com/shuheima4631/geojson-to-gml/blob/master/LICENCE
start geojson-to-gml-3.2.1 module
 */

/**
 * geojsonからgmlを作成(前処理)
 * @param {object} feature
 * @returns {string} gml
 */
var makegml = function ( feature )
{
    var gml = '';
    if ( feature.geometry && feature.geometry.type ) {
        var geomToGml = makegml.prototype.require( 'geojson2gml3' ).geomToGml;// geojson2gml3 module
        var G = JSON.parse( JSON.stringify( feature.geometry ) );// オブジェクトをコピー(パラメータをいじるので)
        G.params = {};
        G.params.srsName = 'http://www.opengis.net/gml/srs/epsg.xml#4612';
        G.params.srsDimension = '2';
        gml = geomToGml( G );
    }
    return gml;
};

makegml.prototype.require = ( function () { function r ( e, n, t ) { function o ( i, f ) { if ( !n[ i ] ) { if ( !e[ i ] ) { var c = "function" == typeof require && require; if ( !f && c ) return c( i, !0 ); if ( u ) return u( i, !0 ); var a = new Error( "Cannot find module '" + i + "'" ); throw a.code = "MODULE_NOT_FOUND", a; } var p = n[ i ] = { exports: {} }; e[ i ][ 0 ].call( p.exports, function ( r ) { var n = e[ i ][ 1 ][ r ]; return o( n || r ); }, p, p.exports, r, e, n, t ); } return n[ i ].exports; } for ( var u = "function" == typeof require && require, i = 0; i < t.length; i++ )o( t[ i ] ); return o; } return r; } )()( {
    "geojson2gml3": [ function ( require, module, exports )
    {
        Object.defineProperty( exports, "__esModule", {
            value: true
        } );
        exports.point = point;
        exports.lineString = lineString;
        exports.linearRing = linearRing;
        exports.polygon = polygon;
        exports.multiPoint = multiPoint;
        exports.multiLineString = multiLineString;
        exports.multiPolygon = multiPolygon;
        exports.makeTranslator = makeTranslator;
        exports.geometryCollection = geometryCollection;
        exports.geomToGml = exports.config = void 0;
        function _toConsumableArray ( arr ) { return _arrayWithoutHoles( arr ) || _iterableToArray( arr ) || _unsupportedIterableToArray( arr ) || _nonIterableSpread(); }
        function _nonIterableSpread () { throw new TypeError( "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method." ); }
        function _iterableToArray ( iter ) { if ( typeof Symbol !== "undefined" && iter[ Symbol.iterator ] != null || iter[ "@@iterator" ] != null ) return Array.from( iter ); }
        function _arrayWithoutHoles ( arr ) { if ( Array.isArray( arr ) ) return _arrayLikeToArray( arr ); }
        function _defineProperty ( obj, key, value ) { if ( key in obj ) { Object.defineProperty( obj, key, { value: value, enumerable: true, configurable: true, writable: true } ); } else { obj[ key ] = value; } return obj; }
        function _slicedToArray ( arr, i ) { return _arrayWithHoles( arr ) || _iterableToArrayLimit( arr, i ) || _unsupportedIterableToArray( arr, i ) || _nonIterableRest(); }
        function _nonIterableRest () { throw new TypeError( "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method." ); }
        function _iterableToArrayLimit ( arr, i ) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[ Symbol.iterator ] || arr[ "@@iterator" ]; if ( _i == null ) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for ( _i = _i.call( arr ); !( _n = ( _s = _i.next() ).done ); _n = true ) { _arr.push( _s.value ); if ( i && _arr.length === i ) break; } } catch ( err ) { _d = true; _e = err; } finally { try { if ( !_n && _i[ "return" ] != null ) _i[ "return" ](); } finally { if ( _d ) throw _e; } } return _arr; }
        function _arrayWithHoles ( arr ) { if ( Array.isArray( arr ) ) return arr; }
        function _createForOfIteratorHelper ( o, allowArrayLike ) { var it = typeof Symbol !== "undefined" && o[ Symbol.iterator ] || o[ "@@iterator" ]; if ( !it ) { if ( Array.isArray( o ) || ( it = _unsupportedIterableToArray( o ) ) || allowArrayLike && o && typeof o.length === "number" ) { if ( it ) o = it; var i = 0; var F = function F () { }; return { s: F, n: function n () { if ( i >= o.length ) return { done: true }; return { done: false, value: o[ i++ ] }; }, e: function e ( _e2 ) { throw _e2; }, f: F }; } throw new TypeError( "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method." ); } var normalCompletion = true, didErr = false, err; return { s: function s () { it = it.call( o ); }, n: function n () { var step = it.next(); normalCompletion = step.done; return step; }, e: function e ( _e3 ) { didErr = true; err = _e3; }, f: function f () { try { if ( !normalCompletion && it.return != null ) it.return(); } finally { if ( didErr ) throw err; } } }; }
        function _unsupportedIterableToArray ( o, minLen ) { if ( !o ) return; if ( typeof o === "string" ) return _arrayLikeToArray( o, minLen ); var n = Object.prototype.toString.call( o ).slice( 8, -1 ); if ( n === "Object" && o.constructor ) n = o.constructor.name; if ( n === "Map" || n === "Set" ) return Array.from( o ); if ( n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ) return _arrayLikeToArray( o, minLen ); }
        function _arrayLikeToArray ( arr, len ) { if ( len == null || len > arr.length ) len = arr.length; for ( var i = 0, arr2 = new Array( len ); i < len; i++ ) { arr2[ i ] = arr[ i ]; } return arr2; }
        var config = {
            coordinateOrder: true
        };
        exports.config = config;
        function orderCoords ( coords )
        {
            if ( config.coordinateOrder ) {
                return coords;
            }

            if ( coords[ 2 ] ) {
                return [ coords[ 1 ], coords[ 0 ], coords[ 2 ] ];
            }

            return coords.reverse();
        }
        function attrs ( attrMappings )
        {
            var results = '';

            for ( var attrName in attrMappings ) {
                var value = attrMappings[ attrName ];
                results += value ? " ".concat( attrName, "=\"" ).concat( value, "\"" ) : '';
            }

            return results;
        }
        function multi ( name, memberName, membercb, geom, gmlId, params )
        {
            var params = arguments.length > 5 && arguments[ 5 ] !== undefined ? arguments[ 5 ] : {};
            var srsName = params.srsName,
                gmlIds = params.gmlIds;
            var multi = "<gml:".concat( name ).concat( attrs( {
                srsName: srsName,
                'gml:id': gmlId
            } ), ">" );
            multi += "<gml:".concat( memberName, ">" );
            geom.forEach( function ( member, i )
            {
                var _gmlId = member.id || ( gmlIds || [] )[ i ] || '';

                if ( name == 'MultiGeometry' ) {
                    var memberType = member.type;
                    member = member.coordinates;
                    multi += membercb[ memberType ]( member, _gmlId, undefined );
                } else {
                    multi += membercb( member, _gmlId, undefined );
                }
            } );
            multi += "</gml:".concat( memberName, ">" );
            return multi + "</gml:".concat( name, ">" );
        }
        function point ( coords, gmlId, params )
        {
            var params = arguments.length > 2 && arguments[ 2 ] !== undefined ? arguments[ 2 ] : {};
            var srsName = params.srsName,
                srsDimension = params.srsDimension;
            return "<gml:Point".concat( attrs( {
                srsName: srsName,
                'gml:id': gmlId
            } ), ">" ) + "<gml:pos".concat( attrs( {
                srsDimension: srsDimension
            } ), ">" ) + orderCoords( coords ).join( ' ' ) + '</gml:pos>' + '</gml:Point>';
        }
        function lineString ( coords, gmlId, params )
        {
            var params = arguments.length > 2 && arguments[ 2 ] !== undefined ? arguments[ 2 ] : {};
            //var srsName = params.srsName,
            var srsName = undefined,
                srsDimension = params.srsDimension;
            return "<gml:LineString".concat( attrs( {
                srsName: srsName,
                'gml:id': gmlId
            } ), ">" ) + "<gml:posList".concat( attrs( {
                srsDimension: srsDimension
            } ), ">" ) + coords.map( function ( e )
            {
                return orderCoords( e ).join( ' ' );
            } ).join( ' ' ) + '</gml:posList>' + '</gml:LineString>';
        }
        function linearRing ( coords, gmlId, params )
        {
            var params = arguments.length > 2 && arguments[ 2 ] !== undefined ? arguments[ 2 ] : {};
            //var srsName = params.srsName,
            var srsName = undefined,
                srsDimension = params.srsDimension;
            return "<gml:LinearRing".concat( attrs( {
                'gml:id': gmlId,
                srsName: srsName
            } ), ">" ) + "<gml:posList".concat( attrs( {
                srsDimension: srsDimension
            } ), ">" ) + coords.map( function ( e )
            {
                return orderCoords( e ).join( ' ' );
            } ).join( ' ' ) + '</gml:posList>' + '</gml:LinearRing>';
        }
        function polygon ( coords, gmlId, params )
        {
            var params = arguments.length > 2 && arguments[ 2 ] !== undefined ? arguments[ 2 ] : {};
            var srsName = params.srsName;
            var polygon = "<gml:Polygon".concat( attrs( {
                srsName: srsName,
                'gml:id': gmlId
            } ), ">" ) + '<gml:exterior>' + linearRing( coords[ 0 ], undefined, params ) + '</gml:exterior>';

            if ( coords.length >= 2 ) {
                var _iterator = _createForOfIteratorHelper( coords.slice( 1 ) ),
                    _step;

                try {
                    for ( _iterator.s(); !( _step = _iterator.n() ).done; ) {
                        var ring = _step.value;
                        polygon += '<gml:interior>' + linearRing( ring, undefined, params ) + '</gml:interior>';
                    }
                } catch ( err ) {
                    _iterator.e( err );
                } finally {
                    _iterator.f();
                }
            }

            polygon += '</gml:Polygon>';
            return polygon;
        }
        function multiPoint ( coords, gmlId )
        {
            var params = arguments.length > 2 && arguments[ 2 ] !== undefined ? arguments[ 2 ] : {};
            return multi( 'MultiPoint', 'pointMembers', point, coords, gmlId, params );
        }
        function multiLineString ( coords, gmlId )
        {
            var params = arguments.length > 2 && arguments[ 2 ] !== undefined ? arguments[ 2 ] : {};
            return multi( 'MultiCurve', 'curveMembers', lineString, coords, gmlId, params );
        }
        function multiPolygon ( coords, gmlId )
        {
            var params = arguments.length > 2 && arguments[ 2 ] !== undefined ? arguments[ 2 ] : {};
            return multi( 'MultiSurface', 'surfaceMembers', polygon, coords, gmlId, params );
        }
        function makeConverter ( obj )
        {
            return Object.entries( obj ).map( function ( _ref )
            {
                var _ref2 = _slicedToArray( _ref, 2 ),
                    type = _ref2[ 0 ],
                    converter = _ref2[ 1 ];

                return _defineProperty( {}, type[ 0 ].toUpperCase() + type.slice( 1 ), converter );
            } ).reduce( function ( a, b )
            {
                return Object.assign( a, b );
            }, {} );
        }
        function makeTranslator ( obj )
        {
            var converter = makeConverter( obj );
            return function ( geom, gmlId, params )
            {
                var _arguments = arguments;

                var warn = function warn ()
                {
                    return new Error( "unkown: ".concat( geom.type, " " ) + _toConsumableArray( _arguments ).join() );
                };

                var convert = converter[ geom.type ] || warn;
                return convert( geom.coordinates || geom.geometries, geom.gmlId, geom.params );
            };
        }
        var allTypes = makeConverter( {
            point: point,
            lineString: lineString,
            linearRing: linearRing,
            polygon: polygon,
            multiPoint: multiPoint,
            multiLineString: multiLineString,
            multiPolygon: multiPolygon
        } );
        function geometryCollection ( geoms, gmlId )
        {
            var params = arguments.length > 2 && arguments[ 2 ] !== undefined ? arguments[ 2 ] : {};
            return multi( 'MultiGeometry', 'geometryMembers', allTypes, geoms, gmlId, params );
        }
        var geomToGml = makeTranslator( Object.assign( {
            geometryCollection: geometryCollection
        }, allTypes ) );
        exports.geomToGml = geomToGml;
    }, {} ]
}, {}, [] );
