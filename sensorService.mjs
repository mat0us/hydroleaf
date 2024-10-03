import { db } from './firebaseConfig.js';
import { ref, set, update, onValue } from 'firebase/database';

// Funkce pro simulaci náhodné teploty
function getRandomTemperature() {
  return Math.floor(Math.random() * 15) + 20; // Náhodná teplota mezi 20 a 35 stupni
}

// Funkce pro odeslání prvních hodnot do databáze
function initializeSensorData() {
  const sensorRef = ref(db, 'sensors/device1');
  
  const initialData = {
    temperature: getRandomTemperature(),
    pumpState: false, // Initial pump state
  };

  set(sensorRef, initialData)
    .then(() => console.log("Initial sensor data set"))
    .catch((error) => console.error("Error setting initial sensor data:", error));
}

// Funkce pro aktualizaci senzorových hodnot
function updateSensorData() {
  const sensorRef = ref(db, 'sensors/device1');

  const updatedData = {
    temperature: getRandomTemperature(),
    // If you don't want to update pumpState here, you can omit it.
    // pumpState: false, 
  };

  update(sensorRef, updatedData)
    .then(() => console.log("Sensor data updated"))
    .catch((error) => console.error("Error updating sensor data:", error));
}

// Funkce pro sledování změn stavu čerpadla
function monitorPumpState() {
  const pumpStateRef = ref(db, '/device1/pumpState'); // No leading slash

  onValue(pumpStateRef, (snapshot) => {
    const pumpState = snapshot.val();
    if (pumpState !== null) {
      console.log("Pump state changed:", pumpState);
    }
  }, (error) => {
    console.error("Error listening for pump state changes:", error);
  });
}

// Spuštění simulace dat na pozadí
function startSensorService() {
  // Inicializace při prvním spuštění
  initializeSensorData();

  // Sledování stavu čerpadla
  monitorPumpState();

  // Aktualizace dat každou minutu (60000 ms)
  setInterval(updateSensorData, 60000);
}

// Spuštění služby
startSensorService();
