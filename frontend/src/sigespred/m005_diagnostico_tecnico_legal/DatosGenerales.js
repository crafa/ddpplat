import React, {useEffect, useState} from 'react';
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import FooterProcess from "../m000_common/footers/FooterProcess";
import MapProyecto from '../../components/helpers/maps/MapProyecto';
import MapProyectoEmpy from '../../components/helpers/maps/MapProyectoEmpy'
import Header from "../m000_common/headers/Header";
import {initAxiosInterceptors, filepath} from "../../config/axios";
import {toastr} from "react-redux-toastr";
import SliderDatosGenerales from "./common/SliderDatosGenerales";

const Axios = initAxiosInterceptors();

/*Permite cargar los reposables*/

async function cargarDatosProyecto(codigo) {

    try {
        const {data} = await Axios.get(`/resumen-proyectos-codigo?codigo=${codigo}`);
        if (data) {
            localStorage.setItem("PROYECTO_CURRENT", JSON.stringify(data));
            return data;
        }

    } catch (e) {
        toastr.error(JSON.stringify(e))
    }


}

const detalle_equipo = async (equipo_id) => {
    const {data} = await Axios.get(`/details-equipo?equipo_id=${equipo_id}`);
    return data;
}

const DatosGenerales = ({history, match}) => {

    const {codigo_predio: cod} = match.params;
    const [solicitudstate, setSolicitudstate] = useState({});
    const [state_detalle_equipo, set_brigada] = useState({});
    //alert(solicitud)
    useEffect(() => {
        async function getSolcitud() {
            try {
                const [soli] = await cargarDatosProyecto(cod);
                //  alert(JSON.stringify(soli));
                //  const ldetalle_equipo= await detalle_equipo(soli.brigada_id)
                // set_brigada(ldetalle_equipo)
                //  console.log(soli)
                if (soli) {
                    setSolicitudstate({...soli, foto: filepath(soli.portada_imagen)})
                } else {
                    //  history.push('/no-encontrado')  
                }
            } catch (error) {


            }
        }

        getSolcitud();

    }, [cod]);


    return (
        <>
            <div>
                <SiderBarDiagnostico proyecto={cod}/>

                <form action="">
                    <Header></Header>

                    <div className="container mtop-20">


                        <form>
                            <fieldset className={'fielsettext'}>
                                <legend align="mtop-25 center fielsettext ">

                                    <label className={'titleform'}>DATOS DEL PROYECTO</label>

                                </legend>

                            </fieldset>


                        </form>
                        <div className="row">


                            <div className="col-md-12">


                                <div className="panel panel-default">
                                    <form className="form-horizontal form-border no-margin">

                                        <div className="panel-body">
                                            <div className="form-group">

                                                <div className="col-lg-12">
                                                    <a></a>  <h4 type="text"
                                                                 data-type="email" placeholder="Email Address">
                                                    {solicitudstate.descripcion}
                                                </h4>
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <SliderDatosGenerales/>

                                                <hr/>

                                                <div className="col-md-12">
                                                    <table className="table table-hover table-striped">
                                                        <thead>
                                                        <tr>
                                                            <th>DATOS</th>
                                                            <th>DETALLE</th>

                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td><b>DIGITAL DE LA SOLICITUD </b></td>
                                                            <td>
                                                                <a href={filepath(solicitudstate.pmd)}
                                                                   style={{color: '#000'}} title={solicitudstate.pmd}>
                                                                    <i className="fa fa-file-pdf-o fa-3x"></i></a>
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td><b>TIPO DE INFRAESTRUCTURA</b></td>
                                                            <td>
                                                                <span style={{fontSize: '35px'}}
                                                                      dangerouslySetInnerHTML={{__html: solicitudstate.icono}}></span>
                                                                <span>  {solicitudstate.tipo_infraestructura}</span><br></br>
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td><b>FECHA DE REGISTRO</b></td>
                                                            <td>
                                                                {solicitudstate.fecha_registro}
                                                            </td>

                                                        </tr>

                                                        </tbody>
                                                    </table>
                                                </div>


                                            </div>

                                            <div className="form-group">

                                                <small
                                                    className="text-muted text-danger font-14 col-lg-2"> Mapa de
                                                    Proyecto y Predios
                                                </small>
                                                <div className="col-lg-9">


                                                    {solicitudstate.polygonojson ?
                                                        <MapProyecto predios={solicitudstate.predios}
                                                                     geojson={solicitudstate.polygonojson}/> :
                                                        <MapProyectoEmpy/>}


                                                </div>
                                            </div>
                                            <hr/>


                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row margin-button-form "></div>

                </form>


                <FooterProcess/>
            </div>
        </>
    );
};

export default DatosGenerales;