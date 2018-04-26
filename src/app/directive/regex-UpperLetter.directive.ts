/**
 * Created by zhangxu on 2018/4/26.
 */
import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[regex-upper]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegexUpperLetterDirective, multi: true}]

})


export class RegexUpperLetterDirective implements Validator {

  @Input('regex-upper') inputModel: any;

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

      if (!new RegExp('[A-Z]').test(control.value)) {
        return {
          'upper': {value: control.value}
        };
      }

    };
  }


}
