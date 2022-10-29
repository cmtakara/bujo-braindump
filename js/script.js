// inputs from the user
const entryDate = document.querySelector('#date');
const entryType = document.querySelector('#type');
const addToCalendar = document.querySelector('#add-to-calendar');
const category = document.querySelector('#category');
const subCategory = document.querySelector('#sub-category');
const description = document.querySelector('#description');
const delegate = document.querySelector('#delegate');

// 
const noDescrError = document.querySelector('#no-description')
const ulEl = document.querySelector('ul')
const aSave = document.querySelector('#save-file')

let textFile = null;


// an entry gets its arguments from the user inputs in the input form
class Entry {
    constructor(date, type, addDate, category, subcategory, delegate, description) {
        // console.log('in entry constructor')

        this.date = date;
        this.type = type;
        this.addDate = addDate;
        this.category = category;
        this.subcategory = subcategory;
        this.delegate = delegate;
        this.description = description;
    }
}


const bujoBraindump = {
    entries: [],
    addEvent(event) {
        event.preventDefault();
        noDescrError.classList.add("hide");
        let useDate;
        if (entryDate.value) {
            // console.log("entry date");
            // console.log(entryDate.value);
            useDate = entryDate.value;
        } else {
            // for now, default to today's date, later add in drop down for the date
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            useDate = yyyy + '-' + mm + '-' + dd;
        }

        let useSubCat;
        if (!subCategory.value || subCategory.value.trim().length === 0) {
            useSubCat = 'NONE';
        } else {
            useSubCat = subCategory.value.trim();
        }

        if (!description.value || description.value.trim().length === 0) {
            noDescrError.classList.toggle('hide');
        }
        else {
            let testEntry = new Entry(useDate, entryType.value, addToCalendar.checked, category.value, useSubCat, delegate.checked , description.value);
            console.log(testEntry)
            this.entries.push(testEntry)
            const li = document.createElement("li")
            li.textContent = JSON.stringify(testEntry.description)
            ulEl.append(li) // adds element after the last child
            // ulEl.prepend(li) // adds to the top of the ul
            this.resetForm()
        }

    },
    resetForm() {
        entryDate.value = '';
        entryType.value = 'todo';
        addToCalendar.checked = false;
        category.value = 'home';
        subCategory.value = '';
        description.value = '';
        delegate.checked = false;
        noDescrError.classList.add('hide');
    },
    saveToFile() {
        console.log('in savetofile')

        // want to use the text from entries
        let text = JSON.stringify(this.entries)
        console.log(text);

        // for now, use sample text
        // let text = 'testing the functionality';

        // want to save the information to a file
        let linkToSave = this.makeTextFile(text);
        console.log(linkToSave);
        aSave.setAttribute("href", linkToSave);
        aSave.textContent = "Download Saved File";




    },
    // function to write the file
    makeTextFile(text) {
        console.log("in make text file and text is: ")
        console.log(text)
        // from w3 schools
        let blob = new Blob([text], {type: 'text/plain'});
        let returnLink = URL.createObjectURL(blob);
        return (returnLink)
    }


};