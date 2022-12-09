import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsComponent } from './pokemons.component';
import { AddPokemonComponent } from './add/add.component';
import { AngularMaterialModule } from '../angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PokemonsComponent,
    AddPokemonComponent
  ],
  entryComponents: [
    AddPokemonComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PokemonsRoutingModule,
    AngularMaterialModule,
    HttpClientModule
  ],

  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ]
})
export class PokemonsModule { }
