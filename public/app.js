

const signUpForm = document.querySelector("#sign-up-form");
const loginForm = document.querySelector("#login-form");

const signUpName = document.querySelector("#sign-up-name");
const signUpEmail = document.querySelector("#sign-up-email");

// const errorMsg = document.querySelector("#error");

signUpForm.addEventListener("submit", e => {
    e.preventDefault();
    const signUpDetails = {
        name: signUpName.value,
        email: signUpEmail.value
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
      GFG_FUN(response);
      
    }
});
function GFG_FUN(list) {
    var cols = [];
     
    for (var i = 0; i < list.length; i++) {
        
        for (var k in list[i]) {
            if (cols.indexOf(k) === -1 && (k != "_id" && k !="__v")) {
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
            cell.setAttribute("contenteditable", true);
        }
        var cell = trow.insertCell(-1);
        const id = list[i].id;
        const name = cell.parentNode.childNodes[1].innerText;
        // console.log(tr.childNodes[-1]);
        
        const email = cell.parentNode.childNodes[2].innerText;
        console.log(cell.parentNode.childNodes[1].innerText);
        // console.log(name);
        var updbutton = document.createElement("button");
        updbutton.innerHTML = "Update";
        updbutton.onclick = () => {updateUser(id, name, email)};
        cell.appendChild(updbutton);


        
        var delbutton = document.createElement("button");
        delbutton.innerHTML = "Delete";
        
        delbutton.onclick = () => {deleteUser(id)};
        cell.appendChild(delbutton);
    }
     
    // Add the newly created table containing json data
    var el = document.getElementById("table");
    el.innerHTML = "";
    el.appendChild(table);
}  

function updateUser(id, name, email){
    fetch(`/api/users/${id}`, { 
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "name": name,
            "email": email
        }
    });
}
function deleteUser(id){
    fetch(`/api/users/${id}`, { 
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
}