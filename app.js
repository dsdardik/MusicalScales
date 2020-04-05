var scaleFactory = new ScaleFactory();
	var vue  = new Vue({
		el: '#app',
		data: {
			message: 'Musical Scales',
			htmlContent: '<p>Scale:</p><select><option value="">Select</option></select>',
			letterList: scaleFactory.letters.sharps,
			scaleList: Object.keys(scaleFactory.scale),
			keySignatureList: Object.keys(scaleFactory.letters)
		},
		methods: {
			titleMessage : function(){
				return this.message;
			}
		},
		components: {
			'dropdown' : {
				props: ['value'],
				template:  `<div>
								<p>Scale:</p>
								<select>
									<option value="">Select</option>
									<option :value="value">{{value}}</option>
								</select>
							</div>`
			},
			'my-comp' : {
				data: function(){
					return {
						count: 0
					}
				},
				template: `<button v-on:click="count++">You clicked me {{ count }} times.</button>`
			}
		}
	});
	

	$(function(){
		$.expr[':'].textEquals = function(a, i, m) {  
			var textToFind = m[3].replace(/[-[\]{}(')*+?.[,\\^$|#\s]/g, '\\$&'); // escape special character for regex 
			return $(a).text().match("^" + textToFind + "$");
		}; 
		
		setScale();
		$("#letter").on('change', setScale);
		$("#scaleType").on('change', setScale);
		$("#keySignature").on('change', setScale);
		//$(".root .note").prop('style', 'background-color: black !important;')

		$(".settings i").on('click', function(){
			$(this).closest(".settings").find(".settingsModal").toggle();
		})
	});
	
	
	function setScale(){
		
		var letter = $("#letter").val();
		var scaleTypeVal = $("#scaleType").val();
		var keySignatureVal = $("#keySignature").val();
		console.log(letter + " " + scaleTypeVal + ", " + keySignatureVal);
		var scale = scaleFactory.generateScale(letter, scaleTypeVal, keySignatureVal);
							
		var leftLength = 10;
		$("#staffScale").html("");
		$("#staff .note").remove();
		for(var i=0; i< scale.scale.length; i++){
			var trebleNote = $("<img>",{
								class: "staffNote",
								src: "images/WholeNote.png"
							});
			leftLength += 30;
			trebleNote.css("padding-top","20");
			trebleNote.css("padding-left",leftLength+"px");
			$("#trebleClef").prepend(trebleNote);
			var bassNote = trebleNote.clone();
			bassNote.css("padding-top","11");
			//bassNote.css("padding-left",leftLength+"px");
			$("#bassClef").prepend(bassNote);
			var note = $("<div class='guitarNote inScale "+scale.scale[i].scaleDegree+"'><div class='note'>"+scale.scale[i]+"</div></div>");
			//var note = $("<span>"+scale.scale[i]+"</span>");
			//note.css("padding-left","30px");
			$("#staffScale").append(note);
		}
							
		var guitar = scaleFactory.generateFretboard(scale, 'standard');
		var board = guitar.board;
		
		var html = "<br /><br />";
		html += "<table border='1'>";
		for(var i = board.length - 1; i >= 0 ; i--){
			html += "<tr>";
			str = board[i];
			for(var j = 0; j < str.length; j++){
				var note = str[j];
				var attr = "";
				if(scale.hasNote(note.name)){
					attr = "class='inScale " + note.scaleDegree + "'"; // add attr's too note class
				}
				html += "<td "+attr+">"+note+"</td>";
			}
			html += "</tr>";
		}
		html += "</table>";
		
		html = "<br /><br />";
		html += "<div class='fretBoard'>";
		html += "<div class='fretBoardBackground'></div>";
		for(var i = board.length - 1; i >= 0 ; i--){
			var dataName = convertToSafeNoteName(guitar.tune[i]);
			html += "<div class='guitarString "+guitar.tune[i]+"' data-note='"+dataName+"'>";
			html += "<div class='guitarStringLine' style='height:"+guitar.strings.size[i]+"px; background-image: linear-gradient(#4a4a4a , "+guitar.strings.color[i]+", #4a4a4a);'></div>";
			str = board[i];
			for(var j = 0; j < str.length; j++){
				if (i == board.length - 1){
					html += "<div class='guitarFret' style='left: "+(44+j*38)+";'></div>";
					if (j == 3 || j == 5 || j == 7 || j == 9){
						//html += "<img src='images/fretCircleDark.png' class='fretCircle' style='left: "+(132+(j-3)*38)+";'>";
						html += "<div class='fretCircle' style='left: "+(134+(j-3)*38)+";'></div>";
					} else if (j == 12){
						html += "<div class='fretCircle' style='top: 35px; left: 477px;'></div>";
						html += "<div class='fretCircle' style='top: 86px; left: 477px;'></div>";
					}
				}
				var note = str[j];
				var classes = "guitarNote";
				if(scale.hasNote(note.name)){
					classes += " inScale " +note.scaleDegree;
				} else {
					classes += " outScale";
				}
				if (j == 0){
					classes += " stringNote";
				}
				var noteDiv = $('<div>', {
									class: classes
								});
				var attr = "class='"+ classes +"'";
				var dataName = convertToSafeNoteName(note.name);
				html += "<div "+attr+"><div class='note' data-note='"+dataName+"'>"+note.name+"</div></div>";
				//html += noteDiv.html();
			}
			html += "</div>";
		}
		html += "</div>";
		$("#instrument1").html(html);
		
		var note;
		var scaleDegrees = ['root', 'fifth'] // maybe change back to index
		var html = "<br /><div><table border='1'><tr>";
		for(var i = 0; i < scaleDegrees.length; i++){
			note = scale.getNoteByDegree(scaleDegrees[i]);
			//console.log(scale.scale); // I don't like these names
			attr = "class='inScale " + note.scaleDegree + "'"; // add attr's too note class
			html += "<td "+attr+">"+note+": "+note.scaleDegree+"</td>";
		}
		html += "</tr></table></div>";
		//$("#legend").html(html);
		
		/*
		$(".inScale span").css('color','white');
		$(".inScale span").css('background-color','blue');
		$(".5th span").css('background-color','#aa00aa');
		$(".root span").css('background-color','red');
		*/
		
		setScaleProperties();
	}
	
	function convertToSafeNoteName(name){
		if (name.length == 2) {
			if (name.includes("#")){
				name = name.substr(0,1) + "s";
			} else {
				name = name.substr(0,1) + "f";
			}
		}
		return name;
	}
		
	function setScaleProperties(){

		$('.guitarNote .note').on('mouseover', function(){
			var letter = $(this).data('note');
			$('.guitarNote .note[data-note="'+letter+'"]').addClass('hovered')
			$('.guitarString[data-note="'+letter+'"]').find('.guitarStringLine').addClass('hovered')
		});
		$('.guitarNote .note').on('mouseleave', function(){
			var letter = $(this).data('note');
			$('.guitarNote .note[data-note="'+letter+'"]').removeClass('hovered')
			$('.guitarString[data-note="'+letter+'"]').find('.guitarStringLine').removeClass('hovered')
		});
		
		$("input[name='hideOptions']").on('click', function(){
			var notes = $('#instrument1 .guitarNote:not(.stringNote) .note');
			if(this.value == 'none'){
				notes.show();
			} else if (this.value == 'all') {
				notes.hide();
			} else {
				notes.show();
				notes = $('#instrument1 .guitarNote.outScale:not(.stringNote) .note');
				notes.hide();
			}
		});
		$("#hideOutScale").click();
	}		
		
		
		
		
		
		
		
		
		
		