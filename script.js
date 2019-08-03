let addProductLink = document.getElementById('aAddProduct');
let addProduct = document.getElementById('divAddProduct')
let addProductDetails = document.getElementById('divProductDetails');
let displayProduct = document.getElementById('divDisplayProduct');
let productId =1;
let products=[];


addProductLink.addEventListener("click", function(){

    createAddProductCart({},false);

});

// To insert a blank
insertBlankLine = (targetObject, linesToBeInserted) =>{

    let br;
    for(i =0; i<linesToBeInserted; i++)
    {
      br = document.createElement("br");
      targetObject.appendChild(br);
    }   
}

insertLabel = (targetElement, labelTextContent) =>{

    let label;    
    label  =  document.createElement('label');
    labelText =  document.createTextNode(labelTextContent);    
    label.appendChild(labelText);
    targetElement.appendChild(label);
}


// Used to create a cart through which products can be added ..diplayForm
createAddProductCart =(product,isEditBool) =>{


    // hide the hide product anchor
    addProductLink.setAttribute("style", "display:none");
    
    // Adding a label
    insertLabel(addProductDetails, "Product Name:");
    // input field for product name
    let productName = document.createElement('input');
    productName.setAttribute('id', 'inputProductName');
    productName.value=product.productName?product.productName:'';
    addProductDetails.appendChild(productName);
    insertBlankLine(addProductDetails, 2);
       

    // Adding a label
    insertLabel(addProductDetails, "Product Description:");
    // textarea for product desc
    let productDescription = document.createElement('textarea');
    productDescription.setAttribute('id', 'textareaProductDesc');    
    productDescription.setAttribute('rows', '10');
    productDescription.setAttribute('cols', '20');
    productDescription.value=product.productDescription?product.productDescription:'';
    addProductDetails.appendChild(productDescription);
    insertBlankLine(addProductDetails, 2);


    // Adding a label
    insertLabel(addProductDetails, "Product Price:");    
    // input field for price
    let productPrice = document.createElement('input');
    productPrice.setAttribute('id', 'inputProductPrice');
    productPrice.value=product.productPrice?product.productPrice:'';    
    addProductDetails.appendChild(productPrice);
    insertBlankLine(addProductDetails, 2);


    // Adding a label
    insertLabel(addProductDetails, "Product Quantity:");
    // input field for quantiy
    let productQuantity = document.createElement('input');
    productQuantity.setAttribute('id', 'inputProductQuantity');  
    productQuantity.value=product.productQuantity?product.productQuantity:'';
    addProductDetails.appendChild(productQuantity);
    insertBlankLine(addProductDetails, 2);


    // Adding a Submit button
    let submitButton =  document.createElement('input');
    submitButton.setAttribute('id', 'btnSubmitButton');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Submit');
    addProductDetails.appendChild(submitButton);   

    // Adding an event Listner to Submit Button    
    submitButton.addEventListener("click", function(){



        let objProductData ={
            productId:  isEditBool? product.productId :  productId,   // here
            productName: document.getElementById('inputProductName').value,
            productDescription: document.getElementById('textareaProductDesc').value,
            productPrice: eval(document.getElementById('inputProductPrice').value),
            productQuantity: eval(document.getElementById('inputProductQuantity').value),    
        }    
   
        let inputCheckFlag=true;
        inputCheckFlag = objProductData.productName ==='' ? false:inputCheckFlag
        inputCheckFlag = objProductData.productDescription ==='' ? false:inputCheckFlag
        inputCheckFlag = objProductData.productPrice ==='' ? false:inputCheckFlag
        inputCheckFlag = objProductData.productQuantity ==='' ? false:inputCheckFlag    
        
        if(inputCheckFlag ===true)
        {
            addToDisplayProductCart(objProductData);            
        }
  
        // Remove add Product cart and again display the anchor to add product
        let myNode = document.getElementById("divProductDetails");
        while (myNode.firstChild) {
           myNode.removeChild(myNode.firstChild);
         }
         addProductLink.setAttribute("style", "display:block");       
       
         if(!isEditBool){  // increment only if the product added to the array is a new product and not a edit
           productId++; 
        }
    });  

    // Adding a cancel Button
    let cancelButton =  document.createElement('input');   
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('value', 'Cancel');
    addProductDetails.appendChild(cancelButton);


    // Adding event listner to cancel Button    
    cancelButton.addEventListener("click", function(){     
       var myNode = document.getElementById("divProductDetails");
       while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
      }

      // To add product to cart in case of cancel after edit
      if(isEditBool)
      {
        addToDisplayProductCart(product);
      }
        addProductLink.setAttribute("style", "display:block");
        displayProductCart();
    });      

}

