function ValidateForm() {
    let typedocument = document.getElementById("InputTypeDocument").value;
    let docnumber = document.getElementById("InputDocNumber").value;
    let fullname = document.getElementById("InputFullName").value;
    let email = document.getElementById("InputEmail").value;
    let phone = document.getElementById("InputPhone").value;

    if (typedocument === "") {
        alert("Este campo es obligatorio (Tipo de Documento)");
        return false;
    }
    if (docnumber === "") {
        alert("Este campo es obligatorio (Número de Documento)");
        return false;
    }
    if (fullname === "") {
        alert("Este campo es obligatorio (Nombres y Apellidos)");
        return false;
    }
    if (email === "") {
        alert("El campo correo es requerido");
        return false;
    } else if (!email.includes("@")) {
        alert("El correo no es válido");
        return false;
    }
    if (phone === "") {
        alert("Este campo es obligatorio (Teléfono)");
        return false;
    }

    return true;
}

function ReadData() {
    let ListPeople;

    if (localStorage.getItem("ListPeople") === null) {
        ListPeople = [];
    } else {
        ListPeople = JSON.parse(localStorage.getItem("ListPeople"));
    }

    let html = "";
    ListPeople.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.typedocument + "</td>";
        html += "<td>" + element.docnumber + "</td>";
        html += "<td>" + element.fullname + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.phone + "</td>";
        html +=
            '<td><button onclick="deleteData(' +    
            index +
            ')" class="btn btn-danger">Eliminar</button> ' +
            '<button onclick="editData(' +
            index +
            ')" class="btn btn-warning">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#tableData tbody").innerHTML = html;
}

function AddData() {
    if (ValidateForm() === true) {
        let typedocument = document.getElementById("InputTypeDocument").value;
        let docnumber = document.getElementById("InputDocNumber").value;
        let fullname = document.getElementById("InputFullName").value;
        let email = document.getElementById("InputEmail").value;
        let phone = document.getElementById("InputPhone").value;

        let ListPeople;

        if (localStorage.getItem("ListPeople") === null) {
            ListPeople = [];
        } else {
            ListPeople = JSON.parse(localStorage.getItem("ListPeople"));
        }

        ListPeople.push({
            typedocument: typedocument,
            docnumber: docnumber,
            fullname: fullname,
            email: email,
            phone: phone,
        });

        localStorage.setItem("ListPeople", JSON.stringify(ListPeople));

        ReadData();

        // Limpiar campos
        document.getElementById("InputTypeDocument").value = "";
        document.getElementById("InputDocNumber").value = "";
        document.getElementById("InputFullName").value = "";
        document.getElementById("InputEmail").value = "";
        document.getElementById("InputPhone").value = "";
    }
}

// Eliminar datos
function deleteData(index) {
    let ListPeople = JSON.parse(localStorage.getItem("ListPeople"));
    ListPeople.splice(index, 1);
    localStorage.setItem("ListPeople", JSON.stringify(ListPeople));
    ReadData();
}

// Editar datos
function editData(index) {
    let ListPeople = JSON.parse(localStorage.getItem("ListPeople"));
    document.getElementById("InputTypeDocument").value = ListPeople[index].typedocument;
    document.getElementById("InputDocNumber").value = ListPeople[index].docnumber;
    document.getElementById("InputFullName").value = ListPeople[index].fullname;
    document.getElementById("InputEmail").value = ListPeople[index].email;
    document.getElementById("InputPhone").value = ListPeople[index].phone;

    deleteData(index);
}

// Cargar datos al inicio
document.onload = ReadData();
