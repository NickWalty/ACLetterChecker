// Nicholas Bell - 2018

// Original Algorithm by Nintendo
// Based on tweets and a gitHub document by James Chambers (@jamchamb_) 

// A project to check your Animal Crossing Letters for quality.
// Get more presents, impress your (animal) friends!!


function checkLetter(inputString) {
	let points = 0;
	let numCaps = 0;
	let numNoCaps = 0;
	let numSpaces = 0; //See Check E
	let numChars = 0; //See Check E
	const words = inputString.split(' ') //Array that holds all words in the string.
	let slice = ''; //Holds the Three characters we want to check
	let numTrigrams = 0; //Number of trigrams contained in the string

	//Create output messages
	let msgA = '';
	let msgB = '';
	let msgC = '';
	let msgD = '';
	let msgE = '';
	let msgF = '';
	let msgG = '';
	let msgPoints = '';

	//Create trigram array to check words against.  Explained below
	const trigrams = [
		'ablaboabrabsaccachacractaddadmadvaeraffafraftagaageagoaheairaliallalmaloalralsaltalwamameamoandanganianoansanyapaappaprareargarmarrartasiaskaslateatmattaudaugautaveavoawa',
	 	'babbacbadbagbalbanbasbatbebeabecbedbeebefbegbehbelbesbetbeybicbigbikbilbirbitblableblobluboabodbonbooborbotbouboxboybrabrebribrobuiburbusbutbuyby',
	    'cakcalcamcancapcarcascatcaucencerchachechichochichucircitclaclecliclocoacofcoicolcomconcoocopcorcoscoucovcowcrecricrocrycupcurcuscut',
	    'daddaidamdandardatdaudaydeadecdeedefdegdeldemdendepdesdetdevdicdiddiedifdigdindirdisdivdodocdoedogdoldondoodoudowdozdradredridrodrudryduedurdusdut',
	    'eaceareaseatedueffeggeigeiteleelsempendeneengenjenoentequerrespeureveexaexcexeexpeye',
	    'facfaifalfamfarfasfatfeafebfedfeefelfewfiefiffigfilfinfirfisfivfixflafleflifloflyfolfooforfoufrafrefrifrofrufulfunfut',
	    'gaigamgargasgatgavgengergetgirgivglagogodgoigongoogotgovgragregroguagueguigun',
	    'habhadhaihalhanhapharhashathavheheaheihelherhihidhighilhimhirhishitholhomhonhophorhoshothouhowhumhunhurhus',
	    'i iceideifimaimmimpin incindinfinsintinviroisislitits',
	    'janjapjobjoijudjuljumjunjus',
	    'keekepkeykickilkinkitknekniknokabkadkaikakkankarkaskatkaukawkaykazkeakedkefkegkenkesketkevkibkiekifkigkikkimkinkiskitkivkockonkookoskotkoukovkowkunkyikackadkagkaikajkakkankapkarkatkayke keakedkeekemkenkesketkidkigkilkinkiskodkomkonkookorkoskotkoukovkuckumkusky kyskamkarkatkeakeckeekeikevkewkexkickigkinkokobkoikonkookorkoskotkovkowkumkbjkckctkfkffkftkhkilkkakldknknckneknlkpekpikppkrkrakrdkthkurkutkvekwn',
	    'pacpagpaipapparpaspatpaypeapenpeoperphopicpiepinpipplaplepocpoipolpoopoppospotpoupowpraprepripropubpulpuppurpusput',
	    'quaquequi',
	    'racradrairanrapratrearecredrefregrelremrepreqresretricridrigrinrisrivroarocrodrolroorosrourowrulrunrus',
	    'sadsafsaisalsamsansatsavsawsaysceschsciscoseasecseeselsensepsersetsevsexshasheshishoshusicsidsigsilsimsinsissitsixsizskiskysleslislosmasmesmismosnososoasocsofsoisolsomsonsoosorsouspaspespisposprsqustastestistostrstustysubsucsudsufsugsumsunsupsurswasweswiswusys',
	    'tabtaktaltastautaxteateeteltemtentertesthathethithothrthutictietiltimtirtittotodtogtoltomtontootoptortottoutowtratretritrotrutrytueturtvtwetwitwotyityp',
	    'unauncunduniunluntupupoususeusu',
	    'valvarvegvervievilvisvoivolvotvaivakvalvanvarvasvatvavvayveveavedveeveivelvenvervesvetvhavhevhivhovhyvidvifvilvinvirvisvitvivvokvomvonvoovorvouvrivrovma',
	    'yaryeayelyenyesyetyou',
	    'zer'
	];

	//Send an array to return.
	output = [];

	//Check A
	//See if there is any punctuation at the end of sentences.
	//If so, ensure a capital letter follows within 3 spaces.
	//10 points for every hit, -10 for every miss.
	//Punctuation at the end of the letter grants an extra 20 points

	
	const spaceExp = /[A-Z]/; //RegEx to search our slice for a capital letter.

	if(inputString.charAt(inputString.length-1) === '!' ||inputString.charAt(inputString.length-1) === ',' || inputString.charAt(inputString.length-1) === '.' ) {
		points += 20; //If the letter ends with punctuation, add 20 points
		msgA = 'Your letter ends with punctuation. That\'s a good sign! (+20)';
	} else {
		msgA = 'Your letter doesn\'t seem to end with any punctuation. ';
	}

	

	for (let i = 0; i < inputString.length; i++ ) {
		if(inputString.charAt(i) === '!' ||inputString.charAt(i) === '?' || inputString.charAt(i) === '.' ) {
			slice = inputString.substr(i+1, 3); //Hold the next three characters.
			if(slice.search(spaceExp) != -1) {
				points += 10; //We have a capital letter. Add to score.
				numCaps += 1;
			} else {
				points -=10 ; //Punish for ignorance.
				numNoCaps +=1;
			}
		}

	}

	//Send a message about your capitalization.
	if(numCaps < numNoCaps) {
		msgA = msgA + 'Looks like your capitalization in the body could use work. Remember, if you use a period, comma, or exclamation mark, your next letter should be capitalized! (' + (numCaps - numNoCaps)*10 + ')';
	} else {
		msgA = msgA + 'Your capitalization seems to be good in the body! (+' + (numCaps - numNoCaps)*10 + ')';
	}

	//Check B
	//Check each word for common trigrams listed in the "trigrams" array.
	//Score += trigram hits * 3

	for(let i = 0; i < words.length; i++) {
		if (words[i].length > 3) {
			slice = words[i].substr(0, 3).toLowerCase(); //slice the first three letters to compare.
			for (let j=0; j < trigrams.length; j++) {
				if (slice.charAt(0) === trigrams[j].charAt(0)) {
					if(trigrams[j].search(slice) != -1) {
						numTrigrams += 1;
					}
				}
			}
		}
	}
	if(numTrigrams === 0) {
		msgB = 'You didn\'t hit a single trigram.  Oh dear.';
	} else if (numTrigrams < 6) {
		msgB = "We hit " + numTrigrams + " Trigrams for " + numTrigrams*3 + " points. Not bad!";
	} else {
		msgB = "Wow! you hit " + numTrigrams + " Trigrams for " + numTrigrams*3 + " points!";
	}

	points += numTrigrams * 3;

	//Check C
	//Check the first non-space character in a letter.  
	//+20 for a capital, -10 if not.
	if(/\b[A-Z]/.test(words[0])) {
		msgC = "This letter starts with a capital letter. Off to a good start. (+20) ";
		points += 20;
	} else {
		points -= 10;
		msgC = "Oh my, this letter doesn't start with a capital letter.(-10) ";
	}

	// Check D
	// If there are more than 3 of the same letters in a row, deduct 50 points and return points
	const tripCheck = /(.)\1\1/; //Regular Expression to check if 3 characters repeat
	if(tripCheck.test(inputString)) { 
		points -= 50;
		msgD = "What?! This letter has three repeating characters in it. I think I'm going to just stop here. (-50) "
		console.log(msgD);
		console.log(points + " points.");
		msgPoints = finalPoints(points);

		output = [msgPoints,msgA,msgB,msgC,msgD,msgE,msgF,msgG]
		return output;
	 }

	//Check E
	//Check ratio of spaces to non-spaces.
	//numspaces * 100/numChars = ratio. If < 20, -20 points. If >20 + 20points
	for(let i = 0; i < inputString.length; i++) {
		if(inputString.charAt(i) === " ") {
			numSpaces++;
		} else {
			numChars++;
		}
	}
	if((numSpaces * 100) / numChars < 20) {
		points -=20;
		msgE = 'The ratio of blank space here is too small. (-20) ';
	} else {
		points += 20;
		msgE = 'Hey, the ratio of blank space to character here is pretty good. (+20) ';
	}

	msgE = msgE + "See, there are " + numChars + " characters in this letter and " + numSpaces + " spaces. This gives a ratio of about " + Math.floor((numSpaces * 100) / numChars) + ". " 


	//Check F
	//If letter is more than 75 character long without punctuation
	//Deduct 150 points

	if(inputString.length > 75 && !/[!?,;:.]/g.test(inputString)) {
		msgF = "There's not enough punctuation in this letter! That knocks off 150 points! ";
		points -=150;
	}

	//Check G
	//Checks each block of 32 chars for at least 1 space.
	// -20 points for each group that doesn't have one.
	numBlocks = Math.ceil(inputString.length/32);
	for(let i = 0; i<numBlocks; i++) {
		if(i*32 + 32 < inputString.length) {
			slice = inputString.substr(i*32, 32); //slice 32 letter blocks
		} else {
			slice = inputString.substring(i*32, inputString.length-1); //Slices only the end.
		}
		
		if(slice.search(" ") === -1 && slice.length > 31) { //only evaluate full blocks
			msgG = "There's a whole block of letters with no spaces... That doesn\'t make any sense. (-20) ";
			points -=20;
		}
	}

	//Output a message depending on how many points we got.
	msgPoints = finalPoints(points);

	output = [msgPoints,msgA,msgB,msgC,msgD,msgE,msgF,msgG]

	return output;
}

