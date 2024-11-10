import { useState } from 'react';

const BluetoothComponent = () => {
  const [device, setDevice] = useState(null);
  const [data, setData] = useState(null);

  const connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
      });
      setDevice(device);
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('heart_rate');
      const characteristic = await service.getCharacteristic('heart_rate_measurement');
      characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCharacteristicValueChanged = (event) => {
    const value = event.target.value;
    const heartRate = value.getUint8(1);
    setData(heartRate);
  };

  return (
    <div>
      <button onClick={connectToDevice}>Connect to Watch</button>
      {device && <p>Connected to: {device.name}</p>}
      {data && <p>Heart Rate: {data}</p>}
    </div>
  );
};

export default BluetoothComponent;
