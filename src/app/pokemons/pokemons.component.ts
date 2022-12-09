import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonsApiService } from '../services/pokemons-api.service';
import { AddPokemonComponent } from './add/add.component';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit, AfterViewInit {
  pokemonList: any = [];
  pokemonTipos: any = [];
  tipoSeleccionado = 'todos';
  loading = true;
  viewCols = 3;
  constructor(private pokeApi: PokemonsApiService, private dialog: MatDialog,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params['tipo'])
          this.tipoSeleccionado = params['tipo'];
      });
  }

  async ngAfterViewInit() {
    await this.pokeApi.getTipos();
    this.pokemonTipos = this.pokeApi.pokemonTipos;

    this.pokeApi.getPokemons().then( r => {
      this.filter();
      this.loading = false;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddPokemonComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.filter();
    });
  }

  filter(){
    this.pokemonList = this.filterList( { tipo: this.tipoSeleccionado });
  }

  filterList(filtros: any){
    let pokemonsFiltrados = this.pokeApi.pokemons;

    this.updateRouteParameters( { tipo: this.tipoSeleccionado });
    //_ Aplicar multiples filtros
    const DefaultFiltros: any = { tipo: 'todos' }
    Object.keys(filtros).forEach((k: any) => {
      if (filtros[k] != DefaultFiltros[k])
        pokemonsFiltrados = pokemonsFiltrados.filter((p: any) => p[k] == filtros[k]);
    })

    return pokemonsFiltrados;
  }

  //_ Change layout of columns
  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.viewCols = (window.innerWidth <= 400) ? 1 : 3;
  }

  updateRouteParameters(parameters: any){
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: parameters,
        replaceUrl: true
    });
  }

  async delete(pokemon: any){
    const confirmed = confirm("Confirma que quieres eliminar el pokemon ?");
    if (confirmed){
      this.pokeApi.delete(pokemon).then( r => {
        this.filter();
      });
    }
  }

  edit(pokemon: any){

  }

}
