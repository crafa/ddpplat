import React, {useState, useCallback} from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import {Toolbar, Data, Filters, Editors} from "react-data-grid-addons";
import Header from "../m000_common/headers/Header";
import UploadFile from "../../components/helpers/uploaders/UploadExpFiles";
import SiderBarDiagnostico from "../m000_common/siderbars/SiderBarDiagnostico";
import TablePropietario from "../m000_common/grids/TablePropietario";


const Adquisicion_expropiacion = ({history, match}) => {


    const {codigo_proyecto} = match.params;


    return (
        <> <Header></Header>
            <SiderBarDiagnostico solicitud={codigo_proyecto}/>
            <div id="wrapper" className="preload">


                <div id="main-container" style={{padding: '20px', marginLeft: '220px', marginTop: '55px'}}>

                    <div className="panel panel-default">
                        <div className="panel-heading">Listado de Expedientes del Proyecto</div>
                        <div className="panel-body">
                            <form className="form-inline no-margin">
                                <div className="row">
                                    <div className="col-md-12">
                                        <TablePropietario/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                   
                </div>
            </div>


        </>

    );
};


export default Adquisicion_expropiacion;