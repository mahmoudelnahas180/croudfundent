
let menu= document.querySelector(".menu")
let overlay=document.querySelector('.overlay')
let sidebar= document.querySelector('.sidebar')
let logIn=document.querySelectorAll('.btn-login')
let loginOrReg=document.querySelector('.login-p-r')
let emailValue
let passwordValue
  let regpattEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g; 
  let regpattPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
  let BtnloginContinar=document.querySelector('.container-btn')
  let nameProfile=document.createElement('a')
let heroSection=document.querySelector('.hero-section')
let searchAndCards=document.querySelector('.searchAndCards')
let createCamaignEl=document.querySelector('.create-chpign')
let dropdown;
let UsersArr;
let thisUserId
let raised
  let Showdash=document.querySelector('.Admin-Dashboard')
  // cards
  let ShowCards=document.querySelector('.show-cards')


let loginInnerHtml=`<div class="overlay overlay-popup">
                
                </div>
                <div class="popup-content popup-logIn">
                        <div class="head-btn-close">
                                <h3>Login</h3>
                                <button class="close-btn pupup-btn-close" aria-label="Close popup">
                                        <i class="fa-solid fa-xmark"></i>
                                </button>
                        </div>
                        <form action="" class="form-log" novalidate>
                                <label for="email">Email</label>
                                <input type="email" placeholder="emaild1@gmail.com" id="email" class="check-email" >
                                <p class="error-email">please enter availd email</p>
                                <label for="password">password</label>
                                <input type="password" placeholder="amg123" id="password" class="check-password" > 
                                <p class="error-password">please enter availd password</p>

                                <div class="center-btn">
                                        
                                        <button type="submit" class="btn btn-primary logIn">Login</button>
                                        
                                </div>
                        </form>
                        <p>Don't have an account? <a href="#" class="btn-register">Register</a></p>
                </div>`
let registerInnnerHtml=`  <div class="popup-content Popup-register">
                        <div class="head-btn-close">
                                 <h3>Register</h3>
                                <button class="close-btn pupup-btn-close" aria-label="Close popup">
                                <i class="fa-solid fa-xmark"></i>
                               </button>
                        </div>
                        <form action="" class="form-register">
                                <label for="fullName">Full Name</label>
                                <input type="text" placeholder="ex:mahmoud Yasser" id="fullName" class='full-name' required>
                                <label for="email">Email</label>
                                <input type="email" placeholder="emaild1@gmail.com" id="email" class='checKValueEmail' required>
                                <label for="password">password</label>
                                <input type="password" placeholder="amg123" id="password" class='newPass' required> 
                                <div class="center-btn">
                                    <button class="btn btn-primary register-1">Register</button>

                              

                                </div>
                        </form>
                        <p>You Have acount <a href="#" class="go-to-login">LogIn</a></p>
                </div>`


async function Register(event) {

  let allUser=await fetch('http://localhost:3000/users')
  let Alluser=await allUser.json()
  console.log(Alluser);
  
  event.preventDefault()
    let checkEmail=document.querySelector('.checKValueEmail')
  let password=document.querySelector('.newPass')
   let FullName=document.querySelector('.full-name')

  if(event.target.closest('.check-email')){
     event.preventDefault()
    event.stopPropagation()
      checkEmail.addEventListener('blur', ChecKEmailValid)

  }
  if(event.target.closest('.newPass')){
     event.preventDefault()
    event.stopPropagation()
      password.addEventListener('blur', ChecKPasswordValid)
  }
  if(event.target.closest('.register-1')){
    event.preventDefault()
    event.stopPropagation()
    const isEmailValid = ChecKEmailValid();
    const isPasswordValid = ChecKPasswordValid();
   
    if (isEmailValid && isPasswordValid) {
  let checkEmail=document.querySelector('.checKValueEmail')
        for(user of Alluser){
          console.log(user)
           if(checkEmail.value !==user.email){
             console.log('ff')

           }


        }
    }

  }
  userCre=Alluser.some(user=>checkEmail.value ===user.email)
  console.log(userCre);
  
    if(userCre===false){
     let res=await fetch('http://localhost:3000/users',{
               method:'POST',
               headers: { "Content-Type": "application/json" },
              body:JSON.stringify({
                      
                    name: FullName.value,
                    email:checkEmail.value,
                    password:password.value,
                    role:'user',
                    isActive:false


       })
             })

    }
  
}

menu.addEventListener("click", function() {
    sidebar.style.transform = "translateX(0%)";
    overlay.style.display = "block";
});

logIn.forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        showLoginPopup();
        window.scroll({top:0,behavior:'smooth'})
      });
});
   
loginOrReg.addEventListener('click', function(event) {
    
    if (event.target.closest('.btn-register')) {
        event.preventDefault();
        showRegisterPopup();
      document.querySelector('.form-register').addEventListener('submit',Register)

    }
    
    if (event.target.closest('.go-to-login')) {
        event.preventDefault();
        showLoginPopup();
    
    }

    if (event.target.closest('.pupup-btn-close')) {
        closePopup();
    }
});

function showLoginPopup() {
    sidebar.style.transform = "translateX(100%)";
    overlay.style.display = "block";
    loginOrReg.innerHTML = loginInnerHtml;
    
  document.querySelector('.form-log').addEventListener('click',CheckFormLogIN) 
  
}

