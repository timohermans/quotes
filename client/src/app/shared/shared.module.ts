import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const sharedModules = [CommonModule];

@NgModule({
    declarations: [],
    imports: [...sharedModules],
    exports: [...sharedModules],
})
export class SharedModule {}
