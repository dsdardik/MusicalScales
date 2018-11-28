class Note {
	
	constructor(name, chordDegree, scaleDegree){
		this.name = name;
		this.chordDegree = chordDegree;
		this.scaleDegree = scaleDegree;
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
	
	hasNote(letter){ // returns Note object if true, else returns null
		for(var i = 0; i < this.scale.length; i++){
			if(this.scale[i] == letter){ // might change this to an object
				return this.scale[i];
			}
		}
	}
	
	toString(){
		return this.scale.toString();
	}
}

class Guitar {
	
	constructor(scale, tune){
		this.scale = scale;
		this.tune = tune;
		this.board = [];
	}
	
	numStrings(){
		return this.tune.length;
	}
}

class ScaleType { // Ex: var scaleType = new ScaleType; scaleType.generateScale(letter, type, sharps);
	
	constructor(){
		
		this.letters = {
			sharps: ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'],
			flats:  ['A','Bb','B','C','Db','D','Eb','E','F','Gb','G','Ab']
		};
		this.scale = {
			major: { sequence : [2,2,1,2,2,2,1], chordDegree : ['maj','min','min','maj','dom','min','dim'] },
			minor: { sequence : [2,1,2,2,1,2,2], chordDegree : ['min','dim','maj','min','min','maj','dom'] }
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
		
		var i = 0;
		while(letters[i] != letter && i < letters.length){ // find the starting letter's index in the array
			i++;
		}
		var letterIndex = i; // index for array with all letters
		var scaleIndex  = i; // index for array with notes from scale only
		
		var note;// = new Note(letter, chordDegree[0], this.getScaleDegree(0));
		//scale.scale[0] = note;
		
		
		for(i = 0; i < seq.length; i++){
			
			//note = new Note(letters[scaleIndex], chordDegree[i], this.getScaleDegree(i)); // consider making note generator method;
			note = new Note(letters[scaleIndex], 'test', 'test'); // consider making note generator method;
			scaleIndex += seq[i];
			if(scaleIndex >= letters.length){
				scaleIndex -= letters.length;
			}
			scale.scale[i] = note;
		}
		return scale;
	}
	
	generateString(startLetter, scale, stringLen = null){
		var letters = scale.letters;
		if(stringLen == null){
			stringLen = letters.length;
		}
		var string = [];
		var note;
		var i = 0;
		while(letters[i] != startLetter && i < letters.length){ // find the starting letter's index in the array
			i++;
		}
		
		for(var i = 0; i < letters.length; i++){
			//note = new Note(letters[i], scale.getDegree(), scale.get...);
			if(scale.hasNote(letters[i])){
				note = new Note(letters[i], 'Test', 'Test');
			}else{
				note = new Note(letters[i], null, null);
			}
			string[]
		}
	}
	
	generateFretboard(scale, tune){
		var guitar = new Guitar(scale, this.tuning[tune])
		//var scale = new Scale(letter, type)
		//var seq = this.scale[type].sequence;
		//var chordDegree = this.scale[type].chordDegree;
		var letters = this.letters[keySignature];
		var letterIndex;
		
		var i = 0;
		for(i = 0; i < tune.length; i++){
			console.log(tune[i]);
		}
		
		/*
		// letter = first letter of curr guitar string
		while(letters[i] != letter && i < letters.length){ // find the letter's index in the array
			i++;
		}
		letterIndex = i;
		var note = new Note(letter, chordDegree[0], this.getScaleDegree(0));
		scale.scale[0] = note;
		
		for(i = 0; i < letters.length; i++){
			letter = letters[letterIndex];
			note = scale.hasNote(letter);
			if(!note){ // letter is in scale
				note = new Note(letters[letterIndex], null, null);
			}
			scale.scale[i] = note
			letterIndex ++;
			if(letterIndex = letters.length){
				letterIndex = 0;
			}
		}
				
				*/
		return guitar;
	}
	
	getScaleDegree(index){ // move to Note class
		var degree = "";
		switch(index){
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
		return degree;
	}
}