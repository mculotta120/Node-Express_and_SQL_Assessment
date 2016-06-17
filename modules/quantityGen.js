var quantityGen = function(min,max){
   return Math.floor(Math.random() * (max - min)) + min;
};

quantityGen ();

module.exports = quantityGen ;
