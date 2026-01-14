import { Component } from '@angular/core';
import { CustomCard } from '../../../shared/components/custom-card/custom-card';

@Component({
  selector: 'app-task-list',
  imports: [CustomCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {}
