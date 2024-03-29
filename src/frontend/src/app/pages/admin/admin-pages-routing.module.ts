import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker as TEXT } from '@ngneat/transloco-keys-manager/marker';

import { BucketDatatablePageComponent } from '~/app/pages/admin/bucket/bucket-datatable-page/bucket-datatable-page.component';
import { BucketFormPageComponent } from '~/app/pages/admin/bucket/bucket-form-page/bucket-form-page.component';
import { DashboardPageComponent } from '~/app/pages/admin/dashboard-page/dashboard-page.component';
import { UserDatatablePageComponent } from '~/app/pages/admin/user/user-datatable-page/user-datatable-page.component';
import { UserFormPageComponent } from '~/app/pages/admin/user/user-form-page/user-form-page.component';
import { UserKeyDatatablePageComponent } from '~/app/pages/admin/user/user-key-datatable-page/user-key-datatable-page.component';
import { UserKeyFormPageComponent } from '~/app/pages/admin/user/user-key-form-page/user-key-form-page.component';
import { BucketLifecycleDatatablePageComponent } from '~/app/pages/shared/bucket/bucket-lifecycle-datatable-page/bucket-lifecycle-datatable-page.component';
import { IsDirtyGuardService } from '~/app/shared/services/is-dirty-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    data: { title: TEXT('Dashboard') },
    component: DashboardPageComponent
  },
  {
    path: 'buckets',
    data: { title: TEXT('Buckets') },
    children: [
      {
        path: '',
        component: BucketDatatablePageComponent
      },
      {
        path: 'create',
        data: { subTitle: TEXT('Create'), title: TEXT('Bucket:'), url: '..' },
        component: BucketFormPageComponent,
        canDeactivate: [IsDirtyGuardService]
      },
      {
        path: 'edit/:bid',
        data: { subTitle: '{{ bid }}', title: TEXT('Bucket:'), url: '../..' },
        component: BucketFormPageComponent,
        canDeactivate: [IsDirtyGuardService]
      },
      {
        path: 'lifecycle/:bid',
        data: { subTitle: '{{ bid }} - Lifecycle Rules', title: TEXT('Bucket:'), url: '../..' },
        component: BucketLifecycleDatatablePageComponent,
        canDeactivate: [IsDirtyGuardService]
      }
    ]
  },
  {
    path: 'users',
    data: { title: TEXT('Users') },
    children: [
      {
        path: '',
        component: UserDatatablePageComponent
      },
      {
        path: 'create',
        data: { subTitle: TEXT('Create'), title: TEXT('User:'), url: '..' },
        component: UserFormPageComponent,
        canDeactivate: [IsDirtyGuardService]
      },
      {
        path: 'edit/:uid',
        data: { subTitle: '{{ uid }}', title: TEXT('User:'), url: '../..' },
        component: UserFormPageComponent,
        canDeactivate: [IsDirtyGuardService]
      },
      {
        path: ':uid/key',
        data: { subTitle: '{{ uid }}', title: TEXT('User Keys:'), url: '../..' },
        children: [
          {
            path: '',
            component: UserKeyDatatablePageComponent
          },
          {
            path: 'create',
            data: { subTitle: TEXT('Create'), title: TEXT('User Key:'), url: '..' },
            component: UserKeyFormPageComponent,
            canDeactivate: [IsDirtyGuardService]
          }
        ]
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AdminPagesRoutingModule {}
