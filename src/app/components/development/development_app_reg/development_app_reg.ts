/**
 * Created by zhangxu on 17/01/2018.
 */
import {Component} from "@angular/core";

declare const jQuery: any;

@Component({
  templateUrl: './development_app_reg.html',
  styleUrls: ['./development_app_reg.css']
})

export class DevelopmentAppRegComponent {
  constructor() {

    jQuery(document).ready(function () {
      jQuery('#add-device').on('click', function () {
        console.log('click');
        jQuery('#form-content').append('<div>\n' +
          '          <p class="custom-item1">01</p>\n' +
          '          <div class="custom-item2">\n' +
          '            <select>\n' +
          '              <option value="1">Option 1</option>\n' +
          '              <option value="2">Option 2</option>\n' +
          '              <option value="3">Option 3</option>\n' +
          '            </select>\n' +
          '          </div>\n' +
          '          <div class="custom-item3">\n' +
          '            <select>\n' +
          '              <option value="1">Option 1</option>\n' +
          '              <option value="2">Option 2</option>\n' +
          '              <option value="3">Option 3</option>\n' +
          '            </select>\n' +
          '          </div>\n' +
          '          <a class="custom-item4"><img src="../../../../assets/images/notice.png"></a>\n' +
          '        </div>');

      });

      jQuery('#form-content').on('click', '.delete', function () {
        console.log('delete');
        if (jQuery('#inputView').children().length !== 1 ) {
          jQuery(this).parent().remove();
        }

      });
    });
  }
}
