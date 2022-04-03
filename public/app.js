

const signUpForm = document.querySelector("#sign-up-form");
const loginForm = document.querySelector("#login-form");

const signUpName = document.querySelector("#sign-up-name");
const signUpEmail = document.querySelector("#sign-up-email");
const signUpPassword = document.querySelector("#sign-up-password");

// const errorMsg = document.querySelector("#error");

signUpForm.addEventListener("submit", e => {
    e.preventDefault();
    const signUpDetails = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value
    };

    fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpDetails)
    })
});

fetch('/api/users', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    
})
.then(res => res.json())
.then(response => {
    if(response.error) {
        errorMsg.innerHTML = response.error;
    } else {
      const users = response;
      GFG_FUN(users)
      
    }
});
function GFG_FUN(list) {
    var cols = [];
     
    for (var i = 0; i < list.length; i++) {
        console.log(list[i]);
        for (var k in list[i]) {
            if (cols.indexOf(k) === -1) {
                 
                // Push all keys to the array
                cols.push(k);
            }
        }
    }
     
    // Create a table element
    var table = document.createElement("table");
     
    // Create table row tr element of a table
    var tr = table.insertRow(-1);
     
    for (var i = 0; i < cols.length; i++) {
         
        // Create the table header th element
        var theader = document.createElement("th");
        theader.innerHTML = cols[i];
         
        // Append columnName to the table row
        tr.appendChild(theader);
    }
     
    // Adding the data to the table
    for (var i = 0; i < list.length; i++) {
         
        // Create a new row
        trow = table.insertRow(-1);
        for (var j = 0; j < cols.length; j++) {
            var cell = trow.insertCell(-1);
             
            // Inserting the cell at particular place
            cell.innerHTML = list[i][cols[j]];
        }
    }
     
    // Add the newly created table containing json data
    var el = document.getElementById("table");
    el.innerHTML = "";
    el.appendChild(table);
}   