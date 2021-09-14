import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrCreatorService } from 'src/app/services/toastr-creator.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  freeTextForm: FormGroup
  multipleChoiceQuestionForm: FormGroup

  contactDetailsArray: Array<any>

  constructor(private toastr: ToastrCreatorService, private fb: FormBuilder) {
    this.initForms();
  }

  get answers() {
    return this.multipleChoiceQuestionForm.controls["answers"] as FormArray;
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

    this.multipleChoiceQuestionForm = this.fb.group({
      title: ['', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60)
        ]
      }],
      question: ['', {
        validators: [
          Validators.required
        ]
      }],
      answers: this.fb.array([])
    });

    this.contactDetailsArray = [
      { label: "Name", form: this.getForm() },
      { label: "Gender", form: this.getForm() },
      { label: "Nationality", form: this.getForm() },
      { label: "Phone number", form: this.getForm() },
      { label: "E-mail", form: this.getForm() }
    ]

  }

  validateFreeTextForm(fieldName): boolean {
    return this.freeTextForm.controls[fieldName].invalid &&
      (this.freeTextForm.controls[fieldName].dirty || this.freeTextForm.controls[fieldName].touched);
  }

  validateMultipleChoiceQuestionForm(fieldName): boolean {
    return this.multipleChoiceQuestionForm.controls[fieldName].invalid &&
      (this.multipleChoiceQuestionForm.controls[fieldName].dirty || this.multipleChoiceQuestionForm.controls[fieldName].touched);
  }

  checkboxChange(index) {
    console.log()
    if (!this.contactDetailsArray[index].form.value.checked) {
      this.contactDetailsArray[index].form.controls.value.disable();
    } else {
      this.contactDetailsArray[index].form.controls.value.enable();
    }
  }

  getForm() {
    return new FormGroup({
      value: new FormControl({ disabled: true, value: '' }, [Validators.required, Validators.minLength(5)]),
      checked: new FormControl(false),
    });
  }

  addAnswer() {
    const answerForm = this.fb.group({
      value: ["", Validators.required]
    })
    this.answers.push(answerForm)
  }

  deleteAnswer(index: number) {
    this.answers.removeAt(index);
  }

  submitFreeTextForm(): void {
    if (this.freeTextForm.valid) {
      this.toastr.createSuccess("Question Submitted", "Success!")
    } else {
      this.toastr.createError("Invalid input arguments", "Error!")
    }
  }

  submitMultipleChoiceQuestionForm(): void {
    if (this.multipleChoiceQuestionForm.valid) {
      this.toastr.createSuccess("Question Submitted", "Success!")
    } else {
      this.toastr.createError("Invalid input arguments", "Error!")
    }
    // console.log(this.multipleChoiceQuestionForm.value)
  }

  submitContactDetailsArray(): void {
    var valid = true;
    var cnt = 0;
    this.contactDetailsArray.forEach(element => {
      if (element.form.value.checked)
        cnt++
      if (element.form.invalid)
        valid = false
    });
    if (valid && cnt != 0) {
      this.toastr.createSuccess("Details Submitted", "Success!")
      return
    }
    else
      this.toastr.createError("Invalid input arguments", "Error!")
    console.log(this.contactDetailsArray)
  }

}