function showRegisterPopup() {
    loginOrReg.innerHTML = registerInnnerHtml;
}


function closePopup() {
    overlay.style.display = "none";
    loginOrReg.innerHTML = ``;
}
function CheckFormLogIN(event){
  event.stopPropagation()
  event.preventDefault();
  // console.log(event)
  let checkEmail=document.querySelector('.check-email')
  let password=document.querySelector('.check-password')
   let LOginBtn=document.querySelector('.logIn')
  if(event.target.closest('.check-email')){
     event.preventDefault()
    event.stopPropagation()
      checkEmail.addEventListener('blur', ChecKEmailValid)
  }
  if(event.target.closest('.check-password')){
     event.preventDefault()
    event.stopPropagation()
      password.addEventListener('blur', ChecKPasswordValid)
  }
  if(event.target.closest('.logIn')){
    event.preventDefault()
    event.stopPropagation()
    const isEmailValid = ChecKEmailValid();
    const isPasswordValid = ChecKPasswordValid();

    if (isEmailValid && isPasswordValid) {
  let checkEmail=document.querySelector('.check-email')
        logInCheckUser(event,checkEmail.value,password.value);
    } else {
    }

  }
  // let emailValue = checkEmail.value.trim();
  // let passwordValue = password.value.trim();
  
  
}
function ChecKEmailValid(event){
let errorEmail= document.querySelector('.error-email')
  let checkEmail=document.querySelector('.check-email')

// emailValue=event.target.value
  
  if ( checkEmail.value=== '' || !checkEmail.value.match(regpattEmail)) {
    InvaildStyle(errorEmail, checkEmail);
    return false
  }
  else{
      checkEmail.style.cssText = `margin-bottom: 1rem; border-color:#28a745`; 
         errorEmail.style.display = "none";
         return true
  } 
      
}
function ChecKPasswordValid(event){
let checkPassword=document.querySelector('.check-password')
let errorpassowrd= document.querySelector('.error-password')
//  passwordValue= event.target.value
  
  if ( checkPassword.value === '' || ! checkPassword.value.match(regpattPassword)) {
    InvaildStyle(errorpassowrd, checkPassword);
    return false
  } 
  else{
       vaildStyle(errorpassowrd, checkPassword);

        return true
  }
      
}
 async function logInCheckUser(event,userEmail,password){
let checkPassword=document.querySelector('.check-password')
let errorpassowrd= document.querySelector('.error-password')
  try {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
             console.log(data)
        UsersArr=data
     data.forEach(user=>{

      if(user.email===userEmail&&user.password===password &&user.role==='admin'&&user.isActive===true){
                isRoleAdminAndUser(user.name,user.email,user.role)

        console.log(user)
        if(user.password===password){
           vaildStyle(errorpassowrd, checkPassword);
           
        }else if(user.password !==password){
          InvaildStyle(errorpassowrd, checkPassword);

        }
      }
      else if(user.email===userEmail&&user.password===password &&user.role==='user'&&user.isActive===true){
        console.log(user)
        thisUserId=user.id
        isRoleAdminAndUser(user.name,user.email,user.role)
        if(user.password===password){
          //  vaildStyle(errorpassowrd, checkPassword);

        }else if(user.password !==password){
          InvaildStyle(errorpassowrd, checkPassword);

        }
      }
      // else if(user.email !==userEmail&&user.password !==password &&user.role !=='admin'&&user.isActive===true){
      //   // InvaildStyle(errorpassowrd, checkPassword);
      //            console.log(user)

      // }
     })

    } catch (error) {
        console.error('error', error);
    }
}

