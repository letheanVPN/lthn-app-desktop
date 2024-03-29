import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'lthn-ui-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {

  @Input() title: string;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) {}

  dismiss() {
    this.ref.close();
  }
}
