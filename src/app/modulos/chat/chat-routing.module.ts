import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogueadoGuard } from 'src/app/guards/logueado.guard';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  { path: '', component: ChatComponent, canActivate:[LogueadoGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