function InvaildStyle(input,check,role){
       input.style.display="block"
        check.style.borderColor=' #e74c3c'
        check.style.cssText=`  margin-bottom: 0; border-color:#e74c3c`   
}
function vaildStyle(input,check){
       check.style.cssText = `margin-bottom: 1rem; border-color:#28a745`; 
         input.style.display = "none";  
}
function isRoleAdminAndUser(userName,Email,role){
             overlay.style.display = "none";
             loginOrReg.innerHTML=''
      logIn.forEach(log=>{
        log.remove()
      })
     nameProfile.classList.add('btn','btn-primary','Use-Name')
     nameProfile.textContent=userName
      BtnloginContinar.appendChild(nameProfile)
   if(role==='admin'){
          document.querySelector('.Use-Name').addEventListener('click',function(event){
            event.preventDefault()
          let neWDrobDown=document.createElement('div')
        nameProfile.insertAdjacentElement('afterend',neWDrobDown)
           document.querySelector('.dropdown').innerHTML=`      
                                <div class="dropdown-content active">
                                 <div class="user-details">
                                           <h3 class="show-name-of-user">${userName}</h3>
                                           <p class="email-show">${Email}</p>
                                 </div>
                                  <div class="user-link">
                                        <a href="#" class="Show-profile-User">My Profile </a>
                                        <a href="" type='button' class="admin-dash">Admin Dashboard</a> 
                                 </div>
                                     <div class="log-out-p">
                                        <a href="#" class="log-out">LogOut</a>
                                    </div>`
               event.stopPropagation()
               event.preventDefault()
              dropdown = document.querySelector('.dropdown');

                 dropdown.classList.toggle('active');

                if (dropdown.classList.contains('active')) {
                dropdown.style.display = 'block';
                    document.querySelector('.admin-dash').addEventListener('click',adminDashBoard)

                } else {
                dropdown.style.display = 'none';
                }
       
           

})
   }
   if(role==='user'){

                 
                LoadAllCampaignsIfUser()

          document.querySelector('.Use-Name').addEventListener('click',function(event){
          let neWDrobDown=document.createElement('div')
        nameProfile.insertAdjacentElement('afterend',neWDrobDown)
           document.querySelector('.dropdown').innerHTML=`      
                                <div class="dropdown-content active">
                                 <div class="user-details">
                                           <h3 class="show-name-of-user">${userName}</h3>
                                           <p class="email-show">${Email}</p>
                                 </div>
                                  <div class="user-link">
                                        <a href="#" class="Show-profile-User">My Profile </a>
                                        <a href="#" class=create-chapign>Create Campaign</a>
                                 </div>
                                     <div class="log-out-p">
                                        <a href="#" class="log-out">LogOut</a>
                                    </div>`
               
                event.stopPropagation()
               event.preventDefault()
               document.querySelector('.create-chapign').addEventListener('click',createCamaign)
             let dropdown = document.querySelector('.dropdown');

                 dropdown.classList.toggle('active');

                if (dropdown.classList.contains('active')) {
                dropdown.style.display = 'block';
                } else {
                dropdown.style.display = 'none';
                }
       
           

})
   }
  
   

}
function adminDashBoard(e){
  e.preventDefault()
  e.stopPropagation()
                  dropdown.style.display = 'none';

   Showdash.style.cssText=`  background-color: rgba(128, 128, 128, 0.201);
`
  heroSection.style.display='none'
  searchAndCards.style.display='none'
  Showdash.innerHTML=`                           <h3 >Admin Dashboard</h3>
                         <div class="header">
                                <nav>
                                     <ul>
                                        <li><a href="#" class="user-info active" '>Users</a></li>
                                        <li><a href="#" class="campaigns-info ">Campaigns</a></li>
                                        <li><a href="#" class="pledges-info">pledges</a></li>
                                     </ul>
                                </nav>
                                
                                
                        </div>
                        <h3>User Management</h3>
                        <div class='Show-details'></div>
                    
             `
    UserDisplayInfo()
        let UserInfo=document.querySelector('.user-info')
       let Campaigns= document.querySelector('.campaigns-info')
       let pledgesInfo= document.querySelector('.pledges-info')
       UserInfo.addEventListener('click',UserDisplayInfoEvent)
       UserInfo.addEventListener('click',function(e){
        e.preventDefault()
        e.stopPropagation()
         Campaigns.classList.remove('active')
         UserInfo.classList.add('active')
         pledgesInfo.classList.remove('active')
         
        })
        Campaigns.addEventListener('click',function(e){
          e.preventDefault()
          e.stopPropagation()
          UserInfo.classList.remove('active')
          pledgesInfo.classList.remove('active')
          Campaigns.classList.add('active')
            document.querySelector('.Show-details').innerHTML=''
         })
         Campaigns.addEventListener('click',LoadCampaigns)
        
      pledgesInfo.addEventListener('click',function(e){
        e.preventDefault()
        e.preventDefault()
          document.querySelector('.Show-details').innerHTML=''
            Campaigns.classList.remove('active')
         pledgesInfo.classList.add('active')
         UserInfo.classList.remove('active')
      })
      pledgesInfo.addEventListener('click',loadPledges)
       
 

}