addToDisplayProductCart = (objProductData) =>{

    let flag=false, index;
    if(products.length>0)
    {
    products.map(objproduct=>{
        if(objproduct.productName === objProductData.productName)
        {
             objproduct.productQuantity+=1;             
             flag=true;
        }        
      })
     }
    if(flag==false)
    {
        products.push(objProductData);      
    }
    displayProductCart();
}


displayProductCart = () =>{

    let productDiv,label, text;
    console.log(products)
    // insertBlankLine(displayProduct, 1);

      // Removing old cart item and rendering new ones
      while(displayProduct.firstChild)
      {
          displayProduct.removeChild(displayProduct.firstChild);
      }

      // now Rendering from the array again
    for (let i=0; i<products.length; i++)
    {
       productDiv = document.createElement('div');       
       productDiv.setAttribute('id', i+1);
       productDiv.style.border=" 2px solid black";
       displayProduct.appendChild(productDiv);

       label = document.createElement('label');
       text=document.createTextNode(products[i].productName);
       label.appendChild(text);
       productDiv.appendChild(label);
       insertBlankLine(productDiv, 1);

       label = document.createElement('label');
       text=document.createTextNode(products[i].productDescription);
       label.appendChild(text);
       productDiv.appendChild(label);
       insertBlankLine(productDiv, 1);

       label = document.createElement('label');
       text=document.createTextNode(products[i].productPrice);
       label.appendChild(text);
       productDiv.appendChild(label);
       insertBlankLine(productDiv, 1);

       label = document.createElement('label');
       text=document.createTextNode(products[i].productQuantity);
       label.appendChild(text);
       productDiv.appendChild(label);
       insertBlankLine(productDiv, 2);
     
        let btnEdit, btnDelete;

        btnEdit =  document.createElement('input');   
        btnEdit.setAttribute('type', 'button');
        btnEdit.setAttribute('value', 'Edit');
        productDiv.appendChild(btnEdit);

        //Event listner for Edit

        btnEdit.addEventListener("click", function(){
            editProductDetails(products[i]);
        })

        btnDelete =  document.createElement('input');   
        btnDelete.setAttribute('type', 'button');
        btnDelete.setAttribute('value', 'Delete');
        productDiv.appendChild(btnDelete);    
        
        // Event Listner for delete
        btnDelete.addEventListener("click", function(){
            
            deleteProducts(products[i]);
        });
    }
}

deleteProducts = (productDelete, deleteAllBool) =>{
    
    if(deleteAllBool){
       
        // all other products instead of the matched products can be deleted
        products=  products.filter(product => product != productDelete); 
    }
    else{
    products.map(product =>{
        if(product.productId === productDelete.productId)
        {
            product.productQuantity--;
        }
       })
      products=  products.filter(product => product.productQuantity >= 0); 
   }
   console.log(products);
  displayProductCart();
}

editProductDetails = (productEdit) => {
 
    //TODO: render form again
    createAddProductCart(productEdit,true);
    
    deleteProducts(productEdit, true);
}

// Function to save products to local storage
function saveProducts() {
    localStorage.setItem('productsArray',JSON.stringify(products));
    localStorage.setItem('productId', productId);
}


//TODO: Function to get products to local storage
function getProducts(){
   products = JSON.parse(localStorage.getItem('productsArray'));
   products=products==null?[]:products;

   productId=localStorage.getItem('productId');
   productId=productId==null?1:productId;

//    console.log(products);
   displayProductCart();
}
