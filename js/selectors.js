import { updateAppointObjData, newAppointment } from "./functions.js";

//formulario
export const form = document.querySelector("#nueva-cita");
//inputs formulario
export const petInput = document.querySelector("#mascota");
export const ownerInput = document.querySelector("#propietario");
export const phoneInput = document.querySelector("#telefono");
export const dateInput = document.querySelector("#fecha");
export const timeInput = document.querySelector("#hora");
export const sickInput = document.querySelector("#sintomas");
//Citas sección
export const appointsH1 = document.querySelector("#administra");
export const appointsList = document.querySelector("#citas");

export function loadEventListenners() {
    petInput.addEventListener("blur", updateAppointObjData);
    ownerInput.addEventListener("blur", updateAppointObjData);
    phoneInput.addEventListener("blur", updateAppointObjData);
    dateInput.addEventListener("blur", updateAppointObjData);
    timeInput.addEventListener("blur", updateAppointObjData);
    sickInput.addEventListener("blur", updateAppointObjData);
  
    form.addEventListener("submit", newAppointment);
}