import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import * as CryptoJS from 'crypto-js';

//const internetMessage = 'Please check your internet connection !!';
const baseUrl = environment.apiURL;
const encrydecryKey = environment.encrydecryKey;
const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1NjE0NTQxNDUsImV4cCI6MTg3NjgxNDE0NSwiaXNzIjoiaHR0cDovL25vcC5zYXR2YS5zb2x1dGlvbnMiLCJhdWQiOlsiaHR0cDovL25vcC5zYXR2YS5zb2x1dGlvbnMvcmVzb3VyY2VzIiwibm9wX2FwaSJdLCJjbGllbnRfaWQiOiJhNTBkY2I0MS1lODgzLTQ5YWItOGM3NS02ZTU5MzI1MTIzNTciLCJzdWIiOiJhNTBkY2I0MS1lODgzLTQ5YWItOGM3NS02ZTU5MzI1MTIzNTcgIiwiYXV0aF90aW1lIjoxNTYxNDUzOTI0LCJpZHAiOiJsb2NhbCIsInNjb3BlIjpbIm5vcF9hcGkiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.m0z531w-lClGHBgLo82xMeUHRny17jM0QMr3eDs4nZWB48EVTFhPFzve786FsxdsxiPqE5rytsMQWXA7ByXe9N4cZFNnl7wpE1dCjOvS02c8H0AfNVdMkiJOGILRmbpHRKuWj8O0IjhWlwdll8-7nhRCJ7x6GBqx1Aj6RdceUKuma0qRFuqIcCBOuoKovPRHQ5AQ6yPZd-DIZE0Wu5KmChnwCfwIjs3CmJsepClOCF16T5UcsEKZq8409GXw2I070MKVbRBNQBvNCjf6OOtLFhCXUCExZXx4BJSohHcX4bP-qyBhQI-ZPcCxIIhKikHsZJkVyklzAQ19cUtrnnrxzQ';
const hd: HttpHeaders = new HttpHeaders({
  'Authorization': token,
  'Content-Type': 'application/json',
  'Accept': ' application/json, text/javascript'
});