async function loadPledges(e){
  e.preventDefault()
   const userPromise = fetch('http://localhost:3000/users').then(res => res.json());
  const campaignPromise = fetch('http://localhost:3000/campaigns').then(res => res.json());
  const pledge =fetch('http://localhost:3000/pledges').then(res=>res.json())
  try{
    
    document.querySelector('.Show-details').innerHTML=''
    const [allUser,allCampaign,Allpledge]=await Promise.all([userPromise, campaignPromise,pledge])
    console.log(allUser)
    console.log(allCampaign)
        let NewTable=document.createElement('table')


      let headTable=document.createElement('thead')
      let BodyTable=document.createElement('tbody')
      headTable.innerHTML=`<tr>
            <td>Id</td>
            <td>Campaign</td>
            <td>User</td>
            <td>Amount</td>
          
      
      </tr>`
       NewTable.appendChild(headTable)
       NewTable.appendChild(BodyTable)
           let count=0
            for(let row of Allpledge){
              let NewRow=document.createElement('tr')
        let creator=allUser.find(user=>user.id===row.userId)
        let Champigns=allCampaign.find(chapign=>chapign.id==row.campaignId)
        console.log(Champigns)
       NewRow.innerHTML=`
          <td>${++count}</td>
          <td>${Champigns["title"]}</td>
         
          <td>${creator['name']}</td>
           <td>${row.amount}</td>
       
         
                   
          `
    console.log(row)
    for(let key in row){
          // console.log(row[key])

    }
    BodyTable.appendChild(NewRow)
  }

   document.querySelector('.Show-details').appendChild(NewTable)

  }catch(error) {
        console.error('error', error);
    }

}
async function LoadCampaigns() {
  // e.preventDefault()
 const userPromise = fetch('http://localhost:3000/users').then(res => res.json());
  const campaignPromise = fetch('http://localhost:3000/campaigns').then(res => res.json());
  try{
    
    document.querySelector('.Show-details').innerHTML=''
    const [allUser,allCampaign]=await Promise.all([userPromise, campaignPromise])
    console.log(allUser)
    console.log(allUser)
        let NewTable=document.createElement('table')


      let headTable=document.createElement('thead')
      let BodyTable=document.createElement('tbody')
      headTable.innerHTML=`<tr>
            <td>Id</td>
            <td>Tiltl</td>
            <td>Creator</td>
            <td>Goal</td>
            <td>Status</td>
            <td>Action</td>
      
      </tr>`
       NewTable.appendChild(headTable)
       NewTable.appendChild(BodyTable)
           let count=0
            for(let row of allCampaign){
              let NewRow=document.createElement('tr')
        let creator=allUser.find(user=>user.id==row.creatorId)
       
       NewRow.innerHTML=`
          <td>${++count}</td>
          <td>${row.title}</td>
          <td>${creator['name']}</td>
          <td>${row.goal}</td>
         
           <td>${row.isApproved===true?'Approved':'Pending'}</td>
             <td class='add-btn-' data-name='${row.id+1}'>
            
              <button  type="button" class="status-approve ${row.isApproved ? 'btn-blue' : 'btn-yellow'} ${row.isApproved===true?'approved':'Pending'}"  data-id="${row.id}">
                ${row.isApproved ? 'Delete' : 'Approve'}
              </button>
          
          </td>             
          `
    console.log(row)
    for(let key in row){
          // console.log(row[key])

    }
    BodyTable.appendChild(NewRow)
  }

   document.querySelector('.Show-details').appendChild(NewTable)
   document.querySelector('.Show-details').addEventListener('click',function(e){
    e.preventDefault()
    console.log(e.target)
           if(e.target.classList.contains('approved')){
            console.log('55')
            deleteCampaign(e.target.dataset.id, e.target)
           }else if(e.target.classList.contains('Pending')){
                       ApprovedCampaign(e.target.dataset.id, e.target)

            

           }

   })
  }catch(error) {
        console.error('error', error);
    }
}
async function UserDisplayInfo(){
  let count=0
   document.querySelector('.Show-details').innerHTML=''
  console.log(UsersArr)
  try {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
             console.log(data)
      let NewTable=document.createElement('table')


      let headTable=document.createElement('thead')
      let BodyTable=document.createElement('tbody')
      headTable.innerHTML=`<tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
            <td>Get Admin Or User</td>
      
      </tr>`
       NewTable.appendChild(headTable)
       NewTable.appendChild(BodyTable)
  for(let row of data){
    let NewRow=document.createElement('tr')
       NewRow.innerHTML=`
          <td>${++count}</td>
          <td>${row.name}</td>
          <td>${row.email}</td>
          <td class='Show-role'>${row.role}</td>
          <td>
           <span class="status-badge ${row.isActive ? 'status-active' : 'status-inactive'}">
             ${row.isActive ? 'Active' : 'Banned'}
           </span>
       </td>        
        <td class='add-btn-ban' data-name='${row.id+1}'>
            ${row.role !== 'admin' ? `
              <button  type="button" class="status-btn ${row.isActive ? 'btn-danger' : 'btn-success'} ${row.isActive===true?'unban':'ban'}"  data-id="${row.id}">
                ${row.isActive ? 'ban' : 'Unban'}
              </button>
            ` : ''}
          </td> 
          <td>
             ${row.role ==='admin'||row.role==='user'&&row.isActive===true?`
              <button  type="button" class=" ${row.isActive===true && row.role ==='user'? 'user' : 'abmin'} "  data-id="${row.id}">
                ${row.role ==='user'? 'user' : 'admin'}
              </button>
            `:''}
          </td>     
          
          `
    console.log(row)
    for(let key in row){
          // console.log(row[key])

    }
    BodyTable.appendChild(NewRow)
  }
 document.querySelector('.Show-details').appendChild(NewTable)
     document.querySelector('.Show-details').addEventListener('click',e=>{
    
      if(e.target.classList.contains('status-btn')){
        e.preventDefault()
        e.stopPropagation()
         if(e.target.classList.contains('unban')){
          e.stopPropagation()
          e.preventDefault()
           ban(e.target.dataset.id, e.target);
         }
          else if(e.target.classList.contains('ban')) {
            e.preventDefault()
            e.stopPropagation()
          Unban(e.target.dataset.id, e.target);
         }
         

      }
      else if(e.target.classList.contains('user')){
          e.preventDefault()
            e.stopPropagation()
           
          PutUserToAdmin(e.target.dataset.id,e.target)
            e.preventDefault()
           e.stopPropagation()
         }
      else if(e.target.classList.contains('abmin')){
           e.preventDefault()
            e.stopPropagation()
          PutAdminToUser(e.target.dataset.id,e.target)

         }

     })
 



}  catch (error) {
        console.error('error', error);
    }
}
async function UserDisplayInfoEvent(e){
   count=0
   document.querySelector('.Show-details').innerHTML=''
  console.log(UsersArr)
  try {
      e.preventDefault()
  e.stopPropagation()
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
             console.log(data)
      let NewTable=document.createElement('table')


      let headTable=document.createElement('thead')
      let BodyTable=document.createElement('tbody')
      headTable.innerHTML=`<tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
            <td>Get Admin Or User</td>
      
      </tr>`
       NewTable.appendChild(headTable)
       NewTable.appendChild(BodyTable)
  for(let row of data){
    let NewRow=document.createElement('tr')
       NewRow.innerHTML=`
          <td>${++count}</td>
          <td>${row.name}</td>
          <td>${row.email}</td>
          <td class='Show-role'>${row.role}</td>
          <td>
           <span class="status-badge ${row.isActive ? 'status-active' : 'status-inactive'}">
             ${row.isActive ? 'Active' : 'Banned'}
           </span>
       </td>        
        <td class='add-btn-ban' data-name='${row.id+1}'>
            ${row.role !== 'admin' ? `
              <button  type="button" class="status-btn ${row.isActive ? 'btn-danger' : 'btn-success'} ${row.isActive===true?'unban':'ban'}"  data-id="${row.id}">
                ${row.isActive ? 'ban' : 'Unban'}
              </button>
            ` : ''}
          </td> 
          <td>
             ${row.role ==='admin'||row.role==='user'&&row.isActive===true?`
              <button  type="button" class=" ${row.isActive===true && row.role ==='user'? 'user' : 'abmin'} "  data-id="${row.id}">
                ${row.role ==='user'? 'user' : 'admin'}
              </button>
            `:''}
          </td>     
          
          `
    console.log(row)
    for(let key in row){
          // console.log(row[key])

    }
    BodyTable.appendChild(NewRow)
  }
 document.querySelector('.Show-details').appendChild(NewTable)
     document.querySelector('.Show-details').addEventListener('click',e=>{
            e.preventDefault()
            e.stopPropagation()

      if(e.target.classList.contains('status-btn')){
        e.preventDefault()
        e.stopPropagation()
         if(e.target.classList.contains('unban')){
           ban(e.target.dataset.id, e.target);
                  e.preventDefault()
                  e.stopPropagation()

         }
          else if(e.target.classList.contains('ban')) {
          Unban(e.target.dataset.id, e.target);
        e.preventDefault()
        e.stopPropagation()
         }
         

      }
      else if(e.target.classList.contains('user')){
             e.preventDefault()
            e.stopPropagation()
          PutUserToAdmin(e.target.dataset.id,e.target)

         }
      else if(e.target.classList.contains('abmin')){
          e.preventDefault()
          e.stopPropagation()
          PutAdminToUser(e.target.dataset.id,e.target)

         }

     })
 



}  catch (error) {
        console.error('error', error);
    }
}
async function PutUserToAdmin(id,btn){
 console.log('dd')
  try {
        const res = await fetch(`http://localhost:3000/users/${id}`,{
             method: "PATCH",
       headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: 'admin' })

        })

        const data = await res.json();

    console.log(data)
   if(data.isActive===true){
     btn.textContent = "Admin";
    btn.classList.remove("user");
    btn.classList.add("btn-success");
    btn.classList.add('admin')
    btn.closest("tr").querySelector('.Show-role').textContent='Admin'
   console.log( document.querySelector('.status-btn'));
  
        document.querySelector(`[data-id='${id}']`).remove()
   }


}catch (error) {
        console.error('error', error);
    }
}
async function PutAdminToUser(id,btn){
 console.log('dd')
  try {
        const res = await fetch(`http://localhost:3000/users/${id}`,{
             method: "PATCH",
       headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: 'user' })

        })

        const data = await res.json();

    console.log(data)
    if( data.isActive===true){
        btn.textContent = "User";
    btn.classList.remove("admin");
    btn.classList.add("btn-success");
    btn.classList.add('user')
    btn.closest("tr").querySelector('.Show-role').textContent='user'
    
    console.log( )
    document.querySelector(`[data-name='${id+1}']`).innerHTML=` ${data.role !== 'admin' ? `
              <button  type="button" class="status-btn ${data.isActive ? 'btn-danger' : 'btn-success'} ${data.isActive===true?'unban':'ban'}"  data-id="${data.id}">
                ${data.isActive ? 'ban' : 'Unban'}
              </button>
            ` : ''}`
    }
    // btn.classList.add('ban')


}catch (error) {
        console.error('error', error);
    }
}
 async function ban(id,btn){
  console.log('dd')
  try {
        const res = await fetch(`http://localhost:3000/users/${id}`,{
             method: "PATCH",
       headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive: false })

        })

        const data = await res.json();

    console.log(data)
    btn.textContent = "Unban";
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-success");
    btn.classList.remove('unban')
    btn.classList.add('ban')
       btn.closest("tr").querySelector(".status-badge").textContent = "Banned";
    btn.closest("tr").querySelector(".status-badge").classList.remove("status-active");
    btn.closest("tr").querySelector(".status-badge").classList.add("status-inactive");

}catch (error) {
        console.error('error', error);
    }
}


