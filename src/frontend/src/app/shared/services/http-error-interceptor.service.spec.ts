import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { HttpErrorInterceptorService } from '~/app/shared/services/http-error-interceptor.service';
import { SharedModule } from '~/app/shared/shared.module';
import { TestingModule } from '~/app/testing.module';

describe('HttpErrorInterceptorService', () => {
  let service: HttpErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorInterceptorService],
      imports: [SharedModule, TestingModule, ToastrModule.forRoot()]
    });
    service = TestBed.inject(HttpErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
