import { Component } from '@angular/core';
import { CustomCard } from "../../shared/components/custom-card/custom-card";

@Component({
  selector: 'app-task-management',
  imports: [CustomCard],
  templateUrl: './task-management.html',
  styleUrl: './task-management.scss',
})
export class TaskManagement {

}
