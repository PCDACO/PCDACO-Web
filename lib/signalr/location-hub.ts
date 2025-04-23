import * as SignalR from "@microsoft/signalr";

// Use NEXT_PUBLIC_ prefix for client-side access
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined in environment variables"
  );
}

class SignalRService {
  private static instance: SignalRService;
  private connection: SignalR.HubConnection;

  private constructor() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(`${API_URL}/location-hub`, { withCredentials: true })
      .configureLogging(SignalR.LogLevel.None)
      .withAutomaticReconnect()
      .build();
  }

  public static getInstance(): SignalRService {
    if (!SignalRService.instance) {
      SignalRService.instance = new SignalRService();
    }
    return SignalRService.instance;
  }

  public getConnection(): SignalR.HubConnection {
    return this.connection;
  }

  public async startConnection(): Promise<void> {
    if (this.connection.state === SignalR.HubConnectionState.Disconnected) {
      await this.connection.start();
    }
  }

  public async stopConnection(): Promise<void> {
    if (this.connection.state === SignalR.HubConnectionState.Connected) {
      await this.connection.stop();
    }
  }
}

export default SignalRService;
