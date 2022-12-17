module.exports = function randomString() {
            //define a variable consisting alphabets in small and capital letter
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var number = Math.floor(Math.random()* 1000000)        
            //specify the length for the new string
	var lenString = 2;
	var string = '';

            //loop to select a new character in each iteration
	for (var i=0; i<lenString; i++) {
		var rnum = Math.floor(Math.random() * characters.length);
		string += characters.substring(rnum, rnum+1);
	}
    var randomstring = `${number}` +  string 

             //display the generated string 
	return randomstring;
}