import { Component, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-file-drop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-drop.component.html',
  styleUrl: './file-drop.component.css'
})
export class FileDropComponent {
  @Output() filesDropped = new EventEmitter<FileList>();

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      this.filesDropped.emit(files);
      this.handleDroppedFiles(files);
    }
  }

  private handleDroppedFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        this.readAndLogFileContent(file);
      }
    }
  }

  private readAndLogFileContent(file: File): void {
    const reader = new FileReader();

    // reader.onload = (event) => {
    //   const content = event.target?.result;
    //   console.log(`File "${file.name}" content:`, content);
    //   // Puedes enviar el contenido al servidor aquí
    //   this.fileUploadService.uploadFile(file).then(response => {
    //     console.log(`File "${file.name}" uploaded successfully. Server response:`, response);
    //   }).catch(error => {
    //     console.error(`Error uploading file "${file.name}":`, error);
    // };

    reader.readAsText(file);
  }
}
