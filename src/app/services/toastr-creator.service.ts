import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrCreatorService {

  constructor(private toastr: ToastrService) { }

  public createSuccess(message:string, title:string) {
    return this.toastr.success(message, title)
  }

  public createError(message:string, title:string) {
    return this.toastr.error(message, title)
  }
}
