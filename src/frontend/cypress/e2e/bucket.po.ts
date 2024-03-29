import 'cypress-file-upload';

import { PageHelper } from './page-helper.po';

export class BucketPageHelper extends PageHelper {
  private key = 'test-key';
  private value = 'test-value';

  constructor(private bucketName: string) {
    super();
  }

  createBucket(
    addTag?: boolean,
    versioning?: boolean,
    objectLocking?: boolean,
    retentionMode?: string
  ): void {
    cy.clickButton('Create');
    cy.get('input#viewMode').then(($checkbox) => {
      if ($checkbox.is(':checked')) {
        cy.get('#bucket').type(this.bucketName);
        cy.get('[id="owner"]').select('testid');
      } else {
        cy.get('#Name').type(this.bucketName);
      }
    });

    //Add tag with key and value
    if (addTag) {
      this.addTag();
    }
    //Enabling bucket versioning
    if (versioning) {
      this.versioning();
      //Enabling object locking
      if (objectLocking) {
        this.objectLock();
      }
      //Enabling rentention mode
      if (retentionMode === 'Compliance' || retentionMode === 'Governance') {
        this.retentionMode(retentionMode);
      }
    }
    cy.clickButton('Create');
  }

  editBucket(addTag?: boolean, versioning?: boolean): void {
    cy.contains('table tbody tr', this.bucketName).within(() => {
      super.selectActionsButton();
      cy.clickButton('Edit');
    });

    //Add tag with key and value
    if (addTag) {
      this.addTag();
    }
    //Enabling bucket versioning
    if (versioning) {
      this.versioning();
    }
    cy.get('button:contains("Cancel")').filter(':visible');
    cy.clickButton('Update');
  }

  objectLock(): void {
    cy.get('input#viewMode').then(($checkbox) => {
      if ($checkbox.is(':checked')) {
        cy.get('[id="object_lock_enabled"]').click();
      } else {
        cy.get('[id="ObjectLockEnabled"]').click();
      }
    });
  }

  retentionMode(retentionMode: string): void {
    cy.get('[id="RetentionEnabled"]').click();
    cy.get('input#viewMode').then(($checkbox) => {
      if ($checkbox.is(':checked')) {
        cy.get('select[id="retention_enabled"]').select(retentionMode);
      } else {
        cy.get('select[id="RetentionMode"]').select(retentionMode);
      }
    });
  }

  versioning(): void {
    cy.get('input#viewMode').then(($checkbox) => {
      if ($checkbox.is(':checked')) {
        cy.get('[id="versioning_enabled"]').click();
      } else {
        cy.get('[id="VersioningEnabled"]').click();
      }
    });
  }

  addTag(): void {
    cy.get('i.ms-2.mdi-18px.s3gw-cursor-pointer').click();
    cy.get('#Key').type(this.key);
    cy.get('#Value').type(this.value);
    cy.get('button:contains("Cancel")').filter(':visible');
    cy.clickButton('OK');
  }

  exploreBucket(): void {
    cy.contains('table tbody tr', this.bucketName).within(() => {
      cy.contains('Explore').click();
    });
  }

  folderCreate(folderName: string): void {
    cy.clickButton('Folder');
    cy.get('input#path').type(folderName);
    cy.clickButton('Create');
  }

  createLifecycleRule(ruleId: string): void {
    cy.contains('table tbody tr', this.bucketName).within(() => {
      super.selectActionsButton();
      cy.clickButton('Lifecycle');
    });
    cy.clickButton('Create');
    cy.get('input[id="id"]').type(ruleId);
    cy.get('input[id="enabled"]').check();
    cy.get('input[id="prefix"]').type('test');
    cy.get('input[id="days"]').clear().type('10');
    cy.clickButton('OK');
  }

  modifyLifecycleRule(ruleId: string): void {
    cy.contains('table tbody tr', ruleId).within(() => {
      super.selectActionsButton();
      cy.clickButton('Edit');
    });
    cy.get('input[id="enabled"]').click();
    cy.get('input[id="prefix"]').clear().type('test01');
    cy.get('input[id="days"]').clear().type('365');
    cy.clickButton('OK');
  }

  deleteLifecycleRule(ruleId: string): void {
    this.delete(ruleId);
  }
}
