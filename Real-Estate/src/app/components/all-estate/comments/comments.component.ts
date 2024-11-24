import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../types/typeHouse';

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

  constructor(
    private route: ActivatedRoute,
    private CommentsService: CommentsService
  ) {}

  ngOnInit(): void {
    const commentsId = this.route.snapshot.params['estateId'];

    this.CommentsService.getCommentsByPostId(commentsId).subscribe(
      (comments) => {
        this.comments = Object.values(comments) as Comment[];
        console.log(this.comments);
      }
    );
  }
}
