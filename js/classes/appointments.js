export class Appointments {
    constructor() {
      this.appointments = [];
    }
  
    addAppointment(appointment) {
      this.appointments = [appointment, ...this.appointments];
    }
  
    deleteAppointment(appointmentId) {
      this.appointments = this.appointments.filter(
        (appointment) => appointment.id !== appointmentId
      );
    }
  
    editAppointment(appointmentUpdated) {
      this.appointments = this.appointments.map((appointment) =>
        appointment.id === appointmentUpdated.id
          ? appointmentUpdated
          : appointment
      );
    }
}

export default Appointments;