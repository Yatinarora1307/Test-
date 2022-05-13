fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(res=>localStorage.setItem("data",JSON.stringify(res)));
const table=document.getElementById('table');
const editForm=document.getElementById('popupForm');
const loadTheResults=(data)=>{
    editForm.style.display="none";
    table.innerHTML="";
  for(let i=0;i<data.length;i++){
      let tableRow=document.createElement('tr');
      let tableId=document.createElement('td');
      let tableBody=document.createElement('td');
      let tableTitle=document.createElement('td');
      let editButton=document.createElement('button');
      let deleteButton=document.createElement('button');
      editButton.innerHTML="Edit";
      deleteButton.innerHTML="Delete";
      addingEventListeners(deleteButton,()=>onDeleteHandler(data[i].id));
      addingEventListeners(editButton,()=>onEditListener(data[i].id,data[i].body,data[i].title,data[i].userId))
      tableId.innerHTML=data[i].id;
      tableBody.innerHTML=data[i].body;
      tableTitle.innerHTML=data[i].title;
      tableRow.append(tableId);
      tableRow.append(tableBody);
      tableRow.append(tableTitle);
      tableRow.append(editButton);
      tableRow.append(deleteButton);
      table.append(tableRow);
  }
} 

const addingEventListeners=(btnName,eventListener)=>{
    return btnName.addEventListener('click',eventListener);
}

const onEditListener=(Id,Body,Title,userId)=>{
    editForm.style.display="block";
    const submitButton=document.getElementById("submitBtn");
    const formId=document.getElementById('Id');
    const formBody=document.getElementById('Body');
    const formTitle=document.getElementById('Title');
    formId.value=Id;
    formTitle.value=Title;
    formBody.value=Body;
    addingEventListeners(submitButton,(event)=>onSubmitHandler(event,formId,formBody,formTitle,userId))
}
const onDeleteHandler=(id)=>{
    let data=JSON.parse(localStorage.getItem("data"));
    let index=findIndex(id);
    data.splice(index,1);
    localStorage.setItem("data",JSON.stringify(data));
    loadTheResults(JSON.parse(localStorage.getItem("data")))
}
const findIndex=(id)=>{
    let data=JSON.parse(localStorage.getItem("data"));
    let index=0;
    for(let i=0;i<data.length;i++){
       if(data[i].id===id){
           index=i;
       }
    }
    return index;
}
const onSubmitHandler=(event,Id,Body,Title,userId)=>{
  if(Id!==""||Body!==""||Title!==""||userId!==""){
      event.preventDefault();
     let data=JSON.parse(localStorage.getItem("data"))
     console.log(data)
     for(let i=0;i<data.length;i++){
         if(data[i].id===+(Id.value)){
             data[i].id=Id.value;
             data[i].body=Body.value;
             data[i].title=Title.value;
         }
     }
     localStorage.setItem("data",JSON.stringify(data));
     loadTheResults(JSON.parse(localStorage.getItem("data")))
  }else{
    alert("Values in the form cannot be empty");
  }
  editForm.style.display="none";
}
loadTheResults(JSON.parse(localStorage.getItem("data")))