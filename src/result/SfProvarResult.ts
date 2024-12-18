/*
 * Copyright (c) 2024 Provar Limited.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.md file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Messages } from '@salesforce/core';
import { ErrorHandler, Error } from '../Utility/errorHandler.js';
import { GenericErrorHandler } from '../Utility/genericErrorHandler.js';
import { SfProvarCommandResult } from '../Utility/sfProvarCommandResult.js';

/* eslint-disable */
export class SFProvarResult {
  /**
   * Declaring return type and populating return object for async run method of the commands.
   *
   */

  public static populateResult(
    flags: any,
    errorHandler: ErrorHandler | GenericErrorHandler,
    messages: Messages<string>,
    log: Function
  ): SfProvarCommandResult {
    let result: SfProvarCommandResult = { success: true };

    const errorObjects: Error[] | object[] = errorHandler.getErrors();
    if (errorObjects.length > 0) {
      if (!flags['json']) {
        throw messages.createError('error.MultipleFailure', errorHandler.errorsToStringArray());
      }
      result = {
        success: false,
        errors: errorObjects,
      };
    } else {
      messages.messages.has('success_message') ? log(messages.getMessage('success_message')) : '';
    }

    return result;
  }
}
