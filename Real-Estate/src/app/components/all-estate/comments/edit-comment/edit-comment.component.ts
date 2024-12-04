import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditService } from './edit.service';
import { Comment } from './typeComment';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-edit-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [EditService],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.css',
})
export class EditCommentComponent implements OnInit {
  apiUrl = environment.apiUrl;
  comment!: Comment;
  constructor(
    private EditService: EditService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  commentForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
    ]),
  });

  ngOnInit(): void {
    const estateId = this.route.snapshot.params['estateId'];
    const commentId = this.route.snapshot.params['commentId'];
    this.EditService.getComment(estateId, commentId).subscribe((comment) => {
      this.comment = comment as Comment;
      this.commentForm.patchValue(this.comment);
    });
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      alert('error');
      return;
    }
    const estateId = this.route.snapshot.params['estateId'];
    const commentId = this.route.snapshot.params['commentId'];
    this.EditService.postComment(estateId,commentId, this.commentForm.value).subscribe(() => {
      this.router.navigate([`/details/${estateId}/comments`]);
    });
  }
}
