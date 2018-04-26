/**
 * Created by zhangxu on 2018/4/26.
 */
import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[regex-space]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegexSpaceDirective, multi: true}]

})


export class RegexSpaceDirective implements Validator {

  @Input('regex-space') inputModel: any;

  regexArr: Array<RegExp>;

  constructor() {
    this.regexArr = new Array();
  }


  validate(c: AbstractControl): { [key: string]: any } {

    return this.regexName()(c);
  }


  regexName(): ValidatorFn {


    return (control: AbstractControl): { [key: string]: any } => {


      if (!control.value || control.value === undefined || control.value === '' ) {
        return null;
      }

      if (control.value.indexOf(" ") !== -1) {
        return {
          'space': {value: control.value}
        };
      }

    };
  }

}
