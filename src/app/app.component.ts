import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileDropComponent } from './file-drop/file-drop.component';
import { WebSocketService } from './web-socket/web-socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FileDropComponent, FormsModule],
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
      (msg) => {
        this.messages.push(msg);
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
