class CustomAPIError extends Error{
    constructor(message:string){
        console.log("hit the customAPI")
        super(message)
    }
}

export default CustomAPIError