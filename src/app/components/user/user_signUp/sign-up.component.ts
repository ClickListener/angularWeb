/**
 * Created by zhangxu on 2017/7/13.
 */
import {Component} from "@angular/core";
import {UserService} from "../../../services/user.service";

import {Router} from '@angular/router';
import swal from "sweetalert2";
import {LowerCasePipe} from "@angular/common";

declare const jQuery: any;

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {


  nameValue: string;
  emailValue: string;
  passwordValue: string;
  confirmPasswordValue: string;
  agreeValue: boolean;

  country = {
    "cn": "中国", "code": "CN", "en": "China"
  };

  buttonDisable = false;  // 提交按钮状态


  CN_countries = [
    {"cn": "中国", "code": "CN", "en": "China", "origin": "CN"}
  ];

  AS_countries = [
    {"cn": "阿富汗", "code": "AF", "en": "Afghanistan", "origin": "AS"},
    {"cn": "孟加拉", "code": "BD", "en": "Bangladesh", "origin": "AS"},
    {"cn": "文莱", "code": "BN", "en": "Brunei Darussalam", "origin": "AS"},
    {"cn": "不丹", "code": "BT", "en": "Bhutan", "origin": "AS"},
    {"cn": "香港", "code": "HK", "en": "Hong Kong,China", "origin": "AS"},
    {"cn": "印尼", "code": "ID", "en": "Indonesia", "origin": "AS"},
    {"cn": "印度", "code": "IN", "en": "India", "origin": "AS"},
    {"cn": "英属印度洋领地", "code": "IO", "en": "British Indian Ocean Territory", "origin": "AS"},
    {"cn": "日本", "code": "JP", "en": "Japan", "origin": "AS"},
    {"cn": "吉尔吉斯斯坦", "code": "KG", "en": "Kyrgyzstan", "origin": "AS"},
    {"cn": "柬埔寨", "code": "KH", "en": "Cambodia", "origin": "AS"},
    {"cn": "朝鲜", "code": "KP", "en": "The Democratic People's Republic of Korea", "origin": "AS"},
    {"cn": "韩国", "code": "KR", "en": "Korea", "origin": "AS"},
    {"cn": "哈萨克斯坦", "code": "KZ", "en": "Kazakhstan", "origin": "AS"},
    {"cn": "老挝", "code": "LA", "en": "Lao People's Democratic Republic", "origin": "AS"},
    {"cn": "黎巴嫩", "code": "LB", "en": "Lebanon", "origin": "AS"},
    {"cn": "斯里兰卡", "code": "LK", "en": "Sri Lanka", "origin": "AS"},
    {"cn": "缅甸", "code": "MM", "en": "Myanmar", "origin": "AS"},
    {"cn": "蒙古国；蒙古", "code": "MN", "en": "Mongolia", "origin": "AS"},
    {"cn": "澳门", "code": "MO", "en": "MaCao,China", "origin": "AS"},
    {"cn": "马尔代夫", "code": "MV", "en": "Maldives", "origin": "AS"},
    {"cn": "马来西亚", "code": "MY", "en": "Malaysia", "origin": "AS"},
    {"cn": "尼泊尔", "code": "NP", "en": "Nepal", "origin": "AS"},
    {"cn": "菲律宾", "code": "PH", "en": "Philippines", "origin": "AS"},
    {"cn": "巴基斯坦", "code": "PK", "en": "Pakistan", "origin": "AS"},
    {"cn": "巴勒斯坦", "code": "PS", "en": "Palestine, State of", "origin": "AS"},
    {"cn": "新加坡", "code": "SG", "en": "Singapore", "origin": "AS"},
    {"cn": "叙利亚", "code": "SY", "en": "Syrian Arab Republic", "origin": "AS"},
    {"cn": "泰国", "code": "TH", "en": "Thailand", "origin": "AS"},
    {"cn": "塔吉克斯坦", "code": "TJ", "en": "Tajikistan", "origin": "AS"},
    {"cn": "东帝汶", "code": "TL", "en": "Timor-Leste", "origin": "AS"},
    {"cn": "土库曼斯坦", "code": "TM", "en": "Turkmenistan", "origin": "AS"},
    {"cn": "台湾", "code": "TW", "en": "Tai Wan,China", "origin": "AS"},
    {"cn": "乌兹别克斯坦", "code": "UZ", "en": "Uzbekistan", "origin": "AS"},
    {"cn": "越南", "code": "VN", "en": "Vietnam", "origin": "AS"}
  ];

  NA_countries = [
    {"cn": "安提瓜和巴布达", "code": "AG", "en": "Antigua and Barbuda", "origin": "NA"},
    {"cn": "加拿大", "code": "CA", "en": "Canada", "origin": "NA"},
    {"cn": "北马里亚纳群岛", "code": "MP", "en": "Northern Mariana Islands", "origin": "NA"},
    {"cn": "墨西哥", "code": "MX", "en": "Mexico", "origin": "NA"},
    {"cn": "美国本土外小岛屿", "code": "UM", "en": "United States Minor Outlying Islands", "origin": "NA"},
    {"cn": "美国", "code": "US", "en": "United States", "origin": "NA"}
  ];

  LA_countries = [
    {"cn": "安圭拉", "code": "AI", "en": "Anguilla", "origin": "LA"},
    {"cn": "阿根廷", "code": "AR", "en": "Argentina", "origin": "LA"},
    {"cn": "阿鲁巴", "code": "AW", "en": "Aruba", "origin": "LA"},
    {"cn": "巴巴多斯", "code": "BB", "en": "Barbados", "origin": "LA"},
    {"cn": "圣巴泰勒米岛", "code": "BL", "en": "Saint Barthélemy", "origin": "LA"},
    {"cn": "百慕大", "code": "BM", "en": "Bermuda", "origin": "LA"},
    {"cn": "玻利维亚", "code": "BO", "en": "Bolivia, Plurinational", "origin": "LA"},
    {"cn": "荷兰加勒比区", "code": "BQ", "en": "Bonaire, Sint Eustatius and Saba", "origin": "LA"},
    {"cn": "巴西", "code": "BR", "en": "Brazil", "origin": "LA"},
    {"cn": "巴哈马", "code": "BS", "en": "Bahamas", "origin": "LA"},
    {"cn": "伯利兹", "code": "BZ", "en": "Belize", "origin": "LA"},
    {"cn": "智利", "code": "CL", "en": "Chile", "origin": "LA"},
    {"cn": "哥伦比亚", "code": "CO", "en": "Colombia", "origin": "LA"},
    {"cn": "哥斯达黎加", "code": "CR", "en": "Costa Rica", "origin": "LA"},
    {"cn": "古巴", "code": "CU", "en": "Cuba", "origin": "LA"},
    {"cn": "库拉索", "code": "CW", "en": "Curacao", "origin": "LA"},
    {"cn": "多米尼克", "code": "DM", "en": "Dominica", "origin": "LA"},
    {"cn": "多米尼加", "code": "DO", "en": "Dominican Republic", "origin": "LA"},
    {"cn": "厄瓜多尔", "code": "EC", "en": "Ecuador", "origin": "LA"},
    {"cn": "法属圭亚那", "code": "GF", "en": "French Guiana", "origin": "LA"},
    {"cn": "瓜德罗普", "code": "GP", "en": "Guadeloupe", "origin": "LA"},
    {"cn": "危地马拉", "code": "GT", "en": "Guatemala", "origin": "LA"},
    {"cn": "圭亚那", "code": "GY", "en": "Guyana", "origin": "LA"},
    {"cn": "洪都拉斯", "code": "HN", "en": "Honduras", "origin": "LA"},
    {"cn": "海地", "code": "HT", "en": "Haiti", "origin": "LA"},
    {"cn": "牙买加", "code": "JM", "en": "Jamaica", "origin": "LA"},
    {"cn": "圣基茨和尼维斯", "code": "KN", "en": "Saint Kitts and Nevis", "origin": "LA"},
    {"cn": "开曼群岛", "code": "KY", "en": "Cayman Islands", "origin": "LA"},
    {"cn": "法属圣马丁", "code": "MF", "en": "Saint Martin (French part)", "origin": "LA"},
    {"cn": "马提尼克", "code": "MQ", "en": "Martinique", "origin": "LA"},
    {"cn": "蒙塞拉特岛", "code": "MS", "en": "Montserrat", "origin": "LA"},
    {"cn": "尼加拉瓜", "code": "NI", "en": "Nicaragua", "origin": "LA"},
    {"cn": "巴拿马", "code": "PA", "en": "Panama", "origin": "LA"},
    {"cn": "秘鲁", "code": "PE", "en": "Peru", "origin": "LA"},
    {"cn": "波多黎各", "code": "PR", "en": "Puerto Rico", "origin": "LA"},
    {"cn": "巴拉圭", "code": "PY", "en": "Paraguay", "origin": "LA"},
    {"cn": "苏里南", "code": "SR", "en": "Suriname", "origin": "LA"},
    {"cn": "萨尔瓦多", "code": "SV", "en": "El Salvador", "origin": "LA"},
    {"cn": "荷属圣马丁", "code": "SX", "en": "Sint Maarten (Dutch part)", "origin": "LA"},
    {"cn": "特克斯和凯科斯群岛", "code": "TC", "en": "Turks and Caicos Islands", "origin": "LA"},
    {"cn": "特立尼达和多巴哥", "code": "TT", "en": "Trinidad and Tobago", "origin": "LA"},
    {"cn": "乌拉圭", "code": "UY", "en": "Uruguay", "origin": "LA"},
    {"cn": "委内瑞拉", "code": "VE", "en": "Venezuela, Bolivarian Republic of", "origin": "LA"},
    {"cn": "英属维尔京群岛", "code": "VG", "en": "The British Virgin Islands B.V.I", "origin": "LA"},
    {"cn": "美属维尔京群岛", "code": "VI", "en": "United States Virgin Islands", "origin": "LA"}
  ];

  OA_countries = [
    {"cn": "美属萨摩亚", "code": "AS", "en": "American Samoa", "origin": "OA"},
    {"cn": "澳大利亚", "code": "AU", "en": "Australia", "origin": "OA"},
    {"cn": "科科斯群岛", "code": "CC", "en": "Cocos (Keeling) Islands", "origin": "OA"},
    {"cn": "库克群岛", "code": "CK", "en": "Cook Islands", "origin": "OA"},
    {"cn": "圣诞岛", "code": "CX", "en": "Christmas Island", "origin": "OA"},
    {"cn": "斐济群岛", "code": "FJ", "en": "Fiji", "origin": "OA"},
    {"cn": "密克罗尼西亚联邦", "code": "FM", "en": "Micronesia, Federated States of", "origin": "OA"},
    {"cn": "格林纳达", "code": "GD", "en": "Grenada", "origin": "OA"},
    {"cn": "南乔治亚岛和南桑威奇群岛", "code": "GS", "en": "South Georgia and the South Sandwich Islands", "origin": "OA"},
    {"cn": "关岛", "code": "GU", "en": "Guam", "origin": "OA"},
    {"cn": "赫德岛和麦克唐纳群岛", "code": "HM", "en": "Heard Island and McDonald Islands", "origin": "OA"},
    {"cn": "基里巴斯", "code": "KI", "en": "Kiribati", "origin": "OA"},
    {"cn": "马绍尔群岛", "code": "MH", "en": "Marshall islands", "origin": "OA"},
    {"cn": "新喀里多尼亚", "code": "NC", "en": "New Caledonia", "origin": "OA"},
    {"cn": "诺福克岛", "code": "NF", "en": "Norfolk Island", "origin": "OA"},
    {"cn": "瑙鲁", "code": "NR", "en": "Nauru", "origin": "OA"},
    {"cn": "纽埃", "code": "NU", "en": "Niue", "origin": "OA"},
    {"cn": "新西兰", "code": "NZ", "en": "New Zealand", "origin": "OA"},
    {"cn": "法属波利尼西亚", "code": "PF", "en": "French Polynesia", "origin": "OA"},
    {"cn": "巴布亚新几内亚", "code": "PG", "en": "Papua New Guinea", "origin": "OA"},
    {"cn": "皮特凯恩群岛", "code": "PN", "en": "Pitcairn Islands", "origin": "OA"},
    {"cn": "帕劳", "code": "PW", "en": "Palau", "origin": "OA"},
    {"cn": "所罗门群岛", "code": "SB", "en": "Solomon Islands", "origin": "OA"},
    {"cn": "托克劳", "code": "TK", "en": "Tokelau", "origin": "OA"},
    {"cn": "汤加", "code": "TO", "en": "Tonga", "origin": "OA"},
    {"cn": "图瓦卢", "code": "TV", "en": "Tuvalu", "origin": "OA"},
    {"cn": "瓦努阿图", "code": "VU", "en": "Vanuatu", "origin": "OA"},
    {"cn": "瓦利斯和富图纳", "code": "WF", "en": "Wallis and Futuna", "origin": "OA"},
    {"cn": "萨摩亚", "code": "WS", "en": "Samoa", "origin": "OA"}
  ];

  ME_countries = [
    {"cn": "阿联酋", "code": "AE", "en": "United Arab Emirates", "origin": "ME"},
    {"cn": "巴林", "code": "BH", "en": "Bahrain", "origin": "ME"},
    {"cn": "以色列", "code": "IL", "en": "Israel", "origin": "ME"},
    {"cn": "伊拉克", "code": "IQ", "en": "Iraq", "origin": "ME"},
    {"cn": "伊朗", "code": "IR", "en": "Iran, Islamic Republic of", "origin": "ME"},
    {"cn": "约旦", "code": "JO", "en": "Jordan", "origin": "ME"},
    {"cn": "科威特", "code": "KW", "en": "Kuwait", "origin": "ME"},
    {"cn": "阿曼", "code": "OM", "en": "Oman", "origin": "ME"},
    {"cn": "卡塔尔", "code": "QA", "en": "Qatar", "origin": "ME"},
    {"cn": "沙特阿拉伯", "code": "SA", "en": "Saudi Arabia", "origin": "ME"},
    {"cn": "也门", "code": "YE", "en": "Yemen", "origin": "ME"}
  ];

  AF_countries = [
    {"cn": "安哥拉", "code": "AO", "en": "Angola", "origin": "AF"},
    {"cn": "布基纳法索", "code": "BF", "en": "Burkina Faso", "origin": "AF"},
    {"cn": "布隆迪", "code": "BI", "en": "Burundi", "origin": "AF"},
    {"cn": "贝宁", "code": "BJ", "en": "Benin", "origin": "AF"},
    {"cn": "博茨瓦纳", "code": "BW", "en": "Botswana", "origin": "AF"},
    {"cn": "刚果（金）", "code": "CD", "en": "Congo, the Democratic Republic of the", "origin": "AF"},
    {"cn": "中非", "code": "CF", "en": "Central African Republic", "origin": "AF"},
    {"cn": "刚果（布）", "code": "CG", "en": "Congo", "origin": "AF"},
    {"cn": "科特迪瓦", "code": "CI", "en": "Cote d'Ivoire", "origin": "AF"},
    {"cn": "喀麦隆", "code": "CM", "en": "Cameroon", "origin": "AF"},
    {"cn": "佛得角", "code": "CV", "en": "Cape Verde", "origin": "AF"},
    {"cn": "吉布提", "code": "DJ", "en": "Djibouti", "origin": "AF"},
    {"cn": "阿尔及利亚", "code": "DZ", "en": "Algeria", "origin": "AF"},
    {"cn": "埃及", "code": "EG", "en": "Egypt", "origin": "AF"},
    {"cn": "西撒哈拉", "code": "EH", "en": "Western Sahara", "origin": "AF"},
    {"cn": "厄立特里亚", "code": "ER", "en": "Eritrea", "origin": "AF"},
    {"cn": "埃塞俄比亚", "code": "ET", "en": "Ethiopia", "origin": "AF"},
    {"cn": "加蓬", "code": "GA", "en": "Gabon", "origin": "AF"},
    {"cn": "加纳", "code": "GH", "en": "Ghana", "origin": "AF"},
    {"cn": "冈比亚", "code": "GM", "en": "Gambia", "origin": "AF"},
    {"cn": "几内亚", "code": "GN", "en": "Guinea", "origin": "AF"},
    {"cn": "赤道几内亚", "code": "GQ", "en": "Equatorial Guinea", "origin": "AF"},
    {"cn": "几内亚比绍", "code": "GW", "en": "Guinea-Bissau", "origin": "AF"},
    {"cn": "肯尼亚", "code": "KE", "en": "Kenya", "origin": "AF"},
    {"cn": "科摩罗", "code": "KM", "en": "Comoros", "origin": "AF"},
    {"cn": "利比里亚", "code": "LR", "en": "Liberia", "origin": "AF"},
    {"cn": "莱索托", "code": "LS", "en": "Lesotho", "origin": "AF"},
    {"cn": "利比亚", "code": "LY", "en": "Libya", "origin": "AF"},
    {"cn": "摩洛哥", "code": "MA", "en": "Morocco", "origin": "AF"},
    {"cn": "马达加斯加", "code": "MG", "en": "Madagascar", "origin": "AF"},
    {"cn": "马里", "code": "ML", "en": "Mali", "origin": "AF"},
    {"cn": "毛里塔尼亚", "code": "MR", "en": "Mauritania", "origin": "AF"},
    {"cn": "毛里求斯", "code": "MU", "en": "Mauritius", "origin": "AF"},
    {"cn": "马拉维", "code": "MW", "en": "Malawi", "origin": "AF"},
    {"cn": "莫桑比克", "code": "MZ", "en": "Mozambique", "origin": "AF"},
    {"cn": "纳米比亚", "code": "NA", "en": "Namibia", "origin": "AF"},
    {"cn": "尼日尔", "code": "NE", "en": "Niger", "origin": "AF"},
    {"cn": "尼日利亚", "code": "NG", "en": "Nigeria", "origin": "AF"},
    {"cn": "留尼汪", "code": "RE", "en": "Réunion", "origin": "AF"},
    {"cn": "卢旺达", "code": "RW", "en": "Rwanda", "origin": "AF"},
    {"cn": "塞舌尔", "code": "SC", "en": "Seychelles", "origin": "AF"},
    {"cn": "苏丹", "code": "SD", "en": "Sudan", "origin": "AF"},
    {"cn": "塞拉利昂", "code": "SL", "en": "Sierra Leone", "origin": "AF"},
    {"cn": "塞内加尔", "code": "SN", "en": "Senegal", "origin": "AF"},
    {"cn": "索马里", "code": "SO", "en": "Somalia", "origin": "AF"},
    {"cn": "南苏丹", "code": "SS", "en": "South Sudan", "origin": "AF"},
    {"cn": "圣多美和普林西比", "code": "ST", "en": "Sao Tome and Principe", "origin": "AF"},
    {"cn": "斯威士兰", "code": "SZ", "en": "Swaziland", "origin": "AF"},
    {"cn": "乍得", "code": "TD", "en": "Chad", "origin": "AF"},
    {"cn": "法属南部领地", "code": "TF", "en": "French Southern Territories", "origin": "AF"},
    {"cn": "多哥", "code": "TG", "en": "Togo", "origin": "AF"},
    {"cn": "突尼斯", "code": "TN", "en": "Tunisia", "origin": "AF"},
    {"cn": "坦桑尼亚", "code": "TZ", "en": "Tanzania, United Republic of", "origin": "AF"},
    {"cn": "乌干达", "code": "UG", "en": "Uganda", "origin": "AF"},
    {"cn": "马约特", "code": "YT", "en": "Mayotte", "origin": "AF"},
    {"cn": "南非", "code": "ZA", "en": "South Africa", "origin": "AF"},
    {"cn": "赞比亚", "code": "ZM", "en": "Zambia", "origin": "AF"},
    {"cn": "津巴布韦", "code": "ZW", "en": "Zimbabwe", "origin": "AF"}
  ];

  EU_countries = [
    {"cn": "阿尔巴尼亚", "code": "AL", "en": "Albania", "origin": "EU"},
    {"cn": "亚美尼亚", "code": "AM", "en": "Armenia", "origin": "EU"},
    {"cn": "荷属安的列斯群岛", "code": "AN", "en": "Antilles", "origin": "EU"},
    {"cn": "奥地利", "code": "AT", "en": "Austria", "origin": "EU"},
    {"cn": "奥兰群岛", "code": "AX", "en": "Aland Islands", "origin": "EU"},
    {"cn": "阿塞拜疆", "code": "AZ", "en": "Azerbaijan", "origin": "EU"},
    {"cn": "波黑", "code": "BA", "en": "Bosnia and Herzegovina", "origin": "EU"},
    {"cn": "比利时", "code": "BE", "en": "Belgium", "origin": "EU"},
    {"cn": "保加利亚", "code": "BG", "en": "Bulgaria", "origin": "EU"},
    {"cn": "白俄罗斯", "code": "BY", "en": "Belarus", "origin": "EU"},
    {"cn": "瑞士", "code": "CH", "en": "Switzerland", "origin": "EU"},
    {"cn": "塞浦路斯", "code": "CY", "en": "Cyprus", "origin": "EU"},
    {"cn": "捷克", "code": "CZ", "en": "Czech Republic", "origin": "EU"},
    {"cn": "德国", "code": "DE", "en": "Germany", "origin": "EU"},
    {"cn": "丹麦", "code": "DK", "en": "Denmark", "origin": "EU"},
    {"cn": "爱沙尼亚", "code": "EE", "en": "Estonia", "origin": "EU"},
    {"cn": "西班牙", "code": "ES", "en": "Spain", "origin": "EU"},
    {"cn": "芬兰", "code": "FI", "en": "Finland", "origin": "EU"},
    {"cn": "马尔维纳斯群岛（福克兰）", "code": "FK", "en": "Falkland Islands (Malvinas)", "origin": "EU"},
    {"cn": "法罗群岛", "code": "FO", "en": "Faroe Islands", "origin": "EU"},
    {"cn": "法国", "code": "FR", "en": "France", "origin": "EU"},
    {"cn": "英国", "code": "GB", "en": "United Kingdom", "origin": "EU"},
    {"cn": "格鲁吉亚", "code": "GE", "en": "Georgia", "origin": "EU"},
    {"cn": "根西岛", "code": "GG", "en": "Guernsey", "origin": "EU"},
    {"cn": "直布罗陀", "code": "GI", "en": "Gibraltar", "origin": "EU"},
    {"cn": "格陵兰", "code": "GL", "en": "Greenland", "origin": "EU"},
    {"cn": "希腊", "code": "GR", "en": "Greece", "origin": "EU"},
    {"cn": "克罗地亚", "code": "HR", "en": "Croatia", "origin": "EU"},
    {"cn": "匈牙利", "code": "HU", "en": "Hungary", "origin": "EU"},
    {"cn": "爱尔兰", "code": "IE", "en": "Ireland", "origin": "EU"},
    {"cn": "马恩岛", "code": "IM", "en": "Isle of Man", "origin": "EU"},
    {"cn": "冰岛", "code": "IS", "en": "Iceland", "origin": "EU"},
    {"cn": "意大利", "code": "IT", "en": "Italy", "origin": "EU"},
    {"cn": "泽西岛", "code": "JE", "en": "Jersey", "origin": "EU"},
    {"cn": "圣卢西亚", "code": "LC", "en": "Saint Lucia", "origin": "EU"},
    {"cn": "列支敦士登", "code": "LI", "en": "Liechtenstein", "origin": "EU"},
    {"cn": "立陶宛", "code": "LT", "en": "Lithuania", "origin": "EU"},
    {"cn": "卢森堡", "code": "LU", "en": "Luxembourg", "origin": "EU"},
    {"cn": "拉脱维亚", "code": "LV", "en": "Latvia", "origin": "EU"},
    {"cn": "摩纳哥", "code": "MC", "en": "Monaco", "origin": "EU"},
    {"cn": "摩尔多瓦", "code": "MD", "en": "Moldova, Republic of", "origin": "EU"},
    {"cn": "黑山", "code": "ME", "en": "Montenegro", "origin": "EU"},
    {"cn": "马其顿", "code": "MK", "en": "Macedonia, the former Yugoslav Republic of", "origin": "EU"},
    {"cn": "马耳他", "code": "MT", "en": "Malta", "origin": "EU"},
    {"cn": "荷兰", "code": "NL", "en": "Netherlands", "origin": "Eu"},
    {"cn": "挪威", "code": "NO", "en": "Norway", "origin": "EU"},
    {"cn": "波兰", "code": "PL", "en": "Poland", "origin": "EU"},
    {"cn": "圣皮埃尔和密克隆", "code": "PM", "en": "Saint Pierre and Miquelon", "origin": "EU"},
    {"cn": "葡萄牙", "code": "PT", "en": "Portugal", "origin": "EU"},
    {"cn": "罗马尼亚", "code": "RO", "en": "Romania", "origin": "EU"},
    {"cn": "塞尔维亚", "code": "RS", "en": "Serbia", "origin": "EU"},
    {"cn": "瑞典", "code": "SE", "en": "Sweden", "origin": "EU"},
    {"cn": "圣赫勒拿", "code": "SH", "en": "Saint Helena, Ascension and Tristan da Cunha", "origin": "EU"},
    {"cn": "斯洛文尼亚", "code": "SI", "en": "Slovenia", "origin": "EU"},
    {"cn": "斯瓦尔巴群岛和扬马延岛", "code": "SJ", "en": "Svalbard and Jan Mayen", "origin": "EU"},
    {"cn": "斯洛伐克", "code": "SK", "en": "Slovakia", "origin": "EU"},
    {"cn": "圣马力诺", "code": "SM", "en": "San Marino", "origin": "EU"},
    {"cn": "土耳其", "code": "TR", "en": "Turkey", "origin": "EU"},
    {"cn": "乌克兰", "code": "UA", "en": "Ukraine", "origin": "EU"},
    {"cn": "梵蒂冈", "code": "VA", "en": "Holy See (Vatican City State)", "origin": "EU"},
    {"cn": "圣文森特和格林纳丁斯", "code": "VC", "en": "Saint Vincent and the Grenadines", "origin": "EU"},
    {"cn": "安道尔", "code": "AD", "en": "Andorra", "origin": "EU"}
  ];

  RU_countries = [
    {"cn": "俄罗斯", "code": "RU", "en": "Russian Federation", "origin": "RU"}
  ];


  constructor(private userService: UserService, private router: Router, private lowerCasePipe: LowerCasePipe) {
    if (this.userService.user) {
      this.router.navigate(['/']);
    }

    this.sort(this.AS_countries);
    this.sort(this.NA_countries);
    this.sort(this.LA_countries);
    this.sort(this.OA_countries);
    this.sort(this.ME_countries);
    this.sort(this.AF_countries);
    this.sort(this.EU_countries);


  }


  private sort(arr: any) {
    arr.sort((a, b) => {
      if (a.en < b.en) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  signUp() {

    this.buttonDisable = true;

    const signUp_info = {
      addUser: {
        "username": this.lowerCasePipe.transform(this.nameValue),
        "email": this.emailValue,
        "password": this.passwordValue,
        "type": 4,
        "country": this.country.code
      }
    };

    console.log('signUp_info: ', signUp_info);

    this.userService.signUp(signUp_info)
      .then((res) => {
        console.log(res);
        this.buttonDisable = false;
        if (res['success']) {
          // this.router.navigate(['/confirm-hint']);
          swal({
            position: 'center',
            type: 'success',
            text: 'Please check your email to confirm.',
            showConfirmButton: true,
            allowOutsideClick: false
          }).then(() => {
            this.router.navigate(['/sign-in']);
          });
        }

      })
      .catch(error => {
        this.buttonDisable = false;
        console.log("error = " + JSON.stringify(error));
      });

  }

  private chooseCountry(en: string, origin: string) {

    switch (origin) {
      case 'CN':
        this.country = this.CN_countries.find((country, index, arr) => {
          return country.en === en;
        });
        break;
      case 'AS':
        this.country = this.AS_countries.find((country, index, arr) => {
          return country.en === en;
        });
        break;
      case 'NA':
        this.country = this.NA_countries.find((country, index, arr) => {
          return country.en === en;
        });
        break;
      case 'LA':
        this.country = this.LA_countries.find((country, index, arr) => {
          return country.en === en;
        });
        break;
      case 'OA':
        this.country = this.OA_countries.find((country, index, arr) => {
          return country.en === en;
        });
        break;
      case 'ME':
        this.country = this.ME_countries.find((country, index, arr) => {
          return country.en === en;
        });
        break;
      case 'AF':
        this.country = this.AF_countries.find((country, index, arr) => {
          return country.en === en;
        });
        break;
      case 'EU':
        this.country = this.EU_countries.find((country, index, arr) => {
          return country.en === en;
        });
        break;
      case 'RU':
        this.country = this.RU_countries.find((country, index, arr) => {
          return country.en === en;
        });
        break;
    }

    jQuery('#exampleModal').modal('hide');

  }
}
