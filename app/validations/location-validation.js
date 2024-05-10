const locationValidation ={
    address:{
        in: ["query"],
        exists:{
            errorMessage: "Address is required"
        },
        notEmpty:{
            errorMessage:"Address cannot be empty"
        }
    }
}

module.exports = locationValidation