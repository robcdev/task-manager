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
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  TaskStatus,
  TaskPriority,
  CreateTaskDto,
  TASK_VALIDATION,
} from '@task-manager/shared';
import { UsersStore } from 'apps/frontend/src/app/stores/users.store';
import { CategoriesStore } from 'apps/frontend/src/app/stores/categories.store';

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

  taskStatuses = [
    { label: 'To Do', value: TaskStatus.TODO },
    { label: 'In Progress', value: TaskStatus.IN_PROGRESS },
    { label: 'Done', value: TaskStatus.DONE },
  ];
  taskPriorities = [
    { label: 'Low', value: TaskPriority.LOW },
    { label: 'Medium', value: TaskPriority.MEDIUM },
    { label: 'High', value: TaskPriority.HIGH },
  ];

  private usersStore = inject(UsersStore);
  private categoriesStore = inject(CategoriesStore);
  protected users = this.usersStore.users;
  protected categories = this.categoriesStore.categories;

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
      categoryId: [this.categories()[0]?.id || ''],
      dueDate: ['', Validators.required],
      assignedTo: [this.users()[0]?.id || ''],
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
    if (this.taskForm.valid) {
      const taskData: CreateTaskDto = {
        ...this.taskForm.value,
        dueDate: this.taskForm.value.dueDate?.toISOString(),
      };
      this.dialogRef.close({ saved: true, data: taskData });
    }
  }
}
