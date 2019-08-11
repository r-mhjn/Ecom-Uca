const productPanel =  document.getElementById('productsPanel');
const divLoginLogout =  document.getElementById('divLoginLogout');
let productsArray=[];
let cartArray=[];
let users=[];


//TODO: insert blank line
insertBlankLine = (targetObject, linesToBeInserted) =>{

    let br;
    for(i =0; i<linesToBeInserted; i++)
    {
      br = document.createElement("br");
      targetObject.appendChild(br);
    }   
}

// TODO: display user login/logout

displayLoginLogout = () =>{
    
  let userId = fetchLoggedInUser();
  getUsers();
  let userName;
  if(userId==null)
  {
      let login = document.createElement('a');
      login.href = "./Login.html";
      login.innerHTML="Login";
      divLoginLogout.appendChild(login);
      
      let register = document.createElement('a');
      register.href = "./Register.html";
      register.innerHTML="Register";
      divLoginLogout.appendChild(register);

  }else{
      console.log(users.length);
      for (let i=0; i<users.length; i++)
      {
        // console.log(users[i].name);
        console.log(users[i].uid+" "+userId);
           if(users[i].uid==userId)
           {
               userName = users[i].name;
               console.log(users[i].name);
               break;              
           }
      }
      let label = document.createElement('label');
      let textNode = document.createTextNode("Welcome "+userName);
      label.appendChild(textNode);
      divLoginLogout.appendChild(label);

      let logout = document.createElement('a');
      logout.href = "./Login.html";
      logout.innerHTML="Logout";
      divLoginLogout.appendChild(logout); 

      logout.addEventListener('click', ()=>{
          logoutUser();
      })
  }
}
 

//TODO: Method to log user out  (remove the userId from the local storage)
logoutUser =() =>{

    sessionStorage.removeItem('userId');
}




// TODO: A method to display all products

displayProducts = () =>{

    displayLoginLogout(); 

   for (let i=0; i<productsArray.length; i++)
   {
    productDiv = document.createElement('div');       
    productDiv.setAttribute('id', "div"+productsArray.productId);
    productDiv.style.border=" 2px solid black";
    productsPanel.appendChild(productDiv);

    label = document.createElement('label');
    text=document.createTextNode("Name: "+productsArray[i].productName);
    label.appendChild(text);
    productDiv.appendChild(label);
    insertBlankLine(productDiv, 1);

    label = document.createElement('label');
    text=document.createTextNode("Description: " +productsArray[i].productDescription);
    label.appendChild(text);
    productDiv.appendChild(label);
    insertBlankLine(productDiv, 1);

    label = document.createElement('label');
    text=document.createTextNode("Price: "+productsArray[i].productPrice);
    label.appendChild(text);
    productDiv.appendChild(label);
    insertBlankLine(productDiv, 1); 

    label = document.createElement('label');
    text=document.createTextNode("id: "+productsArray[i].productId);
    label.appendChild(text);
    productDiv.appendChild(label);
    insertBlankLine(productDiv, 1); 

    let quantityTextField  = document.createElement('textarea');   
    quantityTextField.setAttribute('id', 'textarea'+productsArray[i].productId);         
    productDiv.appendChild(quantityTextField);
    insertBlankLine(productsPanel, 1);

    let addToCartBtn = document.createElement('input');
    addToCartBtn.setAttribute('type', 'button');
    addToCartBtn.setAttribute('value', 'Add To Cart');
    productDiv.appendChild(addToCartBtn);
    insertBlankLine(productsPanel, 1);

    addToCartBtn.addEventListener('click', ()=>{ 
        // alert("Hey");     
        if(validateQuantity(productsArray[i].productId, productsArray[i].productQuantity))
        {
            let textarea = document.getElementById("textarea"+productsArray[i].productId);
            let value =  textarea.value;
            addToCart(productsArray[i].productId, eval(value));
        }
        else{
            alert("invalid input");
        }
    })
   }   
}


//TODO: Method to add to cart and save the cart to local storage

addToCart = (id, quantity) =>{
    console.log(id,quantity);
    cartItem ={
        productId:id,
        quantity:quantity,
    }

    findCartItem = cartArray.find((product)=>{
        // console.log("hey")
        return product.productId == id;
    })
    if(findCartItem==null)
    {
        cartArray.push(cartItem);
    }
    else{
        findCartItem.quantity+=quantity;
    }
    // cartArray.push(cartItem);
    
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
}



//TODO: a method to validate quantity
validateQuantity = (id, quantity) =>{
    // console.log(id);
    let textarea = document.getElementById("textarea"+id);
    let value =  textarea.value;
    // console.log(value);
    let flag=true;
    flag=value==''?false:flag;
    flag=isNaN(value)?false:value<=0?false:flag;
    // console.log(eval(value));
    flag=value>quantity?false:flag;
    // alert(flag);
    return flag
}


//TODO: Function to fetch data from local storage

function fetchData(){
    productsArray = JSON.parse(localStorage.getItem('productsArray'));
    productsArray=productsArray==null?[]:productsArray;
    console.log(productsArray); 
    cartArray = JSON.parse(localStorage.getItem('cartArray'));
    cartArray=cartArray==null?[]:cartArray;
    // console.log(productsArray);
    displayProducts();
}



fetchLoggedInUser = () =>{    
    userId=sessionStorage.getItem('userId');
    userId=userId==null?null:userId;
    return userId;
}

getUsers = () =>{
    users = JSON.parse(localStorage.getItem("users"));
    users = users == null ? [] : users;
    // console.length(users.length);
}

