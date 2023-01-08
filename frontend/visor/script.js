var map = L.map("map").setView([-0.4149555647213889, -78.02615761756898], 17);   // Coordernadas/zoom de inicio  [-0.4091048124328795, -78.04001927809362]
                                                     // Ejemplo:   setView([27.2, 83.95], 10);   
        
    
    
    map.addControl(new L.Control.Fullscreen({
        title: {
            'false': 'Ver Pantalla completa',
            'true': 'Pantalla Normal'
        }
    }));
    
    map.zoomControl.setPosition('topright');



//*******    TILE LAYER    *************

// Layer de OpenStreetMap
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
//osm.addTo(map);

// Layer de OSM Topo map
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

//OpenTopoMap.addTo(map);

// Layer de Carto Positron
var carto = L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
	maxZoom: 17	
});



// ************* LAYERS ***********


// Layer de ThunderForest
var Thunderforest_OpenCycleMap = L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: '<your apikey>',
	maxZoom: 22
});

// Layer Landscape Forest (No funiona)
var Thunderforest_Landscape = L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: '<your apikey>',
	maxZoom: 22
});

// Leyer mapa satelital
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Later mapa físico
var Esri_WorldPhysical = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
	maxZoom: 8
});

// Layer rutas de bicicletas
var HikeBike_HikeBike = L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Layer vias feerea (se recomienda ponerlo sobre un mapa base)
var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Layer de google streets
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleStreets.addTo(map);

// Layer de google satellite
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


// Markers

var icon = L.icon({
    iconUrl: 'img/red_marker.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],    
});


/* var marker = L.marker ([28.3949, 84.1240], { icon: icon, draggable: true });
var popup = marker.bindPopup('This is Nepal, ' + marker.getLatLng()).openPopup()
popup.addTo(map); */

var secondmarker = L.marker ([28.3949, 84.1240], { 
    icon: icon,
    draggable: true,
    title: "Esto es un marker",
    opacity: 0.5,
})
    .bindPopup("<h1> Marker </h1> <p> Este es el texto del PopUp </p> <img src='./img/img2.png' style='width: 100%; height: 100px'/> ")
    .openPopup();

//console.log(marker.toGeoJSON());

// Agrega un map scale
L.control.scale({ position: 'bottomright' }).addTo(map)

////////////////////////////////////////////////////////////////////////////////


/////////////// 
// **** Opcion Pantalla Completa

//L.Control.Fullscreen().addTo(map); //.addTo(map);    



//******* Leaflet Measure (Medidas y distancias)  ************


L.control.measure({
    //position: 'topright',
    primaryLengthUnit: 'kilometers',
    secondaryLengthUnit: 'meters',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares',
        
}).addTo(map);  




// ***********  GEOJSON  ************** 
import {lineJson} from './data/line.js';
import {pointJson} from './data/point.js';
import {polygonJson} from './data/polygon.js';

import {redVialJson} from './data/red_vial_urbana.js';
import {prediosJson} from './data/predios.js';
import {manzanasJson} from './data/manzanas.js';
import {manzanasBJson} from './data/manzanas_b.js';
import {limiteParroquialJson} from './data/limite_parroquial.js';
import {edificacionesJson} from './data/edificaciones.js';
import {curvasNivelJson} from './data/curvas_nivel.js';
import {coordenadasPredioJson} from './data/coordenadas_predios.js';

import {riosJson} from './data/rios.js';
import {rioPapallactaJson} from './data/rio_papallacta.js';
import {antisanaJson} from './data/volcan_antisana.js';

import {alertaBajaJson} from './data/alerta_baja.js';
import {alertaMediaJson} from './data/alerta_media.js';
import {alertaAltaJson} from './data/alerta_alta.js';
import {deslavesJson} from './data/deslaves.js';
import {incendiosGravesJson} from './data/incendios_graves.js';
import {incendiosLevesJson} from './data/incendios_leves.js';
import {limiteCantonalJson} from './data/limite_cantonal.js';
import {sueloEstableJson} from './data/suelo_estable.js';
import {sueloRocaJson} from './data/suelo_roca.js';




