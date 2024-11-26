import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditService } from './edit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { House } from '../../../types/typeHouse';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [EditService],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  house!: House;
  constructor(
    private EditService: EditService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['estateId'];
    this.EditService.getEdit(id).subscribe((edit) => {
      this.house = edit as House;
      this.editForm.patchValue(this.house);
    });
  }
  editForm = new FormGroup({
    imageUrl: new FormControl('', [Validators.required,Validators.pattern(/^(http|https):\/\/.+$/)]),
    price: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    furniture: new FormControl('', [Validators.required]),
    bedrooms: new FormControl<number | ''>('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(30)]),
  });

  onSubmit() {

    if (this.editForm.invalid) {
      alert('error')
      return;
    }
    const id = this.route.snapshot.params['estateId'];
    this.EditService.postEdit(id, this.editForm.value).subscribe(() => {
      this.router.navigate([`/my-estate/${id}`]);
    });
  }
}
