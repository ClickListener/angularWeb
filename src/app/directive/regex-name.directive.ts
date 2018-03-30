/**
 * Created by zhangxu on 2018/3/29.
 */
import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[regex-name]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegexNameDirective, multi: true}]

})


export class RegexNameDirective implements Validator {

  @Input('regex-name') inputModel: any;

  regexArr: Array<RegExp>;

  constructor() {
    this.regexArr = new Array();
  }


  validate(c: AbstractControl): { [key: string]: any } {

    return this.regexName(this.inputModel)(c);
  }


  regexName(regex: any): ValidatorFn {


    return (control: AbstractControl): { [key: string]: any } => {


      if (control.value === undefined || control.value === '') {
        return null;
      }
      for (const regexName in regex) {


        console.log('control.value = ', control.value);

        console.log('regexName = ', regexName);
        console.log('regexName = ', regex[regexName]);
        console.log('regexName = ', new RegExp(regex[regexName]));

        console.log('match = ', new RegExp(regex[regexName]).test(control.value));

        if (!new RegExp(regex[regexName]).test(control.value)) {
          return {
            [regexName]: {value: control.value}
          };
        }
      }

    };
  }


}
