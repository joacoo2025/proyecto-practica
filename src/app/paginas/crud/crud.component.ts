import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../model/producto.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent implements OnInit {

  form: FormGroup;
  items: Producto[] = [];
  editMode = false;
  editingId: number | null = null;
  private nextId = 1;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', Validators.maxLength(200)],
      precio: [null, [Validators.min(0)]],
      imagen: [''],
      categoria: [''],
      cantidad: [null]
    });
  }

  // ======================================================
  // UTILIDAD PARA EVITAR ERROR EN SSR/VITE
  // ======================================================
  private canUseStorage(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // ======================================================
  // CARGAR DATOS GUARDADOS
  // ======================================================
  ngOnInit(): void {
    if (!this.canUseStorage()) return;

    const saved = localStorage.getItem('productos');
    const savedId = localStorage.getItem('nextId');

    if (saved) this.items = JSON.parse(saved);
    if (savedId) this.nextId = Number(savedId);
  }

  // ======================================================
  // GUARDAR EN LOCALSTORAGE
  // ======================================================
  private saveToStorage() {
    if (!this.canUseStorage()) return;

    localStorage.setItem('productos', JSON.stringify(this.items));
    localStorage.setItem('nextId', this.nextId.toString());
  }

  // ======================================================
  // SUBMIT (crear o actualizar)
  // ======================================================
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    if (this.editMode && this.editingId != null) {
      // UPDATE
      const idx = this.items.findIndex(i => i.id === this.editingId);
      if (idx !== -1) {
        this.items[idx] = {
          id: this.editingId,
          nombre: value.nombre,
          descripcion: value.descripcion,
          precio: value.precio != null ? +value.precio : 0,
          imagen: value.imagen,
          categoria: value.categoria,
          cantidad: value.cantidad
        };
      }
      this.cancelEdit();
    } else {
      // CREATE
      const newItem: Producto = {
        id: this.nextId++,
        nombre: value.nombre,
        descripcion: value.descripcion,
        precio: value.precio,
        imagen: value.imagen,
        categoria: value.categoria,
        cantidad: value.cantidad
      };

      this.items.push(newItem);
      this.form.reset();
    }

    this.saveToStorage();
  }

  // ======================================================
  // EDITAR
  // ======================================================
  edit(item: Producto): void {
    this.editMode = true;
    this.editingId = item.id;

    this.form.patchValue({
      nombre: item.nombre,
      descripcion: item.descripcion ?? '',
      precio: item.precio ?? null,
      imagen: item.imagen ?? '',
      categoria: item.categoria ?? '',
      cantidad: item.cantidad ?? null
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ======================================================
  // ELIMINAR
  // ======================================================
  delete(item: Producto): void {
    if (!confirm(`¿Eliminar "${item.nombre}"?`)) return;

    this.items = this.items.filter(i => i.id !== item.id);

    if (this.editingId === item.id) {
      this.cancelEdit();
    }

    this.saveToStorage();
  }

  // ======================================================
  // CANCELAR EDICIÓN
  // ======================================================
  cancelEdit(): void {
    this.editMode = false;
    this.editingId = null;
    this.form.reset();
  }

  trackById(index: number, item: Producto): number {
    return item.id;
  }
}
