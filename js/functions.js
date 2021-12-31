import Appointments from "./classes/appointments.js";
import UI from "./classes/ui.js";

import {
  form,
  petInput,
  ownerInput,
  phoneInput,
  dateInput,
  timeInput,
  sickInput
} from "./selectors.js";

export const appointmentsList = new Appointments();
export const userInterface = new UI();

const appointmentObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
  editado: false,
};

export function resetAppointmentObj() {
  appointmentObj.mascota = "";
  appointmentObj.propietario = "";
  appointmentObj.telefono = "";
  appointmentObj.fecha = "";
  appointmentObj.hora = "";
  appointmentObj.sintomas = "";
  appointmentObj.editado = false;
}

export function updateAppointObjData(ev) {
  appointmentObj[ev.target.name] = ev.target.value;
}

export function newAppointment(ev) {
  ev.preventDefault();

  if (validateSubmit()) {
    if (!appointmentObj.editado) {
      appointmentObj.id = Date.now();
      appointmentsList.addAppointment({ ...appointmentObj });

      userInterface.showAlert("Cita agregada correctamente", 1);
    } else {
      appointmentsList.editAppointment({ ...appointmentObj });
      userInterface.showAlert("Cita editada correctamente", 1);
    }

    updateLocalStorage();
    userInterface.showList(appointmentsList);

    form.reset();
    resetAppointmentObj();
  }
}

export function validateSubmit() {
  const { mascota, propietario, telefono, fecha, hora, sintomas } =
    appointmentObj;

  if (!mascota || !propietario || !telefono || !fecha || !hora || !sintomas) {
    console.error("Campos faltantes");
    userInterface.showAlert("Todos los campos son obligatorios", 0);
    return false;
  }
  return true;
}

export function loadAppointmentInputs({
  mascota,
  propietario,
  telefono,
  fecha,
  hora,
  sintomas,
  id,
}) {
  userInterface.showAlert("Cargando edición", 1);

  appointmentObj.editado = true;

  appointmentObj.mascota = mascota;
  appointmentObj.propietario = propietario;
  appointmentObj.telefono = telefono;
  appointmentObj.fecha = fecha;
  appointmentObj.hora = hora;
  appointmentObj.sintomas = sintomas;
  appointmentObj.id = id;

  petInput.value = mascota;
  ownerInput.value = propietario;
  phoneInput.value = telefono;
  dateInput.value = fecha;
  timeInput.value = hora;
  sickInput.value = sintomas;

  form.querySelector('button[type="submit"]').textContent = "Guardar Cambios";
}

export function deleteAppointment(appointmentId) {
  appointmentsList.deleteAppointment(appointmentId);

  userInterface.showAlert("La cita ha sido eliminada", 0);

  updateLocalStorage();

  userInterface.showList(appointmentsList);
}

export function editAppointment(appointment) {
  appointmentsList.editAppointment(appointment);
  showList(appointmentsList);
}

export function loadLocalStorage() {
  appointmentsList.appointments =
    JSON.parse(localStorage.getItem("appointsList")) ?? [];
}

export function updateLocalStorage() {
  localStorage.setItem(
    "appointsList",
    JSON.stringify(appointmentsList.appointments)
  );
}
