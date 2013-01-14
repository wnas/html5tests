
	var dvhPolyFill = function(){
		var config = {
			cn : {
				dataListData : 'dataListData'
			},
			fakeListArray : [],
			minChars : 1,
			helper : document.getElementById('helper')
		},

		showHelper = function() {
			document.getElementById('helper').style.display = "block";
		},
		hideHelper = function() {
			document.getElementById('helper').style.display = "none";
		},

		init = function(){
			detectDataList();
		},
		detectDataList = function(){
			var nativedatalist = !!('list' in document.createElement('input')) && 
			!!(document.createElement('datalist') && window.HTMLDataListElement);

			// check for datalist support
			if (!nativedatalist) {
				// if there is none, fake it.
				createHelper();
				buildFakeDataList();
			}
		},
		buildFakeDataList = function(){
			// get the datalists
			var datalist = document.getElementsByTagName('datalist');
			// loop over 'm
			for (var i=0;i < datalist.length; i++){
				// get the id
				var item = datalist[i].id,
					// create a list for the options 
					// no need to build a list, just keep in the js 
					// maybe list is handy to create dropdown...
					list = document.createElement('ul'),
					// get the options
					options = datalist[i].getElementsByTagName('option');
					console.log(item+i);
				// create an id for the list of options
				listId = item+'-'+i;
				// and give it a classname so we can apply default styling to it.
				list.className = config.cn.dataListData;
				// give it it's id
				list.id = listId;
				// document fragment
				// create the list in the dom.
				document.getElementById(item).appendChild(list);
				var fakeList = document.getElementById(listId);
				// loop over the options
				for(var j=0, len = options.length;j<len;j++){
					// get the value and put it into the txt var.
					var txt = document.createTextNode(options[j].value),
						// create a li element.
						li = document.createElement('li');
					// append the li to the list and set it's text
					fakeList.appendChild(li).appendChild(txt);
					config.fakeListArray.push(txt);
				}
				// get the input element which talks to the datalist.
				console.log(config.fakeListArray);
				getRealDataList(item);
			}
		},
		getRealDataList = function(item){
			// get all the inputs
			var allInputs = document.getElementsByTagName('input');
			// loop over 'm
			for(var i = 0; i< allInputs.length; i++){
				// if we have a list attribute.
				if( allInputs[i].getAttribute('list') ){
					// start tracking.
					trackRealDataList(allInputs[i]);
				}
			}
		},
		trackRealDataList = function(inp){
			inp.onkeyup = function(){
				var list = "";
				var value = this.value;
				if(value.length >= config.minChars) {
					var len = config.fakeListArray.length;
					for(var i=0; i<len; i++) {
						var wrd = config.fakeListArray[i].textContent;
						if(value.toLowerCase() == wrd.substr(0, value.lenght).toLowerCase()) {
							list += '<li><a href="#">' + wrd + '</a></li>';
						}
					}
					if(list != "") {
						if(this.helperContent != list) {
							this.helperContent = list;
							document.getElementById('helper').innerHTML = this.helperContent;
						}
						showHelper();
					} else {
						hideHelper();
					}
					var x = trackRealDataList();
					var loopDiLoop = setTimeout(x, 200);
				}
			}
			inp.onblur = function(){
				var hh = hideHelper();
				clearTimeout(trackRealDataList);
				setTimeout(hh, 600);
				// console.log(config.fakeListArray);
			}
		},
		createHelper = function() {
			var helper = document.createElement("ul");
			helper.setAttribute("id", "helper");
			helper.innerHTML = "";
			document.body.appendChild(helper);
			hideHelper();
		};
		return {
			init:init
		}
	}();

	dvhPolyFill.init();