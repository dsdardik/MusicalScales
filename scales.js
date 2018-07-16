class Note {
	
	constructor(name){
		this.name = name;
	}
	
	val(){
		return this.name;
	}
	
	toString(){
		return this.name;
	}
}

class Scale {
	
	constructor(name){
		this.name = name;
		this.scale = '';
	}
	
	getName(){
		return this.name;
	}
	
	getScale(){
		return this.scale.toString();
	}
}

class ScaleType {
	
	constructor(letter, type, sharps = true){
		
		this.letters = {
			sharps: ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'],
			flats:  ['A','Bb','B','C','Db','D','Eb','E','F','Gb','G','Ab']
		};
		this.sequence = {
			major: [2,2,1,2,2,2,1],
			minor: [2,1,2,2,2,1,2]
		}
		this.chordDegree = ('maj','min','min','maj','dom','min','dim');
		
		return this.generateScale(letter, sharps, type);
	}
	
	generateScale(letter, sharps, type){
		var scale = new Scale(letter + type)
		var seq = this.sequence[type];
		var letters, i, letterIndex;
		if(sharps){
			letters = this.letters.sharps;
		}else{
			letters = this.letters.flats;
		}
		
		i = 0;
		while(letters[i] != letter && i < letters.length){
			i++;
		}
		letterIndex = i;
		var note = new Note(letter);
		scale[0] = note;
		
		for(i = 0; i < seq.length; i++){
			scale[i] = letters[letterIndex];
			letterIndex += seq[i];
			if(letterIndex > 11){
				letterIndex -= 12;
			}
		}
				
		return scale;
	}
}