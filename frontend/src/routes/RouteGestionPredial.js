import GestionPredial from "../sigespred/gestion_predial/GestionPredial";
import BaseGrafica from "../sigespred/base_grafica/BaseGrafica";
import BaseGrafica2 from "../sigespred/base_grafica/BaseGrafica2";

const RouteGestionPredial = [
    {path: "/gestion-predial/:codproyecto", component: GestionPredial},
    {path: "/base-grafica-ubicacion/:codproyecto", component: BaseGrafica},
    {path: "/base-grafica-adjuntos/:codproyecto", component: BaseGrafica2},
    
]

export default RouteGestionPredial;

