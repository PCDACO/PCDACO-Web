import { useEffect } from "react";

import { CarLocationResponse } from "@/constants/models/car.model";
import SignalRService from "@/lib/signalr/location-hub";

export const useGetLocationCar = (
  carId: string,
  onReceive: (value: CarLocationResponse) => void
) => {
  if (!carId) {
    throw new Error("Car ID is required");
  }

  useEffect(() => {
    const signalR = SignalRService.getInstance();
    const connection = signalR.getConnection();

    const handleReceive = (value: CarLocationResponse) => {
      if (value) {
        onReceive(value);
      }
    };

    connection.on("ReceiveCarLocation", handleReceive);

    const start = async () => {
      try {
        await signalR.startConnection();
        await connection.invoke("GetCarLocation", carId);
      } catch (error) {
        console.log("🚨 SignalR error:");
        throw error;
      }
    };

    start();

    return () => {
      connection.off("ReceiveCarLocation", handleReceive);
    };
  }, [carId, onReceive]);
};