async function Unban(id,btn){
  console.log('dd')
  try {
        const res = await fetch(`http://localhost:3000/users/${id}`,{
             method: "PATCH",
       headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive: true })

        })

        const data = await res.json();

    console.log(data)
    btn.textContent = "ban";
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-success");
    btn.classList.add('unban')
    btn.classList.remove('ban')
       btn.closest("tr").querySelector(".status-badge").textContent = "Active";
       btn.closest("tr").querySelector(".status-badge").classList.remove("status-inactive");
    btn.closest("tr").querySelector(".status-badge").classList.add("status-active");

}catch (error) {
        console.error('error', error);
    }
}
async function deleteCampaign(id,btn) {

    try {
        const res = await fetch(`http://localhost:3000/campaigns/${id}`,{
             method: "DELETE",
     
        })
  if(res.ok){
    LoadCampaigns()
  }

   


}catch (error) {
        console.error('error', error);
    }
}
async function ApprovedCampaign(id ,btn) {
       try {
        const res = await fetch(`http://localhost:3000/campaigns/${id}`,{
             method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isApproved: true })
        })
  if(res.ok){
    LoadCampaigns()
  }

   


}catch (error) {
        console.error('error', error);
    }
  
}
console.log(ShowCards);
async function LoadAllCampaigns() {
  let SerchInput=document.querySelector('.search-iput')
  let SerchBtn=document.querySelector('.btn-search')
  let category=document.querySelector('#campaign-type')
  console.log(category.value);

  
  // e.preventDefault()
 const userPromise = fetch('http://localhost:3000/users').then(res => res.json());
  const campaignPromise = fetch('http://localhost:3000/campaigns').then(res => res.json());
  try{
    const [allUser,allCampaign]=await Promise.all([userPromise, campaignPromise])
               
            for(let row of allCampaign){
      let creator=allUser.find(user=>user.id==row.creatorId)

              if(row.isApproved===true&&creator.isActive===true){
                           let card=document.createElement('div')
                           card.classList.add('card')
          let creator=allUser.find(user=>user.id==row.creatorId)
          card.innerHTML=`
            <div class='img-container'>
                <img src="${row.image}" alt="${row.title}" >
            </div>
            <div class="card-content">
                <div class="status-header">
                    <h3>${row.title}</h3>
                    <span class='status ${row.isApproved ? 'approved' : 'pending'}'>
                        ${row.isApproved ? 'Approved' : 'Pending'}
                    </span>
                </div>
                <p class="description">${row.description}</p>
                <div class='stats'>
                    <p><span>$${row.raised}</span> Raised</p>                         
                    <p class="goal">Goal: <span>$${row.goal}</span></p>                         
                </div>
                <div> Category: ${row.category}</div>
                <div class="creator-info">
                    By: ${creator.name}
                </div>
            </div>
        `
 
    
              
   
   
    ShowCards.appendChild(card)
              }
             
             
  }
    SerchBtn.addEventListener('click',function(e){
      ShowCards.innerHTML=''
  e.preventDefault();
       if(SerchInput.value !==''&&category.value !=='All Categories'){
             ShowCards.innerHTML=''


                 let    filter=allCampaign.filter((item)=>item.title.toLowerCase().includes(SerchInput.value)&&item.category.toLowerCase().includes(category.value))
               console.log(filter);
                        for(let row of filter){
      let creator=allUser.find(user=>user.id==row.creatorId)

              if(row.isApproved===true&&creator.isActive===true){
                           let card=document.createElement('div')
                           card.classList.add('card')
          let creator=allUser.find(user=>user.id==row.creatorId)
          card.innerHTML=`
            <div class='img-container'>
                <img src="${row.image}" alt="${row.title}" >
            </div>
            <div class="card-content">
                <div class="status-header">
                    <h3>${row.title}</h3>
                    <span class='status ${row.isApproved ? 'approved' : 'pending'}'>
                        ${row.isApproved ? 'Approved' : 'Pending'}
                    </span>
                </div>
                <p class="description">${row.description}</p>
                <div class='stats'>
                    <p><span>$${row.raised}</span> Raised</p>                         
                    <p class="goal">Goal: <span>$${row.goal}</span></p>                         
                </div>
                <div> Category: ${row.category}</div>
                <div class="creator-info">
                    By: ${creator.name}
                </div>
            </div>
        `
 
    
              
   
   
    ShowCards.appendChild(card)
              }
             
             
  }
       }else{
              ShowCards.innerHTML=''

                 for(let row of allCampaign){
      let creator=allUser.find(user=>user.id==row.creatorId)

              if(row.isApproved===true&&creator.isActive===true){
                           let card=document.createElement('div')
                           card.classList.add('card')
          let creator=allUser.find(user=>user.id==row.creatorId)
          card.innerHTML=`
            <div class='img-container'>
                <img src="${row.image}" alt="${row.title}" >
            </div>
            <div class="card-content">
                <div class="status-header">
                    <h3>${row.title}</h3>
                    <span class='status ${row.isApproved ? 'approved' : 'pending'}'>
                        ${row.isApproved ? 'Approved' : 'Pending'}
                    </span>
                </div>
                <p class="description">${row.description}</p>
                <div class='stats'>
                    <p><span>$${row.raised}</span> Raised</p>                         
                    <p class="goal">Goal: <span>$${row.goal}</span></p>                         
                </div>
                <div> Category: ${row.category}</div>
                <div class="creator-info">
                    By: ${creator.name}
                </div>
            </div>
        `
 
    
              
   
   
    ShowCards.appendChild(card)
              }
             
             
  }
       }
               






  })

    
        



  }catch(error) {
        console.error('error', error);
    }
}
LoadAllCampaigns()