var curvasNivelData = L.geoJSON(curvasNivelJson, {
    
    style: {
        weight: 0.8,
        //fillColor: 'blue',
        //opacity: 1, // 0.5
        fillOpacity: 0.66, // 1
        color: '#becf50',
    }
    }
    ).addTo(map);


    var riosData = L.geoJSON(riosJson, {    
    style: {
        weight: 3,
        //fillColor: 'blue',
        //opacity: 1, // 0.5
        fillOpacity: 0.66, // 1
        color: '#beb297',
    }
    }
    )

    var rioPapallactaData = L.geoJSON(rioPapallactaJson, {    
        style: {
            weight: 5,
            //fillColor: 'blue',
            opacity: 0.55, // 0.5            
            color: '#1f78b4',
        }
        }
        )

    var antisanaData = L.geoJSON(antisanaJson, {
    
        style: {
            weight: 0.8,
            //fillColor: 'blue',
            //opacity: 1, // 0.5
            fillOpacity: 0.66, // 1
            color: '#d5b43c',
        }
        }
        )

    
    var alertaBajaData = L.geoJSON(alertaBajaJson, {
    
        style: {
            weight: 0.8,
            //fillColor: 'blue',
            //opacity: 1, // 0.5
            fillOpacity: 0.66, // 1
            color: '#4daf4a',
        }
        }
        )


    var alertaMediaData = L.geoJSON(alertaMediaJson, {
    
        style: {
            weight: 0.8,
            //fillColor: 'blue',
            //opacity: 1, // 0.5
            fillOpacity: 0.66, // 1
            color: '#f49004',
        }
        }
        )
    
    var alertaAltaData = L.geoJSON(alertaAltaJson, {
    
        style: {
            weight: 0.8,
            //fillColor: 'blue',
            //opacity: 1, // 0.5
            fillOpacity: 0.66, // 1
            color: '#e31a1c',
        }
        }
        )

    var deslavesData = L.geoJSON(deslavesJson, {
    
        style: {
            weight: 1.8,
            //fillColor: 'blue',
            //opacity: 1, // 0.5
            fillOpacity: 0.66, // 1
            color: '#a47158',
        }
        }
        )
    
    var incendiosGravesData = L.geoJSON(incendiosGravesJson, {
    
        style: {
            weight: 0.8,
            //fillColor: 'blue',
            //opacity: 1, // 0.5
            fillOpacity: 0.66, // 1
            color: '#b73e29',
        }
        }
        )

    var incendiosLevesData = L.geoJSON(incendiosLevesJson, {
    
        style: {
            weight: 0.8,
            //fillColor: 'blue',
            //opacity: 1, // 0.5
            fillOpacity: 0.66, // 1
            color: '#dbea02',
        }
        }
        )
    
    var limiteCantonalData = L.geoJSON(limiteCantonalJson, {
    
        style: {
            weight: 0.8,
            //fillColor: 'blue',
            //opacity: 1, // 0.5
            fillOpacity: 0.25, // 1
            color: '#8f1c80',
        }
        }
        )

    var sueloEstableData = L.geoJSON(sueloEstableJson, {
    
        style: {
            weight: 0.8,
            //fillColor: 'blue',
            //opacity: 1, // 0.5
            fillOpacity: 0.66, // 1
            color: '#b3a27c',
        }
        }
        )
    
    var sueloRocaData = L.geoJSON(sueloRocaJson, {
    
        style: {
            weight: 0.8,
            //fillColor: 'blue',
            //opacity: 1, // 0.5
            fillOpacity: 0.66, // 1
            color: '#857e85',
        }
        }
        )
    
    

var coordenadasPrediosData = L.geoJSON(coordenadasPredioJson, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>Coordenadas (lng, lat): </b>` + feature.geometry.coordinates + "<br/> <b> Clave predial: </b> " + feature.properties.clave + "<br/> <b>Área (Shape): </b>" + feature.properties.SHAPE_Area + " (m²)" + "<br/><b>Leng.Shape: </b>" + feature.properties.SHAPE_Leng + " (m)")
    },
    style: {
        // Stroke
        color: 'black',
        weight: 2,
        opacity: 1,
        // Fill
        fillColor: 'red',
        fillOpacity: 1,
        // Radius
        radius: 4,
    }

    }
    ).addTo(map);


var redVialData = L.geoJSON(redVialJson, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>Vía: </b>` + feature.properties.OBJECTID_1 + "<br/><b>Longitud vial: </b>" + feature.properties.Shape_Leng + " (m) ")
    },
    style: {
        weight: 2,
        fillColor: 'black',
        opacity: 1, // 0.5
        fillOpacity: 0.9, // 1
        color: '#c0c0c0',
    }

}).addTo(map);

