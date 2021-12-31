import {
  loadLocalStorage,
  userInterface,
  appointmentsList,
} from "../functions.js";

import {loadEventListenners} from '../selectors.js';

class App {
  constructor() {
    this.runApp();
  }

  runApp() {
    loadEventListenners();
    loadLocalStorage();
    userInterface.showList(appointmentsList);
  }
}

export default App;