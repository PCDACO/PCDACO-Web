import { useEffect } from "react";
import * as SignalR from "@microsoft/signalr";

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

    // Set up the connection and handlers
    const setupConnection = async () => {
      try {
        // Remove any existing handlers to prevent duplicates
        connection.off("ReceiveCarLocation");

        // Add the new handler
        connection.on("ReceiveCarLocation", handleReceive);

        // Start the connection if not already started
        if (connection.state === SignalR.HubConnectionState.Disconnected) {
          await signalR.startConnection();
        }

        // Request initial location
        await connection.invoke("GetCarLocation", carId);
      } catch (error) {
      }
    };

    setupConnection();

    // Cleanup
    return () => {
      connection.off("ReceiveCarLocation", handleReceive);
    };
  }, [carId, onReceive]);
};
