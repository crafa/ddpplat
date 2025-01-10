var ejecutadoMonto = 0;
var proyectadoMonto = 0;
var porcentajeMonto = 0;
var totalGlobalMonto = 0;
var porcentajeGlobalMonto = 0;
var arrayValoresMonto = [];
var arrayCabeceraMonto = [];
var arrayProyectadoMonto = [];
cargarMontoDesdeBD(false);
RenderOtrosMonto(false);
var coloresCharts = ['rgba(102,187,106, 0.9)', 'rgba(30,136,229, 0.9)', '#1e88e5', '#66bb6a', '#f1948a', '#f44336' ];
var coloresCharts1 = ['rgba(30,136,229, 0.9)', 'rgba(102,187,106, 0.9)','#1e88e5', '#66bb6a', '#f1948a', '#f44336' ];

function cargarMontoDesdeBD(flagBD, datos, proyecto){
  arrayValoresMonto = [];
  arrayCabeceraMonto = [];
  ejecutadoMonto = 0;
  proyectadoMonto = 0;
  totalGlobalMonto = 0;


  if (flagBD){

    if (datosProyeccionProyecto && datosProyeccionProyecto.length > 0){
      proyectadoMonto = parseFloat(datosProyeccionProyecto[0].totalmonto);
      totalGlobalMonto = parseFloat(datosProyeccionProyecto[0].totalmontoproyecto);
      arrayProyectadoMonto = [parseFloat(datosProyeccionProyecto[0].montotratodirecto),
                              parseFloat(datosProyeccionProyecto[0].montoexpropiacion),
                              parseFloat(datosProyeccionProyecto[0].montopagomejoras),
                              parseFloat(datosProyeccionProyecto[0].montotransferencia),
                              parseFloat(datosProyeccionProyecto[0].montointerferencia)]; 
    } else {
      proyectadoMonto = 0;
      totalGlobalMonto = 0;
      arrayProyectadoMonto = [0, 0, 0, 0, 0]; 
    }

    if(datos)
    {
      datos.forEach(function(tipo) {
        arrayValoresMonto.push(+tipo.totalmonto);
        arrayCabeceraMonto.push(tipo.tipo_procedimiento_kpi);
        ejecutadoMonto += +tipo.totalmonto;
      })

      porcentajeMonto = 0;
      if (proyectadoMonto > 0)
      {
        porcentajeMonto = (ejecutadoMonto * 100)/proyectadoMonto;  
      }

      porcentajeGlobalMonto = 0;
      if (totalGlobalMonto > 0)
      {
        porcentajeGlobalMonto = (ejecutadoMonto * 100)/totalGlobalMonto;  
      }

      renderPageMonto(arrayValoresMonto, arrayCabeceraMonto, arrayProyectadoMonto);

    } else {
      setValoresVaciosMonto();
    }

  } else {
      setValoresVaciosMonto();
    }
  }


function setValoresVaciosMonto()
{
  ejecutadoMonto = 0;
  proyectadoMonto = 0;
  porcentajeMonto = 0;
  porcentajeGlobalMonto = 0;
  renderPageMonto(arrayValoresDefault, arrayCabeceraDefault, arrayValoresDefault);
}


function renderPageMonto(arrayValores, arrayCabecera, arrayProyectado){
  document.getElementById("proyectadoMonto").innerHTML = proyectadoMonto;
  document.getElementById("ejecutadoMonto").innerHTML = ejecutadoMonto;
  document.getElementById("porcentajeMonto").innerHTML = Math.round(porcentajeMonto * 100) / 100;
  document.getElementById("montoAvanceGlobal").innerHTML = Math.round(porcentajeGlobalMonto * 100) / 100;

Highcharts.chart('monto1', {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Monto en  Millones (S/.)'
  },
  colors: coloresCharts1,
  subtitle: {
    text: ''
  },
  xAxis: {
    categories: arrayCabecera,//['Trato directo', 'Expropiación', 'Pago de Mejoras', 'Transferencia Interestatal', 'Inteferencias'],
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'S/. Millones',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    valueSuffix: ' S/. Millones Soles'
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
    //x: -10,
    //y: 140,
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
    data: arrayProyectado//[40, 25, 1, 0, 0]
  },*/ {
    name: 'Ejecutado',
    data: arrayValores//[133, 156, 947, 408, 6]
  }]
});
}

function RenderOtrosMonto(noCero){
var liberado = 0;
  var nr = 0;
  var totalMonProyecto = 0;
  var ejecutado = 0;
  var pendiente = 0;
  var pendiente = 0;
  var ejecutado = 0;

if (datosProyeccionProyecto && datosProyeccionProyecto.length > 0){
  liberado = parseFloat(datosProyeccionProyecto[0].montoliberado);
  nr = parseFloat(datosProyeccionProyecto[0].montonr);
  totalMonProyecto = datosProyeccionProyecto[0].totalmontoproyecto;
}

if (proyectadoMonto > 0){
  var ejecutado = (100*ejecutadoMonto)/proyectadoMonto;
 if (ejecutado < 100)
  {
    pendiente = 100 - ejecutado;
  }
}

  if(noCero){
    document.getElementById("totalMontoAnual").innerHTML = liberado + nr;;
    document.getElementById("totalMontoAnualMillones").innerHTML = totalGlobalMonto;
    document.getElementById("montoAvanceGlobal").innerHTML = Math.round(porcentajeGlobalMonto * 100) / 100;
  } else {
    document.getElementById("totalMontoAnual").innerHTML = 0;
    document.getElementById("totalMontoAnualMillones").innerHTML = 0;
    document.getElementById("montoAvanceGlobal").innerHTML = 0;
  }
  


  Highcharts.chart('monto2', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Valor Millones S/'
    },
    colors: coloresCharts,
    xAxis: {
      categories: ['Total Millones']
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
      //y: 20,
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
      data:(function () {
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


  Highcharts.chart('monto3', {
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
      name: 'millones',
      //innerSize: '50%',
      data: (function () {
        var data = [];
        if(noCero && proyectadoMonto > 0){
          data.push(['Ejecutado', ejecutado]);
          data.push(['Pendiente', pendiente]);
        }
        return data;
        }())
    }]
  });
}