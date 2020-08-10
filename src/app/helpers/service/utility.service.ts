import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilityService {
    compareContainStringWithoutCase(sourceString: string, compareString: string) {
        return sourceString.toLowerCase().indexOf(compareString.toLowerCase());
    }
}