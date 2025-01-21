//top level code : code that is outside the callback function , is executed once we start the program
//in each , module there is an object called module, and in that object there is a property called exports
module.exports= (temp, product) => {
  //product is the ojb that is passed down there as el
  // console.log(product);

  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); //using regular expression and g to make it global,
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

