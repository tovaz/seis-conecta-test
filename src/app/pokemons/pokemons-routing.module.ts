import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPokemonComponent } from './add/add.component';
import { PokemonsComponent } from './pokemons.component';

const routes: Routes = [
  {
    path : '',
    component : PokemonsComponent },
  {
    path : 'add',
    component : AddPokemonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsRoutingModule { }
