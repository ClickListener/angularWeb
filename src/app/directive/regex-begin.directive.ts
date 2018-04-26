/**
 * Created by zhangxu on 2018/4/26.
 */
import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[regex-begin]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegexBeginDirective, multi: true}]

})


export class RegexBeginDirective implements Validator {

  @Input('regex-begin') inputModel: any;

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

      if (!new RegExp('^[a-zA-Z_]{1}.{0,}$').test(control.value)) {
        return {
          'begin': {value: control.value}
        };
      }

    };
  }

}
