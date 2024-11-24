import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { ActivatedRoute } from '@angular/router';
import { Comment, Email } from '../../types/typeHouse';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  providers: [CommentsService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  owner: Email = {
    email: '',
    _id: '',
  };

  authEmail: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private CommentsService: CommentsService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    const commentsId = this.route.snapshot.params['estateId'];

    this.CommentsService.getCommentsByPostId(commentsId).subscribe(
      (comments) => {
        this.comments = Object.values(comments) as Comment[];
      }
    );

    this.CommentsService.getOwner(commentsId).subscribe((owner) => {
      this.owner = owner as Email;
      this.authEmail = this.AuthService.email;
    });
  }
  isOwner() {
    if (this.owner.email === this.authEmail) {
      return false;
    }
    return true;
  }
  isLoggedIn() {
    return this.AuthService.accessToken || undefined;
  }

}
