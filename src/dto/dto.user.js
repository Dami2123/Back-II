export default class UserDTO {
    constructor(user) {
        this.first_name= user.first_name;
        this.role= user.role
        this.cart=user.cart
    }
}

