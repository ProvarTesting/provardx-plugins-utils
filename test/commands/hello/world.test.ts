import { TestContext } from '@salesforce/core/testSetup';

describe('hello world', () => {
  const $$ = new TestContext();

  beforeEach(() => {});

  afterEach(() => {
    $$.restore();
  });
});
