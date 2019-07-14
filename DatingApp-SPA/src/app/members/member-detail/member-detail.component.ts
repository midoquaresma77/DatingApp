import { Component, OnInit } from "@angular/core";
import { User } from "src/app/_models/user";
import { HttpClient } from "@angular/common/http";
import { AlertifyService } from "src/app/_services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.css"]
})
export class MemberDetailComponent implements OnInit {
  user: User;
  id: number;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  getId() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get("id");
    });
  }

  loadUser() {
    return this.userService.getUser(this.id).subscribe(
      (user: User) => {
        this.user = user;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
