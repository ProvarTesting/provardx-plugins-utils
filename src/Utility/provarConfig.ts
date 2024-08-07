/*
 * Copyright (c) 2024 Provar Limited.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.md file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Config, ConfigPropertyMeta, SfError } from '@salesforce/core';
import { ErrorHandler } from './errorHandler.js';
import { GenericErrorHandler } from './genericErrorHandler.js';
import { GenericError } from './GenericError.js';

/**
 * sfdxConfig extended class that deals with any operation over .sf/config.json.
 * ex: what all properties we can add to config.json.
 *
 */

export class ProvarConfig extends Config {
  public constructor() {
    const option = { isGlobal: true, isState: true, filename: 'config.json', stateFolder: '.provardx' };
    const allowedProeprties: ConfigPropertyMeta[] = [];
    allowedProeprties.push(
      { key: 'PROVARDX_PROPERTIES_FILE_PATH', description: '' },
      { key: 'ACTIVE_PROVAR_MANAGER_ORG', description: '' }
    );
    ProvarConfig.addAllowedProperties(allowedProeprties);
    super(
      Object.assign(
        {
          isGlobal: true,
        },
        option
      )
    );
  }

  public static async loadConfig(errorHandler: ErrorHandler | GenericErrorHandler): Promise<ProvarConfig> {
    try {
      const config = await ProvarConfig.create();
      await config.read();
      return config;
    } catch (error) {
      if (error instanceof SfError) {
        if (errorHandler instanceof ErrorHandler) {
          errorHandler.addErrorsToList('SF_ERROR', error.message);
        } else {
          const errorObj: GenericError = new GenericError();
          errorObj.setCode('SF_ERROR');
          errorObj.setMessage(error.message);
          errorHandler.addErrorsToList(errorObj);
        }
      }
      throw error;
    }
  }
}
