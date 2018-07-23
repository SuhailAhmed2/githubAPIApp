import { TestBed, inject } from '@angular/core/testing';

import { FavouritesManagementService } from './favourites-management.service';

describe('FavouritesManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavouritesManagementService]
    });
  });

  it('should be created', inject([FavouritesManagementService], (service: FavouritesManagementService) => {
    expect(service).toBeTruthy();
  }));
});
