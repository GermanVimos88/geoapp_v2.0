import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, LayerGroup, LayersControl, Marker, Popup, Circle, Polygon, Polyline, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
//import Markers from './Markers';
//import {places} from '../assets/data.json';
import { prediosJson } from './data/predios.js';
import { coordenadasPredioJson } from './data/coordenadasPredios.js';
import { edificacionesJson } from './data/edificaciones.js';
import { manzanasJson } from './data/manzanasb.js';
import { acerasJson } from './data/aceras.js';
import { alcantarillasJson } from './data/alcantarillas.js';
import { postesJson } from './data/postes.js';
import { pozoJson } from './data/pozo_rejilla.js';
import axios from 'axios';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png'; //'../assets/icon.svg';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Cookies from 'universal-cookie';

//const cookies = new Cookies();

const baseUrl = 'http://localhost/apicatastro/index.php/prediogeo/';

const markerIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize:     [30, 45], // size of the icon
    shadowSize:   [30, 50], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //shadowAnchor: [40, 62],  // the same for the shadow
    popupAnchor:  [-3, -76], 
    className: "leaflet-marker-icon"
}); 


const MapView = (props) => {
  const location = useLocation();  
    const path = location.pathname
    
    var id = ''
    var clave = ''
    var idPropietario = ''

    for (var i=0 ; i < path.length ; i++) {
      if(path.substring(i, i+1)===':' )
      {
        for (var j=i+2; j < path.length ; j++) {
          if(path.substring(j, j+1)===':' ) {
            for (var k=j+2; k < path.length; k++){
              if(path.substring(k, k+1)===':'){
                  id= path.substring(i+1, j)
                  clave=path.substring(j+1, k)              
                  idPropietario=path.substring(k+1, path.length)                
              }
            }          
          }
        }
      }
    }
    
    /* const [state, setState] = useState({        
        //Coordenadas de la parroquia Cuyuja
        //currentLocation: {lat: '-0.41185', lng: '-78.04139'}, coordenadas: [-0.4149555647213889, -78.02615761756898]
        currentLocation: {lat: '52.52437', lng: '13.41053'},
        //currentLocation: {lat: '-0.4149555647213889', lng: '-78.02615761756898'},        
        zoom: 13
    }) */
    
    //const [prediosJson, setPrediosJson] = useState({});


    const cl = props.idClave
    //console.log(cl)
    
    const center = [-0.4149555647213889, -78.02615761756898]//[51.505, -0.09]    
    const claveSeleccionada  = cl  //"1507520301031003"  //1507520301011002 00201
    const [mapLayers, setMapLayers] = useState([]);
    const [datos, setDatos] = useState({});
    //const [edificaciones, setEdificaciones] = useState([]);
    //const [manzanas, setManzanas] = useState([]);
    //const [idCoordenadas, SetIdCoordenadas] = useState([]);

    
    var coordenadas = ''
    //var idCoordenadas = ''
    var idCoord = ''
    var predios = ''
    var latitud = ''
    var longitud = ''
    var areaPredio = ''
    var perimetroPredio = ''
    var edificio = ''
    var lengShp = ''
    var areaShp = ''
    var manzanasA = ''  // "1507520301031 003"
    var acerasA = []
    var poligono = []
    var edificioPoligono = [] 
    var manzanaPoligono = []
    var acerasPoligonos = [] 
    var acerasPoligono = []
    var alcantarilladoPuntos = [] 
    var postesPuntos = []
    var pozosPuntos = []

    const _onCreate =async(e) => {

      var puntosPoligono = []
      const jsonPoligono = {
        shape: {
          "type": "Feature", 
          "properties": {"clave":claveSeleccionada},                   
          "geometry": 
          {"type": "Polygon", "coordinates": puntosPoligono}
        }
      }
      const { layerType, layer } = e;
      if( layerType === 'polygon') {
        const { _leaflet_id } = layer;
        setMapLayers((layers) =>[
          { id: _leaflet_id, latlngs: layer.getLatLngs()[0]}
        ])
        console.log(layer._latlngs[0])
        for(i=0;i<layer._latlngs[0].length;i++){
          puntosPoligono.push([layer._latlngs[0][i].lat,layer._latlngs[0][i].lng])
        }
        console.log(puntosPoligono);  
        console.log(jsonPoligono);  
        await axios.put('http://localhost/apicatastro/index.php/prediogeo/?clave='+claveSeleccionada, jsonPoligono)
        .then(response=>{
        console.log(jsonPoligono);
        console.log(e);
        console.log(mapLayers);
        })
      }
    }

    const _onEdited =(e) => {
      console.log(e);
      const {
        layers: { _layers },
      } = e;
      Object.values(_layers).map(({ _leaflet_id, editing }) => {
        setMapLayers((layers) => 
        layers.map((l) => l.id === _leaflet_id
        ? { latlngs: { ...editing.latlngs[0] }}
        :l) 
        );
      });

    };

    const _onDeleted =(e) => {
      console.log(e);
      const {
        layers: { _layers },        
      } = e;
      Object.values(_layers).map((_leaflet_id) => {
        setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
      });
    };
    
    //PETICIONES CARGA DATOS
    
    const getJsonPredio = async() => {
      const response = await axios.get('http://localhost/apicatastro/index.php/prediogeo/?clave='+claveSeleccionada);
      //console.log(response.data[0].shape);
      setDatos(response.data[0]);
    }

    

  const getPredio = () => {
    
    //console.log(datos[0].shape);
    //console.log(prediosJson)
    /* datos.map((dato, key)=>{
      if(dato.clavecatastral===claveSeleccionada){
        console.log('Clave encontrada: '+claveSeleccionada)
      }
    }) */    
    
    
    //console.log(datos);
    
          var bandera=0
          var tipo=''
          idCoord=[[0,0]];
          //Polígono de predio
          //datos?.map((dato, key) => {
            if (datos.clavecatastral === claveSeleccionada && datos.shape && datos.shape!== null)
            {
                //if(datos.shape.geometry.type==="MultiPolygon"){}

                //idCoordenadas=dato.geometry.coordinates          
                idCoord=datos.shape.geometry.coordinates
                tipo=datos.shape.geometry.type
                coordenadas=0//dato.properties.clave
                areaPredio=0//dato.properties.SHAPE_Area
                perimetroPredio=0//dato.properties.SHAPE_Leng
                bandera=1
                //console.log(dato.geometry.coordinates)            
                //return idCoordenadas                
                //console.log(idCoord);                          
            }
          //})
              if(bandera===0){
                //idCoord=[[0,0]];
                coordenadas=0;
                areaPredio=0;
                perimetroPredio=0;
              }
              bandera=0
          //Coordenadas predio
          coordenadasPredioJson.features?.map((dato, key) => {
            if (dato.properties.clave === claveSeleccionada)
            {                
                predios=dato.geometry.coordinates 
                //predios=[[-78.02615761756898,-0.4149555647213889]]
                latitud=dato.properties.LATITUD
                longitud=dato.properties.LONGITUD
                //console.log(predios);
                bandera=1
            } 
          })
          if(bandera===0){
            predios=[-78.02615761756898,-0.4149555647213889]
            latitud=0
            longitud=0
              //console.log(predios);
          }
          bandera=0

          //const coord = idCoordenadas[0][0]        
          //console.log(idCoord);          
          //console.log(datos.shape.geometry.type); 
          const coord = idCoord[0][0];//[0][0];
            //console.log(coord);
            //console.log(tipo);         
          
          if(tipo==='MultiPolygon' && coord!==0){
            
                coord?.map((i) =>{
                  //console.log(i[1])
                  var j = 0
                  j=i[0]
                  i[0]=i[1]
                  i[1]=j
                  poligono.push([i[1],i[0]])
                  //console.log(j)
                })
              }else{
                poligono=idCoord;
              }  
              
              
              

          /* if(coord.length===1){
            poligono=[[0,0]];
          } */
          
          //console.log(poligono)
          
          getEdificaciones();
          getManzanas();
          getAceras();
          getAlcantarillas();
          getPostes();
          getPozos();
          
        }
    
    
    
  
     
  const getEdificaciones = () => {
    var bnd=0
    edificacionesJson.features?.map((d, key) => {
      //console.log(d.properties.clave.substring(0, d.properties.clave.length -5 ))
      
      if (d.properties.clave.substring(0, d.properties.clave.length -5 ) === claveSeleccionada){
        //console.log(d.properties.clave) 
          edificio=d.geometry.coordinates
          lengShp=d.properties.SHAPE_Leng
          areaShp=d.properties.SHAPE_Area
          bnd=1
      } 
    })
    if(bnd===0){
      edificio=[[0,0]]
      lengShp=0
      areaShp=0
    }
    
    //const edificaciones = edificio[0][0] 
    const edificaciones = edificio[0][0];
    
    if(edificaciones!==0){
      edificaciones.map((i) =>{
        //console.log(i[1])
        var j = 0
        j=i[0]
        i[0]=i[1]
        i[1]=j
        edificioPoligono.push([i[1],i[0]])
        //console.log(j)
    }) 
    }else{
      edificioPoligono=[[0,0]];
    }

    }
      
  
  const getManzanas = () => {
    var bnd=0
    manzanasJson.features?.map((d, key) => {
      if (d.properties.clave === claveSeleccionada.substring(0, claveSeleccionada.length -3 )){
          manzanasA=d.geometry.coordinates
          bnd=1
      }
    })

    if(bnd===0){
      manzanasA=[[0,0]]
    }

    //const manzanas = manzanasA[0][0]
    const manzanas=manzanasA[0][0];
    
    if(manzanas!==0){
      manzanas?.map((i) => {
        var j = 0
        j=i[0]
        i[0]=i[1]
        i[1]=j
        manzanaPoligono.push([i[1],i[0]])
      })
    }else{
      manzanaPoligono=[[0,0]]
    }        
  }   

  const getAceras = () => {

        const ac = 
        Array.isArray(acerasJson.features)? acerasJson.features.map( acera =>{
          return {
            aceraCoordenadas: acera.geometry,
            properties: acera.properties
          }  
        }):null
      
        for (let index = 0; index < ac.length; index++) {      
          for (let j = 0; j < ac[index].aceraCoordenadas.coordinates.length; j++) {
            const arrayAceras = ac[index].aceraCoordenadas.coordinates[j];        
            acerasA.push(arrayAceras)
          }
        }

        
        acerasA?.map((i) => {
          
          //console.log(i);
          var j = 0
          
          for (let index = 0; index < i.length; index++) {
            for (let k = 0; k < i[index].length; k++) {
              const coordenadaAcera = i[index][k];
              //console.log(coordenadaAcera[0])
              j=coordenadaAcera[0]
              coordenadaAcera[0]=coordenadaAcera[1]
              coordenadaAcera[1]=j
              acerasPoligono.push([coordenadaAcera[1],coordenadaAcera[0]])
            }
          }
          acerasPoligonos.push(acerasPoligono)          
    }) 
    
  } 
    

  const getAlcantarillas = () => {
      const coordenadasAlcantarillas = alcantarillasJson.features?.map( alcatarilla =>{
        return {
          alcantarillaCoordenadas: alcatarilla.geometry.coordinates
        }
      })
      
        coordenadasAlcantarillas.map((i) => {          
            alcantarilladoPuntos.push([i.alcantarillaCoordenadas[1],i.alcantarillaCoordenadas[0],i.alcantarillaCoordenadas[2]])
    })

  }
    
  const getPostes = () => {

    const coordenadasPostes = postesJson.features?.map( poste => {
      return {
        postesCoordenadas : poste.geometry.coordinates
      }
    })
    
        coordenadasPostes.map((i) => {          
            postesPuntos.push([i.postesCoordenadas[1],i.postesCoordenadas[0],i.postesCoordenadas[2]])
    })

  } 
    
  const getPozos = () => {

    const coordenadasPozo = pozoJson.features?.map( pozo => {
      return {
        pozosCoordenadas : pozo.geometry.coordinates
      }
    })
    
        coordenadasPozo.map((i) => {          
            pozosPuntos.push([i.pozosCoordenadas[1],i.pozosCoordenadas[0],i.pozosCoordenadas[2]])
    })
  } 
   
    
    /* if(edificio.length!==0){
      edificaciones= edificio[0][0];
    } */
    
    /* if(manzanasA.length!==0){
      manzanas= manzanasA[0][0];
    }        */
    
    //const aceras = acerasA[0]
    //console.log(poligono) 
    //console.log(acerasPoligonos)      

    //console.log(alcantarilladoPuntos.length);
    
    /* const multiPolyline = [
        [
          [51.5, -0.1],
          [51.5, -0.12],
          [51.52, -0.12],
        ],
        [
          [51.5, -0.05],
          [51.5, -0.06],
          [51.52, -0.06],
        ],
      ] */
    /*  var polygon2 = [ 
        [ -0.414368658360593, -78.026390496631407],
        [ -0.414421228866479, -78.026405065549682],
        [ -0.414406862306678, -78.026457796068769],
        [ -0.414404035550318, -78.026468170198299],
        [ -0.414394960697799, -78.026501478173287],
        [ -0.414383241344495, -78.026544496075971],
        [ -0.41415979883319, -78.026481379786048],
        [ -0.414213000732157, -78.026347358997569],
        [ -0.414368658360593, -78.026390496631407] 
    ] */  

      //console.log(polygon2)                
      
      //center={{lat:predios[1], lng:predios[0]}}

      var x = ''
      var y = ''
      //console.log(poligono); 
      
            getPredio();            
            x=parseFloat(predios[1]);
            y=parseFloat(predios[0]);
            //console.log(x);
            //console.log(y);
     
    //predios=[[-0.4149555647213889, -78.02615761756898]]
    //center={{lat:predios[1], lng:predios[0]}}
    
    
    useEffect(()=>{   
      
      getJsonPredio();
      getPredio();                 
              
    },[]);

    return (
      <>

    <MapContainer center={[x, y]} zoom={16} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      //attribution= 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      //url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
    />
    <FeatureGroup>
    <EditControl
      position='topright'
      onCreated={_onCreate}
      //onEdited={_onEdited}
      //onDeleted={_onDeleted}
      draw={{
        rectangle: false,
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false
      }}
    
    />
    </FeatureGroup>

    <LayersControl position="topright">
    
      <LayersControl.Overlay name="Centro parroquial">
        <Marker position={center} icon={markerIcon}>
          <Popup>
            Punto central de  <br /> Cuyuja
          </Popup>
        </Marker>
      </LayersControl.Overlay>




      {/* <LayersControl.Overlay checked name="Coordenadas">
        <LayerGroup>          
          <Circle
            center={predios}
            pathOptions={{ fillColor: 'red' }}
            radius={30}
            stroke={false}
          />
          <LayerGroup>
            <Circle
              center={{lat:predios[1], lng:predios[0]}}
              pathOptions={{ color: 'green', fillColor: 'green' }}
              radius={2}              
            />            
          </LayerGroup>          
        </LayerGroup>        
      </LayersControl.Overlay> */}

      {/* <LayersControl.Overlay name="Edificaciones">
        <FeatureGroup pathOptions={{ color: 'purple' }}>
          
          <Polygon pathOptions={{ color: 'purple', weight: 1.8, fillOpacity: 1}} positions={edificioPoligono} />
          <Popup>
          <b>Edificación</b><br /> área: {areaShp} m² <br/> perímetro: {lengShp} m
          </Popup>

        </FeatureGroup>
      </LayersControl.Overlay> */}

      <LayersControl.Overlay checked name="Predio">
        <FeatureGroup pathOptions={{ color: 'purple' }}>
          
          <Polygon pathOptions={{ weight: 1.8, fillOpacity: 0.15 }} positions={poligono} />
          <Popup>
            <b>Coordenadas Predio</b><br /> {poligono}
          </Popup>

        </FeatureGroup>
      </LayersControl.Overlay>

      {/* <LayersControl.Overlay name="Manzana">
        <FeatureGroup pathOptions={{ color: 'red' }}>
          
          <Polygon pathOptions={{ weight: 1.5, fillOpacity: 0.15 }} positions={manzanaPoligono} />
          <Popup>
            Hola soy una <br /> manzana
          </Popup>

        </FeatureGroup>
      </LayersControl.Overlay> */}
      





      <LayersControl.Overlay name="aceras">
        <FeatureGroup pathOptions={{ color: '#2a54ae' }}>
        
        <Polygon pathOptions={{ weight: 1.5, fillOpacity: 0.1 }} positions={acerasPoligonos} />
          
          <Popup>
            Hola soy una<br /> acera
          </Popup>

        </FeatureGroup>
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Alcantarillado">
        <LayerGroup>         
          
          <LayerGroup>

          {alcantarilladoPuntos.map(punto => (
             <Circle
             center={{lat:punto[0], lng:punto[1]}}                    
             pathOptions={{ color: 'black', fillColor: 'green' }}
             radius={2}              
           >
            <Popup>
            <b>Alcantarillado:</b><br></br>              
            <b>Lat:</b>{punto[0]}<br></br>
            <b>Lng:</b>{punto[1]}<br></br>
            <b>Elevación:</b>{punto[2]}
          </Popup>
           </Circle>   
          ))}                 
          
          </LayerGroup>          
        </LayerGroup>        
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Postes">
        <LayerGroup>         
          
          <LayerGroup>

          {postesPuntos.map(punto => (
             <Circle
             center={{lat:punto[0], lng:punto[1]}}                    
             pathOptions={{ color: '#2bbf25', fillColor: '#2bbf25' }}
             radius={2}              
           >
            <Popup>
            <b>Poste:</b><br></br>  
            <b>Lat:</b>{punto[0]}<br></br>
            <b>Lng:</b>{punto[1]}<br></br>
            <b>Altura:</b>{punto[2]}
          </Popup>
           </Circle>   
          ))}                 
          
          </LayerGroup>          
        </LayerGroup>        
      </LayersControl.Overlay>

      <LayersControl.Overlay  name="Pozos_rejilla">
        <LayerGroup>         
          
          <LayerGroup>

          {pozosPuntos.map(punto => (
             <Circle
             center={{lat:punto[0], lng:punto[1]}}                    
             pathOptions={{ color: '#e67540', fillColor: '#e67540' }}
             radius={2}              
           >
            <Popup>
            <b>Pozo_rejilla:</b><br></br>  
            <b>Lat:</b>{punto[0]}<br></br>
            <b>Lng:</b>{punto[1]}<br></br>
            <b>Altura:</b>{punto[2]}
          </Popup>
           </Circle>   
          ))}                 
          
          </LayerGroup>          
        </LayerGroup>        
      </LayersControl.Overlay>

      

      </LayersControl>

    
    </MapContainer>   

    </>);
}

export default MapView;