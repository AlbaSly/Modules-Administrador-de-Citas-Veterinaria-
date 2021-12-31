import {appointsList} from '../selectors.js';
import {loadAppointmentInputs, deleteAppointment} from '../functions.js';

class UI {
    showAlert(msg, type) {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add(
        "text-center",
        "alert",
        "d-block",
        "col-12",
        "float-message"
      );
  
      switch (type) {
        case 0:
          msgDiv.classList.add("alert-danger");
          break;
        case 1:
          msgDiv.classList.add("alert-success");
          break;
      }
  
      msgDiv.textContent = msg.toUpperCase();
  
      const content = document.querySelector("#contenido");
  
      if (content.querySelectorAll("alert").length === 0) {
        content.insertBefore(msgDiv, document.querySelector(".agregar-cita"));
      }
  
      setTimeout(() => {
        msgDiv.remove();
      }, 2000);
    }
  
    showList({ appointments }) {
      //Se puede aplicar deestructuring /recordar p. ej "ev"
      this.clearList();
  
      appointments.forEach((appoint) => {
        const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
          appoint;
  
        const appointmentLi = document.createElement("li");
        appointmentLi.classList.add("cita", "p-3");
        appointmentLi.dataset.id = id;
  
        const petElementH2 = document.createElement("h2");
        petElementH2.classList.add("card-title", "font-weight-bolder");
        petElementH2.innerHTML = `${mascota}`;
  
        const ownerElementP = document.createElement("p");
        ownerElementP.classList.add("card-title", "font-weight-bolder");
        ownerElementP.innerHTML = `${propietario}`;
  
        const phoneElementP = document.createElement("p");
        phoneElementP.classList.add("card-title", "font-weight-bolder");
        phoneElementP.innerHTML = `${telefono}`;
  
        const dateElementP = document.createElement("p");
        dateElementP.classList.add("card-title", "font-weight-bolder");
        dateElementP.innerHTML = `${fecha}`;
  
        const timeElementP = document.createElement("p");
        timeElementP.classList.add("card-title", "font-weight-bolder");
        timeElementP.innerHTML = `${hora}`;
  
        const sickElementP = document.createElement("p");
        sickElementP.classList.add("card-title", "font-weight-bolder");
        sickElementP.innerHTML = `${sintomas}`;
  
        //buttons
        const deleteBtn = document.createElement("button");
        deleteBtn.onclick = () => deleteAppointment(id);
        deleteBtn.classList.add("btn", "btn-danger", "mr-2");
        deleteBtn.innerHTML =
          'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  
        const editBtn = document.createElement("button");
        editBtn.onclick = () => loadAppointmentInputs(appoint);
        editBtn.classList.add("btn", "btn-info");
        editBtn.innerHTML =
          'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
  
        appointmentLi.appendChild(petElementH2);
        appointmentLi.appendChild(ownerElementP);
        appointmentLi.appendChild(phoneElementP);
        appointmentLi.appendChild(dateElementP);
        appointmentLi.appendChild(timeElementP);
        appointmentLi.appendChild(sickElementP);
        appointmentLi.appendChild(deleteBtn);
        appointmentLi.appendChild(editBtn);
  
        appointsList.appendChild(appointmentLi);
      });
    }
  
    clearList() {
      appointsList.innerHTML = null;
    }
}

export default UI;