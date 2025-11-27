import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarritoComponent } from '../carrito/carrito.component';
import { CarritoService } from '../../servicio/carrito.service';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit{
  //declaracion del formulario reactivo para la compra
  formularioCompra!: FormGroup;
  //variable para almacenar el total de la compra
  total!:number
  //costo fijo de envio
  envio=1500;
  //indicador para saber si la factura ya fue generada
  facturaGenerada=false;
  //objeto que contiene la informacion de la factura generada
  factura:any;
  //controla la visibilidad del modal que muestra el PDF
  mostrarModal=false;
  //fuente segura para mostrar el pdf generado en el iframe
  pdfSrc:SafeResourceUrl|undefined;
  constructor(
    private fb : FormBuilder, 
    private carritoService: CarritoService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ){}
  //metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    //formulario con los campos requeridos y validadores
    this.formularioCompra = this.fb.group({
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    codigopostal: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    metodoPago: ['', [Validators.required]],
});

  }
  //Calcular el total de la compra sumando el subtotal y el costo de envio
  calcularTotal():number{
    const subtotal = this.carritoService.obtenerTotal();
    this.total=subtotal+this.envio
    return this.total
  }
  verificarMetodoPago() {
  const metodo = this.formularioCompra.get('metodoPago')?.value;

  if (metodo === 'transferencia') {
    this.router.navigate(['/transferencia']);
  }
}
  emitirFactura():void{
    const datosCliente = this.formularioCompra.value;
    const productos=this.carritoService.obtenerProductos();
    const totalFinal = this.calcularTotal();
  
  this.factura={
    cliente:datosCliente,
    productos:productos,
    envio:this.envio,
    total:totalFinal,
    fecha:new Date()
  }
  this.facturaGenerada=true
}
finalizarCompra():void{
  if(this.formularioCompra.valid){
    this.emitirFactura();
    this.generarPDFModal()
  }else{
    this.formularioCompra.markAllAsTouched();
  }
}
generarPDFModal():void{
  if(!this.factura) return;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('factura de compra',14,20);
  doc.setFontSize(12);
  doc.text(`fecha:${this.factura.fecha.toLocaleString()}`,14,30)

  doc.text('cliente',14,40);
  const c=this.factura.cliente;
  doc.text(`Nombre: ${c.nombre}`,20,50);
  doc.text(`direccion: ${c.direccion}`,20,60);
  doc.text(`correo: ${c.correo}`,20,70);
  doc.text(`telefono: ${c.telefono}`,20,80);
  doc.text(`ciudad: ${c.ciudad}`,20,90);
  doc.text(`provincia: ${c.provincia}`,20,100);
  doc.text(`codigopostal: ${c.codigopostal}`,20,110);

  let y=120
  doc.text('productos',14,y);
  this.factura.productos.forEach((item:any, index:number)=>{
    y+=10;
    doc.text(
      `${index + 1}.${item.producto.nombre}-Cantidad: ${item.cantidad}-Precio: $${item.producto.precio.toFixed(2)} - Subtotal: $${(item.producto.precio*item.cantidad).toFixed(2)}`,
      20,y
    )
  })

  doc.text(`Costo de envio: $${this.factura.envio.toFixed(2)}`,14,y);
  y+=10;
  doc.text(`Total a pagar: $${this.factura.total.toFixed(2)}`,14,y);

  const pdfBlob=doc.output('blob');
  this.pdfSrc=this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob))
  this.mostrarModal=true;
}
cerrarModal():void{
  this.mostrarModal=false
  if(this.pdfSrc){
    URL.revokeObjectURL((this.pdfSrc as any ).changingThisBreaksApplicationSecurity)
  this.pdfSrc=undefined;
  }
}
imprimirPDF():void{
  const iframe:HTMLIFrameElement | null=document.getElementById('pdfFrame') as HTMLIFrameElement
  if(iframe&& iframe.contentWindow){
    iframe.contentWindow.focus();
    iframe.contentWindow.print()
  }
}



paymentMethods = [
    { name: '', icon: 'imagenes/visa.webp' },
    { name: '', icon: 'imagenes/master.webp' },
    { name: '', icon: 'imagenes/mp.webp' },
    { name: '', icon: 'imagenes/nx.webp' },
  ];

 

}
