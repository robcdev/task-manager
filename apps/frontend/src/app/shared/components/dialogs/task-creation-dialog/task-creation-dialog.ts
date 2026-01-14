import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-task-creation-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './task-creation-dialog.html',
  styleUrl: './task-creation-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreationDialog {
  constructor(private dialogRef: MatDialogRef<TaskCreationDialog>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log('Task save clicked');
    // Will return data from form later
    this.dialogRef.close({ saved: true });
  }
}
