import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment, Email } from './typeComment';
import { AuthService } from '../auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DeleteCommentService } from './deleteComment.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [CommentsService, DeleteCommentService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  owner!: Email;
  authEmail: string = '';

  commentForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private CommentsService: CommentsService,
    private AuthService: AuthService,
    private router: Router,
    private DeleteCommentService: DeleteCommentService
  ) {}
  comment!: Comment[];
  ngOnInit(): void {
    const commentsId = this.route.snapshot.params['estateId'];

    this.CommentsService.getCommentsByPostId(commentsId).subscribe(
      (comments) => {
        if (comments) {
          this.comments = Object.values(comments as Comment[]);
        }
      }
    );

    this.CommentsService.getOwner(commentsId).subscribe((owner) => {
      if (owner) {
        this.owner = owner as Email;
        this.authEmail = this.AuthService.email || '';
      }
    });
  }
  isOwner() {
    if (this.owner?.email === this?.authEmail) {
      return false;
    }
    return true;
  }

  ownerComment() {
    return this.authEmail;
  }
  isLoggedIn() {
    return this.AuthService.accessToken || undefined;
  }

  addCommentHandler() {
    const id = this.route.snapshot.params['estateId'];
    const body: Comment = {
      email: this.authEmail || '',
      comment: this.commentForm.value.comment || '',
    };

    if (this.commentForm.invalid) {
      alert('Няма въведен коректно коментар!');
      return;
    }

    this.CommentsService.addComment(id, body).subscribe({
      next: () => {
        this.commentForm.reset();
        this.router.navigate([`/details/${id}/comments`]).then(() => {
          window.location.reload();
        });
      },
    });
  }

  onDelete(comment: Comment) {
    const estateId = this.route.snapshot.params['estateId'];
    const commentId = comment._id || '';

    this.DeleteCommentService.deleteComment(estateId, commentId).subscribe({
      next: (response) => {
        console.log('Real estate added successfully', response);
      },
      error: (error) => {
        console.error('Error adding real estate', error);
      },
      complete: () => {
        this.router.navigate([`/details/${estateId}/comments`]);
        window.location.reload();
      },
    });
  }

  onEditComment(comment: Comment){
    const estateId = this.route.snapshot.params['estateId'];
    const commentId = comment._id || '';
    this.router.navigate([`/details/${estateId}/comments/${commentId}`]);
  }
}
