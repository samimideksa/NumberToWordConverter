function converter(){
	var units,tens,scales;
    //Get the language selected from the  user.
	var lang = document.getElementById("option").value;
	var num = document.getElementById("enum").value;
    //use arrays based on user selection.
	if(lang == "am"){
        /* Array of units as words */
		units = ['', 'አንድ', 'ሁለት', 'ሶስት', 'አራት', 'አምስት', 'ስድስት', 'ሰባት', 'ስምንት', 'ዘጠኝ', 'አስር', 'አስራአንድ', 'አስራሁለት', 'አስራሶስት', 'አስራአራት', 'አስራአምስት', 'አስራስድስት', 'አስራሰባት', 'አስራስምንት', 'አስራዘጥኝ'];
		/* Array of tens as words */
        tens = ['', '', 'ሃያ', 'ሰላሳ', 'አርባ', 'ሃምሳ', 'ስልሳ', 'ሰባ', 'ሰማንያ', 'ዘጠና'];
		/* Array of scales as words */
        scales = ['', 'ሺህ', 'ሚሊዮን', 'ቢሊዮን'];
	}else{
		 /* Array of units as words */
    	units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    	/* Array of tens as words */
    	tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    	/* Array of scales as words */
    	scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];
    }
    //caught any errors that may occur in the function numberToWord
	try {
    	document.getElementById("result").innerHTML = numberToWord(units,tens,scales,num);
	}
	catch(err) {
 		document.getElementById("result").innerHTML = err.message;
	}
}
function numberToWord(units,tens,scales,n) {
    var string = n.toString(),start, end, chunks, chunksLen, chunk, ints, i, word, words;
    /* Is number zero? */
    if (parseInt(string) === 0) {
        return 'zero';
    }
    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
        end = start;
        chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }
    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
        return '';
    }
    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {
        chunk = parseInt(chunks[i]);
        if (chunk) {
            /* Split chunk into array of individual integers */
            ints = chunks[i].split('').reverse().map(parseFloat);
            /* If tens integer is 1, i.e. 10, then add 10 to units integer */
            if (ints[1] === 1) {
                ints[0] += 10;
            }
            /* Add scale word if chunk is not zero and array item exists */
            if ((word = scales[i])) {
                words.push(word);
            }
            /* Add unit word if array item exists */
            if ((word = units[ints[0]])) {
                words.push(word);
            }
            /* Add tens word if array item exists */
            if ((word = tens[ints[1]])) {
                words.push(word);
            }
            /* Add 'and' string after units or tens integer if: */
            if (ints[0] || ints[1]) {
                /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                if (ints[2] || !i && chunksLen) {
                    words.push('');
                }
            }
            /* Add hundreds word if array item exists */
            if ((word = units[ints[2]])) {
                words.push(word + ' መቶ');
            }
        }
    }
    //finally return the text by reversing the strings joined.
    return words.reverse().join(' ');
}