import {combineReducers} from 'redux';
import trabajadorReducers from './trabajadorReducers';
import brigadaReducers from './brigadaReducers';
import equipoReducers from './equipoReducers';
import diagnosticoReducers from './diagnosticoReducers';
import {reducer as toastrReducer} from 'react-redux-toastr'
import prediosReducers from "./prediosReducers";
import sujetopasivoReducers from "./sujetopasivoReducers";
import proyectoReducers from "./proyectoReducers";

export default combineReducers({
    trabajador :trabajadorReducers,
    brigadista: brigadaReducers,
    equipo: equipoReducers,
    diagnostico:diagnosticoReducers ,
    predio:prediosReducers ,
    sujetopasivo:sujetopasivoReducers ,
    proyecto:proyectoReducers ,
    toastr: toastrReducer
});