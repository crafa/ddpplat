var serverJson = "https://931b-38-255-108-207.ngrok-free.app/api";

$(document).ready(function(){
   $("#selectProyecto").select2();
   llenarComboProyectos();
});


function llenarComboProyectos() {
  $.ajax({
      url: serverJson + "/proyectos",
      dataType: "json",
      type: "get",
      cache : false,
      success: function (data) {
        //alert(data);
          $("#selectProyecto").select2({ data: data });
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
  });
}

function cargarPMDyGenerarMapaTematico(gid) {
  $.ajax({
    url: serverJson + "/pmd",
    dataType: "json",
    data: {'id': gid},
    type: "get",
    cache : false,
    success: function (data) {
      if (data[0])
      {
        generacionMapaTematicoServer(data[0].geojson, gid);  
      }
      return '';
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
      alert('No se pudo cargar la información');
      return '';
    }
  });
}

function generacionMapaTematicoServer(pmd ,gid){
  $.ajax({
    url: serverJson + "/mapatematico",
    dataType: "json",
    data: {'id': gid, 'year': valorYear},
    type: "get",
    cache: false,
    success: function (data) {
      if (data[0])
      {
        generarMapatematico(data[0].geojson, pmd);
      }
      return '';
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
      alert('No se pudo cargar la información');
      return '';
    }
  });
}

function cargaDatosEvolucion(gid){
  arrayCabeceraEvolucion = [];
  arrayTratoDirectoEvolucion = [];
  arrayExpropiacionEvolucion = [];
  arrayPagoMejorasEvolucion = [];
  arrayInterferenciasEvolucion = [];
  let url = new URL(serverJson + "/evolucionProyecto");
  url.search = new URLSearchParams({
    id: gid,
    year: valorYear});

  var myHeaders = new Headers();
  myHeaders.append('pragma', 'no-cache');
  myHeaders.append('cache-control', 'no-cache');

  var myInit = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(url, myInit)
  .then(response => response.json())
  .then(json => {
      json.trato_directo.forEach(function(value) {
        arrayCabeceraEvolucion.push(value.periodo);
        arrayTratoDirectoEvolucion.push(+value.cantidad);
        });
      json.expropiacion.forEach(function(value) {
        arrayExpropiacionEvolucion.push(+value.cantidad);
      })
      json.pago_de_mejoras.forEach(function(value) {
        arrayPagoMejorasEvolucion.push(+value.cantidad);
      })
      json.interferencias.forEach(function(value) {
        arrayInterferenciasEvolucion.push(+value.cantidad);
      })

      RenderChartEvolucion()
      $('#evolucionEstados').hide();
      legendx.addTo(map);
  })
  .catch(error => {
    console.log(error);
  });
}

function cargarDatosProyeccion(flagDB, gid){
  let url = new URL(serverJson + "/datosProyectados");
  url.search = new URLSearchParams({
    id: gid,
    year: valorYear});

  var myHeaders = new Headers();
  myHeaders.append('pragma', 'no-cache');
  myHeaders.append('cache-control', 'no-cache');

  var myInit = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(url, myInit)
  .then(response => response.json())
  .then(json => {
    datosProyeccionProyecto = json;
    cargarGraficosDesdeBD(true, gid);
  })
  .catch(error => {
    console.log(error);
  });
}

function cargarGraficosDesdeBD(flagDB, gid){
  let url = new URL(serverJson + "/datosGrafico");
  url.search = new URLSearchParams({
    id: gid,
    year: valorYear});

  var myHeaders = new Headers();
  myHeaders.append('pragma', 'no-cache');
  myHeaders.append('cache-control', 'no-cache');

  var myInit = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(url, myInit)
  .then(response => response.json())
  .then(json => {
    datosGraficos = json;
    //por predio
    cargarPrediosDesdeBD(true, datosGraficos, gid);
    RenderOtrosEstado(true);
    //por area
    cargarAreaDesdeBD(true, datosGraficos, gid);
    //RenderOtrosArea(true);
    //por presupuesto
    cargarMontoDesdeBD(true, datosGraficos, gid);
    //RenderOtrosMonto(true);
  })
  .catch(error => {
    console.log(error);
  });
}


