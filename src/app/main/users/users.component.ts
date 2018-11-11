import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersRef: AngularFireList<any>;
  users: Observable<any>;
  usersKeys: any; 
  userForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    showForm: new FormControl(false),
    editId: new FormControl(null),
  });

  constructor(
    db: AngularFireDatabase
  ) {
    this.users = db.list('users').valueChanges();
    this.usersRef = db.list('users');
    db.object('users').snapshotChanges().subscribe(action => {
      this.usersKeys = Object.keys(action.payload.val());
    });
  }
  
  ngOnInit() {
  }

  showForm() {
    this.userForm.controls.showForm.setValue(true);
  }

  deleteUser = (index) => {
    this.usersRef.remove(this.usersKeys[index]);
    this.userForm.reset();
  }

  addUser = () => {
    this.usersRef.push({
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      age: this.userForm.value.age
    });
    this.userForm.reset();
  }

  editForm = (item, index) => {
    this.userForm.patchValue(item);
    this.userForm.controls.editId.setValue(index);
    this.showForm();
  }

  updateUser = () => {
    this.usersRef.update(this.usersKeys[this.userForm.value.editId], {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      age: this.userForm.value.age
    });
    this.userForm.reset();
  }

}
