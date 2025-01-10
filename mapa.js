var arrayCabeceraEvolucion = [];
var arrayTratoDirectoEvolucion = [];
var arrayExpropiacionEvolucion = [];
var arrayPagoMejorasEvolucion = [];
var arrayInterferenciasEvolucion = [];
var geojson = null;
var geojson2 = null;
var datosGraficos = null;
var datosProyeccionProyecto = [];
//var legendx = null;
var legendx = L.control({ position: "bottomright" });

jQuery.redondeo = function (numero) {
    return jQuery.formato_numero(numero, 0, '.', ',');
}

jQuery.formato_numero = function (numero, decimales, separador_decimal, separador_miles) { // v2007-08-06
    numero = parseFloat(numero);
    if (isNaN(numero)) {
        return "";
    }

    if (decimales !== undefined) {
        // Redondeamos
        numero = numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero = numero.toString().replace(".", separador_decimal !== undefined ? separador_decimal : ",");
    if (separador_miles) {
        // A�adimos los separadores de miles
        var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
        while (miles.test(numero)) {
            numero = numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }

    return numero;
}

//var map = L.map('map',{fullscreenControl: true}).setView([-7.139846, -78.490866], 13);
var map = L.map('map',{fullscreenControl: true}).setView([-9.25, -75.6958], 6);

var esri= L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          { attribution : 'Esri' });

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                    maxZoom: 22,
                    subdomains:['mt0','mt1','mt2','mt3']
                    });

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                maxZoom: 24,
                subdomains:['mt0','mt1','mt2','mt3']
                });

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'OSM'
            });

/* Capas añadidas como layer privados - considerados overlayMaps*/

var ortofoto = L.tileLayer('http://localhost:8091/geoserver/gwc/service/tms/1.0.0/ortofoto:ortocajafull@EPSG:900913@png/{z}/{x}/{y}.png8', {
                transparent: true,
                maxZoom: 28,
                tms: true
            });


/* Fin de capas añadidas */


var baseLayers = {

    "Satelite Esri": esri,
    "Google Maps":googleStreets,
    "Google Satelite":googleSat,

};

var overlayMaps = {
    "Ortofoto del Lugar":ortofoto
};

googleSat.addTo(map);
L.control.layers(baseLayers,overlayMaps).addTo(map);

map.on('overlayadd', function(e) {
  console.log(e);
  map.panTo(e.layer);
});

 map.on('baselayerchange', function(e) {
    console.log(e);
    map.fitBounds(e.layer);
  });

function resetHighlight(e) {
        geojson.resetStyle(e.target);
        $('#expediente').text("")
        $('#tipo_procedimiento').text("")
        $('#titulares').text("")
        $('#monto_pagar').text("")
        $('#nro_resolucion').text("")
        $('#fecha_publicacion_rm').text("")
        $('#area_adquirida').text("")
        $('#valor_metro').text("")

    }

 function highlightFeature(e) {
          var layer = e.target;
          let propiedades=layer.feature.properties;
          $('#expediente').text(propiedades.expediente)
          $('#tipo_procedimiento').text(propiedades.tipo_procedimiento)
          $('#titulares').text(propiedades.titulares)
          $('#monto_pagar').text('S/. '+jQuery.redondeo(propiedades.monto_pagar))
          $('#nro_resolucion').text(propiedades.nro_resolucion)
          $('#fecha_publicacion_rm').text(propiedades.fecha_publicacion_rm)
          $('#area_adquirida').text(jQuery.redondeo (propiedades.area_adquirida) +' m2')
          $('#valor_metro').text('S/. ' +jQuery.redondeo (propiedades.valor_metro))

          layer.setStyle({
              weight: 5,
              color: '#00FFFF',
              dashArray: '',
              fillOpacity: 0.1
          });
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              layer.bringToFront();
          }
    }


