import { TestBed } from '@angular/core/testing';

import { ToastrCreatorService } from './toastr-creator.service';

describe('ToastrCreatorService', () => {
  let service: ToastrCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
