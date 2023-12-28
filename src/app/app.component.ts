import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FileDropComponent } from './file-drop/file-drop.component';
import { HelloWorldService } from './services/hello-world.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FileDropComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  constructor(client: HelloWorldService) {
    client.hello("EY Maquina!");
  }

  //hello_service = new HelloWorldService();


  logs: File[] = [];

  onFilesDropped(files: FileList): void {
    this.logs = Array.from(files);
  }
}
