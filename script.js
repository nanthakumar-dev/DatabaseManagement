
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getDatabase,ref,push,onValue,remove,set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBm1r_N5ZieFsZRBIpGqdDXHC_NtwJ_dEI",
    authDomain: "datamanagementsystem-82cc2.firebaseapp.com",
    projectId: "datamanagementsystem-82cc2",
    storageBucket: "datamanagementsystem-82cc2.firebasestorage.app",
    messagingSenderId: "577772976140",
    appId: "1:577772976140:web:bf6d7717c536d8b3fe5629"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database=getDatabase(app)
  const userListById=ref(database,'users')

  const idEl=document.querySelector('#idEl')
  const nameEl=document.querySelector('#nameEl')
  const ageEl=document.querySelector('#ageEl')
  const cityEl=document.querySelector('#cityEl')
  const frm=document.querySelector('#frm')
  const tbEl=document.querySelector('tbody')


  frm.addEventListener('submit',function(e){
    e.preventDefault();
    if(!nameEl.value.trim() ||!ageEl.value.trim()||!cityEl.value.trim() ){
        alert("Please Enter Your Data")
        return
      }
      const newUser={
          name:nameEl.value,
          age:ageEl.value,
          city:cityEl.value
      }
    if(idEl.value){
      set(ref(database,`users/${idEl.value}`),newUser)
      clearData()
      return
      
    }
    push(userListById,newUser)
    clearData()
    
  })
   onValue(userListById,function(snapshot){
    if(snapshot.exists()){
      console.log('yes')
      console.log(snapshot.val())
      let userArray=Object.entries(snapshot.val())
      console.log(userArray)
      tbEl.innerHTML=''
      for(let i=0;i<userArray.length;i++){
        const currentUser=userArray[i]
        const userId=currentUser[0]
        const userData=currentUser[1]
        console.log(userData)
        tbEl.innerHTML+=
 `            <tr>
                <td>${i+1}</td>
                <td>${userData.name}</td>
                <td>${userData.age}</td>
                <td>${userData.city}</td>
                <td><button class="update" id="update" data-id=${userId} >Update</button></td>
                <td><button class="delete" id="delete" data-id=${userId} >Delete</button></td>
              </tr>
        `
      }
    }
    else{
      tbEl.innerHTML=
 `            <tr>
                <td colspan="6"> No Data Found</td>
              </tr>
        `
    }
  })

  function clearData(){
    nameEl.value=''
    ageEl.value=''
    cityEl.value=''
    idEl.value=''

  }

  document.addEventListener('click',function(e){
    
    if(e.target.classList.contains('update')){
      const id=e.target.dataset.id
      
      const user=e.target.closest('tr').children
  
      nameEl.value=user[1].textContent
       ageEl.value=user[2].textContent
      cityEl.value=user[3].textContent
      idEl.value=id
      
    }
    else if(e.target.classList.contains('delete')){
      if(confirm("You want to delete ")){

        const id=e.target.dataset.id
        console.log(id)
        remove(ref(database,`users/${id}`))
      }
    }
  })