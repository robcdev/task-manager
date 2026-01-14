import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateUserDto } from '@task-manager/shared';

@Component({
  selector: 'app-user-creation-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-creation-dialog.html',
  styleUrl: './user-creation-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreationDialog {
  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserCreationDialog>,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      const userData: CreateUserDto = this.userForm.value;
      console.log('User save clicked', userData);
      this.dialogRef.close({ saved: true, data: userData });
    }
  }
}
