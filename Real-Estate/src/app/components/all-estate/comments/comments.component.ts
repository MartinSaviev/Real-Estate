import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment, Email } from '../../types/typeHouse';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [CommentsService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  owner!: Email;
  authEmail: string | null = '';

  commentForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private CommentsService: CommentsService,
    private AuthService: AuthService,
    private router: Router,
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

  addCommentHandler() {
    const id = this.route.snapshot.params['estateId'];
    const body:Comment = {
      email: this.authEmail || '',
      comment: this.commentForm.value.comment || '',
      
    }

    if(this.commentForm.invalid){
      alert('Please enter a comment');
      return;
    }

    this.CommentsService.addComment(id,body).subscribe(()=> {
      this.commentForm.reset();
      this.router.navigate([`/my-estate/${id}`]);
    })
  }
}
