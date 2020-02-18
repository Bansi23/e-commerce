import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  orderStatus() {
    return [
      { "id": 1, 'itemName': 'Pending' },
      { "id": 2, 'itemName': 'Processing' },
      { "id": 3, 'itemName': 'Complete' },
      { "id": 4, 'itemName': 'Cancelled' }
    ]
  }

  paymentStatus() {
    return [
      { "id": 1, 'itemName': 'Pending' },
      { "id": 2, 'itemName': 'Authorized' },
      { "id": 3, 'itemName': 'Paid' },
      { "id": 4, 'itemName': 'PartiallyRefunded' },
      { "id": 5, 'itemName': 'Refunded' },
      { "id": 6, 'itemName': 'Voided' }
    ]
  }

  shippingStatus() {
    return [
      { "id": 1, 'itemName': 'ShippingNotRequired' },
      { "id": 2, 'itemName': 'NotYetShipped' },
      { "id": 3, 'itemName': 'PartiallyShipped' },
      { "id": 4, 'itemName': 'Shipped' },
      { "id": 5, 'itemName': 'Delivered' },
    ]
  }

  paymentMethod() {
    return [
      { "id": 1, 'payment_method': 'Check/Money Order' },
      { "id": 2, 'payment_method': 'Credit Card(Payments.Manual)' },
      { "id": 3, 'payment_method': 'Credit Card(Payments.Square)' },
      { "id": 4, 'payment_method': 'Credit Card(Payments.WorldpayUS)' },
      { "id": 5, 'payment_method': 'PayPal Standard' },
    ]
  }
  vender() {
    return [
      { "id": 1, 'vender': 'Vender 1' },
      { "id": 2, 'vender': 'vender 2' },

    ]
  }

  customerRoles() {
    return [
      { "id": 1, "itemName": "Administrator" },
      { "id": 2, "itemName": "Forum Moderators" },
      { "id": 4, "itemName": "Guests" },
      { "id": 3, "itemName": "Registered" },
      { "id": 5, "itemName": "Vendors" }
    ]
  }

  countryList() {
    return [
      { "state_id": "1", "state": "United States" },
      { "state_id": "239", "state": "Afghanistan" },
      { "state_id": "212", "state": "Albania" },
      { "state_id": "211", "state": "Algeria" },
      { "state_id": "210", "state": "American Samoa" },
      { "state_id": "195", "state": "Andorra" },
      { "state_id": "183", "state": "Angola" },
      { "state_id": "184", "state": "Anguilla" },
      { "state_id": "185", "state": "Antarctica" },
      {
        "state_id": "186",
        "state": "Antigua and Barbuda"
      }, {
        "state_id": "154",
        "state": "Argentina"
      }, {
        "state_id": "155",
        "state": "Armenia"
      }, {
        "state_id": "156",
        "state": "Aruba"
      }, {
        "state_id": "157",
        "state": "Australia"
      }, {
        "state_id": "158",
        "state": "Austria"
      }, {
        "state_id": "159",
        "state": "Azerbaijan"
      }, {
        "state_id": "160",
        "state": "Bahamas"
      }, {
        "state_id": "187",
        "state": "Bahrain"
      }, {
        "state_id": "161",
        "state": "Bangladesh"
      }, {
        "state_id": "188",
        "state": "Barbados"
      }, {
        "state_id": "162",
        "state": "Belarus"
      }, {
        "state_id": "163",
        "state": "Belgium"
      }, {
        "state_id": "164",
        "state": "Belize"
      }, {
        "state_id": "189",
        "state": "Benin"
      }, {
        "state_id": "166",
        "state": "Bermuda"
      }, {
        "state_id": "190",
        "state": "Bhutan"
      }, {
        "state_id": "179",
        "state": "Bolivia"
      }, {
        "state_id": "167",
        "state": "Bosnia and Herzegowina"
      }, {
        "state_id": "191",
        "state": "Botswana"
      }, {
        "state_id": "192",
        "state": "Bouvet Island"
      }, {
        "state_id": "168",
        "state": "Brazil"
      }, {
        "state_id": "193",
        "state": "British Indian Ocean Territory"
      }, {
        "state_id": "194",
        "state": "Brunei Darussalam"
      }, {
        "state_id": "169",
        "state": "Bulgaria"
      }, {
        "state_id": "196",
        "state": "Burkina Faso"
      }, {
        "state_id": "209",
        "state": "Burundi"
      }, {
        "state_id": "197",
        "state": "Cambodia"
      }, {
        "state_id": "198",
        "state": "Cameroon"
      }, {
        "state_id": "153",
        "state": "Canada"
      }, {
        "state_id": "199",
        "state": "Cape Verde"
      }, {
        "state_id": "170",
        "state": "Cayman Islands"
      }, {
        "state_id": "200",
        "state": "Central African Republic"
      }, {
        "state_id": "201",
        "state": "Chad"
      }, {
        "state_id": "171",
        "state": "Chile"
      }, {
        "state_id": "172",
        "state": "China"
      }, {
        "state_id": "202",
        "state": "Christmas Island"
      }, {
        "state_id": "203",
        "state": "Cocos (Keeling) Islands"
      }, {
        "state_id": "173",
        "state": "Colombia"
      }, {
        "state_id": "204",
        "state": "Comoros"
      }, {
        "state_id": "205",
        "state": "Congo"
      }, {
        "state_id": "206",
        "state": "Congo (Democratic Republic of the)"
      }, {
        "state_id": "207",
        "state": "Cook Islands"
      }, {
        "state_id": "174",
        "state": "Costa Rica"
      }, {
        "state_id": "208",
        "state": "Cote D'Ivoire"
      }, {
        "state_id": "175",
        "state": "Croatia"
      }, {
        "state_id": "176",
        "state": "Cuba"
      }, {
        "state_id": "177",
        "state": "Cyprus"
      }, {
        "state_id": "178",
        "state": "Czech Republic"
      }, {
        "state_id": "152",
        "state": "Denmark"
      }, {
        "state_id": "122",
        "state": "Djibouti"
      }, {
        "state_id": "240",
        "state": "Dominica"
      }, {
        "state_id": "165",
        "state": "Dominican Republic"
      }, {
        "state_id": "151",
        "state": "East Timor"
      }, {
        "state_id": "135",
        "state": "Ecuador"
      }, {
        "state_id": "123",
        "state": "Egypt"
      }, {
        "state_id": "121",
        "state": "El Salvador"
      }, {
        "state_id": "119",
        "state": "Equatorial Guinea"
      }, {
        "state_id": "32",
        "state": "Eritrea"
      }, {
        "state_id": "33",
        "state": "Estonia"
      }, {
        "state_id": "34",
        "state": "Ethiopia"
      }, {
        "state_id": "35",
        "state": "Falkland Islands (Malvinas)"
      }, {
        "state_id": "36",
        "state": "Faroe Islands"
      }, {
        "state_id": "37",
        "state": "Fiji"
      }, {
        "state_id": "124",
        "state": "Finland"
      }, {
        "state_id": "125",
        "state": "France"
      }, {
        "state_id": "38",
        "state": "French Guiana"
      }, {
        "state_id": "39",
        "state": "French Polynesia"
      }, {
        "state_id": "40",
        "state": "French Southern Territories"
      }, {
        "state_id": "41",
        "state": "Gabon"
      }, {
        "state_id": "42",
        "state": "Gambia"
      }, {
        "state_id": "126",
        "state": "Georgia"
      }, {
        "state_id": "127",
        "state": "Germany"
      }, {
        "state_id": "43",
        "state": "Ghana"
      }, {
        "state_id": "128",
        "state": "Gibraltar"
      }, {
        "state_id": "129",
        "state": "Greece"
      }, {
        "state_id": "45",
        "state": "Greenland"
      }, {
        "state_id": "58",
        "state": "Grenada"
      }, {
        "state_id": "46",
        "state": "Guadeloupe"
      }, {
        "state_id": "47",
        "state": "Guam"
      }, {
        "state_id": "130",
        "state": "Guatemala"
      }, {
        "state_id": "48",
        "state": "Guinea"
      }, {
        "state_id": "49",
        "state": "Guinea-bissau"
      }, {
        "state_id": "50",
        "state": "Guyana"
      }, {
        "state_id": "51",
        "state": "Haiti"
      }, {
        "state_id": "52",
        "state": "Heard and Mc Donald Islands"
      }, {
        "state_id": "53",
        "state": "Honduras"
      }, {
        "state_id": "131",
        "state": "Hong Kong"
      }, {
        "state_id": "132",
        "state": "Hungary"
      }, {
        "state_id": "54",
        "state": "Iceland"
      }, {
        "state_id": "133",
        "state": "India"
      }, {
        "state_id": "134",
        "state": "Indonesia"
      }, {
        "state_id": "55",
        "state": "Iran (Islamic Republic of)"
      }, {
        "state_id": "56",
        "state": "Iraq"
      }, {
        "state_id": "136",
        "state": "Ireland"
      }, {
        "state_id": "149",
        "state": "Israel"
      }, {
        "state_id": "137",
        "state": "Italy"
      }, {
        "state_id": "138",
        "state": "Jamaica"
      }, {
        "state_id": "139",
        "state": "Japan"
      }, {
        "state_id": "140",
        "state": "Jordan"
      }, {
        "state_id": "141",
        "state": "Kazakhstan"
      }, {
        "state_id": "57",
        "state": "Kenya"
      }, {
        "state_id": "31",
        "state": "Kiribati"
      }, {
        "state_id": "44",
        "state": "Korea"
      }, {
        "state_id": "142",
        "state": "Korea, Democratic People's Republic of"
      }, {
        "state_id": "143",
        "state": "Kuwait"
      }, {
        "state_id": "30",
        "state": "Kyrgyzstan"
      }, {
        "state_id": "14",
        "state": "Lao People's Democratic Republic"
      }, {
        "state_id": "2",
        "state": "Latvia"
      }, {
        "state_id": "3",
        "state": "Lebanon"
      }, {
        "state_id": "4",
        "state": "Lesotho"
      }, {
        "state_id": "5",
        "state": "Liberia"
      }, {
        "state_id": "6",
        "state": "Libyan Arab Jamahiriya"
      }, {
        "state_id": "7",
        "state": "Liechtenstein"
      }, {
        "state_id": "8",
        "state": "Lithuania"
      }, {
        "state_id": "9",
        "state": "Luxembourg"
      }, {
        "state_id": "10",
        "state": "Macau"
      }, {
        "state_id": "11",
        "state": "Macedonia"
      }, {
        "state_id": "12",
        "state": "Madagascar"
      }, {
        "state_id": "13",
        "state": "Malawi"
      }, {
        "state_id": "144",
        "state": "Malaysia"
      }, {
        "state_id": "15",
        "state": "Maldives"
      }, {
        "state_id": "28",
        "state": "Mali"
      }, {
        "state_id": "16",
        "state": "Malta"
      }, {
        "state_id": "17",
        "state": "Marshall Islands"
      }, {
        "state_id": "18",
        "state": "Martinique"
      }, {
        "state_id": "19",
        "state": "Mauritania"
      }, {
        "state_id": "20",
        "state": "Mauritius"
      }, {
        "state_id": "21",
        "state": "Mayotte"
      }, {
        "state_id": "145",
        "state": "Mexico"
      }, {
        "state_id": "22",
        "state": "Micronesia"
      }, {
        "state_id": "23",
        "state": "Moldova"
      }, {
        "state_id": "24",
        "state": "Monaco"
      }, {
        "state_id": "25",
        "state": "Mongolia"
      }, {
        "state_id": "26",
        "state": "Montenegro"
      }, {
        "state_id": "27",
        "state": "Montserrat"
      }, {
        "state_id": "29",
        "state": "Morocco"
      }, {
        "state_id": "59",
        "state": "Mozambique"
      }, {
        "state_id": "60",
        "state": "Myanmar"
      }, {
        "state_id": "61",
        "state": "Namibia"
      }, {
        "state_id": "92",
        "state": "Nauru"
      }, {
        "state_id": "93",
        "state": "Nepal"
      }, {
        "state_id": "146",
        "state": "Netherlands"
      }, {
        "state_id": "94",
        "state": "Netherlands Antilles"
      }, {
        "state_id": "95",
        "state": "New Caledonia"
      }, {
        "state_id": "147",
        "state": "New Zealand"
      }, {
        "state_id": "96",
        "state": "Nicaragua"
      }, {
        "state_id": "97",
        "state": "Niger"
      }, {
        "state_id": "98",
        "state": "Nigeria"
      }, {
        "state_id": "99",
        "state": "Niue"
      }, {
        "state_id": "100",
        "state": "Norfolk Island"
      }, {
        "state_id": "101",
        "state": "Northern Mariana Islands"
      }, {
        "state_id": "148",
        "state": "Norway"
      }, {
        "state_id": "102",
        "state": "Oman"
      }, {
        "state_id": "150",
        "state": "Pakistan"
      }, {
        "state_id": "103",
        "state": "Palau"
      }, {
        "state_id": "180",
        "state": "Palestine"
      }, {
        "state_id": "104",
        "state": "Panama"
      }, {
        "state_id": "105",
        "state": "Papua New Guinea"
      }, {
        "state_id": "181",
        "state": "Paraguay"
      }, {
        "state_id": "182",
        "state": "Peru"
      }, {
        "state_id": "213",
        "state": "Philippines"
      }, {
        "state_id": "106",
        "state": "Pitcairn"
      }, {
        "state_id": "214",
        "state": "Poland"
      }, {
        "state_id": "215",
        "state": "Portugal"
      }, {
        "state_id": "216",
        "state": "Puerto Rico"
      }, {
        "state_id": "217",
        "state": "Qatar"
      }, {
        "state_id": "107",
        "state": "Reunion"
      }, {
        "state_id": "218",
        "state": "Romania"
      }, {
        "state_id": "219",
        "state": "Russian Federation"
      }, {
        "state_id": "108",
        "state": "Rwanda"
      }, {
        "state_id": "109",
        "state": "Saint Kitts and Nevis"
      }, {
        "state_id": "110",
        "state": "Saint Lucia"
      }, {
        "state_id": "111",
        "state": "Saint Vincent and the Grenadines"
      }, {
        "state_id": "112",
        "state": "Samoa"
      }, {
        "state_id": "113",
        "state": "San Marino"
      }, {
        "state_id": "114",
        "state": "Sao Tome and Principe"
      }, {
        "state_id": "220",
        "state": "Saudi Arabia"
      }, {
        "state_id": "115",
        "state": "Senegal"
      }, {
        "state_id": "238",
        "state": "Serbia"
      }, {
        "state_id": "116",
        "state": "Seychelles"
      }, {
        "state_id": "117",
        "state": "Sierra Leone"
      }, {
        "state_id": "221",
        "state": "Singapore"
      }, {
        "state_id": "222",
        "state": "Slovakia (Slovak Republic)"
      }, {
        "state_id": "223",
        "state": "Slovenia"
      }, {
        "state_id": "118",
        "state": "Solomon Islands"
      }, {
        "state_id": "91",
        "state": "Somalia"
      }, {
        "state_id": "224",
        "state": "South Africa"
      }, {
        "state_id": "90",
        "state": "South Georgia & South Sandwich Islands"
      }, {
        "state_id": "89",
        "state": "South Sudan"
      }, {
        "state_id": "225",
        "state": "Spain"
      }, {
        "state_id": "74",
        "state": "Sri Lanka"
      }, {
        "state_id": "62",
        "state": "St. Helena"
      }, {
        "state_id": "63",
        "state": "St. Pierre and Miquelon"
      }, {
        "state_id": "64",
        "state": "Sudan"
      }, {
        "state_id": "65",
        "state": "Suriname"
      }, {
        "state_id": "66",
        "state": "Svalbard and Jan Mayen Islands"
      }, {
        "state_id": "67",
        "state": "Swaziland"
      }, {
        "state_id": "226",
        "state": "Sweden"
      }, {
        "state_id": "227",
        "state": "Switzerland"
      }, {
        "state_id": "68",
        "state": "Syrian Arab Republic"
      }, {
        "state_id": "228",
        "state": "Taiwan"
      }, {
        "state_id": "69",
        "state": "Tajikistan"
      }, {
        "state_id": "70",
        "state": "Tanzania"
      }, {
        "state_id": "229",
        "state": "Thailand"
      }, {
        "state_id": "71",
        "state": "Togo"
      }, {
        "state_id": "72",
        "state": "Tokelau"
      }, {
        "state_id": "73",
        "state": "Tonga"
      }, {
        "state_id": "75",
        "state": "Trinidad and Tobago"
      }, {
        "state_id": "88",
        "state": "Tunisia"
      }, {
        "state_id": "230",
        "state": "Turkey"
      }, {
        "state_id": "76",
        "state": "Turkmenistan"
      }, {
        "state_id": "77",
        "state": "Turks and Caicos Islands"
      }, {
        "state_id": "78",
        "state": "Tuvalu"
      }, {
        "state_id": "79",
        "state": "Uganda"
      }, {
        "state_id": "231",
        "state": "Ukraine"
      }, {
        "state_id": "232",
        "state": "United Arab Emirates"
      }, {
        "state_id": "233",
        "state": "United Kingdom"
      }, {
        "state_id": "234",
        "state": "United States minor outlying islands"
      }, {
        "state_id": "235",
        "state": "Uruguay"
      }, {
        "state_id": "236",
        "state": "Uzbekistan"
      }, {
        "state_id": "80",
        "state": "Vanuatu"
      }, {
        "state_id": "81",
        "state": "Vatican City State (Holy See)"
      }, {
        "state_id": "237",
        "state": "Venezuela"
      }, {
        "state_id": "82",
        "state": "Viet Nam"
      }, {
        "state_id": "83",
        "state": "Virgin Islands (British)"
      }, {
        "state_id": "84",
        "state": "Virgin Islands (U.S.)"
      }, {
        "state_id": "85",
        "state": "Wallis and Futuna Islands"
      }, {
        "state_id": "86",
        "state": "Western Sahara"
      }, {
        "state_id": "87",
        "state": "Yemen"
      }, {
        "state_id": "120",
        "state": "Zambia"
      }, {
        "state_id": "241",
        "state": "Zimbabwe"
      }
    ]
  }

  customerDOBMonth() {
    const finalArray = [];
    for (let i = 0; i < 12; i++) {
      finalArray.push({ id: i + 1, text: i + 1 });
    };
    return finalArray;
  }

  customerDOBDay() {
    const finalArray = [];
    for (let i = 0; i < 31; i++) {
      finalArray.push({ id: i + 1, text: i + 1 });
    };
    return finalArray;
  }
  getManagerOfVendor() {
    return [
      { "id": 1, "text": "Not a vendor" },
      { "id": 2, "text": "Vendor 1" },
      { "id": 3, "text": "Vendor 2" }
    ]
  }

  setItemInStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  getItemFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }



  //#region product module static lists
  getWareHouseList() {
    return [
      { id: 0, name: 'All' },
      { id: 1, name: 'Warehouse 1 (New York)' },
      { id: 2, name: 'Warehouse 2 (Los Angeles)' },
    ]
  }

  getProductType() {
    return [
      { id: 0, name: 'All' },
      { id: 1, name: 'Simple' },
      { id: 2, name: 'Grouped (product with variants)' },
    ]
  }

  getVendorList() {
    return [
      { id: 0, name: 'All' },
      { id: 1, name: 'Vendor 1' },
      { id: 2, name: 'Vendor 2' },
    ]
  }

  getPublisedList() {
    return [
      { id: 0, name: 'All' },
      { id: 1, name: 'Published only' },
      { id: 2, name: 'Unpublished only' },
    ]
  }

  getTaxCategory() {
    return [
      { id: 0, name: '[None]' },
      { id: 1, name: 'Books' },
      { id: 2, name: 'Electronics & Software' },
      { id: 3, name: 'Downloadable Products' },
      { id: 4, name: 'Jewelry' },
      { id: 5, name: 'Apparel' },
    ]
  }

  getDiscountList() {
    return [
      { id: 1, itemName: 'Sample discount with coupon code' },
      { id: 3, itemName: 'test for discount' },
    ]
  }

  getInvantoryMethods() {
    return [
      { id: 0, name: "Don't track inventory" },
      { id: 1, name: 'Track inventory' },
      { id: 2, name: 'Track inventory by product attributes' },
    ]
  }

  getControlTypes() {
    return [{
      "id": "1",
      "name": "Drop-down list"
    }, {
      "id": "2",
      "name": "Radio button list"
    }, {
      "id": "3",
      "name": "Checkboxes"
    }, {
      "id": "4",
      "name": "Textbox"
    }, {
      "id": "10",
      "name": "Multiline textbox"
    }, {
      "id": "20",
      "name": "Date picker"
    }, {
      "id": "30",
      "name": "File upload"
    }, {
      "id": "40",
      "name": "Color squares"
    }, {
      "id": "45",
      "name": "Image squares"
    }, {
      "id": "50",
      "name": "Read-only checkboxes"
    }
    ]
  }

  getAttributeValueType() {
    return [
      { id: 0, name: 'Simple' },
      { id: 10, name: 'Associated to product' }
    ]
  }

  getAttributeType() {
    return [
      { id: 1, name: 'Option' },
      { id: 2, name: 'Custom text' },
      { id: 3, name: 'Custom HTML text' },
      { id: 4, name: 'Hyperlink' },
    ]
  }

  getAttribute() {
    return [
      { id: 1, name: 'Screensize' },
      { id: 2, name: 'Color' },
      { id: 3, name: 'CPU Type' },
      { id: 4, name: 'Memory' },
      { id: 5, name: 'Hard drive' },
    ]
  }

  getAttributeOptions() {
    return [
      { id: 1, name: "13.0''", aId: 1 },
      { id: 2, name: "13.3''", aId: 1 },
      { id: 3, name: "14.0''", aId: 1 },
      { id: 4, name: "15.0''", aId: 1 },
      { id: 5, name: "15.6''", aId: 1 },
      { id: 6, name: 'Grey', aId: 2 },
      { id: 7, name: 'Red', aId: 2 },
      { id: 8, name: 'Blue', aId: 2 },
      { id: 9, name: 'Intel Core i5', aId: 3 },
      { id: 10, name: 'Intel Core i7', aId: 3 },
      { id: 11, name: '4 GB', aId: 4 },
      { id: 12, name: '8 GB', aId: 4 },
      { id: 13, name: '16 GB', aId: 4 },
      { id: 14, name: '1 TB', aId: 5 },
      { id: 15, name: '500 GB', aId: 5 },
      { id: 16, name: '128 GB', aId: 5 },
    ]
  }
  //#endregion

  constructor() { }
}
