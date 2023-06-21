import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { delay, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { PropertyInformationDto } from './propertyInformationDto';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';

type CreatePersonPerson = {
  bdIdent: FormControl<number>;
  nummer: FormControl<number>;
  title: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  function: FormControl<string>;
  zipcode: FormControl<string>;
  town: FormControl<string>;
  street: FormControl<string>;
  comment: FormControl<string>;
  officePhoneNr: FormControl<string>;
  mobilePhoneNr: FormControl<string>;
  privatePhoneNr: FormControl<string>;
  faxnr: FormControl<string>;
  email: FormControl<string>;
  flags: FormControl<number>;
  ident: FormControl<number>;
};
type CreatePersonFormModel = {
  person: FormGroup<CreatePersonPerson>;
  selectFiltered: FormControl<boolean>;
  search: FormControl<string>;
};

type CreatePersonFormGroup = FormGroup<CreatePersonFormModel>;

type SelectablePropertyInformation = {
  propertyInformation: PropertyInformationDto;
  selected: boolean;
};

/**
 * @title Testing with MatButtonHarness
 */
@Component({
  selector: 'app-component',
  templateUrl: 'app-component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    NgFor,
    NgIf,
    MatInputModule,
  ],
})
export class AppComponent {
  createPersonForm: CreatePersonFormGroup = this.formBuilder.group({
    person: this.formBuilder.group({
      bdIdent: [0],
      nummer: [0],
      title: [''],
      firstName: ['', Validators.required],
      lastName: [''],
      function: ['', Validators.required],
      zipcode: [''],
      town: [''],
      street: [''],
      comment: [''],
      officePhoneNr: [''],
      mobilePhoneNr: [''],
      privatePhoneNr: [''],
      faxnr: [''],
      email: [''],
      flags: [0],
      ident: [0],
    }),
    selectFiltered: [false],
    search: [''],
  });

  properties$ = apiServiceValues.pipe(delay(100));

  filteredProperties$: Observable<SelectablePropertyInformation[]> =
    this.createPersonForm.controls.search.valueChanges.pipe(
      startWith(''),
      switchMap((searchString) =>
        this.properties$.pipe(
          map((props) =>
            searchString ? this.filter(searchString, props) : props
          ),
          map((props) =>
            props.map((prop) => ({
              propertyInformation: prop,
              selected: this.createPersonForm.controls.selectFiltered.value,
            }))
          )
        )
      ),
      startWith([]),
      tap(console.log)
    );

  constructor(private formBuilder: NonNullableFormBuilder) {}

  filter(
    searchString: string,
    properties: PropertyInformationDto[]
  ): PropertyInformationDto[] {
    if (searchString == '') return properties;
    return properties.filter((d) =>
      `${d.name},${d.bdIdent}`.toLowerCase().includes(searchString)
    );
  }

  onSelectionChange() {
    this.createPersonForm.controls.selectFiltered.setValue(false);
  }
}

export const apiServiceValues: Observable<PropertyInformationDto[]> = of([
  {
    bdIdent: 0,
    name: 'Name',
    connectUrl: 'Url',
    connectName: 'Cname',
    phoneNr: '015764546',
    street: 'Teststrasse',
    city: 'Teststadt',
    zipCode: '53555',
    identifier: '1',
    comments: 'Kommentar',
    enviromentInfo: 'Env',
    connectAuth1: {
      key: 'k1',
      value: 'v1',
    },
    connectAuth2: {
      key: 'k2',
      value: 'v2',
    },
    connectAuth3: {
      key: 'k3',
      value: 'v3',
    },
    email: 'k4',
    notice: 'v4',
  },
  {
    bdIdent: 1,
    name: 'Name2',
    connectUrl: 'Url',
    connectName: 'Cname',
    phoneNr: '015764546',
    street: 'Teststrasse',
    city: 'Teststadt',
    zipCode: '53555',
    identifier: '1',
    comments: 'Kommentar',
    enviromentInfo: 'Env',
    connectAuth1: {
      key: 'k1',
      value: 'v1',
    },
    connectAuth2: {
      key: 'k2',
      value: 'v2',
    },
    connectAuth3: {
      key: 'k3',
      value: 'v3',
    },
    email: 'k4',
    notice: 'v4',
  },
]);
/**  Copyright 2023 Google LLC. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at https://angular.io/license */
