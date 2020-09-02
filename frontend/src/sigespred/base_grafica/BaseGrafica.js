import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import Header from "../m000_common/headers/Header";

import {Link} from "react-router-dom";


import {initAxiosInterceptors} from "../../config/axios";
import Propietario from "../m005_diagnostico_tecnico_legal/m005_01_predios/Propietario";
import UploadMultiple from "../../components/helpers/uploaders/UploadMultiple";
import Map from "../../components/helpers/maps/MapRegistroProyecto";
import MapProyectoEmpy from "../../components/helpers/maps/MapProyectoEmpy";
import {toastr} from "react-redux-toastr";
import UploadFile from "../../components/helpers/uploaders/Upload";


const {alasql} = window;
const Axios = initAxiosInterceptors();

/*para ob tener los daros de los ubivgeos*/
async function obtener_ubicacion_predio(predio_id) {
    const {data} = await Axios.get(`/obtener_ubicacion_predio/${predio_id}`);
    return data;
}

async function cargarDatosSolicitud(denominacion) {
    const {data} = await Axios.get(`/datos-solicitud?denominacion=${denominacion}`);
    return data;
}

async function obtenerUbigeo() {
    const {data} = await Axios.get(`/ubigeo`);
    return data;
}

/*Obtiene la solcitud de polygonos*/
async function getProyecto(codigo) {
    const {data} = await Axios.get(`/proyecto/${codigo}`);
    return data;
}

/*Obtiene el polygono de respositorio de polygonos cad*/
async function getPolygonoServer(codigo) {
  
    const {data} = await Axios.get(`/obtener_poligono_proyecto?idcapa=1&pre_codigo=${codigo}`);
   // let result = JSON.parse(data[0].geojson_3857);
    return data;
}
/*Obtiene el polygono de respositorio de polygonos cad*/
async function saveproyecto(proyecto) {
  
    const {data} = await Axios.post(`/saveproyecto`,proyecto);
   // let result = JSON.parse(data[0].geojson_3857);
    return data;
}



