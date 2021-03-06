import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 's3gw-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnInit {
  @Input()
  formId?: string;

  @Input()
  form?: FormGroup | undefined;

  @Output()
  buttonClick = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(event: Event) {
    if (this.form && this.form.invalid) {
      // Process all invalid controls and update them to draw
      // as invalid.
      _.forEach<Record<string, AbstractControl>>(
        this.form.controls,
        (control: AbstractControl, key: string) => {
          if (control.invalid) {
            control.markAllAsTouched();
            control.updateValueAndValidity();
          }
        }
      );
      return;
    }
    this.buttonClick.emit(event);
  }
}
