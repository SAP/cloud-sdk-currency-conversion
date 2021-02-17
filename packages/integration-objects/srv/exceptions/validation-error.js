/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ValidationError';
    this.code = code;
  }
}

module.exports = { ValidationError };