async function createCamaign(e) {
  // e.preventDefault()
  e.stopPropagation()
  heroSection.style.display='none'
  searchAndCards.style.display='none'
  createCamaignEl.innerHTML=`<h3>Create New Campaign</h3>
  
           <form action=""  class='creat-form' >
                                <label for="title">Campaign Title</label>
                                <input type="text" placeholder="" id="title" class="title" required>
                                <label for='dicibe'>Description</label>
                                <input type='text' id="dicibe" class=discription ></input>
                                <label for="goal1">Funding Goal($)</label>
                                <input type="number" placeholder="" id="goal1" class="goals" required> 
                                <label for="Category">Category</label>
                                <select name="campaign-type" id="Category" class='Category' required>
                                       
                                        <option value="" >Select Category</option>
                                        <option value="Disaster" >Disaster</option>
                                        <option value="Children" >Children</option>
                                        <option value="Food Crisis" >Food Crisis</option>
                                        <option value="Education" >Education</option>
                                        <option value="Homeless" >Homeless</option>
                                </select>
                               <label for="load-img">Load Image</label>
                                <input type="file" reqired id='load-img' class='load-image'>
                                <div class="center-btn">
                                        
                                        <button type="submit" class="btn btn-primary create">Create</button>
                                        
                                </div>
                        </form>
  `
  // document.querySelector('.form-create').addEventListener('submit',function(e){
  // e.preventDefault()
  // })
  let title=document.querySelector('.title')
  let discription=document.querySelector('.discription')
  let Category=document.querySelector('.Category')
  let imageInput=document.querySelector('.load-image')
  let Goal=document.querySelector('#goal1')
  console.log(Goal);
  
  let base64String
  Goal.addEventListener('blur',function(e){
    e.preventDefault()
    console.log(e.target.value);
    

  })
  console.log(Goal.value);
  
  Category.addEventListener('change',function(e){
    console.log(Goal.value);
    console.log(Goal);
    console.log(e.target.value)
  })
  imageInput.addEventListener('change', (event) => {
     event.preventDefault()
     event.stopPropagation()
    const file = event.target.files[0];
   
    
    
    if (!file) {
        return;
    }
       const reader = new FileReader();
       reader.onload=function(e){
           base64String = e.target.result;
          
            console.log(base64String)

       }
       reader.readAsDataURL(file)

  
  
  })


 document.querySelector('.creat-form').addEventListener('submit',async function createCamaign (event) {
    event.preventDefault()
  event.stopPropagation()
  
  try{
   console.log('dd')
            console.log(Category.value);
              console.log(thisUserId)

    let res=await fetch('http://localhost:3000/campaigns',{
      method:'POST',
       headers: { "Content-Type": "application/json" },
       body:JSON.stringify({
            title:title.value,
            description:discription.value ,
            creatorId:thisUserId,

            goal:Goal.value,
             image:base64String,
             raised:0,
             category:Category.value,
             isApproved:false


       })
       
    })
    if (res.ok) {
  let data = await res.json();
  console.log("تم إنشاء الحملة:", data);
}
  
  if(title.value !==''&& discription.value !==''&&Category.value !==''&&Goal.value >=0&& Goal.value !==''&&base64String !==''){
     
    
  }

  }catch (error){
    console.log(error);
    
  }
  
})
}

