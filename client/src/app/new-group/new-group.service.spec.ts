import { TestBed } from '@angular/core/testing';

import { NewGroupService } from './new-group.service';

describe('NewGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewGroupService = TestBed.get(NewGroupService);
    expect(service).toBeTruthy();
  });
});
