import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";


const SidebarAdm = ({proyecto}) => {





    //#wrapper > aside > div > div.sidebar-inner.scrollable-sidebar > div.main-menu > ul > li.active

    return (
        <div>
            <aside className="fixed skin-1">
                <div className="sidebar-inner scrollable-sidebar">
                    <div className="user-block clearfix">
                        <div className="detail">
                            <strong className="text-red"><b style={{color: '#000'}}>{proyecto}</b></strong>
                        </div>
                    </div>


                    <div className="main-menu">
                        <ul>
                            <li>
                                <Link to={`/base-grafica-ubicacion/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/polygonopredio.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                       Base Grafica
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>


                        </ul>


                    </div>
                    <div className="user-block clearfix">
                        <div className="detail">
                            <strong className="text-red"> DIAGNOSTICO TECNICO LEGAL</strong>
                        </div>
                    </div>
                    <div className="main-menu">
                        <ul>
                            <li>
                                <Link to={`/proyecto-datos-generales/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/informe.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                        Resumen
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>

                            {/*  <li>
                                    <Link to={`/proyecto-datos-generales/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/informe.svg" className="btn-siderbar"></img>
                    </span>
                                        <span className="text text-red">
                        DATOS GENERALES
                    </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/proyecto-solicitudes-peticion/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/informe.svg" className="btn-siderbar"></img>
                    </span>
                                        <span className="text text-red">
                       SOLIC. GEST. PREDIAL VINCULADAS
                    </span>
                                        <span className="menu-hover"></span>
                                    </Link>
                                </li>
                                */}


                            <li>
                                <Link to={`/proyecto-diagnostico-tecnico-legal/${proyecto}`}>
                                        
                                    <span className="menu-icon">
                                        <img src="/img/diagnostico2.svg" className="btn-siderbar"></img>
                                    </span>
                                    <span className="text text-red">
                                        Activ.Diagnostico Tec. Legal
                                    </span>
                                   
                                   
                                    
                                 

                                </Link>
                            </li>


                            <li menu="/brigadas-list">
                                <Link to={`/listado-predios/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/predios2.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                        Predios 
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>

                            <li menu="/brigadas-list">
                                <Link to={`/proyecto-interferencias/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/interferencia.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                        Interferencias 
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>


                        </ul>


                    </div>

                    <div className="user-block clearfix">
                        <div className="detail">
                            <strong className="text-red">PROCESOS DE GESTION PREDIAL</strong>
                        </div>
                    </div>

                    <div className="main-menu">
                        <ul>
                            <li>
                                <Link to={`/trato-directo-y-expropiacion/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/m_predio.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                        Trato Directo y Expropiacion
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/proyecto-datos-generales/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/m_trasnferencia.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                        Transferencia Interestatal
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>


                        </ul>


                    </div>

                   

                    <div className="main-menu">
                        <ul>
                            <li>
                                <Link to={`/proyecto-datos-generales/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/mejoras.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                      Reconocimiento de Mejoras
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>


                        </ul>


                    </div>

                   

                    <div className="main-menu">
                        <ul>
                            <li>
                                <Link to={`/proyecto-datos-generales/${proyecto}`}>
                            <span className="menu-icon">
                        <img src="/img/m_interferencia.svg" className="btn-siderbar"></img>
                    </span>
                                    <span className="text text-red">
                     Liberacion de Interferencias
                    </span>
                                    <span className="menu-hover"></span>
                                </Link>
                            </li>


                        </ul>


                    </div>
                </div>
            </aside>


        </div>
    );

}

export default SidebarAdm;