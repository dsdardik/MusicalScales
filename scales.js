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
	
	toString(){
		return this.scale.toString();
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
		
		//return this;
	}
	
	generateScale(letter, type, keySignature){
		var scale = new Scale(letter, type)
		var seq = this.scale[type].sequence;
		var chordDegree = this.scale[type].chordDegree;
		var letters = this.letters[keySignature];
		var letterIndex;
		
		var i = 0;
		while(letters[i] != letter && i < letters.length){
			i++;
		}
		letterIndex = i;
		var note = new Note(letter,chordDegree[0],this.getScaleDegree(0));
		scale.scale[0] = note;
		
		for(i = 0; i < seq.length; i++){
			scale.scale[i] = new Note(letters[letterIndex],chordDegree[i],this.getScaleDegree(i));
			letterIndex += seq[i];
			if(letterIndex > 11){
				letterIndex -= 12;
			}
		}
				
		return scale;
	}
	
	getScaleDegree(index){
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