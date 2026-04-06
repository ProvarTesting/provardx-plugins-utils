/*
 * Copyright (c) 2024 Provar Limited.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.md file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Messages } from '@salesforce/core';
import { ErrorHandler } from '../Utility/errorHandler.js';
import { GenericErrorHandler } from '../Utility/genericErrorHandler.js';
import { SfProvarCommandResult, populateResult } from '../Utility/sfProvarCommandResult.js';

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
    return populateResult(flags, errorHandler, messages, log);
  }
}