function generarMapatematico(mapaTematico, poligonoPMD){
  /*Cargando el Polygono mama*/
  geojson2 = L.geoJson(poligonoPMD, {
          style: {
              weight: 7,
              opacity: 1,
              color: 'red',
              dashArray: '1',
              fillOpacity: 0/*,
              fillColor: "red"*/
          }
          , onEachFeature: function (feature, layer) {
                  if (feature.properties) {
                    layer.bindPopup(
                          Object.keys(feature.properties).map(function (k) {
                          return k.toUpperCase() + ": " + feature.properties[k];
                      }).join("<br />"), {
                          maxHeight: 520,
                         maxWidth : 560
                      }
                      );
                  }
              }

  });
  geojson2.addTo(map);
  map.fitBounds(geojson2.getBounds());

  if (mapaTematico.features)
  {
    geojson = L.geoJson(mapaTematico, {
            style: style
            , onEachFeature: function (feature, layer) {
                layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                });
                if (feature.properties) {
                      layer.bindPopup(
                        `
                        <span><b>EXPEDIENTE </b></span><br>
                        <span >${feature.properties.expediente}</span>
                        <br>

                        <span><b>TITULARES </b></span><br>
                        <span >${feature.properties.titulares}</span>

                        <br>
                        <span><b>MONTO PAGADO </b></span><br>
                        <span > S/. ${jQuery.redondeo(feature.properties.monto_pagar)}</span>
                        <br>

                        <span><b>PROCEDIMIENTO </b></span><br>
                        <span >${feature.properties.tipo_procedimiento}</span>

                        <br>

                        <span><b>NRO RM </b></span><br>
                        <span >${feature.properties.nro_resolucion}</span>

                        <br>

                        <span><b>FECHA RM </b></span><br>
                        <span >${feature.properties.fecha_publicacion_rm}</span> <br>

                        <span><b>AREA </b></span><br>
                        <span >${jQuery.redondeo(feature.properties.area_adquirida)} m2</span>  <br>

                        <span><b>PRECIO POR METRO CUADRADO </b></span><br>
                        <span >s/. ${jQuery.redondeo(feature.properties.valor_metro)}</span>
                        `
                        );
                    }
                }
    });
    geojson.addTo(map);
  }

    function style(feature) {
		return {
			weight: 3,
			opacity: 1,  
			color: feature.properties.color,
			fillOpacity: 0,
			fillColor: feature.properties.color
		};
    }
}


 function createCaracteristicas(map) {

    /*Legend specific*/
    var legend = L.control({ position: "topright" });

    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML =
        `

          <div id="divcaracteristicas" style=""><a id="mostrarcaractersiticas" href="#">Caracteristicas</a></div>
          <div id="layoudCaracteristicas" style="display:none">
        <h4>CARACTERISTICAS</h4>

<div style="width:350px">
             <span><b>EXPEDIENTE </b></span><br>
        <span id="expediente"></span>
        <br>

         <span><b>TITULARES </b></span><br>
        <span id="titulares"></span>

<br>
           <span><b>MONTO PAGAR </b></span><br>
        <span id="monto_pagar"></span>
<br>

             <span><b>PROCEDIMIENTO </b></span><br>
        <span id="tipo_procedimiento"></span>

        <br>

            <span><b>NRO RM </b></span><br>
        <span id="nro_resolucion"></span>

        <br>

            <span><b>FECHA RM </b></span><br>
        <span id="fecha_publicacion_rm"></span>

        <br>

        <span><b>AREA ADQUIRIDA </b></span><br>
          <span id="area_adquirida"></span>    <br>

<span><b>PRECIO POR METRO CUADRADO </b></span><br>
   <span id="valor_metro"></span>    <br>


        </div>
          </div>
`
        return div;
    };
    legend.addTo(map);

}

createCaracteristicas(map)


 function evolucionEstados(map) {

    /*Legend specific*/
    var legend = L.control({ position: "topleft" });

    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML = `
        <div id="oevolucionEstados" style=""><a id="mostraravance" href="#">Mostrar Avance</a></div>
        <div id="evolucionEstados" style="heigth:600px"></div>
        `
        return div;
    };
    legend.addTo(map);
}

evolucionEstados(map)

$('#mostraravance').click(function(e){
    $('#evolucionEstados').show()
    if($('#mostraravance').text()=='Cerrar'){
        $('#evolucionEstados').hide()
          $('#mostraravance').text('Mostrar Avance')
    }else{
         $('#evolucionEstados').show()
          $('#mostraravance').text('Cerrar')
    }

})


$('#mostrarcaractersiticas').click(function(e){

    if($('#mostrarcaractersiticas').text()=='Caracteristicas'){

          $('#layoudCaracteristicas').show()
          $('#mostrarcaractersiticas').text('Cerrar')

    }else{
          $('#layoudCaracteristicas').hide()
          $('#mostrarcaractersiticas').text('Caracteristicas')
    }

})

function doSum(...items) {
    let sum = 0;
    for (let item of items){
        sum += item;
    }
    return sum;
}


