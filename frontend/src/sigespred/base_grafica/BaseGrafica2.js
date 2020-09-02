import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import Header from "../m000_common/headers/Header";
import {Link,useLocation} from "react-router-dom";


import {initAxiosInterceptors} from "../../config/axios";
import Propietario from "../m005_diagnostico_tecnico_legal/m005_01_predios/Propietario";
import UploadMultiple from "../../components/helpers/uploaders/UploadMultiple";


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


var ubigeo_global = {};
const BaseGrafica = ({history, match}) => {

    const {codproyecto} = match.params;

    const [filesstate, setFilesstate] = useState(false);
    const [proyecto_codigo, set_proyecto_codigo] = useState(codproyecto);
    const [ubicacion_predio, set_ubicacion_predio] = useState({});
    const [proyecto, set_proyecto] = useState({polygono:null,archivos :[]});
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

    const setFiles = async (file) => {
        await set_proyecto({...proyecto, archivos: [...proyecto.archivos, file]})


    }

    const removeFiles = (id) => {
        let files_filtered = proyecto.archivos.filter(file =>
            file.id !== id
        );
        set_proyecto({...proyecto, archivos: files_filtered})
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
                                    <li>
                                        <Link to={'/base-grafica-ubicacion/'+proyecto_codigo}>
                                            Ubicacion y Polygono Matriz</Link>
                                    </li>
                                    <li  className="active">
                                        <Link to={'/base-grafica-adjuntos/'+proyecto_codigo} >
                                            Informacion Digital Adjunta el PMD</Link>

                                    </li>

                                </ul>
                            </div>
                            <div className="panel-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade in active" id="first">
                                        <form>
                                            <fieldset className={'fielsettext'}>
                                                <legend align="mtop-25 center fielsettext "><label className={'titleform'} style={{fontSize:'11px'}}><i
                                                    className="fa fa-paperclip"></i> Documentos que acreditan la
                                                    Propiedad</label> <a onClick={() => {
                                                    setFilesstate(true)
                                                }} className="btn btn-default  btn-sm fullborder ">+</a>

                                                </legend>

                                            </fieldset>


                                        <UploadMultiple listFiles={proyecto.archivos} setListFiles={setFiles}
                                                                removeFiles={removeFiles}/>
                                        


                                        </form>
                                    </div>
                                  

                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </div>


        </div>

    );
};

export default BaseGrafica

