/**
 * Created by zhangxu on 2018/4/26.
 */
/**
 * Created by zhangxu on 2018/4/26.
 */
import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[regex-lower]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegexLowerLetterDirective, multi: true}]

})


export class RegexLowerLetterDirective implements Validator {

  @Input('regex-lower') inputModel: any;

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

      if (!new RegExp('[a-z]').test(control.value)) {
        return {
          'lower': {value: control.value}
        };
      }

    };
  }


}
