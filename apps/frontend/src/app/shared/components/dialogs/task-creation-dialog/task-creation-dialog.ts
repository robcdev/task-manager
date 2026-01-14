import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  TaskStatus,
  TaskPriority,
  CreateTaskDto,
  TASK_VALIDATION,
} from '@task-manager/shared';

@Component({
  selector: 'app-task-creation-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-creation-dialog.html',
  styleUrl: './task-creation-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreationDialog {
  taskForm: FormGroup;

  taskStatuses = Object.values(TaskStatus);
  taskPriorities = Object.values(TaskPriority);

  constructor(
    private dialogRef: MatDialogRef<TaskCreationDialog>,
    private fb: FormBuilder,
  ) {
    this.taskForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(TASK_VALIDATION.MIN_TITLE_LENGTH),
          Validators.maxLength(TASK_VALIDATION.MAX_TITLE_LENGTH),
        ],
      ],
      description: [
        '',
        [Validators.maxLength(TASK_VALIDATION.MAX_DESCRIPTION_LENGTH)],
      ],
      status: [TaskStatus.TODO, Validators.required],
      priority: [TaskPriority.MEDIUM, Validators.required],
      categoryId: ['', Validators.required], // TODO: Load categories from store
      dueDate: ['', Validators.required],
      assignedTo: ['', Validators.required], // TODO: Load users from store
      createdBy: ['', Validators.required], // TODO: Get from auth service
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const taskData: CreateTaskDto = {
        ...this.taskForm.value,
        dueDate: this.taskForm.value.dueDate?.toISOString(),
      };
      console.log('Task save clicked', taskData);
      this.dialogRef.close({ saved: true, data: taskData });
    }
  }
}
