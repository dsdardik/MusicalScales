var scaleFactory = new ScaleFactory();
	var vue  = new Vue({
		el: '#app',
		data: {
			message: 'First Vue app',
			htmlContent: '<p>Scale:</p><select><option value="">Select</option></select>',
			letterList: scaleFactory.letters.sharps,
			scaleList: Object.keys(scaleFactory.scale),
			keySignatureList: Object.keys(scaleFactory.letters)
		},
		methods: {
			titleMessage : function(){
				return "Hello " + this.message;
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
		setScale();
		$("#letter").on('change', setScale);
		$("#scaleType").on('change', setScale);
		$("#keySignature").on('change', setScale);
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
								class: "note",
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
				var note = $("<span>"+scale.scale[i]+"</span>");
				note.css("padding-left","30px");
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
			html += "<div class=''>";
			for(var i = board.length - 1; i >= 0 ; i--){
				html += "<div class='guitarString "+guitar.tune[i]+"'>";
				html += "<div class='guitarStringLine'></div>";
				str = board[i];
				for(var j = 0; j < str.length; j++){
					var note = str[j];
					var attr = "";
					var classes = "guitarNote";
					if(scale.hasNote(note.name)){
						attr = "class='inScale " + note.scaleDegree + "'"; // add attr's too note class
						classes += " inScale " +note.scaleDegree;
					}
					var noteDiv = $('<div>', {
										class: classes
									});
					attr = "class='"+ classes +"'";
					html += "<div "+attr+"><div class='note'>"+note+"</div></div>";
					//html += noteDiv.html();
				}
				html += "</div>";
			}
			html += "</div>";
			$("#guitar").html(html);
			
			var note;
			var scaleDegrees = ['root', '5th'] // maybe change back to index
			var html = "<br /><div><table border='1'><tr>";
			for(var i = 0; i < scaleDegrees.length; i++){
				note = scale.getNoteByDegree(scaleDegrees[i]);
				//console.log(scale.scale); // I don't like these names
				attr = "class='inScale " + note.scaleDegree + "'"; // add attr's too note class
				html += "<td "+attr+">"+note+": "+note.scaleDegree+"</td>";
			}
			html += "</tr></table></div>";
			$("#legend").html(html);
			
			/*
			$(".inScale span").css('color','white');
			$(".inScale span").css('background-color','blue');
			$(".5th span").css('background-color','#aa00aa');
			$(".root span").css('background-color','red');
			*/
			
		}
		
		
		
		
		
		
		
		
		
		
		
		