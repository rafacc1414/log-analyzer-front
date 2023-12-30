import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {

  private socket: WebSocket;

  constructor() {
    /* Fix "Web Socket is not defined" */
    if (typeof global !== 'undefined') {
      global.WebSocket = require('ws');
    }

    this.socket = new WebSocket('wss://localhost:3000');
  }

  public connect(): Observable<any> {
    return new Observable(observer => {
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();
    });
  }

  public sendMessage(message: string): void {
    this.socket.send(message);
  }

  // Método para enviar archivos de logs
  sendLogsFile(file: File) {
    this.socket.send(file);
  }

}
