import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
 //currentStatus of document
 currentStatus: string = "Profile";

 changeLink(clickedLink :string){
   this.currentStatus = clickedLink;
 }
}
