import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '~/app/shared/services/api/auth.service';
import { AuthSessionService } from '~/app/shared/services/auth-session.service';
import { TestingModule } from '~/app/testing.module';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [TestingModule]
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login', () => {
    const authStorageService = TestBed.inject(AuthSessionService);
    jest.spyOn(authStorageService, 'set').mockImplementation();
    service.login('foo', 'bar').subscribe();
    const req = httpTesting.expectOne('api/auth/authenticate');
    expect(req.request.method).toBe('GET');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    req.flush({ ID: 'baz', IsAdmin: true });
    expect(authStorageService.set).toBeCalledWith('baz', 'foo', 'bar', true);
  });

  it('should call logout', () => {
    const authStorageService = TestBed.inject(AuthSessionService);
    jest.spyOn(authStorageService, 'revoke').mockImplementation();
    service.logout().subscribe();
    expect(authStorageService.revoke).toBeCalled();
  });
});
