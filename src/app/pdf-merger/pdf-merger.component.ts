import { Component,ChangeDetectorRef } from '@angular/core';
import { mergePDFFiles } from '../shared/pdf-merger-utils';

@Component({
  selector: 'app-pdf-merger',
  templateUrl: './pdf-merger.component.html',
  styleUrls: ['./pdf-merger.component.css']
})
export class PdfMergerComponent {
  mergedPDF: Blob | null = null;
  isMerged = false;

  constructor(private cdr: ChangeDetectorRef) {}

  onFileChange(event: any): void {
    // Aquí puedes manejar la lógica para actualizar la lista de archivos seleccionados si es necesario
  }

  async mergePDFs(): Promise<void> {
    // Obtener la lista de archivos seleccionados
    const inputElement: HTMLInputElement | null = document.querySelector('#pdfFiles');

    if (inputElement && inputElement.files) {
      const files: FileList = inputElement.files;

      if (files.length > 1) {
        // Llamar a la función de utilidad para unir los PDFs
        this.mergedPDF = await mergePDFFiles(files);
        this.isMerged = true;
      } else {
        alert('Selecciona al menos dos archivos PDF para unir.');
      }
    } else {
      console.error('Elemento #pdfFiles no encontrado o no tiene archivos.');
    }
  }

  getMergedPDFUrl(): string | null {
    // Crear una URL del objeto Blob para el enlace de descarga
    return this.mergedPDF ? URL.createObjectURL(this.mergedPDF) : null;
  }
}
