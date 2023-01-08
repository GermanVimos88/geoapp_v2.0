import React from 'react';
import {Input, GrupoInput, LeyendaError, IconoValidacion, Label} from './../elementos/Formularios';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ComponenteInput = ({estado, cambiarEstado,tipo, label, placeholder, name, leyendaError, expresionRegular, funcion}) => {
    const onChange = (e) => {
        //console.log(e.target.value);
        cambiarEstado({...estado, campo: e.target.value});
    }
    const validacion = () => {
        if(expresionRegular){
            if (expresionRegular.test(estado.campo)){
                //console.log('Input correcto');
                cambiarEstado({...estado, valido:'true'});

            }else{
                //console.log('Input incorrecto');
                cambiarEstado({...estado, valido:'false'});
            }
        }

        if (funcion){
            funcion();
        }        

    }
    return (

        <div>
            <Label htmlFor={name} valido={estado.valido}>{label}</Label>
            <GrupoInput>
            
            <Input 
                type={tipo} 
                placeholder={placeholder} 
                id={name}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validacion}
                onBlur={validacion}
                valido={estado.valido}

            />
            <IconoValidacion 
                icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} 
                valido={estado.valido}/> 
            
            </GrupoInput>              
            <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
        </div>



    );
}

export default ComponenteInput;