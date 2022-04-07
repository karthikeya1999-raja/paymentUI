export class Customer{
    constructor(
        public fname: string = "",
        public lname: string = "",
        public address: string = "",
        public country: string = "",
        public city: string = "",
        public pcode: string = "",
        public phone: string = ""
    ){}

    public isValid(){
        if(
            this.fname != "" &&
            this.lname != "" &&
            this.address != "" &&
            this.country != "" &&
            this.city != "" &&
            this.pcode != "" &&
            this.phone != ""
        ){
            return true;
        }
        return false;
    }
}