var count = 0;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // #region Encrypt and Decrypt key
  /** To encrypted the key. Ex : this.encryptedKey('123')
   * @param encryKey Pass key that you want to encrypt.
   */
  encryptedKey(encryKey) {
    try {
      return CryptoJS.AES.encrypt(encryKey.trim(), encrydecryKey).toString();
    } catch (error) { return null; }
  };
  /** To decrypted the key. Ex : this.decryptedKey('123')
   * @param decryKey Pass the key that you want to decrypt.
   */
  decryptedKey(decryKey) {
    try {
      return CryptoJS.AES.decrypt(decryKey.trim(), encrydecryKey).toString(CryptoJS.enc.Utf8);
    } catch (error) { return null; }
  };
  // #endregion

  // #region API METHODS
  /** Get API Method.
   * @param url - Just pass url after /api/. Predefine url will take from environment   
  */
  API_GET(url: string): Observable<any> {
    count++;
    if (count > 0) {
      this.Display_Loader(true);
    } else {
      this.Display_Loader(false);
    }
    count--;
    return this._httpClient.get(`${url}`, { headers: hd }).pipe(map(res => {
      this.Display_Loader(false);
      setTimeout(() => {
      }, 500);
      return res;
    }, catchError(err => {
      this.Display_Loader(false);
      if (err.status == 401) {

      }
      else if (err.status == 400) {
      }
      return throwError(err);
    })));
  };

  /** Post API Method.
  * @param Url - Just pass url after /api/. Predefine url will take from environment
  * @param Body - Pass body parameter in json. Ex : { id : 1, name : ABC, occupation : Angular Developer}
 */
  API_POST(Url, Body): Observable<any> {
    this.Display_Loader(true);
    return this._httpClient.post<any>(`${Url}`, Body, { headers: hd }).pipe(map(res => {
      this.Display_Loader(false);
      setTimeout(() => {
      }, 500);
      return res;
    }, catchError(err => {
      this.Display_Loader(false);
      if (err.status == 401) {
      }
      else if (err.status == 400) {
        this.displayToast(2, 'Not found')
      }
      return throwError(err);
    })));
  };

  /** Put API Method.
  * @param Url - Just pass url after /api/. Predefine url will take from environment
  * @param Body - Pass body parameter in json. Ex : { id : 1, name : ABC, occupation : Angular Developer}
 */

  API_PUT(Url, Body): Observable<any> {
    this.Display_Loader(true);
    return this._httpClient.put<any>(`${Url}`, Body, { headers: hd }).pipe(map(res => {
      this.Display_Loader(false);
      setTimeout(() => {
      }, 500);
      return res;
    }, catchError(err => {
      this.Display_Loader(false);
      if (err.status == 401) {
      }
      else if (err.status == 400) {
      }
      return throwError(err);
    })));
  };

  /** Delete API Method.
   * @param Url - Just pass url after /api/. Predefine url will take from environment
  */
  API_DELETE(Url): Observable<any> {
    return this._httpClient.delete<any>(`${Url}`, { headers: hd }).pipe(map(res => {
      setTimeout(() => {
      }, 500);
      return res;
    }, catchError(err => {
      if (err.status == 401) {
      }
      else if (err.status == 400) {
      }
      return throwError(err);
    })));
  };
  // #endregion
  // #endregion

  // #region All URLs
  //#region order module api Urls
  getOrderList(limit, page) {
    return baseUrl + `orders?limit=${limit}&page=${page}`;
  }
  getOrderId(id: number) {
    return baseUrl + `orders/${id}`;
  }

  getOrderDetail() {
    return baseUrl + `orders`;
  }
  getOrderItem(orderId) {
    return baseUrl + `orders/${orderId}/items`;
  }
  getOrderItemId(orderId, itemId) {
    return baseUrl + `orders/${orderId}/items/${itemId}`;
  }
  getCountItem() {
    return baseUrl + `orders/count`;
  }

  // http://nop.satva.solutions/api/orders?PaymentStatus=Refunded&Status=Pending

  getsearchRecord(PaymentStatus, orderStatus, shippingStatus) {
    let strURLParam = "orders?";
    if (PaymentStatus) {
      strURLParam += `PaymentStatus=${PaymentStatus}`
    }
    if (orderStatus) {
      strURLParam += `&Status=${orderStatus}`
    }

    if (shippingStatus) {
      strURLParam += `&Status=${orderStatus}`
    }
    return baseUrl + strURLParam
  }
  getOrder() {
    return baseUrl + `orders`;
  }

  getCountry(countryId) {
    //http://nop.satva.solutions/Country/GetStatesByCountryId?countryId=1
    return `https://cors-anywhere.herokuapp.com/` + `http://nop.satva.solutions/Country/GetStatesByCountryId?countryId=${countryId}`
  }

  // #endregion
  getProductList() {
    return baseUrl + `products`;
  }

  getCustomerList() {
    return baseUrl + `customers`;
  }

  getParticularCustomer(custId) {
    return baseUrl + `customers/${custId}`
  }


  getPaticularCustomerOrder(custId) {
    return baseUrl + `orders/customer/${custId}`
  }
  getCustomersList(PageSize, PageIndex) {
    return baseUrl + `customers?Limit=${PageSize}&Page=${PageIndex}`;

  }
  getCustomerTotalRecord() {
    return baseUrl + `customers/count`;
  }

  formatAMPM() {
    var hours = new Date().getHours();
    var minutes: any;
    minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
  }

  // #endregion

  //#region product module api Urls
  URL_getProductList(PageSize?, PageIndex?) {
    return baseUrl + `products?Limit=${PageSize}&Page=${PageIndex}`;
  }

  URL_getProductById(id) {
    return baseUrl + `products/${id}`;
  }
  // URL_searchProductList(categoryId?,  ) {
  //   return baseUrl + `products?Limit=${PageSize}&Page=${PageIndex}`;
  // }
  URL_getTotalRecords() {
    return baseUrl + `products/count`;
  }

  URL_getCategoryList() {
    return baseUrl + `categories`;
  }

  URL_getManufacturerList() {
    return baseUrl + `manufacturers`;
  }

  URL_getAttributeList() {
    return baseUrl + `productattributes`;
  }

  URL_deleteRecord(id) {
    return baseUrl + `products/${id}`;
  }
  //#endregion

  //#region loader
  Display_Loader(value: boolean) {
    this._app.Display_Loader(value);
  };
  //#endregion

  // #region Toaster Message
  /** Display Toster message Like success, error, warning   
   * @param Type - Pass toaster type Like 'success', 'error'.
   * @param Title - Pass message title Like 'Error Message !!'
   * @param Message - Pass message body text Like 'You can't delete this user !!'
   * Ex : this.show_Toaster('success', 'Created !!', 'User Created Successfully !!');
  */
  displayToast(type: number, message?: any, title?: any, ) {
    let typeString;
    switch (type) {
      case 1: { typeString = 'success'; break; };
      case 2: { typeString = 'error'; break; };
      case 3: { typeString = 'warning'; break; };
      case 4: { typeString = 'info'; break; };
      default: { typeString = 'error'; break; };
    };
    title = title ? title : null;
    this._app.popToast(typeString, title, message);
  };
  // #endregion

  //#region 
  getProductTabs() {
    return [
      { id: 1, name: 'Product Info', isActive: true },
      { id: 2, name: 'Picture', isActive: false },
      { id: 3, name: 'Product Attributes', isActive: false },
      { id: 4, name: 'Specification Attributes', isActive: false },
    ]
  }

  //#region  get product listing
  lstProduct: any = [];
  productList() {
    this.API_GET(this.getProductList())
      .subscribe(res => {
        if (res) {
          this.lstProduct = res.products;
        }
      })
  }
  //#endregion
  //#region  create product
  sendForCreate(body) {
    this.API_POST(this.getProductList(), body)
      .subscribe(res => {
        if (res) {
          this.productList();
          this.lstProduct.push(res.products);
          this.displayToast(1, 'Product added successfully');
          this._router.navigate(['catalog/addProduct/productPicture'], { queryParams: { id: res.products[0].id } });
          localStorage.setItem('EditedRecord', JSON.stringify(res.products[0]));
        }
      });
  }
  //#endregion

  //#region edit product addtional info
  sendPictureToService(data) {
    var body = {
      product: {
        images:
          data
      }
    }
    var productId = localStorage.getItem('productId');
    this.API_PUT(this.URL_getProductById(productId), body)
      .subscribe(res => {

      })
  }


  productId: any;
  attributeId: any;
  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.attributeId = params['attributeId'];
    });
  }

  editProduct(body) {
    this.getParameter();
    this.API_PUT(this.URL_getProductById(this.productId), body)
      .subscribe(res => {
        if (res) {
          this.displayToast(1, 'The product details updated successfully');
          localStorage.setItem('EditedRecord', JSON.stringify(res.products[0]));
        }
      })
  }

  //#endregion

  //#region prevent enter e, arithmatic sign in number type controls 
  restrict(e) {
    if ([69, 187, 188, 189, 190, 107, 109].includes(e.keyCode)) {
      e.preventDefault();
    }
  }
  //#endregion
  constructor(public _router: Router,
    public _route: ActivatedRoute,
    public _httpClient: HttpClient,
    public _app: AppComponent,
  ) { }
}
