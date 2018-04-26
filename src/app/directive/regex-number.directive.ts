/**
 * Created by zhangxu on 2018/4/26.
 */
import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[regex-number]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegexNumberDirective, multi: true}]

})


export class RegexNumberDirective implements Validator {

  @Input('regex-number') inputModel: any;

  regexArr: Array<RegExp>;

  constructor() {
    this.regexArr = new Array();
  }


  validate(c: AbstractControl): { [key: string]: any } {

    return this.regexName()(c);
  }


  regexName(): ValidatorFn {


    return (control: AbstractControl): { [key: string]: any } => {


      if (control.value === undefined || control.value === '') {
        return null;
      }

      if (!new RegExp('[0-9]').test(control.value)) {
        return {
          'number': {value: control.value}
        };
      }

    };
  }

}
