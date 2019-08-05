let divCartItems = document.getElementById('divCartItems');
let checkOutBtn  =  document.getElementById('viewCartCheckoutBtn');
let continueBtn = document.getElementById('viewCartContinueBtn');
let productsArray=[];
let cartArray=[];

checkOutBtn.addEventListener('click',()=>{
    // alert("check");
    this.checkOut();
});


continueBtn.addEventListener('click',()=>{
    // alert("continue");
    this.continueMethod();
});


checkOut = () =>{

    console.log(cartArray);
    for (let i=0; i<cartArray.length; i++)
    {
        //   console.log(cartArray[i].productId);
         for (let j=0; j<productsArray.length; j++)
         {
             if(productsArray[j].productId==cartArray[i].productId)
             {
                //  console.log("hey");
                 productsArray[j].productQuantity-=cartArray[i].quantity;
                //  console.log(cartArray[i].quantity);
                //  console.log(productsArray[j].productQuantity);
             }
         }
    }

    console.log(productsArray);
    cartArray=[];
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
    localStorage.setItem('productsArray', JSON.stringify(productsArray));

}

continueMethod = () =>{

}




//TODO: insert blank line
insertBlankLine = (targetObject, linesToBeInserted) =>{

    let br;
    for(i =0; i<linesToBeInserted; i++)
    {
      br = document.createElement("br");
      targetObject.appendChild(br);
    }   
}


//TODO: displayCart

displayCart = () =>{


     // Remove add Product cart and again display the anchor to add product
     let myNode = document.getElementById("divCartItems");
     while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }


    for (let i=0; i<cartArray.length; i++)
    {

        let product = productsArray.find((product)=>{
            return product.productId == cartArray[i].productId;
        })

        productDiv = document.createElement('div');       
        productDiv.setAttribute('id', "div"+product.productId);
        productDiv.style.border=" 2px solid black";
        divCartItems.appendChild(productDiv);

        label = document.createElement('label');
        text=document.createTextNode("Name: "+product.productName);
        label.appendChild(text);
        productDiv.appendChild(label);
        insertBlankLine(productDiv, 1);

        label = document.createElement('label');
        text=document.createTextNode("Price: "+product.productPrice);
        label.appendChild(text);
        productDiv.appendChild(label);
        insertBlankLine(productDiv, 1);

        label = document.createElement('label');
        text=document.createTextNode("Quantity: "+cartArray[i].quantity);
        label.appendChild(text);
        productDiv.appendChild(label);
        insertBlankLine(productDiv, 1);

        deleteBtn = document.createElement('input');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.setAttribute('Value', 'Delete');
        productDiv.appendChild(deleteBtn);

        deleteBtn.addEventListener('click',()=>{
            console.log(product);
            deleteProduct(product);       
        })
    }  
}

deleteProduct = (productToDelete) =>{

        // console.log(cartArray);  
        // console.log(productToDelete);        
    //     cartArray = cartArray.filter((product)=>{
    //     product.productId==productToDelete.productId;
    for (let i=0; i<cartArray.length; i++)
    {
        if(cartArray[i].productId==productToDelete.productId)
        {
            console.log(cartArray[i].productId+" "+productToDelete.productId);
            cartArray.splice(i, 1);
            break;
        }
    }
      // TODO: nothing being left in the array
    //   console.log(cartArray.length);          
      displayCart();
      localStorage.setItem('cartArray', JSON.stringify(cartArray));
}




//TODO: Function to fetch data from local storage
function fetchData(){
    productsArray = JSON.parse(localStorage.getItem('productsArray'));
    productsArray=productsArray==null?[]:productsArray;
    
    cartArray = JSON.parse(localStorage.getItem('cartArray'));
    cartArray=cartArray==null?[]:cartArray;
    console.log(productsArray);
    console.log(cartArray);
    displayCart();
 }