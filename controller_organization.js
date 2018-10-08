var request = require('request');
var fs = require('fs');

module.exports.org_api003 = function(req, res) {
	
	var orgid=req.param('orgid_key');
	var options = {
  		url: 'http://18.136.205.13:3000/api/v1/orgs/'+ orgid,
  		method: 'GET',
	};

	request(options, function (error, response, body) {
		if(!error){
			var data=[JSON.parse(body)];
			res.render('template/api/organization',{data:data,message:"",status:0});
		}else{
			res.render('template/api/organization',{data:'',message:error,status:2});
		}
     	});
};

/* ///////////////////////// */

module.exports.org_api002 = function(req) {
	
		var content=req.param('content');
		var name=req.param('name');
		var objectType=req.param('type');
		var parent=req.param('parent');
		var orgid=req.param('id');
		var options = {
  			url: 'http://18.136.205.13:3000/api/v1/orgs',
  			method: 'POST',
			json: {
    				content: content,
    				id: orgid,
    				name: name,
    				objectType: objectType,
    				parent: parent
			}
		};
		
		request(options, function (error, response, body) {
			if(!error){
				res.render('template/api/organization',{data:'',message: name +'Thực hiện thành công !!!',status:1});
			}else{
				res.render('template/api/organization',{data:'',message:error,status:2});
			}
     		});
		
};

/* ///////////////////////// */

module.exports.org_api001_a = function(req, res) {
	
	var data =  JSON.parse(fs.readFileSync('./routes' +'/json.txt'));
	res.render('template/api/organization',{data:data,message:'',status:0});
		
};

/* ///////////////////////// */

module.exports.org_api001_b = function(req, res) {
			
		var data = JSON.parse(fs.readFileSync('./routes' +'/json.txt'));
		var options = {
  			url: 'http://18.136.205.13:3000/api/v1/orgs',
  			method: 'POST',
			json: data
		};
		
		request(options, function (error, response, body) {
			if(!error){
				res.render('template/api/organization',{data:'',message:'Thực hiện thành công !!!',status:1});
			}else{
				res.render('template/api/organization',{data:'',message:error,status:2});
			}
     		});
		
		
};

/* ///////////////////////// */

module.exports.org_api004 = function(req, res) {
	
		var content=req.param('content');
		var name=req.param('name');
		var parent=req.param('parent');
		var orgid=req.param('id');
		var options = {
  			url: 'http://18.136.205.13:3000/api/v1/orgs/'+ orgid,
  			method: 'PUT',
			json: {
    				content: content,
    				name: name,
        			parent: parent
			}
		};

		request(options, function (error, response, body) {
			if(!error){
				res.render('template/api/organization',{data:'',message:'Thực hiện thành công !!!',status:1});
			}else{
				res.render('template/api/organization',{data:'',message:orgid,status:2});
			}
     		});
		
};

