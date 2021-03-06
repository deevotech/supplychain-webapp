var request = require('request');

module.exports.log_api002 = function(req, res) {
		var user=req.user.username;
		var logid=req.param('orgid_key');
		var logtype=req.param('type_search');
		var url;

	if(req.param('view_tpl')){
		var view=req.param('view_tpl');
	}else{
		var view='log';
	}
		
		if(logtype==0){
			url= 'http://18.136.205.13:3000/api/v1/logs/'+ logid;
		}else{
			url= 'http://18.136.205.13:3000/api/v1/logs?product='+logtype;
		}

		var options = {
			url: url,
			method: 'GET',
		};
		
		request(options, function (error, response, body) {
			if(!error && response.statusCode==200){
				if(logtype==0){
					var data=[JSON.parse(body)];
					res.render('template/api/'+view,{data:data,user:user,message:'',status:0});
				}else{
					var data=JSON.parse(body);
					if(Object.keys(data).length>0){
						res.render('template/api/'+view,{data:data,user:user,message:'',status:0});
					}else{
						res.render('template/api/'+view,{data:data,user:user,message:'No data found!',status:2});
					}
				}
				
			}else if(!error && response.statusCode!=200){
				res.render('template/api/'+view,{data:'',user:user,message:'No data found!',status:2});
			}else{
				res.render('template/api/'+view,{data:'',user:user,message:error,status:2});
			}
		 });
	
};


/* ///////////////////////// */

module.exports.log_api004 = function(req, res) {
	var user=req.user.username;
	var logid=req.param('orgid_key');

	if(req.params.page){
		var view=req.params.page;
	}else{
		var view="log";
	}

	var options = {
		  url: 'http://18.136.205.13:3000/api/v1/logs/',
		  method: 'GET',
	};
	
	request(options, function (error, response, body) {
		if(!error && response.statusCode==200){
			var data=JSON.parse(body);
			res.render('template/api/'+view,{data:data,user:user,message:'',status:0});
		}else if(!error && response.statusCode!=200){
			res.render('template/api/'+view,{data:'',user:user,message:'No data found!',status:2});
		}else{
			res.render('template/api/'+view,{data:'',user:user,message:error,status:2});
		}
	 });

};


/* ///////////////////////// */


module.exports.log_api001 = function(req, res) {
	var user=req.user.username;
	var objectType= req.body.objectType_item;
	var logid= req.body.id_item;
	var time= req.body.time_item;
	var cte= req.body.cte_item;
	var asset= req.body.asset_item;
	var supplychain_id= req.body.supplychain_item;
	var location= req.body.location_item;
	var product= req.body.product_item;
	var general_key=req.body.general_key;
	var general_val=req.body.general_val;

	var detail_key=req.body.detail_key;
	var detail_val=req.body.detail_val;

	if(req.body.view_tpl){
		var view=req.body.view_tpl;
	}else{
		var view='log';
	}
	
	var general = {};
	var detail= {};

	
	for (var i = 0; i <= general_key.length; i++) {
		general[general_key[i]] = general_val[i];
	};
	
	for (var i = 0; i <=  detail_key.length; i++) {
		detail[detail_key[i]] = detail_val[i];
	};
	
	general["detail"]=detail;
	var ref= [];
	
		var options = {
  			url: 'http://18.136.205.13:3000/api/v1/logs',
  			method: 'POST',
			json: {
				objectType: objectType,
				id: logid,
				time: parseInt(time),
				ref: ref,
				cte: cte,
				asset: asset,
				supplychain_id: supplychain_id,
				location: location,
				product: product,
				content: JSON.stringify(general)
				}
		};

		request(options, function (error, response, body) {
			if(!error && response.statusCode==200){
				var options = {
					url: 'http://18.136.205.13:3000/api/v1/logs/',
					method: 'GET',
			  };
			  
			  request(options, function (error, response, body) {
				  if(!error && response.statusCode==200){
					  var data=JSON.parse(body);
					  res.render('template/api/'+view,{data:data,user:user,message:"Successfully added "+ logid +" to system.",status:1});
				  }else{
					  res.render('template/api/'+view,{data:'',user:user,message:"Failed to add "+ logid + " to system.",status:2});
				  }
			   });
			}else if(!error && response.statusCode!=200){
				res.render('template/api/'+view,{data:'',user:user,message:"Failed to add "+ logid + " to system.",status:2});
			}else{
				res.render('template/api/'+view,{data:'',user:user,message:error,status:2});
			}
		 });
		
};

/* ///////////////////////// */

module.exports.log_api003 = function(req, res) {
		var user=req.user.username;
		var objectType= req.body.objectType_item;
		var logid= req.body.id_item;
		var time= req.body.time_item;
		var cte= req.body.cte_item;
		var asset= req.body.asset_item;
		var supplychain_id= req.body.supplychain_item;
		var location= req.body.location_item;
		var product= req.body.product_item;
		var general_key=req.body.general_key;
		var general_val=req.body.general_val;

		var detail_key=req.body.detail_key;
		var detail_val=req.body.detail_val;

		if(req.body.view_tpl){
			var view=req.body.view_tpl;
		}else{
			var view='log';
		}
		
		var general = {};
		var detail= {};

		
		for (var i = 0; i <= general_key.length; i++) {
			general[general_key[i]] = general_val[i];
		};
		
		for (var i = 0; i <=  detail_key.length; i++) {
			detail[detail_key[i]] = detail_val[i];
		};
		
		general["detail"]=detail;
		var ref= [];

		var options = {
  			url: 'http://18.136.205.13:3000/api/v1/logs/' + logid,
  			method: 'PUT',
			json: {
				time: parseInt(time),
				ref: ref,
				cte: cte,
				asset: asset,
				supplychain_id: supplychain_id,
				location: location,
				product: product,
				content: JSON.stringify(general)
			}
		};
		
		request(options, function (error, response, body) {
			if(!error && response.statusCode==200){
				var options = {
					url: 'http://18.136.205.13:3000/api/v1/logs/',
					method: 'GET',
			  };
			  
			  request(options, function (error, response, body) {
				  if(!error && response.statusCode==200){
					  var data=JSON.parse(body);
					  res.render('template/api/'+view,{data:data,user:user,message:"Successfully updated "+ logid +" to system.",status:1});
				  }else{
					  res.render('template/api/'+view,{data:'',user:user,message:"Failed to add "+ logid + " to system.",status:2});
				  }
			   });
			}else if(!error && response.statusCode!=200){
				res.render('template/api/'+view,{data:'',user:user,message:"Failed to add "+ logid + " to system.",status:2});
			}else{
				res.render('template/api/'+view,{data:'',user:user,message:error,status:2});
			}
		 });
};
