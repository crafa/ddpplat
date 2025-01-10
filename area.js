var ejecutadoArea = 0;
var proyectadoArea = 0;
var porcentajeArea = 0;
var totalGlobalArea = 0;
var porcentajeGlobalArea = 0;
var arrayValoresArea = [];
var arrayCabeceraArea = [];
var arrayProyectadoArea = [];
cargarAreaDesdeBD(false);
RenderOtrosArea(false)
var coloresCharts = ['rgba(102,187,106, 0.9)', 'rgba(30,136,229, 0.9)', '#1e88e5', '#66bb6a', '#f1948a', '#f44336' ];
var coloresCharts1 = ['rgba(30,136,229, 0.9)', 'rgba(102,187,106, 0.9)','#1e88e5', '#66bb6a', '#f1948a', '#f44336' ];

function cargarAreaDesdeBD(flagBD, datos, proyecto){
  arrayValoresArea = [];
  arrayCabeceraArea = [];
  ejecutadoArea = 0;
  totalGlobalArea = 0;
  proyectadoArea = 0;

  if (flagBD){
    if (datosProyeccionProyecto && datosProyeccionProyecto.length > 0){
      proyectadoArea = datosProyeccionProyecto[0].totalarea;
      totalGlobalArea = datosProyeccionProyecto[0].totalareaproyecto;
      arrayProyectadoArea = [parseFloat(datosProyeccionProyecto[0].areatratodirecto),
                              parseFloat(datosProyeccionProyecto[0].areaexpropiacion),
                              parseFloat(datosProyeccionProyecto[0].areapagomejoras),
                              parseFloat(datosProyeccionProyecto[0].areatransferencia),
                              parseFloat(datosProyeccionProyecto[0].areainterferencia)]; 
    } else {
      proyectadoArea = 0;
      totalGlobalArea = 0;1
      arrayProyectadoArea = [0, 0, 0, 0, 0]; 
    }

    if(datos)
    {
      datos.forEach(function(tipo) {
        arrayValoresArea.push(+tipo.totalarea);
        arrayCabeceraArea.push(tipo.tipo_procedimiento_kpi);
        ejecutadoArea += +tipo.totalarea;
      })

      porcentajeArea = 0;
      if (proyectadoArea > 0)
      {
        porcentajeArea = (ejecutadoArea * 100)/proyectadoArea;  
      }

      porcentajeGlobalArea = 0;
      if (totalGlobalArea > 0)
      {
        porcentajeGlobalArea = (ejecutadoArea * 100)/totalGlobalArea;  
      }    
      renderPageArea(arrayValoresArea, arrayCabeceraArea, arrayProyectadoArea);
    } else {
      setValoresVaciosArea();
    }

  } else {
    setValoresVaciosArea();
  }
}

function setValoresVaciosArea()
{
  ejecutadoArea = 0;
    proyectadoArea = 0;
    porcentajeArea = 0;
    porcentajeGlobalArea = 0;
    renderPageArea(arrayValoresDefault, arrayCabeceraDefault, arrayValoresDefault);
}

  
function renderPageArea(arrayValores, arrayCabecera, arrayProyectado){
  document.getElementById("proyectadoArea").innerHTML = Number(proyectadoArea).toLocaleString('en');
  document.getElementById("ejecutadoArea").innerHTML = Number(ejecutadoArea).toLocaleString('en');
  document.getElementById("porcentajeArea").innerHTML = Math.round(porcentajeArea * 100) / 100;
  document.getElementById("totalAreaAvance").innerHTML = Math.round(porcentajeGlobalArea * 100) / 100;

Highcharts.chart('area1', {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Area (Mt2)'
  },
  subtitle: {
    text: ''
  },
  colors: coloresCharts1,
  xAxis: {
    categories: arrayCabecera,//['Trato directo', 'Expropiación', 'Pago de Mejoras', 'Transferencia Interestatal', 'Inteferencias'],
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Metros Cuadrados',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    valueSuffix: ' Metros Cuadrados'
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
    /*layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -10,
    y: 120,*/
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
    data: arrayProyectado//[900000, 30000, 10000, 0, 0]
  }, */{
    name: 'Ejecutado',
    data: arrayValores//[133, 156, 947, 408, 6]
  }]
});
}

function RenderOtrosArea(noCero){

  var liberado = 0;
  var nr = 0;
  var totalAreaProyecto = 0;
  var ejecutado = 0;
  var pendiente = 0;
  var pendiente = 0;
  var ejecutado = 0;

if (datosProyeccionProyecto && datosProyeccionProyecto.length > 0){
  liberado = parseFloat(datosProyeccionProyecto[0].arealiberado);
  nr = parseFloat(datosProyeccionProyecto[0].areanr);
  totalAreaProyecto = datosProyeccionProyecto[0].totalareaproyecto;
}

if (proyectadoArea > 0){
  var ejecutado = (100*ejecutadoArea)/proyectadoArea;
 if (ejecutado < 100)
  {
    pendiente = 100 - ejecutado;
  }
}


  if(noCero){
    document.getElementById("totalAreaLiberada").innerHTML = liberado + nr;
    document.getElementById("totalAreaProyecto").innerHTML = Number(totalAreaProyecto).toLocaleString('en');
    document.getElementById("totalAreaAvance").innerHTML = Math.round(porcentajeGlobalArea * 100) / 100;
  } else {
    document.getElementById("totalAreaLiberada").innerHTML = 0;
    document.getElementById("totalAreaProyecto").innerHTML = 0;
    document.getElementById("totalAreaAvance").innerHTML = 0;
  }


  Highcharts.chart('liberadoarea', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Area P. Liberados'
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


  Highcharts.chart('areatotal', {
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
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    colors: coloresCharts,
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
      name: 'm2',
      //innerSize: '50%',
      data: (function () {
        var data = [];
        if(noCero && proyectadoArea > 0){
          data.push(['Ejecutado', ejecutado]);
          data.push(['Pendiente', pendiente]);
        }
        return data;
        }())
    }]
  });
}