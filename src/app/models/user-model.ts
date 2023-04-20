export class UserModel {
    id?: string;
    email: string;
    roles: any;
  
    constructor(email: string, roles?: any) {
      this.email = email;
      this.roles = roles;
    }
  }