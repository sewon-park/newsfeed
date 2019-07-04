var makeDate = function(){
  var d = new Date();
  var formattedDate = "";
  formattedDate += (d.getMonth() +1) + "_";
  formattedDate += d.getDate() + "_";
  formattedDate += de.getFullYear();

  return formattedDate;
};

module.exports = makeDate;