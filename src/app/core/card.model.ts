export class Card {

    public name: string;
    public status: string;

    constructor(input: Object) {
        this.name = input['name'];
        this.status = input['status'];
    }
}