var ubigeo_global = {};
const BaseGrafica = ({history, match}) => {

    const {codproyecto} = match.params;


    const [proyecto_codigo, set_proyecto_codigo] = useState(codproyecto);
    const [ubicacion_predio, set_ubicacion_predio] = useState({});
    const [proyecto, set_proyecto] = useState({polygono:null});
    const [departamentos, set_departamentos] = useState([]);
    const [provincias, set_provincias] = useState([]);
    const [distritos, set_distritos] = useState([]);


    /*Efecto para traer lo datos del sistema*/
    useEffect(() => {
        async function getSolcitud() {
            try {
                const rubigeo = await obtenerUbigeo();
                set_proyecto_codigo(codproyecto)
                ubigeo_global = rubigeo;
                set_departamentos(rubigeo.departamentos)
                set_provincias(rubigeo.provincias)
                set_distritos(rubigeo.distritos)
                /*Obtenenido el predio*/
                let proyectp = await getProyecto(codproyecto);
                set_proyecto(proyectp)
            } catch (error) {
                console.log(error);
            }
        }

        getSolcitud();
    }, []);


    function handleInputChange(e) {

        set_proyecto({
            ...proyecto,
            [e.target.name]: e.target.value.toUpperCase()
        });
    }
    
    /*Consulta a la base grafica*/

    async function getPolygono(codigo) {
        
        try {
            let geojson = await getPolygonoServer(codigo);
            console.log(geojson)
            set_proyecto({
                ...proyecto,
                polygono: geojson.features[0].geometry, polygonojson: geojson
            });
            toastr.info('Se encontro el Polygono del Proyecto en la Base Gráfica')
        } catch (e) {
        }
    }

    /*Filter Procincias*/
    function filterProv(dep) {
        set_provincias(ubigeo_global.provincias.filter(prov => prov.departamento == dep));
    }

    function filterDistrito(provincia) {

        set_distritos(ubigeo_global.distritos.filter(dist => dist.provincia == provincia));
    }

    async function guardarProyecto() {

        try {
           await saveproyecto(proyecto)
            toastr.info('Se guardo correctamente')
        } catch (e) {
            toastr.error('Error al guardar')
        }
    }

    const  saveFotoPortada1 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen": file.filename
        });
    }

    const saveFotoPortada2 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen2": file.filename
        });
    }

    const saveFotoPortada3 = (file) => {
        set_proyecto({
            ...proyecto,
            "portada_imagen3": file.filename
        });
    }


    return (
        <div>
            <Header/>
            <SiderBarDiagnostico proyecto={proyecto_codigo}/>
            <div>
                <div id="breadcrumb">
                    <ul className="breadcrumb">
                        <li><i className="fa fa-home"></i><a href="#"> Proyectos</a></li>
                        <li className="active">Busqueda de Proyectos</li>
                    </ul>
                </div>
                <div className="padding-md container">


                    <legend align="mtop-25 center fielsettext "><label className={'titleform'}>
                        REGISTRO DE LA BASE GRAFICA
                    </label>

                    </legend>
                    <div className="panel panel-default">
                        <form className="form-horizontal no-margin form-border" id="formWizard2" noValidate="">
                            <div className="panel-tab clearfix">
                                <ul className="tab-bar wizard-demo" id="wizardDemo2">
                                    <li className="active">
                                        <Link to={'/base-grafica-ubicacion/' + proyecto_codigo}>
                                            Ubicacion y Polygono Matriz</Link>
                                    </li>
                                    <li>
                                        <Link to={'/base-grafica-adjuntos/' + proyecto_codigo}>
                                            Informacion Digital Adjunta el PMD</Link>

                                    </li>

                                </ul>
                            </div>
                            <div className="panel-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade in active" id="first">
                                        <div className="form-group">
                                            <label className="col-lg-2 control-label"><span
                                                className="obligatorio">* </span> Departamento :</label>
                                            <div className="col-lg-2">
                                                <select

                                                    className="form-control input-sm"
                                                    name="departamento"
                                                    onChange={e => {
                                                        handleInputChange(e);
                                                        filterProv(e.target.value)
                                                    }}
                                                    value={proyecto.departamento}

                                                >
                                                    <option value="0">-- SELECCIONE --</option>
                                                    {departamentos.map(dep => (
                                                        <option value={dep.id}>{dep.departamento}</option>
                                                    ))}


                                                </select>
                                            </div>
                                            <label className="col-lg-1 control-label"><span
                                                className="obligatorio">*</span>Provincia:</label>
                                            <div className="col-lg-2">
                                                <select

                                                    className="form-control input-sm"
                                                    name="provincia"
                                                    onChange={e => {
                                                        handleInputChange(e);
                                                        filterDistrito(e.target.value)
                                                    }}
                                                    value={proyecto.provincia}

                                                >
                                                    <option value="0">-- SELECCIONE --</option>
                                                    {provincias.map(prov => (
                                                        <option value={prov.id}>{prov.provincia}</option>
                                                    ))}


                                                </select>
                                            </div>
                                            <label className="col-lg-1 control-label"><span
                                                className="obligatorio">* </span>Distrito :</label>
                                            <div className="col-lg-3">
                                                <select

                                                    className="form-control input-sm"
                                                    name="distrito"
                                                    onChange={handleInputChange}
                                                    value={proyecto.distrito}

                                                >
                                                    <option value="0">-- SELECCIONE --</option>
                                                    {distritos.map(dist => (
                                                        <option value={dist.distrito}>{dist.distrito}</option>
                                                    ))}


                                                </select>
                                            </div>


                                        </div>

                                        <div className="form-group">
                                            <label className="col-lg-2 control-label"><span
                                                className="obligatorio">* </span> Image 1 :</label>
                                            <div className="col-lg-2">
                                                                                            </div>
                                            <div className="col-lg-9">
                                                {proyecto.portada_imagen ? <UploadFile key="portada_imagen3" file={{
                                                        urlDocumento: proyecto.portada_imagen3,
                                                        originalName: proyecto.portada_imagen3
                                                    }}
                                                                            setFile={saveFotoPortada1}></UploadFile> :
                                                    <span></span>
                                                }
                                            </div>

                                        </div>
                                        <hr/>
                                        <div className="form-group">
                                            <label className="col-lg-2 control-label"><span
                                                className="obligatorio">* </span> Codigo de Base Grafica :</label>
                                            <div className="col-lg-9">
                                                <input type="text"
                                                       placeholder="Ingrese el codigo con el cual se subio con el GeoTUPU"
                                                       className="form-control input-sm parsley-validated"
                                                       data-required="true"
                                                       name="codigo_geotupu"
                                                       onChange={handleInputChange}
                                                       value={proyecto.codigo_geotupu}
                                                />
                                            </div>
                                            <div className="col-lg-1">
                                                <button onClick={() => {
                                                    getPolygono(proyecto.codigo_geotupu)
                                                }} type="button" className="btn btn-default btn-sm  pull-left">

                                                    <i className="fa fa-refresh"></i>
                                                </button>
                                            </div>


                                        </div>

                                        <legend align=" center fielsettext "><label className={'titleform'}>                         INFORMACIÓN
                                            GRAFICA</label>
                                        </legend>
                                        <div className="form-group">
                                            <label className="col-lg-1 control-label"></label>
                                            <div className="col-lg-10">
                                                {proyecto.polygono ? <Map geojson={proyecto.polygono}/> :
                                                    <MapProyectoEmpy></MapProyectoEmpy>}


                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <br/>
                                <button id="btnguardar" type="button" onClick={guardarProyecto}
                                        className="btn btn-danger btn-sm btn-control pull-right">

                                    Guardar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>


        </div>

    );
};

export default BaseGrafica

