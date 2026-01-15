import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateCategoryDto } from '@task-manager/shared';
import { UsersStore } from 'apps/frontend/src/app/stores/users.store';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-category-creation-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './category-creation-dialog.html',
  styleUrl: './category-creation-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCreationDialog {
  categoryForm: FormGroup;
  private usersStore = inject(UsersStore);
  protected users = this.usersStore.users;

  constructor(
    private dialogRef: MatDialogRef<CategoryCreationDialog>,
    private fb: FormBuilder,
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      createdBy: [this.users()[0]?.id || ''],
    });
  }

  /**
   * Close the dialog without saving.
   *
   * @returns {void}
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Validate and submit the form, then close the dialog.
   *
   * @returns {void}
   */
  onSave(): void {
    if (this.categoryForm.valid) {
      const categoryData: CreateCategoryDto = this.categoryForm.value;

      this.dialogRef.close({ saved: true, data: categoryData });
    }
  }
}