function cargarEvolucion(proyecto){
  switch(proyecto)
  {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '10':
      case '11':
      case '12':
      case '13':
      case '14':
      case '15':
      case '16':
      case '17':
      case '18':
      case '19':
      case '20':
      case '21':
      case '22':
      case '23':
      case '24':
      case '25':
      case '26':
      case '27':
      case '28':
      case '29':
      case '30':
      case '31':
      case '32':
      case '33':
      case '34':
      case '35':
      case '36':
      case '37':
      case '38':
      case '39':
      case '40':
          cargaDatosEvolucion(proyecto);
          break;
      default:
          arrayCabeceraEvolucion = [];
          arrayTratoDirectoEvolucion = [];
          arrayExpropiacionEvolucion = [];
          arrayPagoMejorasEvolucion = [];
          arrayInterferenciasEvolucion = [];
          RenderChartEvolucion()
          $('#evolucionEstados').hide();
          break;
  }
}

function RenderChartEvolucion(){
$('#evolucionEstados').css('width', '600px');
Highcharts.chart('evolucionEstados', {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Evolución de Estados por Mes'
  },
  subtitle: {
    text: 'Origen: información propia'
  },
  xAxis: {
    categories: arrayCabeceraEvolucion //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    title: {
      text: 'Cantidad de Predios'
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true
      },
      enableMouseTracking: false
    }
  },
  series: [{
    name: 'TRATO DIRECTO',
    color: '#EAEA02',
    data: arrayTratoDirectoEvolucion
  }, {
    name: 'EXPROPIACION',
    color: '#FF8040',
    data: arrayExpropiacionEvolucion
  }, {
    name: 'PAGO MEJORAS',
     color: '#4AFD4A',
    data: arrayPagoMejorasEvolucion
  }, {
    name: 'INTERFERENCIAS',
     color: '#A34BFD',
    data: arrayInterferenciasEvolucion
  }]
});

 createLeyenda(map)
}



function createLeyenda(map) {

    /*Legend specific*/
    legendx.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML = `
        <h4>Leyenda</h4>
        <i style="background: #FFFF00"></i><span><b>Trato Directo (${doSum(...arrayTratoDirectoEvolucion)})</b></span><br>
        <i style="background: #FF8040"></i><span><b>Expropiación (${doSum(...arrayExpropiacionEvolucion)})</b> </span><br>
               <i style="background: #00FF00"></i><span><b>Pago de Mejoras (${doSum(...arrayPagoMejorasEvolucion)})</b> </span><br>
                      <i style="background: #0080FF"></i><span><b>Trans. Interestatal (${doSum(...[0])})</b> </span><br>

                        <i style="background: #7E00FF"></i><span><b>Inteferencias (${doSum(...arrayInterferenciasEvolucion)})</b> </span><br>`
    return div;
    };
}

/*Funciones para cargar datos*/
	var urlDataService = 'https://api.jsonbin.io/b/5e17350e5df6407208326228/2'; 

	arrayValoresDefault = [0, 0, 0, 0, 0];
    arrayCabeceraDefault = ['TRATO DIRECTO', 'EXPROPIACIÓN', 'PAGO DE MEJORAS', 'TRANSFERENCIA INTERESTATAL', 'INTERFERENCIAS'];

var valorYear = '00';
function loadDataYear(selectObject){
  valorYear = selectObject.value;
  cargarDatosPagina(valorProyecto);
}

var valorProyecto = '';
function loadData(selectObject) {
  valorProyecto = selectObject.value;
  cargarDatosPagina(valorProyecto);
}

function cargarDatosPagina(proyecto){
  if (!proyecto) {
    return;  
  }
    
    switch(proyecto)
    {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '10':
      case '11':
      case '12':
      case '13':
      case '14':
      case '15':
      case '16':
      case '17':
      case '18':
      case '19':
      case '20':
      case '21':
      case '22':
      case '23':
      case '24':
      case '25':
      case '26':
      case '27':
      case '28':
      case '29':
      case '30':
      case '31':
      case '32':
      case '33':
      case '34':
      case '35':
      case '36':
      case '37':
      case '38':
      case '39':
      case '40':
          ejecutarCargaProyecto(proyecto);
          break;
      default:
          cargarEvolucion('');
          if(legendx)
          {
              map.removeControl(legendx);
          }
          
          if(geojson)
          {
              geojson.remove(map);
              geojson2.remove(map);
          }
          cargarPrediosDesdeBD(false, '');
          cargarAreaDesdeBD(false);
          cargarMontoDesdeBD(false);
          RenderOtrosMonto(false);
          RenderOtrosArea(false);
          RenderOtrosEstado(false);
          break;
    }

}

function ejecutarCargaProyecto(gid){
  if(geojson)
  {
      geojson.remove(map);
  }
  if(geojson2)
  {
      geojson2.remove(map);
  }
  if(legendx)
  {
      map.removeControl(legendx);
  }

  cargarPMDyGenerarMapaTematico(gid);
  cargarEvolucion(gid);
  cargarDatosProyeccion(true, gid);
}