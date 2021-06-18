//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import {Controller} from 'react-hook-form';
import {TextField, Grid} from '@material-ui/core';
import InputMask from "react-input-mask";

function FormInput({name,errors,control,mask,placeholder,type}) {



    useEffect(()=>{
        console.log()
    },[errors])
   
    if(mask) return(
        <Grid item xs={12}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => <InputMask
                    className="block__input"
                    mask="+7 (999) 999 99 99"
                    maskChar='x'

                    alwaysShowMask
                    {...field}
                />}
            />
             <div style={{color:"tomato"}}>{errors?.message}</div>
        </Grid>
    )
    return (
        <Grid item xs={12}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => <TextField
                    className="block__input"
                    variant="outlined"
                    placeholder={placeholder}
                    type={type}
                    {...field} />}
            />
             <div style={{color:"tomato"}}>{errors?.message}</div>
        </Grid>
    );
}

export default FormInput;