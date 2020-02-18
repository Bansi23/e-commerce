import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {

  tableHeader: any = ['Picture', 'Display order', 'Action']

  prodPictureForm: FormGroup;
  lstPicture: any = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  totalRecords: number;

  pageChanged(value) {
    this.pageIndex = +value;
    this.getPictureList();
  };

  changePageSize(value) {
    this.pageIndex = 1;
    this.pageSize = value;
    this.getPictureList();
  }

  prodPictureForm_fb() {
    this.prodPictureForm = this.fb.group({
      src: [null],
      position: [null],
    })
  }
  //#region get product picture list
  getPictureList() {
    var editedRecord = JSON.parse(localStorage.getItem('EditedRecord'));
    if (editedRecord.images.length > 0) {
      this.lstPicture = editedRecord.images;
      this.totalRecords = this.lstPicture.length;
    }
  }

  //#endregion

  //#region edit & delete picture details
  productId: any;
  getParameter() {
    this._route.queryParams.subscribe(params => {
      this.productId = params['id']
    });
  }
  editPicture(i) {
    // this.prodPictureForm.patchValue({
    //   position: this.lstPicture[i].position,
    // })
    this._cS.displayToast(3, 'Under development due to api issue!');
  }

  deletePicture(picId) {
    // if (confirm("Are you sure want to delete this image?")) {
    //   this.lstPicture.splice(picId, 1);
    // }
    this._cS.displayToast(3, 'Under development due to api issue!');
  }
  //#endregion

  //#region add new picture in lst
  formValue: any = {};
  src: any
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.src = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  b64toBlob(b64Data, contentType?, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  addPicture() {
    this._cS.displayToast(3, 'Under development due to api issue!');
    this.prodPictureForm.reset();
    // this.formValue = this.prodPictureForm.getRawValue()
    // if (this.formValue.src) {
    //   this.formValue.src = this.src;
    //   this.lstPicture.push(this.formValue);
    //   this.prodPictureForm.reset();
    // } else {
    //   this._cS.displayToast(4, 'Please select file to upload!');
    // }
  }
  //#endregion
  constructor(private fb: FormBuilder,
    private _cS: CommonService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.prodPictureForm_fb();
    this.getParameter();
    const showContenet = <HTMLElement>document.querySelector('.showContenet');
    const hideContent = <HTMLElement>document.querySelector('.hideContent');
    if (this.productId) {
      hideContent.style.display = 'none';
      showContenet.style.display = 'block';
      this.getPictureList();
    } else {
      if (showContenet) {
        showContenet.style.display = 'none';
        hideContent.style.display = 'block';
      }
    }
  }
}
