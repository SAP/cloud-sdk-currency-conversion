/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { isStringEmpty } from '../../src/helper/is-string-empty';

describe('Empty String Tests', () => {
  it('Check empty string', () => {
    const result: boolean = isStringEmpty('');
    expect(result).toEqual(true);
  });

  it('Check null string', () => {
    const result: boolean = isStringEmpty(null as any);
    expect(result).toEqual(true);
  });

  it('Check non empty string', () => {
    const result: boolean = isStringEmpty('sample');
    expect(result).toEqual(false);
  });
});
