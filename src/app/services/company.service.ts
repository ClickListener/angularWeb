/**
 * Created by zhangxu on 2018/1/24.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import * as myGlobals from '../../environments/config';
import {ErrorService} from "./error.service";
import {toPromise} from "rxjs/operator/toPromise";
import {UserService} from "./user.service";
import swal from "sweetalert2";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class CompanyService {

  countryList = [
    {"cn": "中国", "code": "CN", "en": "China", "orgin": "CN"},
    {"cn": "阿富汗", "code": "AF", "en": "Afghanistan", "orgin": "AS"},
    {"cn": "孟加拉", "code": "BD", "en": "Bangladesh", "orgin": "AS"},
    {"cn": "文莱", "code": "BN", "en": "Brunei Darussalam", "orgin": "AS"},
    {"cn": "不丹", "code": "BT", "en": "Bhutan", "orgin": "AS"},
    {"cn": "香港", "code": "HK", "en": "Hong Kong,China", "orgin": "AS"},
    {"cn": "印尼", "code": "ID", "en": "Indonesia", "orgin": "AS"},
    {"cn": "印度", "code": "IN", "en": "India", "orgin": "AS"},
    {"cn": "英属印度洋领地", "code": "IO", "en": "British Indian Ocean Territory", "orgin": "AS"},
    {"cn": "日本", "code": "JP", "en": "Japan", "orgin": "AS"},
    {"cn": "吉尔吉斯斯坦", "code": "KG", "en": "Kyrgyzstan", "orgin": "AS"},
    {"cn": "柬埔寨", "code": "KH", "en": "Cambodia", "orgin": "AS"},
    {"cn": "朝鲜", "code": "KP", "en": "The Democratic People's Republic of Korea", "orgin": "AS"},
    {"cn": "韩国", "code": "KR", "en": "Korea", "orgin": "AS"},
    {"cn": "哈萨克斯坦", "code": "KZ", "en": "Kazakhstan", "orgin": "AS"},
    {"cn": "老挝", "code": "LA", "en": "Lao People's Democratic Republic", "orgin": "AS"},
    {"cn": "黎巴嫩", "code": "LB", "en": "Lebanon", "orgin": "AS"},
    {"cn": "斯里兰卡", "code": "LK", "en": "Sri Lanka", "orgin": "AS"},
    {"cn": "缅甸", "code": "MM", "en": "Myanmar", "orgin": "AS"},
    {"cn": "蒙古国；蒙古", "code": "MN", "en": "Mongolia", "orgin": "AS"},
    {"cn": "澳门", "code": "MO", "en": "MaCao,China", "orgin": "AS"},
    {"cn": "马尔代夫", "code": "MV", "en": "Maldives", "orgin": "AS"},
    {"cn": "马来西亚", "code": "MY", "en": "Malaysia", "orgin": "AS"},
    {"cn": "尼泊尔", "code": "NP", "en": "Nepal", "orgin": "AS"},
    {"cn": "菲律宾", "code": "PH", "en": "Philippines", "orgin": "AS"},
    {"cn": "巴基斯坦", "code": "PK", "en": "Pakistan", "orgin": "AS"},
    {"cn": "巴勒斯坦", "code": "PS", "en": "Palestine, State of", "orgin": "AS"},
    {"cn": "新加坡", "code": "SG", "en": "Singapore", "orgin": "AS"},
    {"cn": "叙利亚", "code": "SY", "en": "Syrian Arab Republic", "orgin": "AS"},
    {"cn": "泰国", "code": "TH", "en": "Thailand", "orgin": "AS"},
    {"cn": "塔吉克斯坦", "code": "TJ", "en": "Tajikistan", "orgin": "AS"},
    {"cn": "东帝汶", "code": "TL", "en": "Timor-Leste", "orgin": "AS"},
    {"cn": "土库曼斯坦", "code": "TM", "en": "Turkmenistan", "orgin": "AS"},
    {"cn": "台湾", "code": "TW", "en": "Tai Wan,China", "orgin": "AS"},
    {"cn": "乌兹别克斯坦", "code": "UZ", "en": "Uzbekistan", "orgin": "AS"},
    {"cn": "越南", "code": "VN", "en": "Vietnam", "orgin": "AS"},
    {"cn": "安提瓜和巴布达", "code": "AG", "en": "Antigua and Barbuda", "orgin": "NA"},
    {"cn": "加拿大", "code": "CA", "en": "Canada", "orgin": "NA"},
    {"cn": "北马里亚纳群岛", "code": "MP", "en": "Northern Mariana Islands", "orgin": "NA"},
    {"cn": "墨西哥", "code": "MX", "en": "Mexico", "orgin": "NA"},
    {"cn": "美国本土外小岛屿", "code": "UM", "en": "United States Minor Outlying Islands", "orgin": "NA"},
    {"cn": "美国", "code": "US", "en": "United States", "orgin": "NA"},
    {"cn": "安圭拉", "code": "AI", "en": "Anguilla", "orgin": "LA"},
    {"cn": "阿根廷", "code": "AR", "en": "Argentina", "orgin": "LA"},
    {"cn": "阿鲁巴", "code": "AW", "en": "Aruba", "orgin": "LA"},
    {"cn": "巴巴多斯", "code": "BB", "en": "Barbados", "orgin": "LA"},
    {"cn": "圣巴泰勒米岛", "code": "BL", "en": "Saint Barthélemy", "orgin": "LA"},
    {"cn": "百慕大", "code": "BM", "en": "Bermuda", "orgin": "LA"},
    {"cn": "玻利维亚", "code": "BO", "en": "Bolivia, Plurinational", "orgin": "LA"},
    {"cn": "荷兰加勒比区", "code": "BQ", "en": "Bonaire, Sint Eustatius and Saba", "orgin": "LA"},
    {"cn": "巴西", "code": "BR", "en": "Brazil", "orgin": "LA"},
    {"cn": "巴哈马", "code": "BS", "en": "Bahamas", "orgin": "LA"},
    {"cn": "伯利兹", "code": "BZ", "en": "Belize", "orgin": "LA"},
    {"cn": "智利", "code": "CL", "en": "Chile", "orgin": "LA"},
    {"cn": "哥伦比亚", "code": "CO", "en": "Colombia", "orgin": "LA"},
    {"cn": "哥斯达黎加", "code": "CR", "en": "Costa Rica", "orgin": "LA"},
    {"cn": "古巴", "code": "CU", "en": "Cuba", "orgin": "LA"},
    {"cn": "库拉索", "code": "CW", "en": "Curacao", "orgin": "LA"},
    {"cn": "多米尼克", "code": "DM", "en": "Dominica", "orgin": "LA"},
    {"cn": "多米尼加", "code": "DO", "en": "Dominican Republic", "orgin": "LA"},
    {"cn": "厄瓜多尔", "code": "EC", "en": "Ecuador", "orgin": "LA"},
    {"cn": "法属圭亚那", "code": "GF", "en": "French Guiana", "orgin": "LA"},
    {"cn": "瓜德罗普", "code": "GP", "en": "Guadeloupe", "orgin": "LA"},
    {"cn": "危地马拉", "code": "GT", "en": "Guatemala", "orgin": "LA"},
    {"cn": "圭亚那", "code": "GY", "en": "Guyana", "orgin": "LA"},
    {"cn": "洪都拉斯", "code": "HN", "en": "Honduras", "orgin": "LA"},
    {"cn": "海地", "code": "HT", "en": "Haiti", "orgin": "LA"},
    {"cn": "牙买加", "code": "JM", "en": "Jamaica", "orgin": "LA"},
    {"cn": "圣基茨和尼维斯", "code": "KN", "en": "Saint Kitts and Nevis", "orgin": "LA"},
    {"cn": "开曼群岛", "code": "KY", "en": "Cayman Islands", "orgin": "LA"},
    {"cn": "法属圣马丁", "code": "MF", "en": "Saint Martin (French part)", "orgin": "LA"},
    {"cn": "马提尼克", "code": "MQ", "en": "Martinique", "orgin": "LA"},
    {"cn": "蒙塞拉特岛", "code": "MS", "en": "Montserrat", "orgin": "LA"},
    {"cn": "尼加拉瓜", "code": "NI", "en": "Nicaragua", "orgin": "LA"},
    {"cn": "巴拿马", "code": "PA", "en": "Panama", "orgin": "LA"},
    {"cn": "秘鲁", "code": "PE", "en": "Peru", "orgin": "LA"},
    {"cn": "波多黎各", "code": "PR", "en": "Puerto Rico", "orgin": "LA"},
    {"cn": "巴拉圭", "code": "PY", "en": "Paraguay", "orgin": "LA"},
    {"cn": "苏里南", "code": "SR", "en": "Suriname", "orgin": "LA"},
    {"cn": "萨尔瓦多", "code": "SV", "en": "El Salvador", "orgin": "LA"},
    {"cn": "荷属圣马丁", "code": "SX", "en": "Sint Maarten (Dutch part)", "orgin": "LA"},
    {"cn": "特克斯和凯科斯群岛", "code": "TC", "en": "Turks and Caicos Islands", "orgin": "LA"},
    {"cn": "特立尼达和多巴哥", "code": "TT", "en": "Trinidad and Tobago", "orgin": "LA"},
    {"cn": "乌拉圭", "code": "UY", "en": "Uruguay", "orgin": "LA"},
    {"cn": "委内瑞拉", "code": "VE", "en": "Venezuela, Bolivarian Republic of", "orgin": "LA"},
    {"cn": "英属维尔京群岛", "code": "VG", "en": "The British Virgin Islands B.V.I", "orgin": "LA"},
    {"cn": "美属维尔京群岛", "code": "VI", "en": "United States Virgin Islands", "orgin": "LA"},
    {"cn": "美属萨摩亚", "code": "AS", "en": "American Samoa", "orgin": "OA"},
    {"cn": "澳大利亚", "code": "AU", "en": "Australia", "orgin": "OA"},
    {"cn": "科科斯群岛", "code": "CC", "en": "Cocos (Keeling) Islands", "orgin": "OA"},
    {"cn": "库克群岛", "code": "CK", "en": "Cook Islands", "orgin": "OA"},
    {"cn": "圣诞岛", "code": "CX", "en": "Christmas Island", "orgin": "OA"},
    {"cn": "斐济群岛", "code": "FJ", "en": "Fiji", "orgin": "OA"},
    {"cn": "密克罗尼西亚联邦", "code": "FM", "en": "Micronesia, Federated States of", "orgin": "OA"},
    {"cn": "格林纳达", "code": "GD", "en": "Grenada", "orgin": "OA"},
    {"cn": "南乔治亚岛和南桑威奇群岛", "code": "GS", "en": "South Georgia and the South Sandwich Islands", "orgin": "OA"},
    {"cn": "关岛", "code": "GU", "en": "Guam", "orgin": "OA"},
    {"cn": "赫德岛和麦克唐纳群岛", "code": "HM", "en": "Heard Island and McDonald Islands", "orgin": "OA"},
    {"cn": "基里巴斯", "code": "KI", "en": "Kiribati", "orgin": "OA"},
    {"cn": "马绍尔群岛", "code": "MH", "en": "Marshall islands", "orgin": "OA"},
    {"cn": "新喀里多尼亚", "code": "NC", "en": "New Caledonia", "orgin": "OA"},
    {"cn": "诺福克岛", "code": "NF", "en": "Norfolk Island", "orgin": "OA"},
    {"cn": "瑙鲁", "code": "NR", "en": "Nauru", "orgin": "OA"},
    {"cn": "纽埃", "code": "NU", "en": "Niue", "orgin": "OA"},
    {"cn": "新西兰", "code": "NZ", "en": "New Zealand", "orgin": "OA"},
    {"cn": "法属波利尼西亚", "code": "PF", "en": "French Polynesia", "orgin": "OA"},
    {"cn": "巴布亚新几内亚", "code": "PG", "en": "Papua New Guinea", "orgin": "OA"},
    {"cn": "皮特凯恩群岛", "code": "PN", "en": "Pitcairn Islands", "orgin": "OA"},
    {"cn": "帕劳", "code": "PW", "en": "Palau", "orgin": "OA"},
    {"cn": "所罗门群岛", "code": "SB", "en": "Solomon Islands", "orgin": "OA"},
    {"cn": "托克劳", "code": "TK", "en": "Tokelau", "orgin": "OA"},
    {"cn": "汤加", "code": "TO", "en": "Tonga", "orgin": "OA"},
    {"cn": "图瓦卢", "code": "TV", "en": "Tuvalu", "orgin": "OA"},
    {"cn": "瓦努阿图", "code": "VU", "en": "Vanuatu", "orgin": "OA"},
    {"cn": "瓦利斯和富图纳", "code": "WF", "en": "Wallis and Futuna", "orgin": "OA"},
    {"cn": "萨摩亚", "code": "WS", "en": "Samoa", "orgin": "OA"},
    {"cn": "阿联酋", "code": "AE", "en": "United Arab Emirates", "orgin": "ME"},
    {"cn": "巴林", "code": "BH", "en": "Bahrain", "orgin": "ME"},
    {"cn": "以色列", "code": "IL", "en": "Israel", "orgin": "ME"},
    {"cn": "伊拉克", "code": "IQ", "en": "Iraq", "orgin": "ME"},
    {"cn": "伊朗", "code": "IR", "en": "Iran, Islamic Republic of", "orgin": "ME"},
    {"cn": "约旦", "code": "JO", "en": "Jordan", "orgin": "ME"},
    {"cn": "科威特", "code": "KW", "en": "Kuwait", "orgin": "ME"},
    {"cn": "阿曼", "code": "OM", "en": "Oman", "orgin": "ME"},
    {"cn": "卡塔尔", "code": "QA", "en": "Qatar", "orgin": "ME"},
    {"cn": "沙特阿拉伯", "code": "SA", "en": "Saudi Arabia", "orgin": "ME"},
    {"cn": "也门", "code": "YE", "en": "Yemen", "orgin": "ME"},
    {"cn": "安哥拉", "code": "AO", "en": "Angola", "orgin": "AF"},
    {"cn": "布基纳法索", "code": "BF", "en": "Burkina Faso", "orgin": "AF"},
    {"cn": "布隆迪", "code": "BI", "en": "Burundi", "orgin": "AF"},
    {"cn": "贝宁", "code": "BJ", "en": "Benin", "orgin": "AF"},
    {"cn": "博茨瓦纳", "code": "BW", "en": "Botswana", "orgin": "AF"},
    {"cn": "刚果（金）", "code": "CD", "en": "Congo, the Democratic Republic of the", "orgin": "AF"},
    {"cn": "中非", "code": "CF", "en": "Central African Republic", "orgin": "AF"},
    {"cn": "刚果（布）", "code": "CG", "en": "Congo", "orgin": "AF"},
    {"cn": "科特迪瓦", "code": "CI", "en": "Cote d'Ivoire", "orgin": "AF"},
    {"cn": "喀麦隆", "code": "CM", "en": "Cameroon", "orgin": "AF"},
    {"cn": "佛得角", "code": "CV", "en": "Cape Verde", "orgin": "AF"},
    {"cn": "吉布提", "code": "DJ", "en": "Djibouti", "orgin": "AF"},
    {"cn": "阿尔及利亚", "code": "DZ", "en": "Algeria", "orgin": "AF"},
    {"cn": "埃及", "code": "EG", "en": "Egypt", "orgin": "AF"},
    {"cn": "西撒哈拉", "code": "EH", "en": "Western Sahara", "orgin": "AF"},
    {"cn": "厄立特里亚", "code": "ER", "en": "Eritrea", "orgin": "AF"},
    {"cn": "埃塞俄比亚", "code": "ET", "en": "Ethiopia", "orgin": "AF"},
    {"cn": "加蓬", "code": "GA", "en": "Gabon", "orgin": "AF"},
    {"cn": "加纳", "code": "GH", "en": "Ghana", "orgin": "AF"},
    {"cn": "冈比亚", "code": "GM", "en": "Gambia", "orgin": "AF"},
    {"cn": "几内亚", "code": "GN", "en": "Guinea", "orgin": "AF"},
    {"cn": "赤道几内亚", "code": "GQ", "en": "Equatorial Guinea", "orgin": "AF"},
    {"cn": "几内亚比绍", "code": "GW", "en": "Guinea-Bissau", "orgin": "AF"},
    {"cn": "肯尼亚", "code": "KE", "en": "Kenya", "orgin": "AF"},
    {"cn": "科摩罗", "code": "KM", "en": "Comoros", "orgin": "AF"},
    {"cn": "利比里亚", "code": "LR", "en": "Liberia", "orgin": "AF"},
    {"cn": "莱索托", "code": "LS", "en": "Lesotho", "orgin": "AF"},
    {"cn": "利比亚", "code": "LY", "en": "Libya", "orgin": "AF"},
    {"cn": "摩洛哥", "code": "MA", "en": "Morocco", "orgin": "AF"},
    {"cn": "马达加斯加", "code": "MG", "en": "Madagascar", "orgin": "AF"},
    {"cn": "马里", "code": "ML", "en": "Mali", "orgin": "AF"},
    {"cn": "毛里塔尼亚", "code": "MR", "en": "Mauritania", "orgin": "AF"},
    {"cn": "毛里求斯", "code": "MU", "en": "Mauritius", "orgin": "AF"},
    {"cn": "马拉维", "code": "MW", "en": "Malawi", "orgin": "AF"},
    {"cn": "莫桑比克", "code": "MZ", "en": "Mozambique", "orgin": "AF"},
    {"cn": "纳米比亚", "code": "NA", "en": "Namibia", "orgin": "AF"},
    {"cn": "尼日尔", "code": "NE", "en": "Niger", "orgin": "AF"},
    {"cn": "尼日利亚", "code": "NG", "en": "Nigeria", "orgin": "AF"},
    {"cn": "留尼汪", "code": "RE", "en": "Réunion", "orgin": "AF"},
    {"cn": "卢旺达", "code": "RW", "en": "Rwanda", "orgin": "AF"},
    {"cn": "塞舌尔", "code": "SC", "en": "Seychelles", "orgin": "AF"},
    {"cn": "苏丹", "code": "SD", "en": "Sudan", "orgin": "AF"},
    {"cn": "塞拉利昂", "code": "SL", "en": "Sierra Leone", "orgin": "AF"},
    {"cn": "塞内加尔", "code": "SN", "en": "Senegal", "orgin": "AF"},
    {"cn": "索马里", "code": "SO", "en": "Somalia", "orgin": "AF"},
    {"cn": "南苏丹", "code": "SS", "en": "South Sudan", "orgin": "AF"},
    {"cn": "圣多美和普林西比", "code": "ST", "en": "Sao Tome and Principe", "orgin": "AF"},
    {"cn": "斯威士兰", "code": "SZ", "en": "Swaziland", "orgin": "AF"},
    {"cn": "乍得", "code": "TD", "en": "Chad", "orgin": "AF"},
    {"cn": "法属南部领地", "code": "TF", "en": "French Southern Territories", "orgin": "AF"},
    {"cn": "多哥", "code": "TG", "en": "Togo", "orgin": "AF"},
    {"cn": "突尼斯", "code": "TN", "en": "Tunisia", "orgin": "AF"},
    {"cn": "坦桑尼亚", "code": "TZ", "en": "Tanzania, United Republic of", "orgin": "AF"},
    {"cn": "乌干达", "code": "UG", "en": "Uganda", "orgin": "AF"},
    {"cn": "马约特", "code": "YT", "en": "Mayotte", "orgin": "AF"},
    {"cn": "南非", "code": "ZA", "en": "South Africa", "orgin": "AF"},
    {"cn": "赞比亚", "code": "ZM", "en": "Zambia", "orgin": "AF"},
    {"cn": "津巴布韦", "code": "ZW", "en": "Zimbabwe", "orgin": "AF"},
    {"cn": "阿尔巴尼亚", "code": "AL", "en": "Albania", "orgin": "EU"},
    {"cn": "亚美尼亚", "code": "AM", "en": "Armenia", "orgin": "EU"},
    {"cn": "荷属安的列斯群岛", "code": "AN", "en": "Antilles", "orgin": "EU"},
    {"cn": "奥地利", "code": "AT", "en": "Austria", "orgin": "EU"},
    {"cn": "奥兰群岛", "code": "AX", "en": "Aland Islands", "orgin": "EU"},
    {"cn": "阿塞拜疆", "code": "AZ", "en": "Azerbaijan", "orgin": "EU"},
    {"cn": "波黑", "code": "BA", "en": "Bosnia and Herzegovina", "orgin": "EU"},
    {"cn": "比利时", "code": "BE", "en": "Belgium", "orgin": "EU"},
    {"cn": "保加利亚", "code": "BG", "en": "Bulgaria", "orgin": "EU"},
    {"cn": "白俄罗斯", "code": "BY", "en": "Belarus", "orgin": "EU"},
    {"cn": "瑞士", "code": "CH", "en": "Switzerland", "orgin": "EU"},
    {"cn": "塞浦路斯", "code": "CY", "en": "Cyprus", "orgin": "EU"},
    {"cn": "捷克", "code": "CZ", "en": "Czech Republic", "orgin": "EU"},
    {"cn": "德国", "code": "DE", "en": "Germany", "orgin": "EU"},
    {"cn": "丹麦", "code": "DK", "en": "Denmark", "orgin": "EU"},
    {"cn": "爱沙尼亚", "code": "EE", "en": "Estonia", "orgin": "EU"},
    {"cn": "西班牙", "code": "ES", "en": "Spain", "orgin": "EU"},
    {"cn": "芬兰", "code": "FI", "en": "Finland", "orgin": "EU"},
    {"cn": "马尔维纳斯群岛（福克兰）", "code": "FK", "en": "Falkland Islands (Malvinas)", "orgin": "EU"},
    {"cn": "法罗群岛", "code": "FO", "en": "Faroe Islands", "orgin": "EU"},
    {"cn": "法国", "code": "FR", "en": "France", "orgin": "EU"},
    {"cn": "英国", "code": "GB", "en": "United Kingdom", "orgin": "EU"},
    {"cn": "格鲁吉亚", "code": "GE", "en": "Georgia", "orgin": "EU"},
    {"cn": "根西岛", "code": "GG", "en": "Guernsey", "orgin": "EU"},
    {"cn": "直布罗陀", "code": "GI", "en": "Gibraltar", "orgin": "EU"},
    {"cn": "格陵兰", "code": "GL", "en": "Greenland", "orgin": "EU"},
    {"cn": "希腊", "code": "GR", "en": "Greece", "orgin": "EU"},
    {"cn": "克罗地亚", "code": "HR", "en": "Croatia", "orgin": "EU"},
    {"cn": "匈牙利", "code": "HU", "en": "Hungary", "orgin": "EU"},
    {"cn": "爱尔兰", "code": "IE", "en": "Ireland", "orgin": "EU"},
    {"cn": "马恩岛", "code": "IM", "en": "Isle of Man", "orgin": "EU"},
    {"cn": "冰岛", "code": "IS", "en": "Iceland", "orgin": "EU"},
    {"cn": "意大利", "code": "IT", "en": "Italy", "orgin": "EU"},
    {"cn": "泽西岛", "code": "JE", "en": "Jersey", "orgin": "EU"},
    {"cn": "圣卢西亚", "code": "LC", "en": "Saint Lucia", "orgin": "EU"},
    {"cn": "列支敦士登", "code": "LI", "en": "Liechtenstein", "orgin": "EU"},
    {"cn": "立陶宛", "code": "LT", "en": "Lithuania", "orgin": "EU"},
    {"cn": "卢森堡", "code": "LU", "en": "Luxembourg", "orgin": "EU"},
    {"cn": "拉脱维亚", "code": "LV", "en": "Latvia", "orgin": "EU"},
    {"cn": "摩纳哥", "code": "MC", "en": "Monaco", "orgin": "EU"},
    {"cn": "摩尔多瓦", "code": "MD", "en": "Moldova, Republic of", "orgin": "EU"},
    {"cn": "黑山", "code": "ME", "en": "Montenegro", "orgin": "EU"},
    {"cn": "马其顿", "code": "MK", "en": "Macedonia, the former Yugoslav Republic of", "orgin": "EU"},
    {"cn": "马耳他", "code": "MT", "en": "Malta", "orgin": "EU"},
    {"cn": "荷兰", "code": "NL", "en": "Netherlands", "orgin": "EU"},
    {"cn": "挪威", "code": "NO", "en": "Norway", "orgin": "EU"},
    {"cn": "波兰", "code": "PL", "en": "Poland", "orgin": "EU"},
    {"cn": "圣皮埃尔和密克隆", "code": "PM", "en": "Saint Pierre and Miquelon", "orgin": "EU"},
    {"cn": "葡萄牙", "code": "PT", "en": "Portugal", "orgin": "EU"},
    {"cn": "罗马尼亚", "code": "RO", "en": "Romania", "orgin": "EU"},
    {"cn": "塞尔维亚", "code": "RS", "en": "Serbia", "orgin": "EU"},
    {"cn": "瑞典", "code": "SE", "en": "Sweden", "orgin": "EU"},
    {"cn": "圣赫勒拿", "code": "SH", "en": "Saint Helena, Ascension and Tristan da Cunha", "orgin": "EU"},
    {"cn": "斯洛文尼亚", "code": "SI", "en": "Slovenia", "orgin": "EU"},
    {"cn": "斯瓦尔巴群岛和扬马延岛", "code": "SJ", "en": "Svalbard and Jan Mayen", "orgin": "EU"},
    {"cn": "斯洛伐克", "code": "SK", "en": "Slovakia", "orgin": "EU"},
    {"cn": "圣马力诺", "code": "SM", "en": "San Marino", "orgin": "EU"},
    {"cn": "土耳其", "code": "TR", "en": "Turkey", "orgin": "EU"},
    {"cn": "乌克兰", "code": "UA", "en": "Ukraine", "orgin": "EU"},
    {"cn": "梵蒂冈", "code": "VA", "en": "Holy See (Vatican City State)", "orgin": "EU"},
    {"cn": "圣文森特和格林纳丁斯", "code": "VC", "en": "Saint Vincent and the Grenadines", "orgin": "EU"},
    {"cn": "安道尔", "code": "AD", "en": "Andorra", "orgin": "EU"},
    {"cn": "俄罗斯", "code": "RU", "en": "Russian Federation", "orgin": "RU"}
  ];

  url = myGlobals.url;

  constructor(private http: HttpClient, private errorService: ErrorService,
              private userService: UserService, private logger: NGXLogger) {
  }

  private static handleError(error: any): Promise<any> {
    if (error.status === 0) {
      swal({
        position: 'center',
        type: 'error',
        titleText: "Connection Refused",
        showConfirmButton: false,
        timer: 2000
      }).catch(swal.noop);
    }
    return Promise.reject(error);
  }


  /**
   * 获得国家列表
   */
  getCountryList(): Promise<any> {

    const url = this.url + "/api/company/getCountryList";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
      .toPromise()
      .then(res => {
        this.countryList = res as any[];
        return this.countryList;
      })
      .catch(CompanyService.handleError);
  }

  /**
   * 审核/禁用公司
   */

  reviewCompany(companyInfo: any): Promise<any> {

    this.logger.debug("companyInfo = " + JSON.stringify(companyInfo));

    const url = this.url + "/api/company/reviewCompany";

    return this.http.post(url, companyInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              companyInfo.token = response.token;
              const appResponse = await this.reviewCompany(companyInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(CompanyService.handleError);
  }


  /**
   * 查找公司信息
   * @param companyInfo
   * @returns {Promise<any>}
   */
  findCompany(companyInfo: any): Promise<any> {
    this.logger.debug("companyInfo = " + JSON.stringify(companyInfo));

    const url = this.url + "/api/company/findCompany";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: {
        "cid": companyInfo.cid,
        "userId": companyInfo.userId,
        "token": companyInfo.token
      }
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              companyInfo.token = response.token;
              const appResponse = await this.findCompany(companyInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(CompanyService.handleError);
  }

  /**
   * 删除公司信息
   */
  deleteCompany(companyInfo: any): Promise<any> {

    this.logger.debug("companyInfo = " + JSON.stringify(companyInfo));

    const url = this.url + "/api/company/deleteCompany";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: {
        "cid": companyInfo.cid,
        "userId": companyInfo.userId,
        "token": companyInfo.token
      }
    }).toPromise()
      .then(res => {

      })
      .catch(CompanyService.handleError);
  }


  /**
   * 添加开发者 到 企业开发组
   * @param invitedUser
   * @returns {Promise<any>}
   */
  inviteUserToGroup(invitedUser: any): Promise<any> {
    this.logger.debug("invitedUser = " + JSON.stringify(invitedUser));

    const url = this.url + "/api/company/invite";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: invitedUser
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              invitedUser.token = response.token;
              const appResponse = await this.inviteUserToGroup(invitedUser);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(CompanyService.handleError);
  }


  getCompanyList(userInfo: any): Promise<any> {

    this.logger.debug(userInfo);

    const url = this.url + "/api/company/getCompanyList";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: {
        "userId": userInfo.userId,
        "token": userInfo.token
      }
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              userInfo.token = response.token;
              const appResponse = await this.getCompanyList(userInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(CompanyService.handleError);
  }


  removeCompanyId(userInfo: any): Promise<any> {

    this.logger.debug('userInfo = ', userInfo);

    const url = this.url + "/api/compnay/removeCompanyId";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: userInfo
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              userInfo.token = response.token;
              const appResponse = await this.removeCompanyId(userInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(CompanyService.handleError);


  }


  checkCompanyName(companyInfo: any): Promise<any> {

    this.logger.debug('companyInfo = ', companyInfo);

    const url = this.url + "/api/company/compareCompany";

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      params: companyInfo
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);
        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              const appResponse = await this.checkCompanyName(companyInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }
        return res;
      })
      .catch(CompanyService.handleError);
  }


  searchCompany(companyInfo: any): Promise<any> {


    this.logger.debug('companyInfo = ', companyInfo);

    const url = this.url + "/api/company/find";

    return this.http.post(url, companyInfo, {
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      }
    }).toPromise()
      .then(async res => {
        this.logger.debug(res);

        if (res['success']) {

        } else {

          if (res['code'] === '1034') {
            const response = await this.userService.refreshToken();
            if (response['success']) {

              companyInfo.token = response.token;
              const appResponse = await this.searchCompany(companyInfo);

              if (appResponse['success']) {

              } else {
                this.errorService.hintError(appResponse);
              }
              return appResponse;

            } else {
              this.errorService.hintError(response);
            }

          } else {
            this.errorService.hintError(res);
          }
        }

        return res;
      })
      .catch(CompanyService.handleError);
  }


}
