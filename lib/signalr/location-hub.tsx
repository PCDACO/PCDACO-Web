import * as SignalR from '@microsoft/signalr';

const API_URL = "https://pcdaco-api.persiehomeserver.com";

class SignalRService {
  private static instance: SignalRService;
  private connection: SignalR.HubConnection;

  private constructor() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(`${API_URL}/location-hub`, { withCredentials: true })
      .configureLogging(SignalR.LogLevel.Information)
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
      console.log('🔌 SignalR connection started');
    }
  }

  public async stopConnection(): Promise<void> {
    if (this.connection.state === SignalR.HubConnectionState.Connected) {
      await this.connection.stop();
      console.log('🛑 SignalR connection stopped');
    }
  }
}

export default SignalRService;

