import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class CommentsComponent implements OnInit,AfterViewInit {
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
    private DeleteCommentService: DeleteCommentService,
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
        this.loadComments();
        this.commentForm.reset();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  loadComments() {
    const commentsId = this.route.snapshot.params['estateId'];
    this.CommentsService.getCommentsByPostId(commentsId).subscribe(
      (comments) => {
        if (comments) {
          this.comments = Object.values(comments as Comment[]);
        }
      }
    );
  }

  ngAfterViewInit() {
    this.loadComments();
  }

  onDelete(comment: Comment) {
    const estateId = this.route.snapshot.params['estateId'];
    const commentId = comment._id || '';

    this.DeleteCommentService.deleteComment(estateId, commentId).subscribe({
      next: () => {
        this.loadComments();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onEditComment(comment: Comment) {
    const estateId = this.route.snapshot.params['estateId'];
    const commentId = comment._id || '';
    this.router.navigate([`/details/${estateId}/comments/${commentId}`]);
  }
}
