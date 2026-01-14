import { Component } from '@angular/core';
import { CustomCard } from "../../shared/components/custom-card/custom-card";

@Component({
  selector: 'app-user-management',
  imports: [CustomCard],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagement {

}