async function LoadAllCampaignsIfUser() {
    ShowCards.innerHTML=''
  let SerchInput=document.querySelector('.search-iput')
  let SerchBtn=document.querySelector('.btn-search')
  let category=document.querySelector('#campaign-type')
  console.log(category.value);

  
  // e.preventDefault()
 const userPromise = fetch('http://localhost:3000/users').then(res => res.json());
  const campaignPromise = fetch('http://localhost:3000/campaigns').then(res => res.json());
  try{
    const [allUser,allCampaign]=await Promise.all([userPromise, campaignPromise])
               
            for(let row of allCampaign){
      let creator=allUser.find(user=>user.id==row.creatorId)

              if(row.isApproved===true&&creator.isActive===true){
                           let card=document.createElement('div')
                           card.classList.add('card')
          let creator=allUser.find(user=>user.id==row.creatorId)
          card.innerHTML=`
            <div class='img-container'>
                <img src="${row.image}" alt="${row.title}" >
            </div>
            <div class="card-content">
                <div class="status-header">
                    <h3>${row.title}</h3>
                    <span class='status ${row.isApproved ? 'approved' : 'pending'}'>
                        ${row.isApproved ? 'Approved' : 'Pending'}
                    </span>
                </div>
                <p class="description">${row.description}</p>
                <div class='stats'>
                    <p><span>$${row.raised}</span> Raised</p>                         
                    <p class="goal">Goal: <span>$${row.goal}</span></p>                         
                </div>
                <div> Category: ${row.category}</div>
                <div class="creator-info">

                    By: ${creator.name}
                </div>
                <button class='donete' data-id=${row.id}>donete</button>
            </div>
        `
 
    
              
   
   
    ShowCards.appendChild(card)
              }
             
             
  }
    SerchBtn.addEventListener('click',function(e){
      ShowCards.innerHTML=''
  e.preventDefault();
       if(SerchInput.value !==''&&category.value !=='All Categories'){
             ShowCards.innerHTML=''


                 let filter=allCampaign.filter((item)=>item.title.toLowerCase().includes(SerchInput.value)&&item.category.toLowerCase().includes(category.value))
               console.log(filter);
                        for(let row of filter){
      let creator=allUser.find(user=>user.id==row.creatorId)

              if(row.isApproved===true&&creator.isActive===true){
                           let card=document.createElement('div')
                           card.classList.add('card')
          let creator=allUser.find(user=>user.id==row.creatorId)
          card.innerHTML=`
            <div class='img-container'>
                <img src="${row.image}" alt="${row.title}" >
            </div>
            <div class="card-content">
                <div class="status-header">
                    <h3>${row.title}</h3>
                    <span class='status ${row.isApproved ? 'approved' : 'pending'}'>
                        ${row.isApproved ? 'Approved' : 'Pending'}
                    </span>
                </div>
                <p class="description">${row.description}</p>
                <div class='stats'>
                    <p><span>$${row.raised}</span> Raised</p>                         
                    <p class="goal">Goal: <span>$${row.goal}</span></p>                         
                </div>
                <div> Category: ${row.category}</div>
                <div class="creator-info">
                    By: ${creator.name}
                </div>
                <button class='donete' data-id=${row.id}>donete</button>

            </div>
        `
 
    
              
   
   
    ShowCards.appendChild(card)
              }
             
             
  }
       }else{
              ShowCards.innerHTML=''

                 for(let row of allCampaign){
      let creator=allUser.find(user=>user.id==row.creatorId)

              if(row.isApproved===true&&creator.isActive===true){
                           let card=document.createElement('div')
                           card.classList.add('card')
          let creator=allUser.find(user=>user.id==row.creatorId)
          card.innerHTML=`
            <div class='img-container'>
                <img src="${row.image}" alt="${row.title}" >
            </div>
            <div class="card-content">
                <div class="status-header">
                    <h3>${row.title}</h3>
                    <span class='status ${row.isApproved ? 'approved' : 'pending'}'>
                        ${row.isApproved ? 'Approved' : 'Pending'}
                    </span>
                </div>
                <p class="description">${row.description}</p>
                <div class='stats'>
                    <p><span>$${row.raised}</span> Raised</p>                         
                    <p class="goal">Goal: <span>$${row.goal}</span></p>                         
                </div>
                <div> Category: ${row.category}</div>
                <div class="creator-info">
                    By: ${creator.name}
                </div>
                <button class='donete' data-id=${row.id}>donete</button>

            </div>
        `
 
    
              
   
   
    ShowCards.appendChild(card)
              }
             
             
  }
       }
               






  })

  
let doneteBtn= document.querySelectorAll('.donete')
doneteBtn.forEach(el=>{
      // allCampaign,allUser
      // thisUserId

   
        
    console.log(el.dataset.id)
    el.addEventListener('click',async function(e){
      //    for(chapign of allCampaign){
      //  if(chapign.id===e.target.dataset.id){
      //   console.log(chapign);
        
      //  }

      // }
   let idChampidn=e.target.dataset.id
      let campignIds=allCampaign.find(chapign=>chapign.id===e.target.dataset.id)
      console.log(campignIds);
      
      loginOrReg.innerHTML=`<div class="overlay overlay-popup">
                
                </div>
                <div class="popup-content popup-logIn">
                        <div class="head-btn-close">
                                <h3>Donete</h3>
                                <button class="close-btn pupup-btn-close" aria-label="Close popup">
                                        <i class="fa-solid fa-xmark"></i>
                                </button>
                        </div>
                        <form action="" class="form-log" novalidate>
                                <label for="donet-value">Donete</label>
                                <input type="number" placeholder="" id="donet-value"  >
                                <div class="center-btn">
                                        
                                        <button type="submit" class="btn btn-primary donete-submit">Donete</button>
                                        
                                </div>
                        </form>
                </div>`
   
  // let Allpledge=await  fetch('http://localhost:3000/pledges')
  // let allpledge=await Allpledge.json()
  
  // let raise=allpledge.find(pledge=>pledge.campaignId===idChampidn)
  // console.log(raise.amount)
  let donteValue=document.getElementById('donet-value')
document.querySelector('.donete-submit').addEventListener('click', async function(event){
   loginOrReg.innerHTML=''
    event.preventDefault()

  let pledge =await fetch('http://localhost:3000/pledges',{
    method:"post",
    headers:{'content-type':'application/json'},
    body:JSON.stringify({
            userId:thisUserId,
            amount:donteValue.value ,
            campaignId:campignIds.id

           


       })
  })
    let res=await pledge.json()


  if(res.campaignId===campignIds.id){
    let oldRaisde=campignIds.raised

    console.log(Number(res.amount)+Number(oldRaisde))

    

      let chapign=await fetch(`http://localhost:3000/campaigns/${campignIds.id}`,{
    method:"PATCH",
    headers:{'content-type':'application/json'},
    body:JSON.stringify({
           raised:Number(Number(res.amount)+Number(oldRaisde))

       })
  })
  }
   
  



console.log(donteValue.value);

})

   
              })

  
})
   

  }catch(error) {
        console.error('error', error);
    }
}


// LoadAllCampaignsIfUser()


