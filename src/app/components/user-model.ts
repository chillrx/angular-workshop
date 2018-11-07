export class UserModel {
    name: String = '';
    age: Number;
    email: String = '';
    showForm: Boolean = false;
    editId: Number = 0;
    nextId: any = 1;
    users: Array<any> = [];
}
