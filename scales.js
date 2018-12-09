class Note {
	
	constructor(name, scaleIndex, chordDegree){
		this.name = name;
		this.chordDegree = chordDegree;
		
		var degree;
		switch(scaleIndex){
			case -1:
				degree = "not_inscale";
				break;
			case 0:
				degree = "root";
				break;
			case 1:
				degree = "2nd";
				break;
			case 2:
				degree = "3rd";
				break;
			case 3:
				degree = "4th";
				break;
			case 4:
				degree = "5th";
				break;
			case 5:
				degree = "6th";
				break;
			case 6:
				degree = "7th";
				break;
		}
		this.scaleDegree = degree;
	}
	
	inScale(){
		return this.chordDegree != "not_inscale";
	}
	
	toString(){
		return this.name;
	}
}

class Scale {
	
	constructor(letter, type, letters){
		this.name = letter + type;
		this.letter = letter;
		this.type = type;
		this.letters = letters;
		this.scale = [];
	}
	
	getNote(letter){ // returns Note object if in scale, else returns new Note with not_inscale attribute
		for(var i = 0; i < this.scale.length; i++){
			if(this.scale[i].toString() == letter){
				return this.scale[i];
			}
		}
		return new Note(letter, -1, null);
	}
	
	getNoteByDegree(degree){
		for(var i = 0; i < this.scale.length; i++){
			if(this.scale[i].scaleDegree == degree){
				return this.scale[i];
			}
		}
		return null;
	}
	
	hasNote(letter){
		for(var i = 0; i < this.scale.length; i++){
			if(this.scale[i].toString() == letter){
				return true;
			}
		}
		return false;
	}
	
	toString(){
		return this.scale.toString();
	}
}

class Guitar {
	
	constructor(scale, tune, board){
		this.scale = scale;
		this.tune = tune;
		this.board = board;
	}
	
	numStrings(){
		return this.tune.length;
	}
}

class ScaleFactory { // Ex: var ScaleFactory = new ScaleFactory; ScaleFactory.generateScale(letter, type, sharps);
	
	constructor(){
		
		this.letters = {
			sharps: ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'],
			flats:  ['A','Bb','B','C','Db','D','Eb','E','F','Gb','G','Ab']
		};
		this.scale = {
			major: 			  { sequence : [2,2,1,2,2,2,1], chordDegree : ['maj','min','min','maj','dom','min','dim'] },
			mixolydian:		  { sequence : [2,2,1,2,2,1,2], chordDegree : ['maj','min','min','maj','dom','min','dim'] },
			major_pentatonic: { sequence : [2,2,0,3,2,0,3], chordDegree : ['maj','min','min','maj','dom','min','dim'] },
			minor: 			  { sequence : [2,1,2,2,1,2,2], chordDegree : ['min','dim','maj','min','min','maj','dom'] },
			minor_pentatonic: { sequence : [0,3,2,2,0,3,2], chordDegree : ['min','dim','maj','min','min','maj','dom'] }
		}
		this.tuning = {
			standard: ['E','A','D','G','B','E'],
			drop_d:   ['D','A','D','G','B','E']
		}
	}
	
	generateScale(letter, type, keySignature){
		var letters = this.letters[keySignature];
		var scale = new Scale(letter, type, letters) // eventually change to an array of scales if multiple provided
		var seq = this.scale[type].sequence;
		var chordDegree = this.scale[type].chordDegree;
		var scaleLength;
		
		var i = 0; // index for array with notes from scale only
		while(letters[i] != letter && i < letters.length){ // find the starting letter's index in the array
			i++;
		}
		var seqIndex = 0;
		var seqLength = 0;
		for(var k = 0; k < seq.length; k++){
			if(seq[k] > 0) seqLength++;
		}
		
		for(var j = 0; j < seqLength; j++){

			scale.scale[j] = new Note(letters[i], seqIndex, chordDegree[seqIndex]); // consider making note generator method
			seqIndex += seq[seqIndex] == 0;
			i = ( i + seq[seqIndex] ) % letters.length; // incrementing by the sequence interval and looping back to 0
			seqIndex++;
		}
		return scale;
	}
	
	generateString(startLetter, scale){ // consider adding stringLen for longer fretboards
		var letters = scale.letters;
		var string = [];
		var i = 0;
		while(letters[i] != startLetter && i < letters.length){ // find the starting letter's index in the array
			i++;
		}
		
		for(var j = 0; j <= letters.length; j++){
			string[j] = scale.getNote(letters[i]);
			i = (i+1) % letters.length; // incrementing by one and looping back to 0
		}
		return string;
	}
	
	generateFretboard(scale, tuneName){
		var tune = this.tuning[tuneName];
		var letters = this.letters[keySignature];
		var board = [];
		
		for(var i = 0; i < tune.length; i++){
			board[i] = scaleFactory.generateString(tune[i], scale);
		}
		return new Guitar(scale, this.tuning[tune], board);
	}
	
}