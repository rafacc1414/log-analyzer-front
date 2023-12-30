import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FileDropComponent } from './file-drop/file-drop.component';
import { WebSocketService } from './web-socket/web-socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FileDropComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  constructor(private webSocketService: WebSocketService) { 
  }

  public messages: string[] = [];
  public message: string = '';
  
  ngOnInit(): void {
    this.webSocketService.connect().subscribe(
      (message) => {
        this.messages.push(message);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sendMessage(): void {
    this.webSocketService.sendMessage(this.message);
    this.message = '';
  }


  logs: File[] = [];

  onFilesDropped(files: FileList): void {
    this.logs = Array.from(files);
    this.logs.forEach((file: File) => {
      this.webSocketService.sendLogsFile(file);
    });
  }


}
