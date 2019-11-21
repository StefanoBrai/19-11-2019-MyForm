////////////////////////////////////////////////////////
//Funzione principale
////////////////////////////////////////////////////////
let fh = (function () {
    //Oggetto
    let programmer = {};

    ////////////////////////////////////////////////////////
    //Lettura input
    ////////////////////////////////////////////////////////
    const nameInput = document.querySelector("#name");
    const surnameInput = document.querySelector("#surname");
    const dateOfBirthInput = document.querySelector("#dateOfBirth");
    const maleRadioButtonInput = document.querySelector("#maleRadioButton");
    const languagesInput = document.querySelectorAll("input[type=checkbox]");
    const qualificationInput = document.querySelector("#qualification");

    ////////////////////////////////////////////////////////
    //Inpostazioni luogo di stampa
    ////////////////////////////////////////////////////////
    //const printError = document.querySelector("#printError");
    const printName = document.querySelector("#printName");
    const printSurname = document.querySelector("#printSurname");
    const printDateOfBirth = document.querySelector("#printDateOfBirth");
    const printGender = document.querySelector("#printGender");
    const printLanguanges = document.querySelector("#printLanguages");
    const printQualification = document.querySelector("#printQualification");

    ////////////////////////////////////////////////////////
    //Metodi
    ////////////////////////////////////////////////////////
    function isMinor(dateOfBirth){
        const birthYear = dateOfBirth.getFullYear();
        let modifiedDate = new Date(dateOfBirth.getTime());
        modifiedDate.setFullYear(birthYear + 18);
        return modifiedDate > Date.now();
    }

    function readData(evt){
        evt.preventDefault();

        //Inserimento valori in programmer
        programmer.name = nameInput.value;
        programmer.surname = surnameInput.value;
        programmer.dateOfBirth = new Date(Date.parse(dateOfBirthInput.value));
        programmer.isFemale = !maleRadioButtonInput.checked;
        programmer.languages = "";
        for(let item of languagesInput){
            if(item.checked){
                programmer.languages += item.value + " ";
            }
        }
        programmer.languages.trim();
        if(!programmer.languages){
            programmer.languages = "Not Languages";
        }
        programmer.qualification = [];
        for(let item of qualificationInput.options){
            if(item.selected){
                programmer.qualification.push(item.value);
            }
        }

        if(this.validation()){
            this.output();
        }
        else{
            alert("Error data format");
        }
        return false;
    }

    function validateData(){
        if(programmer.name.length < 3){
            return false;
        }
        if(programmer.surname.length < 3){
            return false;
        }
        if(isMinor(programmer.dateOfBirth)){
            return false;
        }
        return true;
    }

    function print(){
        printName.innerHTML = `Name: ${programmer.name}`;
        printSurname.innerHTML = `Surname: ${programmer.surname}`;
        printDateOfBirth.innerHTML = `Date of birth: ${programmer.dateOfBirth}`;
        printGender.innerHTML = `Gender: ${programmer.isFemale ? "Female" : "Male"}`;
        printLanguanges.innerHTML = `Languages: ${programmer.languages}`;
        printQualification.innerHTML = `Qualification: ${programmer.qualification.join(", ")}`;
    }

    //Oggetto
    let obj = {
        name : nameInput,
        output : print,
        validation : validateData,
        read : readData
    }

    //Bottone
    const button = document.querySelector("input[type=submit]");
    button.addEventListener("click", (evt)=>obj.read(evt));

    return obj;

})();