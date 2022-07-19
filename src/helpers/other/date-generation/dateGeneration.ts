import BirthdateState from "types/birthdateType";

export const arrayOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
export const generateArrayOfYears = () => {
    let result = [];
    for(let i = new Date().getFullYear(); i > 1919; i--){
        result.push(i);
    }

    return result;
}

export const generateArrayOfDays = (birthdate: BirthdateState) => {
    let result = [];

    let amountOfDays = 0;
    switch(arrayOfMonths.indexOf(birthdate.month)){
        case 0:
        case 2: 
        case 4: 
        case 6: 
        case 7: 
        case 9: 
        case 11: {
            amountOfDays = 31;
            break;
        }
        case 1: {
            amountOfDays = birthdate.year % 4 ? 28 : 29;
            break;
        }
        default: {
            amountOfDays = 30;
            break;
        }
    }

    for(let i = 1; i <= amountOfDays; i++){
        result.push(i);
    }

    return result;
}