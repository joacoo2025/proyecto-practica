import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarritoService } from '../../servicio/carrito.service';

@Component({
  selector: 'app-pdf',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pdf-container" *ngIf="pdfSrc">
      <iframe
        id="pdfFrame"
        [src]="pdfSrc"
        style="width: 100%; height: 90vh; border: none;"
      ></iframe>

      <button (click)="imprimirPDF()" class="btn-print">
        Imprimir PDF
      </button>
    </div>
  `,
  styles: [`
    .btn-print {
      margin-top: 15px;
      padding: 10px 20px;
      background: #111;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
  `]
})
export class PdfComponent implements OnInit {
  pdfSrc!: SafeResourceUrl;

  constructor(
    private carritoService: CarritoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.generarPDF();
  }

  generarPDF() {
    const productos = this.carritoService.obtenerProductos();
    const subtotal = this.carritoService.obtenerTotal();

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Factura de Compra', 14, 20);

    let y = 40;
    productos.forEach((item: any, i: number) => {
      doc.text(
        `${i + 1}. ${item.producto.nombre} — Cantidad: ${item.cantidad} — $${item.producto.precio}`,
        10,
        y
      );
      y += 10;
    });

    doc.text(`Subtotal: $${subtotal}`, 10, y + 10);

    const pdfBlob = doc.output('blob');
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(pdfBlob)
    );
  }

  imprimirPDF() {
    const iframe = document.getElementById('pdfFrame') as HTMLIFrameElement;
    iframe.contentWindow?.print();
  }
}
