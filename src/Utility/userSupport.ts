import { sfCommandConstants } from '../constants/sfCommandConstants.js';
import { specialCharReplacements } from '../constants/specialCharacterHandler.js';
import { ErrorHandler } from './errorHandler.js';
import { GenericErrorHandler } from './genericErrorHandler.js';
import { GenericError } from './GenericError.js';
import { executeCommand } from './provardxExecutor.js';

export class UserSupport {
  /**
   * Updates the dx properties json string before it is send to command executer.
   */
  /* eslint-disable */
  public prepareRawProperties(rawProperties: string): string {
    return '"' + this.replaceSpecialCharacters(rawProperties).replace(/"/g, '\\"') + '"';
  }

  /**
   * JSON library we are using in studio to deserialize this JSON to POJO is Gson and
   * it automatically handles standard characters and escape sequences except for few,
   * all other characters that are not explicitly handled will still be processed normally using the library’s default behavior.
   */
  public replaceSpecialCharacters(rawProperties: string): string {
    const result = [];
    for (let i = 0; i < rawProperties.length; i++) {
      const char = rawProperties[i];
      result.push(specialCharReplacements[char] || char);
    }
    return result.join('');
  }

  /**
   * Gets the dx user info and generated the password for dx user if not already created.
   *
   * @param overrides Connection overrides provided in dx property file.
   */
  public async getDxUsersInfo(overrides: any, errorHandler: ErrorHandler | GenericErrorHandler): Promise<any> {
    const dxUsers: string[] = [];
    if (overrides === undefined || overrides.length === 0) {
      return dxUsers;
    }
    for (const override of overrides) {
      const username = override.username;
      const message = 'Validating and retrieving dx user info: ' + username;
      let dxUserInfo = await executeCommand(sfCommandConstants.DISPLAY_USER_INFO + username, message);
      let jsonDxUser = JSON.parse(dxUserInfo);
      if (jsonDxUser.status !== 0) {
        if (errorHandler instanceof GenericErrorHandler) {
          const errorObj: GenericError = new GenericError();
          errorObj.setCode('DOWNLOAD_ERROR');
          errorObj.setMessage(`The following connectionOverride username is not valid: ${username}`);
          errorHandler.addErrorsToList(errorObj);
        } else {
          errorHandler.addErrorsToList(
            'DOWNLOAD_ERROR',
            `The following connectionOverride username is not valid: ${username}`
          );
        }
        continue;
      }
      ({ jsonDxUser, dxUserInfo } = await this.generatePasswordIfNotPresent(jsonDxUser, username, dxUserInfo));
      jsonDxUser.result.connection = override['connection'];
      jsonDxUser.result.password = this.handleSpecialCharacters(jsonDxUser.result.password);
      dxUsers.push(jsonDxUser);
    }
    if (dxUsers.length === 0) {
      return null;
    }
    return dxUsers;
  }

  private async generatePasswordIfNotPresent(jsonDxUser: any, username: any, dxUserInfo: any) {
    if (jsonDxUser.result.password == null) {
      const generatePasswordCommand = sfCommandConstants.GENERATE_PASSWORD + username;
      await executeCommand(generatePasswordCommand, 'Generating password for user: ' + username);
      dxUserInfo = await executeCommand(
        sfCommandConstants.DISPLAY_USER_INFO + username,
        'Getting generated password for user: ' + username
      );
      jsonDxUser = JSON.parse(dxUserInfo.toString());
    }
    return { jsonDxUser, dxUserInfo };
  }

  private handleSpecialCharacters(password: string): string {
    if (password) {
      password = encodeURIComponent(password);
    }
    return password;
  }
}
