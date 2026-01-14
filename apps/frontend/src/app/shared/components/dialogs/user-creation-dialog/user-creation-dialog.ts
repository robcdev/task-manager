import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-user-creation-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './user-creation-dialog.html',
  styleUrl: './user-creation-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreationDialog {
  constructor(private dialogRef: MatDialogRef<UserCreationDialog>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log('User save clicked');
    // Will return data from form later
    this.dialogRef.close({ saved: true });
  }
}