var prediosData = L.geoJSON(prediosJson, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>Datos predio: </b>`+ "<br/><b>Clave predial: </b> " + feature.properties.clave + "<br/><b>Área: </b>" + feature.properties.SHAPE_Area + " (m²) " + "<br/><b>Perímetro: </b>" + feature.properties.SHAPE_Leng + " (m) ")
    },
    style: {
        weight: 1,
        fillColor: 'red',
        //opacity: 1, // 0.5
        fillOpacity: 0.5, // 1
        color: '#c0c0c0',
    }
}).addTo(map);

var manzanasData = L.geoJSON(manzanasJson, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>Manzana: </b>` + feature.properties.mzn_cod + "<br/><b>Sector: </b>" + feature.properties.sector_cod + "<br/><b>Zona: </b>" + feature.properties.zona_cod + "<br/><b>Área: </b>" + feature.properties.SHAPE_Area + " (m²) " + "<br/><b>Perímetro: </b>" + feature.properties.SHAPE_Leng + " (m) ")
    },
    style: {
        weight: 0.6,
        fillColor: 'green',
        opacity: 0.8, // 0.5
        fillOpacity: 0.3, // 1
        color: 'black',
    }
}).addTo(map);


var limiteParroquialData = L.geoJSON(limiteParroquialJson, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>Límite parroquial: </b>` + "<br/><b>Área: </b>" + feature.properties.Shape_Area + " (m²) " + "<br/><b>Perímetro: </b>" + feature.properties.Shape_Leng + " (m)")
    },
    style: {
        weight: 1,
        fillColor: 'blue',
        opacity: 0.4, // 0.5
        fillOpacity: 0.1, // 1
        color: 'black',
    }
}).addTo(map);

var edificacionesData = L.geoJSON(edificacionesJson, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>Datos edificación </b>" + `<br/><b>Clave pedial: </b>` + feature.properties.clave + "<br/><b>Área: </b>" + feature.properties.SHAPE_Area + " (m²) " + "<br/><b>Perímetro: </b>" + feature.properties.SHAPE_Leng + " (m) ")
    },
    style: {
        weight: 1,
        fillColor: 'yellow',
        //opacity: 1, // 0.5
        fillOpacity: 0.5, // 1
        color: '#c0c0c0',
    }
}).addTo(map);



/************************************** */
// *****  Control de de búsqueda por clave predial      ************ ///

L.control.search({
    layer: coordenadasPrediosData,
    position: 'topleft',
    initial: false,
    propertyName: 'clave',
    textPlaceholder : 'Buscar predio',
    textCancel: 'Cancelar',
    textErr: 'Predio no encontrado',
    zoom: 24,
    marker: false
}).addTo(map);


//////////////////////////////////////////////////////////



////////////////////////////////////////////////////
//***********************  TOOLBAR  */



var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

//////////////////////////////////////////

    var MyCustomMarker = L.Icon.extend({
        options: {
            shadowUrl: null,
            iconAnchor: new L.Point(12, 12),
            iconSize: new L.Point(24, 24),
            iconUrl: './img/black_marker.png'
        }
    });

    //var distancia = L.drawLocal.draw.toolbar.buttons.polygon = 'Dibuja un sexy polygon!';

    var options = {
        position: 'topright',
        draw: {
            polyline: {
                showLength: true,
                //metric: true,
                shapeOptions: {
                    color: '#f357a1',
                    weight: 10
                }
            },
            polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons
                drawError: {
                    color: '#e1e100', // Color the shape will turn when intersects
                    message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                },
                shapeOptions: {
                    color: '#bada55'
                }
            },
            // false, // Turns off this drawing tool
            circle: {
                shapeOptions: {
                    clickable: true,
                    color:'purple',
                    fillOpacity: 0.08
                }
            },            
            rectangle: {
                shapeOptions: {
                    clickable: true
                }
            },
            marker: {
                icon: new MyCustomMarker()
            }
        },
        edit: {
            featureGroup: drawnItems, //REQUIRED!!
            remove: true
        }
    };
    

/////////////////////////////////////////////////////

    var drawControl = new L.Control.Draw(options);
        //{
        //position: 'bottomleft',
        //edit: {
        //    featureGroup: drawnItems,
        //    edit: false
        //}
        //}
    
    //);


    //L.drawLocal.draw.toolbar.buttons.polygon = 'Dibuja un sexy polygon!';


    L.drawLocal = {
        // format: {
        // 	numeric: {
        // 		delimiters: {
        // 			thousands: ',',
        // 			decimal: '.'
        // 		}
        // 	}
        // },
        draw: {
            toolbar: {
                // #TODO: this should be reorganized where actions are nested in actions
                // ex: actions.undo  or actions.cancel
                actions: {
                    title: 'Cancelar dibujo', //'Cancel drawing',
                    text: 'Cancelar'
                },
                finish: {
                    title: 'Finalizar dibujo', //'Finish drawing',
                    text: 'Finalizar'
                },
                undo: {
                    title: 'Eliminar último punto dibujado', //'Delete last point drawn',
                    text: 'Eliminar último punto' //'Delete last point'
                },
                buttons: {
                    polyline: 'Dibujar multilínea', //'Draw a polyline',
                    polygon: 'Dibujar un polígono', //'Draw a polygon',
                    rectangle: 'Dibujar un rectángulo',//'Draw a rectangle',
                    circle: 'Dibujar un círculo', //'Draw a circle',                    
                    marker: 'Dibujar un marcador', //'Draw a marker',
                    circlemarker: 'Dibujar un circleMarker' //'Draw a circlemarker'
                }
            },
            handlers: {
                circle: {
                    tooltip: {
                        start: 'Haga clic y arrastre para dibujar un círculo ' //'Click and drag to draw circle.'
                    },
                    radius: 'Radio' //'Radius'
                },                
                circlemarker: {
                    tooltip: {
                        start: 'Haga clic en el mapa para colocar el circleMarker ' //'Click map to place circle marker.'
                    }
                },
                marker: {
                    tooltip: {
                        start: 'Haga clic en el mapa para colocar el marcador ' //'Click map to place marker.'
                    }
                },
                polygon: {
                    tooltip: {
                        start: 'Haga clic para comenzar a dibujar la forma ', //'Click to start drawing shape.',
                        cont: 'Haga clic para continuar dibujando la forma ', //'Click to continue drawing shape.',
                        end: 'Haga clic en el primer punto para cerrar esta forma'  //'Click first point to close this shape.'
                    }
                },
                polyline: {
                    error: '<strong>Error:</strong> los bordes no se pueden cruzar!',
                    tooltip: {
                        start: 'Haga clic para comenzar a dibujar la línea ', //'Click to empezón drawing line.',
                        cont: 'Haga clic para continuar dibujando la línea ', //'Click to continue drawing line.',
                        end: 'Haga clic en el último punto para terminar la línea ' //'Click last point to finish line.'
                    }
                },
                rectangle: {
                    tooltip: {
                        start: 'Haga clic y arrastre para dibujar un rectángulo ' //'Click and drag to draw rectangle.'
                    }
                },
                simpleshape: {
                    tooltip: {
                        end: 'Suelte el mouse para terminar de dibujar ' //'Release mouse to finish drawing.'
                    }
                }
            }
        },
        edit: {
            toolbar: {
                actions: {
                    save: {
                        title: 'Guardar cambios', //'Save changes',
                        text: 'Guardar' //'Save'
                    },
                    cancel: {
                        title: 'Cancelar la edición, descarta todos los cambios ', //'Cancel editing, discards all changes',
                        text: 'Cancelar'
                    },
                    clearAll: {
                        title: 'Borrar todas las capas ', //'Clear all layers',
                        text: 'Limpiar todo' //'Clear All'
                    }
                },
                buttons: {
                    edit: 'Editar capas', //'Edit layers',
                    editDisabled: 'Sin capas a editar', //'No layers to edit',
                    remove: 'Eliminar capas', //'Delete layers',
                    removeDisabled: 'Sin capas a eliminar' //'No layers to delete'
                }
            },
            handlers: {
                edit: {
                    tooltip: {
                        text: 'Arrastre los marcadores para editar características ', //'Drag handles or markers to edit features.',
                        subtext: 'Haga clic en cancelar para deshacer los cambios ' //'Click cancel to undo changes.'
                    }
                },
                remove: {
                    tooltip: {
                        text: 'Haga clic en una propiedad para eliminar ' //'Click on a feature to remove.'
                    }
                }
            }
        }
    };

    

    //////////////////////////////////////////////////////////////////////////////

    map.addControl(drawControl);

    //var theMarker = []
    /* var bufferLayer = {};
    var point_medio = {}; */

        

/********************************************************/

    map.on(L.Draw.Event.CREATED, function (e) {
        var type = e.layerType,
            layer = e.layer;

            console.log(type)
            console.log(layer)
        
            
        if (type === 'marker') {
            
            
            layer.bindPopup('Coordenadas:' + layer.getLatLng());
        }

       
        if (type== 'polyline'){

            var coord = layer.toGeoJSON();
            let longitud = layer.getLatLngs();

            let dis = 0;
            //var lineCoordinates = []
                        
            for (let i = 0; i < longitud.length - 1; i++) {
            let start = longitud[i];
            let end = longitud[i + 1];
            dis += L.latLng([start.lat, start.lng]).distanceTo([end.lat, end.lng]);
            }

           
            var midpoint = turf.center(coord);  //"<br/> Punto medio: " + midpoint.geometry.coordinates
            //L.geoJSON(midpoint).addTo(map)

            var along = turf.along(coord, (dis / 10e2)/2, {units: 'kilometers'});
       
            
            layer.bindPopup('Hola soy una línea: ' 
                + "<br/> Distancia: " + (dis / 10e2).toFixed(3) + " Km."
                + "<br/> Punto medio: " + "[" + along.geometry.coordinates + "]"                
                +  "<br/> Coordenadas: <br/>" + layer.getLatLngs()
                + "<br/><br/>"+ "<button class='buffer'>Buffer</button>"+" " 
                + "<button class='punto_medio'>Centro</button>" 
                + "   "+ "<button class='remove_linea'>Borrar</button>" 
                );
                
                
                var bufferLayer = {};
                var point_medio = {};

                $('#map').on('click', '.remove_linea', function() {                                        
                    map.removeLayer(bufferLayer);
                    map.removeLayer(point_medio);
                    
                });   

                $('#map').on('click', '.punto_medio', function() {

                    if (point_medio != undefined) {
                        map.removeLayer(point_medio);
                    };
                    
                    //Punto medio                     
                    //var along = turf.along(coord, (dis / 10e2)/2, {units: 'kilometers'});
                    point_medio = L.geoJSON(along).addTo(map)

                });
    
                $('#map').on('click', '.buffer', function() {


                    if (bufferLayer != undefined) {
                        map.removeLayer(bufferLayer);
                    };                                     
                    
                    /*           
                    //Add a marker to show where you clicked.
                    bufferLayer = L.geoJSON(buffer).addTo(map) */

                    let lineString = L.polyline(longitud,{color: 'black'});
                    var buffered = turf.buffer(lineString.toGeoJSON(), 0.015, {units: 'kilometers'});
                    //bufferLayer = L.geoJSON(buffered).addTo(map)
                    bufferLayer = L.geoJSON(buffered)
                    var popup = bufferLayer.bindPopup('Buffer ok ' + "<br/>" 
                                + "   "+ "<button class='remove_linea'>Borrar</button>"  
                                
                                ).openPopup()
                    popup.addTo(map);                    
                    
                    /* var bufferedLayer = L.geoJSON(null);
                    bufferedLayer.addData(buffered);
                    bufferedLayer.addTo(map); */
                });
        }

        if (type== 'rectangle'){

                   
            var coord = layer.toGeoJSON(); // toGeoJSON().geometry.coordinates; 
            console.log(coord) //imprime coordenadas rectangulo dibujado
            console.log(L.stamp(layer)) //Id único del layer dibujado

            let longitud = layer.getLatLngs()[0];                       
            
            var seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);            
            
            console.log(seeArea);

            let dis = 0;
            for (let i = 0; i < longitud.length - 1; i++) {
            let start = longitud[i];
            let end = longitud[i + 1];
            dis += L.latLng([start.lat, start.lng]).distanceTo([end.lat, end.lng]);
            }

            
                var baseRectandulo = 0;
                let start = longitud[0];
                let end = longitud[1];
                baseRectandulo = L.latLng([start.lat, start.lng]).distanceTo([end.lat, end.lng]);
                                         

                var alturaRectandulo = 0;
                start = longitud[1];
                end = longitud[2];
                alturaRectandulo = L.latLng([start.lat, start.lng]).distanceTo([end.lat, end.lng]);
                
                var perimetro = 2*(baseRectandulo + alturaRectandulo);

                
                //var area = turf.area(coord);
                var center = turf.centerOfMass(coord);
                //console.log(center.geometry.coordinates)

                //var midpoint = turf.center(coord);
                //L.geoJSON(center).addTo(map)               
                          

            layer.bindPopup('Soy un rectángulo:'
                            +"<br/> Área: "+ seeArea.toFixed(3) + " (m²) "
                            +"<br/> Centroide: " + "[" + center.geometry.coordinates + "]"
                            +"<br/> Distancia: " + (dis / 10e2).toFixed(3) + "Km." 
                            + "<br/> Perímetro: " + (perimetro/10e2).toFixed(3) 
                            + "Km. <br/>"+ layer.getLatLngs() +"<br/>"
                            + "<br/>"+ "<button class='centro_rectangulo'>Centroide</button>" 
                            + "   "+ "<button class='remove_rectangulo'>Borrar</button>" 
                             );
            
                        
            // remove rectangulo      

            var theMarker = {};             
            
            $('#map').on('click', '.remove_rectangulo', function() {
                //alert('Hello from Toronto!');
                //console.log("Holaaaaaa")                
                                
                map.removeLayer(theMarker);
                //console.log(arreglo)  //Id layer (figura dibujada)                
            });   

            $('#map').on('click', '.centro_rectangulo', function() {
                
                if (theMarker != undefined) {   //(theMarker != undefined)
                    map.removeLayer(theMarker);                  
                }                
                
                theMarker = L.geoJSON(center).addTo(map)                
                
            });        

        }

        if (type== 'circle'){
            var coord = layer.toGeoJSON();
            var theCenterPt = layer.getLatLng();
            var theRadius = layer.getRadius();

            var options = {steps: 64, units: 'kilometers', properties: {foo: 'bar'}};
            var circle = turf.circle(coord.geometry.coordinates, theRadius/10e2, options); 
            
            layer.bindPopup('Centro: '+ theCenterPt 
                            + "<br/>Radio: " + (theRadius/10e2).toFixed(3) + " Km."
                            + "<br/>"+ "<button class='centro_circulo'>Centro</button>" 
                            + "   "+ "<button class='remove_circulo'>Borrar</button>"            
                            ); // Convertir a GeoJson para calcular con turf js
            
            var circulo = L.geoJSON(circle,{
                style: {
                    weight: 1,
                    fillColor: 'yellow',
                    //opacity: 1, // 0.5
                    fillOpacity: 0.1 // 1
                    
                }
            })
            //circulo.addTo(map)
            drawnItems.addLayer(circulo); 

            var centro = {};           
            
            $('#map').on('click', '.remove_circulo', function() {
                                
                map.removeLayer(centro);
                map.removeLayer(circulo);
                //drawnItems.removeLayer(teselas);
                
            });   

            $('#map').on('click', '.centro_circulo', function() {                
                
                if (centro != undefined) {   
                    map.removeLayer(centro);                  
                }               
                
                centro = L.marker([coord.geometry.coordinates[1],coord.geometry.coordinates[0]],
                    {icon: icon,title: "Lat: ["+coord.geometry.coordinates[1]+"]" + "\nLng: ["+coord.geometry.coordinates[0]+"]"}).addTo(map)

            });
        }

        if (type== 'polygon'){

            var coord = layer.toGeoJSON(); // toGeoJSON().geometry.coordinates; 
            //console.log(coord) //imprime coordenadas rectangulo dibujado
            //console.log(L.stamp(layer)) //Id único del layer dibujado

            let longitud = layer.getLatLngs()[0];  

            var seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
            //console.log(seeArea);
            //let longitud = layer.getLatLngs()[0];
            let dis = 0;
            let pos=0;
            for (let i = 0; i < longitud.length - 1; i++) {
            let start = longitud[i];
            let end = longitud[i + 1];
            dis += L.latLng([start.lat, start.lng]).distanceTo([end.lat, end.lng]);
            pos=end;
            }

            dis += L.latLng([longitud[0].lat, longitud[0].lng]).distanceTo([pos.lat, pos.lng]);


            var center = turf.centerOfMass(coord);
            //var line = turf.lineString(coord);
            //var polygon = turf.lineToPolygon(line, {units: 'miles'})
            var triangles = turf.tesselate(coord);


            layer.bindPopup('Polígono:'
                            + "<br/> Área: " + seeArea + " (m²)"
                            +"<br/> Centroide: " + "[" + center.geometry.coordinates + "]" 
                            + "<br/> Distancia: " + (dis / 10e2).toFixed(3) + "Km."
                            + "<br/> Perimetro: " + dis + " (m)"
                            + "<br/>" + layer.getLatLngs()
                            + "<br/><br/>"+ "<button class='centro_poligono'>Centroide</button>"
                            + " "+ "<button class='teselas'>Teselas</button>" 
                            + " "+ "<button class='remove_poligono'>Borrar</button>"                             
                            ); // Convertir a GeoJson para calcular con turf js

            
            var theMarker = {};
            var teselas = {}             
            
            $('#map').on('click', '.remove_poligono', function() {
                //alert('Hello from Toronto!');
                //console.log("Holaaaaaa")                
                                
                map.removeLayer(theMarker);
                map.removeLayer(teselas);
                drawnItems.removeLayer(teselas);
                //console.log(arreglo)  //Id layer (figura dibujada)                
            });   

            $('#map').on('click', '.centro_poligono', function() {                
                
                if (theMarker != undefined) {   //(theMarker != undefined)
                    map.removeLayer(theMarker);                  
                }

                //var marker = L.marker ([28.3949, 84.1240], { icon: icon, draggable: true });
                //var popup = marker.bindPopup('This is Nepal, ' + marker.getLatLng()).openPopup()
                //popup.addTo(map);

                
                //theMarker = L.geoJSON(center).addTo(map)
                
                //var centroMarker = {}
                //centroMarker = L.marker([center.geometry.coordinates[1],center.geometry.coordinates[0]],
                //    {icon: icon,title: "Lat: ["+center.geometry.coordinates[1]+"]" + "\nLng: ["+center.geometry.coordinates[0]+"]"}).addTo(map)
                
                theMarker = L.marker([center.geometry.coordinates[1],center.geometry.coordinates[0]],
                    {icon: icon,title: "Lat: ["+center.geometry.coordinates[1]+"]" + "\nLng: ["+center.geometry.coordinates[0]+"]"}).addTo(map)

            });

            $('#map').on('click', '.teselas', function() {                
                
                if (teselas != undefined) {   //(theMarker != undefined)
                    map.removeLayer(teselas);                  
                }

                //teselas = L.geoJSON(triangles).addTo(map)

                //var marker = L.marker ([28.3949, 84.1240], { icon: icon, draggable: true });
                //var popup = marker.bindPopup('This is Nepal, ' + marker.getLatLng()).openPopup()
                //popup.addTo(map);

                //bufferLayer = L.geoJSON(buffered).addTo(map)
                teselas = L.geoJSON(triangles)
                var popup = teselas.bindPopup('Teselas ok ' + "<br/>" 
                            + "   "+ "<button class='remove_poligono'>Borrar</button>"  
                            
                            ).openPopup()
                popup.addTo(map);       
                drawnItems.addLayer(teselas);  // Agrega las teselas como capa               


            });
        }        
    
        
        drawnItems.addLayer(layer);

    });

//************************************************************************************************* */


    map.on(L.Draw.Event.EDITED, function (e){
        var type = e.layerType;
          var  layers = e.layers;

          layers.eachLayer(function (layer) {
            // do whatever you want to each layer, here update LatLng
            if (layer instanceof L.Circle) {
                var theCenterPt = layer.getLatLng();
                var theRadius = layer.getRadius();
                var bounds = layer.getBounds();
                //layer.bindPopup(bounds.getNorthWest().toString() +  " NW<br>" + bounds.getSouthEast().toString() + " SE" + "Radio: " + theRadius);
                layer.bindPopup("Radio: " + theRadius + "<br/> Centro(x,y): " + theCenterPt);
            }

            if (layer instanceof L.Marker) {
                var coordenadas = layer.getLatLng();
                layer.bindPopup("Coordenadas (x,y): " + coordenadas);
            }

            if (layer instanceof L.Polyline){
                let longitud = layer.getLatLngs();

                    let dis = 0;
                    for (let i = 0; i < longitud.length - 1; i++) {
                    let start = longitud[i];
                    let end = longitud[i + 1];
                    dis += L.latLng([start.lat, start.lng]).distanceTo([end.lat, end.lng]);
                    }

                    layer.bindPopup('Hola soy una línea: ' + "<br/> Distancia: " + (dis / 10e2).toFixed(3) + " Km." +  "<br/> Coordenadas: <br/>" + layer.getLatLngs()); // Convertir a GeoJson para calcular con turf js
            }

            if (layer instanceof L.Rectangle){
                var coord = layer.toGeoJSON(); // toGeoJSON().geometry.coordinates;            
            
                    let longitud = layer.getLatLngs()[0];            
                    //let distance = this.formatLength(latlng);

                    //polygons.addLayer(layer);
                    var seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
                    //console.log(seeArea);

                    let dis = 0;
                    for (let i = 0; i < longitud.length -1; i++) {
                    let start = longitud[i];
                    let end = longitud[i + 1];
                    dis += L.latLng([start.lat, start.lng]).distanceTo([end.lat, end.lng]);
                    }

                    var baseRectandulo = 0;
                    let start = longitud[0];
                    let end = longitud[1];
                    baseRectandulo = L.latLng([start.lat, start.lng]).distanceTo([end.lat, end.lng]);
                                             
    
                    var alturaRectandulo = 0;
                    start = longitud[1];
                    end = longitud[2];
                    alturaRectandulo = L.latLng([start.lat, start.lng]).distanceTo([end.lat, end.lng]);
                    
                    var perimetro = 2*(baseRectandulo + alturaRectandulo);
    
                    
                    //var area = turf.area(coord);
                    var center = turf.centerOfMass(coord);
                    //console.log(center.geometry.coordinates)               
    
                layer.bindPopup('Soy un rectángulo:'
                                +"<br/> Área: "+ seeArea.toFixed(3) + " (m²) "
                                +"<br/> Centroide: " + center.geometry.coordinates 
                                +"<br/> Distancia: " + (dis / 10e2).toFixed(3) + "Km." 
                                + "<br/> Perímetro: " + (perimetro/10e2).toFixed(3) 
                                + "Km. <br/>" + layer.getLatLngs()).openPopup(); 
                    
            }

            });
       
        //drawnItems.addLayer(layer);

    });

    
    // L.Draw = {};

    



    

////////////////////////////////////////////////////////////

//******************   Controlador de Layers    *****************


var baseMap = {
    "Google Street": googleStreets,
    "OSM": osm,
    "Open Topomap": OpenTopoMap,
    "ESRI Satelital": Esri_WorldImagery,
    "Carto": carto    
};

var overlayMaps = {
    //"Marker 1": marker,
    //"Marker 2": secondmarker,
    //"Puntos": pointData,
    //"Lineas": lineData,
    //"Polígonos": polygonData,
    //"WMS Ejemplo": wms,
    "Ríos": riosData,
    "río Papallacta": rioPapallactaData,
    "volcán Antisana": antisanaData,
    "Alerta baja": alertaBajaData,
    "Alerta media": alertaMediaData,
    "Alerta alta": alertaAltaData,
    "Deslaves": deslavesData,
    "Incendios graves": incendiosGravesData,
    "Incendios leves": incendiosLevesData,
    "Suelo estable": sueloEstableData,
    "Suelo rocoso": sueloRocaData,    
    "Límite cantonal": limiteCantonalData,
    "Límite parroquial": limiteParroquialData,
    "Manzanas": manzanasData,
    "Red vial urbana": redVialData,
    "Predios": prediosData,            
    "Edificaciones": edificacionesData,
    "Curvas de nivel": curvasNivelData,
    "Coordenadas prediales": coordenadasPrediosData,
    "Figuras": drawnItems
};

//map.removeLayer(osm)
//map.removeLayer(marker)

L.control.layers(baseMap, overlayMaps, {position: 'bottomright', collapsed: true }).addTo(map);






