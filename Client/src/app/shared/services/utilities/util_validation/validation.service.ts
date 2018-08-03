export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidCharacter': 'has invalid chracter',
        };

        return config[validatorName];
    }

    static checkForMatch(inputString, matchArray){
      let match = "";
      if (inputString != undefined && inputString != null && inputString != "") {
            for (let count=0; count < matchArray.length; count++ ) {
                // escape the required characters
                var matchString = matchArray[count].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                var regEx = new RegExp(matchString);
                if (regEx.test(inputString)) {
                    match = matchArray[count];
                    break;
                }
            }
        }

        if (match != "") {
            return { 'hasInvalidCharacter': true, 'invalidCharacter': match };
        } else {
            return null;
        }
    }

    static cnValidator(control) {
        var invalidCNChars = ['<', '>', ',', ';', '\\', '"', '+', '#', '=', '/', '|', '&', '*', "'", '!', '@', '$', '%'];
        return ValidationService.checkForMatch(control.value, invalidCNChars);

    }

    static nameValidator(control) {
        var invalidNameChars = ["<", ">", ",", ";", "\\", '"', "+", "#", "=", "/", "|", "&", "*"];
        return ValidationService.checkForMatch(control.value, invalidNameChars);
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    public static minimumValidator(control) {
        if (control.value >= 1) {
            return null;
        } else {
            return { 'minimum': true };
        }
    }

    static nonemptyArrayValidator(control) {
        if(control.value != undefined && control.value != null && control.value.length > 0) {
            return null;
        } else {
            return { 'emptyArray': true };
        }
    }

    static nonemptyString(control) {
        if(control.value != undefined && control.value != null && control.value.trim() != '') {
            return null;
        } else {
            return { 'emptyString': true };
        }
    }

    static numericValidator(value) {
        var regEx = new RegExp(/^[-]?[0-9]+$/);
        if(regEx.test(value)) {
            return true;
        } else {
            return false;
        }
    }
}
