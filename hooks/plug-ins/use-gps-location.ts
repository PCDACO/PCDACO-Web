import { useEffect } from 'react';

import { CarLocationResponse } from '@/constants/models/car.model';
import SignalRService from '@/lib/signalr/location-hub';

export const useGetLocationCar = (
  carId: string,
  onReceive: (value: CarLocationResponse) => void
) => {
  useEffect(() => {
    const signalR = SignalRService.getInstance();
    const connection = signalR.getConnection();

    const handleReceive = (value: CarLocationResponse) => {
      if (value) {
        onReceive(value);
      }
    };

    connection.on('ReceiveCarLocation', handleReceive);

    const start = async () => {
      try {
        await signalR.startConnection();
        await connection.invoke('GetCarLocation', carId);
      } catch (error) {
        console.log('🚨 SignalR error:', error);
      }
    };

    start();

    return () => {
      connection.off('ReceiveCarLocation', handleReceive);
    };
  }, [carId, onReceive]);
};

