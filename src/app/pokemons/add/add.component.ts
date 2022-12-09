import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PokemonsApiService } from 'src/app/services/pokemons-api.service';
import { PokemonsComponent } from '../pokemons.component';
import { createPokemonForm } from './pokemon-form';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPokemonComponent implements OnInit {
  pokemonForm: any = null;
  pokemonTipos: any = [];
  saving = false;
  constructor(private formBuilder: FormBuilder, private pokeApi: PokemonsApiService,
              public dialogRef: MatDialogRef<PokemonsComponent>) {

  }

  ngOnInit(): void {
    this.pokemonForm = createPokemonForm(this.formBuilder);
    this.pokemonTipos = this.pokeApi.pokemonTipos;
  }

  submit(){
    if (this.pokemonForm.form.valid){
      this.saving = true;
      this.pokeApi.savePokemon(this.pokemonForm.form.value).then( r => {
        this.saving = false;
        this.dialogRef.close();
      })
    }
  }
}
