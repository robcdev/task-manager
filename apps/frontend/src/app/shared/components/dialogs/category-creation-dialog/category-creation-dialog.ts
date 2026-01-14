import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-category-creation-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './category-creation-dialog.html',
  styleUrl: './category-creation-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCreationDialog {
  constructor(private dialogRef: MatDialogRef<CategoryCreationDialog>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log('Category save clicked');
    // Will return data from form later
    this.dialogRef.close({ saved: true });
  }
}