function finalPoints (points) {
	let msg = '';

	if(points < 0) {
		msg = 'Oh dear. This letter only scores ' + points + ' points. You might want to add a present along with this one.';
	} else if (points >= 0 && points < 50) {
		msg = 'Well, this only scores ' + points + ' points. It\'s not terrible, but it needs some work.';
	} else if (points >= 50 && points < 100) {
		msg = 'Well, this is worth ' + points + ' points. You\'re getting there!';
	} else if (points >= 100 && points < 200) {
		msg = 'Hey, this letter is worth ' + points + ' points! Your friendship level will go up three points with a letter like this!';
	} else {
		msg = 'Whoa! A letter worth ' + points + ' points! You already know how to write a good letter, it seems.';
	}

	return msg;
}

//Test Cases
// checkLetter("This is a letter to test this letter guy. Please, I hope you find this letter to be good.  Tell me how many points I'd get!!", trigrams); //103 points
// checkLetter("goooood day, idiot!you are a fart ", trigrams); //-71
// checkLetter("IThis is letter is too friggin' short.", trigrams); //-4

//Start DOM section
let sendButton = document.getElementById("send");
let letter = document.getElementById("letter");
let charCount = document.getElementById("charCount");

sendButton.addEventListener("click", sendLetter);
letter.addEventListener("keypress", keyPress);

function sendLetter() {
	//Get the info we need from the dom and the letterChecker
	const greeting = document.getElementById("greeting");
	const critique = document.getElementById("critique")
	const message = checkLetter(letter.value);

	//Create our output string
	let peteMessage = 
		message[3]+ ' ' +
		message[2]+ ' ' +
		message[1]+ ' ' +
		message[4]+ ' ' +
		message[5]+ ' ' +
		message[6]+ ' ' +
		message[7]
	;

	//Change our HTML to match
	greeting.innerHTML = message[0];
	critique.innerHTML = peteMessage;
}

function keyPress() {
	charCount.innerHTML = (letter.value.length+1) + '/162';


}


