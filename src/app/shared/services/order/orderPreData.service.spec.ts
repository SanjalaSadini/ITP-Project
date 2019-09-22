import { TestBed } from '@angular/core/testing';

import {OrderPreDataService} from './orderPreData.service';

describe('OrderPreDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderPreDataService = TestBed.get(OrderPreDataService);
    expect(service).toBeTruthy();
  });
});
