import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  freeTextForm: FormGroup

  constructor(private toastr: ToastrService) {
    this.initForms();
  }

  ngOnInit(): void {
  }

  initForms(): void {
    this.freeTextForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      question: new FormControl('', Validators.required)
    });
  }

  validateFreeTextForm(fieldName): boolean {
    return this.freeTextForm.controls[fieldName].invalid &&
      (this.freeTextForm.controls[fieldName].dirty || this.freeTextForm.controls[fieldName].touched);
  }

  submitFreeTextForm(): void {
    if(this.freeTextForm.valid) {
      this.toastr.success("Question Submitted", "Success!")
    } else {
      this.toastr.error("Invalid input arguments", "Error!")
    }
  }

}
