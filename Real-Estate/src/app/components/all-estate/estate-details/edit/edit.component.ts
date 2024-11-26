import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditService } from './edit.service';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['estateId'];
    this.EditService.getEdit(id).subscribe((edit) => {
      this.house = edit as House;
      this.editForm.patchValue(this.house); // Initialize form with fetched data });
    });
  }
  editForm = new FormGroup({
    imageUrl: new FormControl(''),
    price: new FormControl(''),
    address: new FormControl(''),
    furniture: new FormControl(''),
    bedrooms: new FormControl<number | ''>(''),
    description: new FormControl(''),
  });

  onSubmit() {
    console.log(this.editForm.value);
  }
}
