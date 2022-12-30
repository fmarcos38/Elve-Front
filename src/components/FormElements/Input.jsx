import React from 'react'
import { GrupoInput, Label, Input, ValidationIcon, ErrorLeyend } from '../../styledComponents/StyledFormElements'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'


//componente input para utilizar en todos los form
function InputComp({ className, type, min, max, width ,name, placeHolder, regExp, errorLeyend, state, setState, funcion }) {

  const handleCH = (e) => {
    //Replaces: Quita multiples espacios y ceros al inicio:
   setState({
      ...state,
      key: e.target.value.replace(/^0+/, '').replace(/\s\s+/g, ' ')
    })
  };
  const validate = (e) => {
    //Si se presiona space al inicio lo invalida:
    if (e.keyCode === 32 && state.key.length <= 1) {
       return setState({ ...state, key: '' })
    }

    if (state.key.length === 0 ) {
        return setState({ ...state, valid: null})
    }

    //valid true o false para que sea enviado por props al css que va a mostrar u ocultar los elementos de error:
    if (regExp) {
        if (regExp.test(state.key)) {
            setState({ ...state, valid: 'true'})
        } else {
           setState({ ...state, valid: 'false'})
        }
    }

    
  };


  return (
    <div>
        <Label htmlFor={name}>{name}</Label>
        <GrupoInput className={className} >
            <Input name={name} type={type || 'text'} placeholder={placeHolder} width={width}
               value={state && state.key} onChange={handleCH} onKeyUp={validate} onBlur={validate}
               valid={state.valid} 
            />
            <ValidationIcon icon={state.valid === 'true' ? faCircleCheck : faCircleXmark} valid={state.valid}/>       
        </GrupoInput>
        <ErrorLeyend valid={state.valid}>{errorLeyend}</ErrorLeyend>
    </div>
  )
}

export default InputComp