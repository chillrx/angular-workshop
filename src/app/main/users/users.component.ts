import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];
  userForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    showForm: new FormControl(false),
    editId: new FormControl(null),
  });

  constructor() { }

  ngOnInit() {
  }

  showForm() {
    this.userForm.controls.showForm.setValue(true); 
  }

  editForm = (item) => {
    this.userForm.patchValue(item);
    this.userForm.controls.editId.setValue(item.id);
    this.showForm();
  }

  deleteUser(i) {
    this.users.splice(i, 1);
  }

  submitForm = () => {
    if (!this.userForm.value.editId) {
      this.users.push({
        id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
        name: this.userForm.value.name, 
        email: this.userForm.value.email,
        age: this.userForm.value.age
      });
    } else {
      const index = this.users.findIndex(el => el.id === this.userForm.value.editId);
      if (index === -1) return alert('Usuário não encontrado!');
      const editedUser = {
        id: this.userForm.value.editId,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        age: this.userForm.value.age
      };
      this.users[index] = editedUser;
    }
    this.userForm.reset();
  }

}
