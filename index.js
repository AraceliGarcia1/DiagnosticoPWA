fetch("https://reqres.in/api/users?page=2")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    json.data.forEach((element) => {
      let content = document.getElementById("container");
      let htmlX = "";
      json.data.forEach((element) => {
        let htmlCard = `
            <div class="col-md-4">
            <div style="margin: 20px;">
            <div id="card1" class="card" style="width: 18rem">
                <div class="card-body">
                    <img src="${element.avatar}" class="card-img-top" alt="..." width="150" height="150">
                    <p class="card-text">Email: ${element.email}</p>
                    <p class="card-text">First name: ${element.first_name}</p>
                    <p class="card-text">Last name: ${element.last_name}</p>
                </div>
                <button onclick=editPerson(${element.id}) id="btnBuscar" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update">Editar</button>
                <button onclick=deletePerson(${element.id}) type="button" class="btn btn-danger" data-toggle="modal" style="margin-top:10px">
                    Eliminar
                </button>  
                
            </div>
            </div>
        </div>
    `;
        htmlX = htmlX + htmlCard;
      });
      content.innerHTML = htmlX;
    });
  });

async function register() {
  const nameU = document.getElementById("nameU");
  const job = document.getElementById("job");

  const res = await fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameU.value,
      job: job.value,
    }),
  });

  const data = await res.json();

  if (res.status === 201) {
    const content = document.getElementById("container");
    console.log("guardado")
    const newCard = document.createElement("div");
    newCard.innerHTML = `
      <div class="col-md-4">
        <div style="margin: 20px;">
          <div id="card1" class="card" style="width: 18rem">
            <div class="card-body">
              <p class="card-text">Name: ${data.name}</p>
              <p class="card-text">Job: ${data.job}</p>
              <p class="card-text">Created At: ${data.createdAt}</p>
            </div>
            <button onclick=editPerson(${data.id}) id="btnBuscar" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update">Editar</button>
            <button onclick=deletePerson(${data.id}) type="button" class="btn btn-danger" data-toggle="modal" style="margin-top:10px">
                    Eliminar
            </button>  
                
          </div>
          </div>
        </div>
      `;
    content.appendChild(newCard);

    const modalElement = document.getElementById("exampleModal");
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.hide();

    nameU.value = "";
    job.value = "";
    alert("Registro guardado")
  } else {
    console.log("Hubo un error: " + res.status + data.message);
  }
}

async function editPerson(id) {
    const nameUp = document.getElementById("nameUp");
    const jobU = document.getElementById("jobU");
    
    const nameU = document.getElementById("nameU").value;
    const job = document.getElementById("job").value;

    idU = id;
    nameUp.value = nameU; 
    jobU.value = job;  
  
  }


async function updateData(id,nameU,job) {
    const nameUp = document.getElementById("nameUp");
    const jobU = document.getElementById("jobU");
  
    const res = await fetch(`https://reqres.in/api/users/{id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameU.value,
        job: job.value,
      }),
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
       
      alert("El registro "+id +" se actualizo exitosamente a las "+ data.updatedAt)
    } else {
      console.log("Hubo un error: " + res.status + data.message);
    }
  }


  

 deletePerson=(id)=>{
    console.log("id entrante",id)
    fetch(`https://reqres.in/api/users{id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response)=>{
      console.log(response);
      alert("El registro "+id+" se ha eliminado exitosamente")
      window.location.reload()
    })

  }


