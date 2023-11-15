import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pillar } from 'src/bird.model';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
