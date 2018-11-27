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
	
	constructor(letter, type){
		this.name = letter + type;
		this.letter = letter;
		this.type = type;
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
	
	generateScale(letter, type, keySignature, includeAllNotes=false){
		var scale = new Scale(letter, type) // eventually change to an array of scales if multiple provided
		var seq = this.scale[type].sequence;
		var chordDegree = this.scale[type].chordDegree;
		var letters = this.letters[keySignature];
		var scaleLength;
		
		var i = 0;
		while(letters[i] != letter && i < letters.length){ // find the starting letter's index in the array
			i++;
		}
		var letterIndex = i;
		var scaleIndex  = i;
		
		var note = new Note(letter, chordDegree[0], this.getScaleDegree(0));
		scale.scale[0] = note;
		
		if(includeAllNotes){
			scaleLength = letters.length;
		}else{
			scaleLength = seq.length;
		}
		
		for(i = 0; i < scaleLength; i++){
			
			if(includeAllNotes && i != scaleIndex){
				note = new Note(letters[letterIndex], null, null);
				letterIndex ++;
				if(letterIndex == letters.length){
					letterIndex = 0;
				}
			}else{
				console.log('Test: ' + scaleIndex);
				note = new Note(letters[scaleIndex], chordDegree[i], this.getScaleDegree(i)); // consider making note generator method;
				scaleIndex += seq[i];
				if(scaleIndex == letters.length){
					scaleIndex = 0;
				}
			}
			scale.scale[i] = note;
		}
		return scale;
	}
	
	generateFretboard(scale, tune){
		var guitar = new Guitar(scale, this.tuning[tune])
		//var scale = new Scale(letter, type)
		//var seq = this.scale[type].sequence;
		//var chordDegree = this.scale[type].chordDegree;
		var letters = this.letters[keySignature];
		var letterIndex;
		
		// letter = first letter of curr guitar string
		var i = 0;
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
				
		return guitar;
	}
	
	getScaleDegree(index){ // consider turning this into generator method for Note objects
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