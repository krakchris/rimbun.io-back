const http = require('http');
exports.handler = async (event, context, callback) => {
 /**
 * BEGINING OF PROTOTYPE
 **/
  String.prototype.convertToNumberOldBKP=function(){
	var NUMBERS = {
    'one':1,
	'two':2,
	'three':3,
	'four':4,
	'five':5,
	'six':6,
	'seven':7,
	'eight':8,
	'nine':9,
  'zero':0,
  'eleven':11,
	'twelve':12,
	'thirteen':13,
	'fourteen':14,
	'fifteen':15,
	'sixteen':16,
	'seventeen':17,
	'eighteen':18,
	'nineteen':19,
	'twenty': 20,
	'thirty': 30,
	'fourty':40,
	'forty':40,
	'fifty':50,
	'sixty':60,
	'seventy':70,
	'eighty':80,
    'ninety':90,
	},
	MULTIPLIERS = {
		'hundred':100,
		'thousand':1000
	}
	
	
	var numbers = this.trim().split(' ');
    var inNumbers = numbers.map((number)=>{
        if(number.toLowerCase()=='point')return '.';
        return NUMBERS[number] || number
    });
    var dotFound = false;
    var converted = inNumbers.reduce((prev,next)=>{
        if(MULTIPLIERS[next]){
            return prev*MULTIPLIERS[next];
        }
        if(next=='.') return prev+next;
        return prev+parseFloat(next);
    });
    return converted;
}
String.prototype.convertToNumber=function(cb){
	let ObjectOLogics = {
	'one':1,
	'two':2,
	'three':3,
	'four':4,
	'five':5,
	'six':6,
	'seven':7,
	'eight':8,
	'nine':9,
	'zero':0,
	'twenty': 20,
	'thirty': 30,
	'fourty':40,
	'forty':40,
	'fifty':50
	}
	let placeValue ={
		0:1,
		1:10,
		2:100,
		3:1000
	}
	let thisStringInLowerCase = this.toLowerCase();
	let arrayOfInput = thisStringInLowerCase.includes('.') ? thisStringInLowerCase.split('.') : (thisStringInLowerCase.includes('point') ? thisStringInLowerCase.split('point') : ((thisStringInLowerCase.includes('dot') ? thisStringInLowerCase.split('dot') : thisStringInLowerCase.split())) );
	var beforeDecimal;
	var afterdecimal;
	if(arrayOfInput.length == 2){
		beforeDecimal = arrayOfInput[0].split(' ');
		afterdecimal = arrayOfInput[1].split(' ');
	}else if(arrayOfInput.length == 1){
		if(thisStringInLowerCase.includes('.') || thisStringInLowerCase.includes('point') && thisStringInLowerCase.includes('dot')){
			beforeDecimal = [];
			afterdecimal = arrayOfInput[1].split(' ');
		}else{
			beforeDecimal = arrayOfInput[0].split(' ');
			afterdecimal = [];
		}
	}else{
		// cb({'error':'Invalid Quantity'});
		return false;
	}
	
	
	
	beforeDecimal=beforeDecimal.filter(e=>{
		return Number.isNaN(parseInt(e)) ? e.length > 1 : e;
	}).map((e,i)=>{
		if(!Number.isNaN(parseInt(e))){
			return parseInt(e);
		}else{
			return ObjectOLogics[e];
		}
	}).reduce((a,p)=>{
		return a+p;
	},0);
	
	
	afterdecimal=afterdecimal.filter(e=>{
		return Number.isNaN(parseInt(e)) ? e.length > 1 : e;
	}).reverse().map((e,i)=>{
		if(!Number.isNaN(parseInt(e))){
			return e*placeValue[i];
		}else{
			return ObjectOLogics[e]*placeValue[i];
		}
	}).reverse().reduce((a,p)=>{
		return a+p;
	},0);;
	
// 	cb({'success':beforeDecimal + '.' + afterdecimal});
  return (beforeDecimal + '.' + afterdecimal);
}

event.currentIntent.slots.productQuantity = event.currentIntent.slots.productQuantity.convertToNumber();

/**
 * END OF PROTOTYPE
 **/
    let response = {sessionAttributes: event.sessionAttributes,
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: JSON.stringify(event.currentIntent.slots)
        }
      }
    };
    console.log('$$$$ event->',JSON.stringify(event));
    
    if(!Number.isNaN(parseInt(event.currentIntent.slots.productQuantity))){
      let where = {
      "where":{
        "or":[
          {
            "Product%20Name":event.currentIntent.slots.productName.replace(/ /g, '%20').toLowerCase()
            
          },{
            "Alias":event.currentIntent.slots.productName.replace(/ /g, '%20').toLowerCase()
          }
        ]
      }
    }
    where = JSON.stringify(where);
    var PORT;
    var HOST = '159.89.234.66';
    if(event.bot.alias == 'StarBarProduction'){ 
      PORT = 5530;
    }else if(event.bot.alias == 'StarBarTesting'){
      PORT = 5520;
    } else if(event.bot.alias=='starBarApp'){
    	HOST='app.starbar.ai';
    	PORT=80;
    } else if(event.bot.alias=='starBarLocal'){
    	HOST='starbarlocal.loclx.io';
    	PORT=80;
    }else{
      PORT = 5510;
    }
    //inv id not found
    if(!event.requestAttributes){
      var apiResponse = await callAPI([HOST,PORT,'/api/products/findOne?filter='+where]);
    }else if(event.requestAttributes && event.requestAttributes.inventoryId && !event.requestAttributes.restaurantId){
       var apiResponse = await callAPI([HOST,PORT,'/api/products/findOneProduct?inventoryId='+event.requestAttributes.inventoryId+'&product='+event.currentIntent.slots.productName.replace(/ /g, '%20').toLowerCase()]);
    }else{
       var apiResponse = await callAPI([HOST,PORT,'/api/products/findOneProduct?restaurantId='+event.requestAttributes.restaurantId+'&product='+event.currentIntent.slots.productName.replace(/ /g, '%20').toLowerCase()]);
    }
    console.log('$$$ RESPONSE ->',apiResponse);
    if(JSON.parse(apiResponse).data){
      event.currentIntent.slots.productName = JSON.parse(apiResponse).data["Product Name"];
      response.dialogAction.message.content = JSON.stringify(event.currentIntent.slots);
    }
    else response.dialogAction.message.content = "Given product '"+event.currentIntent.slots.productName+"' is not available in your inventory";
    callback(null, response);
    }else{
      response.dialogAction.message.content = "Given product '"+event.currentIntent.slots.productName+"' is not available in your inventory";
      callback(null, response);
    }
    
    
};


	function callAPI(params) {
	    return new Promise((resolve, reject)=>{
	          var options = {
        		  method: 'GET',
        		  host: params[0],
        		  port:params[1],
        		  path: params[2],
        		  headers: {
        			'accept': 'application/json',
        		  }
        		};
				console.log('Target API: '+options.host+':'+options.port, 'Path:'+options.path);
        		var dataStr = "";
         		const req = http.request(options, function (response) {
         		  console.log('$res ->');
        		  response.on('data', (data) => {
        			dataStr += data;
        			console.log("data->",data);
        		  })
         		 response.on('end', () => {
         			resolve(dataStr);
         		 });
         		}).on('error', err =>{console.log('$ERROR ->',err.message)});
         		req.end(); 
	    });
    }