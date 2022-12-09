import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export const createPokemonForm = (formBuilder: FormBuilder, data = { id: '', nombre: '', peso: '', tipo: '', imagen: '' }) => {
  let pokemonForm = formBuilder.group({
    nombre: new FormControl({ value: data.nombre, disabled: false }, Validators.required),
    peso: new FormControl({ value: data.peso, disabled: false }, Validators.required),
    tipo: new FormControl({ value: data.tipo, disabled: false }, Validators.required),
    imagen: new FormControl({ value: data.imagen, disabled: false }),
  });

  // Return messages errors
  let validationMessages = [
    {
      name: 'nombre',
      validations: [
        { type: 'required', message: 'Es requerido un nombre' }
      ]
    },
    {
      name: 'peso',
      validations: [
        { type: 'required', message: 'El peso es requeridoo' }
      ]
    },
    {
      name: 'tipo',
      validations: [
        { type: 'required', message: 'El tipo es requeridoo' }
      ]
    },
    ,
    {
      name: 'imagen',
      validations: [
        // { type: 'required', message: 'La imagen es requeridoo' }
      ]
    }
  ];

  return { messages: validationMessages, form: pokemonForm };

}
