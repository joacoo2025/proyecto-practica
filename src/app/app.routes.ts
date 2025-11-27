import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { ContactosComponent } from './paginas/contactos/contactos.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { OfertasComponent } from './paginas/ofertas/ofertas.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { QuienessomosComponent } from './paginas/quienessomos/quienessomos.component';
import { FavoritosComponent } from './paginas/favoritos/favoritos.component';
import { CompraComponent } from './paginas/compra/compra.component';
import { RegistrarseComponent } from './paginas/registrarse/registrarse.component';
import { LoginComponent } from './paginas/login/login.component';
import { CrudComponent } from './paginas/crud/crud.component';
import { TransferenciaComponent } from './paginas/transferencia/transferencia.component';
import { PdfComponent } from './paginas/pdf/pdf.component';
import { TiendaComponent } from './paginas/tienda/tienda.component';
export const routes: Routes = [
    {path: '', redirectTo:'/inicio',pathMatch:'full'},
    {path:'inicio',component:HomeComponent},
    {path:'contacto',component:ContactosComponent},
    {path:'productos',component:ProductosComponent},
    {path:'carrito',component:CarritoComponent},
    {path:'ofertas',component:OfertasComponent},
    {path:'quien',component:QuienessomosComponent},
    {path:'favorito',component:FavoritosComponent},
    {path:'compra',component:CompraComponent},
    {path:'registro',component:RegistrarseComponent},
    {path:'login',component:LoginComponent},
    {path:'crud',component:CrudComponent},
    {path:'pdf',component:PdfComponent},
    {path:'tienda',component:TiendaComponent},
    {path:'transferencia',component:TransferenciaComponent},
];