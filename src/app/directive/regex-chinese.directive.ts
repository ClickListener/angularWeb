/**
 * Created by zhangxu on 2018/4/26.
 */
import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[regex-chinese]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegexChineseDirective, multi: true}]

})


export class RegexChineseDirective implements Validator {

  @Input('regex-chinese') inputModel: any;

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

      if (new RegExp('[\u4e00-\u9fa5]').test(control.value)) {
        return {
          'chinese': {value: control.value}
        };
      }

    };
  }

}
