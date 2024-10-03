class SensorData {
    constructor(deviceId, led1, led2, led3, waterPump, pH, tdc, outsidetemp, watertemp, light, waterLevel) {
        this.deviceId = deviceId;
        this.led1 = led1;
        this.led2 = led2;
        this.led3 = led3;
        this.waterPump = waterPump;
        this.pH = pH;
        this.tdc = tdc;
        this.outsidetemp = outsidetemp;
        this.watertemp = watertemp;
        this.light = light;
        this.waterLevel = waterLevel;
    }

    // Převod na JSON
    toJSON() {
        return {
            deviceId: this.deviceId,
            led1: this.led1,
            led2: this.led2,
            led3: this.led3,
            waterPump: this.waterPump,
            pH: this.pH,
            tdc: this.tdc,
            outsidetemp: this.outsidetemp,
            watertemp: this.watertemp,
            light: this.light,
            waterLevel: this.waterLevel
        };
    }
}

module.exports = SensorData;
