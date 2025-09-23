let date;

 const now = new Date();
 const month = now.getMonth()
 const monthArray = ["January","February","March","April","May","June",
 "July","August","September","October","November","December"];
 const day = now.getDate();
 const year = now.getFullYear()
 date = `${day}/${monthArray[month]}/${year}`




export default date