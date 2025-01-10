var ejecutadoPredios = 0;
var proyectadoPredios = 0;
var porcentajePredios = 0;
var totalGlobalPredios = 0;
var porcentajeGlobalPredios = 0;
var arrayValoresEstado = [];
var arrayCabeceraEstado = [];
var arrayProyectadoEstado = [];
var coloresCharts = ['rgba(102,187,106, 0.9)', 'rgba(30,136,229, 0.9)', '#1e88e5', '#66bb6a', '#f1948a', '#f44336' ];
var coloresCharts1 = ['rgba(30,136,229, 0.9)', 'rgba(102,187,106, 0.9)','#1e88e5', '#66bb6a', '#f1948a', '#f44336' ];
cargarPrediosDesdeBD(false);
RenderOtrosEstado(false)

function cargarPrediosDesdeBD(flagBD, datos, proyecto){
  arrayValoresEstado = [];
  arrayCabeceraEstado = [];
  ejecutadoPredios = 0;
  proyectadoPredios = 0;
  totalGlobalPredios = 0;

  if (flagBD){

    if (datosProyeccionProyecto && datosProyeccionProyecto.length > 0){
      proyectadoPredios = datosProyeccionProyecto[0].totalpredio;
      totalGlobalPredios = datosProyeccionProyecto[0].totalprediosproyecto;
      arrayProyectadoEstado = [datosProyeccionProyecto[0].prediotratodirecto,
                              datosProyeccionProyecto[0].predioexpropiacion,
                              datosProyeccionProyecto[0].prediopagomejoras,
                              datosProyeccionProyecto[0].prediotransferencia,
                              datosProyeccionProyecto[0].prediointerferencia]; 
    } else {
      proyectadoPredios = 0;
      totalGlobalPredios = 0;
      arrayProyectadoEstado = [0, 0, 0, 0, 0]; 
    }
    
    if(datos)
    {
      datos.forEach(function(tipo) {
        arrayValoresEstado.push(+tipo.total);
        arrayCabeceraEstado.push(tipo.tipo_procedimiento_kpi);
        ejecutadoPredios += +tipo.total;
      })

      porcentajePredios = 0;
      if (proyectadoPredios > 0)
      {
        porcentajePredios = (ejecutadoPredios * 100)/proyectadoPredios;  
      }

      porcentajeGlobalPredios = 0;
      if (totalGlobalPredios > 0)
      {
        porcentajeGlobalPredios = (ejecutadoPredios * 100)/totalGlobalPredios;  
      }
      renderPageEstado(arrayValoresEstado, arrayCabeceraEstado, arrayProyectadoEstado);

    } else {
      setValoresVacios();
    }

  } else {
    setValoresVacios();
  }
}

function setValoresVacios()
{
  ejecutadoPredios = 0;
  proyectadoPredios = 0;
  porcentajePredios = 0;
  porcentajeGlobalPredios = 0;
  renderPageEstado(arrayValoresDefault, arrayCabeceraDefault, arrayValoresDefault);
}

function renderPageEstado(arrayValores, arrayCabecera, arrayProyectado){
  document.getElementById("proyectadoPredios").innerHTML = proyectadoPredios;
  document.getElementById("ejecutadoPredios").innerHTML = ejecutadoPredios;
  document.getElementById("porcentajePredios").innerHTML = Math.round(porcentajePredios * 100) / 100;
  document.getElementById("totalPrediosAvance").innerHTML = Math.round(porcentajeGlobalPredios * 100) / 100;

  Highcharts.chart('predios', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Predios'
    },
    colors: coloresCharts1,
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: arrayCabecera,//['Trato directo', 'Expropiación', 'Pago de Mejoras', 'Transferencia Interestatal', 'Interferencias'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: '# de Predios',
        align: 'high'
      },
      labels: {
        overflow: 'right'
      }
    },
    tooltip: {
      valueSuffix: ' Predios'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'bottom',
      //x: 0,
      //y: 200,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [/*{
      name: 'Proyectado',
      data: arrayProyectado//[40, 8, 1, 0, 0]
    }, */{
      name: 'Ejecutado',
      data: arrayValores//[133, 156, 947, 408, 6]
    }]
  });
}

function RenderOtrosEstado(noCero){
  var liberado = 0;
  var nr = 0;
  var totalPredProyecto = 0;
  var ejecutado = 0;
  var pendiente = 0;
  var pendiente = 0;
  var ejecutado = 0;

if (datosProyeccionProyecto && datosProyeccionProyecto.length > 0){
  liberado = datosProyeccionProyecto[0].predioliberado;
  nr = datosProyeccionProyecto[0].predionr;
  totalPredProyecto = datosProyeccionProyecto[0].totalprediosproyecto;
}

if (proyectadoPredios > 0){
  var ejecutado = (100*ejecutadoPredios)/proyectadoPredios;
 if (ejecutado < 100)
  {
    pendiente = 100 - ejecutado;
  }
}

  if(noCero){
    document.getElementById("totalPrediosLiberados").innerHTML = liberado + nr;
    document.getElementById("totalPrediosProyecto").innerHTML = totalPredProyecto;
    document.getElementById("porcEjecutado").innerHTML =  Math.round(ejecutado * 100) / 100;
    document.getElementById("porcPendiente").innerHTML =  Math.round(pendiente * 100) / 100;
  } else {
    document.getElementById("totalPrediosLiberados").innerHTML = 0;
    document.getElementById("totalPrediosProyecto").innerHTML = 0;
    document.getElementById("porcEjecutado").innerHTML = 0;
    document.getElementById("porcPendiente").innerHTML = 0;
  }

  Highcharts.chart('liberado', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Liberado'
    },
    colors: coloresCharts,
    xAxis: {
      categories: ['Total Predios']
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          /*color: ( // theme
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) || 'gray'*/
        }
      }
    },
    legend: {
      align: 'center',
      //x: -30,
      verticalAlign: 'top',
      //y: 25,
      floating: false,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: true
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
      name: 'Liberados',
      data: (function () {
        var data = [];
        if(noCero){
          data.push(liberado);
        } else {
          data.push(0);
        }
        return data;
        }())
    }, {
      name: 'NR',
      data: (function () {
        var data = [];
        if(noCero){
          data.push(nr);
        } else {
          data.push(0);
        }
        return data;
        }())
    }]
  });


  Highcharts.chart('presupuesto', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Cumplimiento',
      align: 'center',
      verticalAlign: 'middle',
      y: -80
    },
    colors: coloresCharts,
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        /*startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'*/
      }
    },
    series: [{
      type: 'pie',
      name: 'predios',
      //  innerSize: '50%',
      data: (function () {
        var data = [];
        if(noCero && proyectadoPredios > 0){
          data.push(['Ejecutado', ejecutado]);
          data.push(['Pendiente', pendiente]);
        }
        return data;
        }())
    }]
  });
}