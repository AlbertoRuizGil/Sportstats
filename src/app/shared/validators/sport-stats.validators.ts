import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

export class SportStatsValidators {

    static range(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            const array = c as FormArray;
            if (!array || (array.length < min || array.length > max)) {
                return { range: true };
            }
            return null;
        };
    }

    static minusOrEqual(control: AbstractControl, restrictedControl: AbstractControl): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if ((control.value || control.value === 0) &&
                (restrictedControl.value || restrictedControl.value === 0) &&
                control.value > restrictedControl.value) {
                return { minusOrEqual: true };
            }
            return null;
        };
    }
}
