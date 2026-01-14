import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateCategoryDto } from '@task-manager/shared';

@Component({
  selector: 'app-category-creation-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './category-creation-dialog.html',
  styleUrl: './category-creation-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCreationDialog {
  categoryForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CategoryCreationDialog>,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      createdBy: ['', Validators.required], // TODO: Get from auth service
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.categoryForm.valid) {
      const categoryData: CreateCategoryDto = this.categoryForm.value;
      console.log('Category save clicked', categoryData);
      this.dialogRef.close({ saved: true, data: categoryData });
    }
  }
}
