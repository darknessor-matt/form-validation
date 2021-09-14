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
    })
  }

  validateFreeTextForm(fieldName): boolean {
    return this.freeTextForm.controls[fieldName].invalid &&
      (this.freeTextForm.controls[fieldName].dirty || this.freeTextForm.controls[fieldName].touched);
  }

  validateMultipleChoiceQuestionForm(fieldName): boolean {
    return this.multipleChoiceQuestionForm.controls[fieldName].invalid &&
      (this.multipleChoiceQuestionForm.controls[fieldName].dirty || this.multipleChoiceQuestionForm.controls[fieldName].touched);
  }

  submitFreeTextForm(): void {
    if (this.freeTextForm.valid) {
      this.toastr.createSuccess("Question Submitted", "Success!")
    } else {
      this.toastr.createError("Invalid input arguments", "Error!")
    }
  }

  submitMultipleChoiceQuestionForm(): void {
    console.log(this.multipleChoiceQuestionForm.value)
  }

  addAnswer() {
    const answerForm = this.fb.group({
      value: ['', Validators.required]
    })
    this.answers.push(answerForm)
  }

  deleteAnswer(index: number) {
    this.answers.removeAt(index);
  }

}
