var myApp = {};
var url = "http://123.125.33.231:85/WRMSMobileAPI/MobileAPIController/common";
//登录人ID
//myApp.userID = "100000";//辛浩
myApp.userID = "136586";//毕博阳
//myApp.userID = "136641";//腾超
//myApp.userID = "065443";//何世菡 
//myApp.userID = "136183";//高阳
myApp.reportTempID;
//myApp.tempMissonOBJ = {};
var TempMissionID;
var TempEmployeeID;
//带myApp的是外部方法
myApp.XMLgetRequest = function(url) {

};

myApp.XMLpostRequest = function(url, body, func) {
	mui.plusReady(function() {
		var xhr = new plus.net.XMLHttpRequest();
		xhr.responseType = "json";
		xhr.timeout = 10000;
		xhr.open("POST", url);
		// 发送请求
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
		//console.log(body);
		//console.log(func.toString());
		xhr.onload = function() {

			var jsonData = mui.parseJSON(xhr.response);
			//console.log("jsonData:" + jsonData);
					//console.log('进非周报详情了!!!');
					func(jsonData);
				
			
//localStorage.thisWeek = 0;
//localStorage.thisWeekFlag = 0;
//localStorage.pWeek = 0;
//localStorage.pWeekFlag = 0;

		}
		xhr.timeout = function() {
			alert('请求超时!请确认网络状态...');
		}

	});
};
myApp.XMLpostRequestSaveReport = function(url, body, func) {
	mui.plusReady(function() {
		var xhr = new plus.net.XMLHttpRequest();
		xhr.responseType = "json";
		xhr.timeout = 10000;
		xhr.open("POST", url);
		// 发送请求
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
		console.log(body);
		//console.log(func.toString());
		xhr.onload = function() {

			var jsonData = mui.parseJSON(xhr.response);
			console.log("jsonData:" + jsonData);
					//console.log('进非周报详情了!!!');
					func(jsonData);
				
			if (xhr.responseText == "\"1\"") {
				mui.toast('请求成功!')
			} else{
				mui.toast(xhr.responseText);
			}
//localStorage.thisWeek = 0;
//localStorage.thisWeekFlag = 0;
//localStorage.pWeek = 0;
//localStorage.pWeekFlag = 0;

		}
		xhr.timeout = function() {
			alert('请求超时!请确认网络状态...');
		}

	});
};
//用于提交数据\保存数据等不需要再处理返回值的请求
myApp.XMLpostRequestNofun = function(url, body) {
	mui.plusReady(function() {
		var xhr = new plus.net.XMLHttpRequest();
		xhr.responseType = "json";
		xhr.timeout = 10000;
		xhr.open("POST", url);
		// 发送请求
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
		console.log(body);
		xhr.onload = function() {
			//console.log(xhr.responseText);
			//console.log(xhr.responseText.toString() == "\"1\"");
			if(xhr.responseText == "\"1\"") {
				//console.log(xhr.responseText);
				mui.toast('请求成功!');
				mui.back();
			} else {
				if (document.title == '任务日历') {
					mui.toast(xhr.responseText)
				}else{
					//console.log(xhr.responseText);
				mui.toast("请求失败!");
				}
				
			}
		}
		xhr.timeout = function() {
			alert('请求超时!请确认网络状态...');
		}

	});
};
//alert(new Date('2016/06/12').getDay());
//获取当天日期YYYY-MM-DD
myApp.get_Today = function() {
	var curDate = new Date();
	var year = curDate.getFullYear();
	var month = curDate.getMonth() + 1;
	var day = curDate.getDate();
	//				var weekday=new Array(7);
	//				weekday[0]="星期日";
	//				weekday[1]="星期一";
	//				weekday[2]="星期二";
	//				weekday[3]="星期三";
	//				weekday[4]="星期四";
	//				weekday[5]="星期五";
	//				weekday[6]="星期六";
	//				var dayOfWeek = weekday[curDate.getDay()];
	var cre_d = year + "-" + month + "-" + day;
	return cre_d;
};

//获取周报信息
myApp.reportOfWeekHandle = function(data) {

	//首要!! 判断是否保存过这周的周报
//		var today = new Date();
//		var dayOfToday = today.getDay();
//		var selectWeekSmall = new Date(document.getElementById("selectDate").innerText.split('至')[0]);
//		var selectWeekBig = new Date(document.getElementById("selectDate").innerText.split('至')[1]);
//		var lastWeekSmall = new Date();
//		var lastWeekBig = new Date();
//		lastWeekSmall.setDate(lastWeekSmall.getDate() - 7 - dayOfToday);
//		lastWeekBig.setDate(lastWeekBig.getDate() - 7 + (6 - dayOfToday));
		
//		console.log(selectWeekSmall);
//		console.log(selectWeekBig);
//		console.log(lastWeekSmall);
//		console.log(lastWeekBig);
//		console.log(data.ReturnReportList.length);
//	if (data.ReturnReportList.length == 0) {//未提交
//		//已提交
//	}else{
//			if (today >= selectWeekSmall && today <= selectWeekBig) {
//			alert("这周已提交过周报!!");
//			localStorage.thisWeekFlag = 1;
//		}else if (selectWeekSmall.toDateString() == lastWeekSmall.toDateString() && selectWeekBig.toDateString() <= lastWeekBig.toDateString() ) {
////			console.log(selectWeekSmall);
////		console.log(selectWeekBig);
////		console.log(lastWeekSmall);
////		console.log(lastWeekBig);
//			alert("上周已经提交过周报!!!");
//			localStorage.pWeekFlag = 1;
//		}else{
////			console.log(selectWeekSmall);
////		console.log(selectWeekBig);
////		console.log(lastWeekSmall);
////		console.log(lastWeekBig);
//			alert("这不是近两周的周报!");
//		}
//	}
	
	
	//1.任务列表
	var missionList = data.ReturnMissionList;
	mui('.mui-slider-item span').each(function(){
		this.style.display = 'none';
	});
	//console.log(data);
	//console.log(data.ReturnReportList.length);
	//console.log(data.ReturnReportList[0].REPORTER_ID);
	//myApp.tempMissonOBJ = missionList;
	//当 存在周报 且 是本人的周报  存入全局变量

	if(data.ReturnReportList.length != 0 && data.ReturnReportList[0].CRE_PRE == myApp.userID) {
		myApp.reportTempID = data.ReturnReportList[0].REPORT_ID;
		//console.log('进入!!!!!!!!!!!!!!!' +myApp.reportTempID);
	} else {
		myApp.reportTempID = undefined;
		//console.log("未进入!!!!!!!!!!!!!!!!!!!!!!!");
	}
	for(var i = 0; i < missionList.length; i++) {
		//		finalList = '<li class="mui-table-view-cell">' + missionList[i].MISSION_NAME + '</li>';
		dateStr = missionList[i].STRATDATE_PREDICT.split(' ')[0];
		//		console.log(dateStr); 
		var day = new Date(dateStr).getDay();
		console.log('星期' + day); 
		//传对应任务的对象
		switch(day) {
			case 1:
				//console.log(missionList[i].MISSION_NAME);
				//creatListDOM('monlistthis', missionList[i].MISSION_NAME, missionList[i].MISSION_ID);
				creatListDOM('monlistthis', missionList[i]);
			
				
				break;
			case 2:
				//console.log(missionList[i].MISSION_NAME);
				//creatListDOM('tueslistthis',missionList[i].MISSION_NAME, missionList[i].MISSION_ID);
				creatListDOM('tueslistthis', missionList[i]);
			
				break;
			case 3:
				//console.log(missionList[i].MISSION_NAME);
				//creatListDOM('wedlistthis',missionList[i].MISSION_NAME, missionList[i].MISSION_ID);
				creatListDOM('wedlistthis', missionList[i]);
			
				break;
			case 4:
				//console.log(missionList[i].MISSION_NAME);
				//creatListDOM('thurslistthis',missionList[i].MISSION_NAME, missionList[i].MISSION_ID);
				creatListDOM('thurslistthis', missionList[i]);
					
				break;
			case 5:
				//console.log(missionList[i].MISSION_NAME);
				//creatListDOM('frilistthis',missionList[i].MISSION_NAME, missionList[i].MISSION_ID);
				creatListDOM('frilistthis', missionList[i]);
			
				break;
			case 6:
				//console.log(missionList[i].MISSION_NAME);
				//creatListDOM('satlistthis',missionList[i].MISSION_NAME, missionList[i].MISSION_ID);
				creatListDOM('satlistthis', missionList[i]);
			
				break;
			case 0:
				//console.log(missionList[i].MISSION_NAME);
				//creatListDOM('sunlistthis',missionList[i].MISSION_NAME, missionList[i].MISSION_ID);
				creatListDOM('sunlistthis', missionList[i]);
			
				break;
			default:
				break;
		}
	}
	
	//2.进展列表
	var progressList = data.ReturnProgressList;
	//console.log(missionList[0].MISSION_NAME);
	for(var i = 0; i < progressList.length; i++) {
		dateStr = progressList[i].PROGRESS_DATE.split(' ')[0];
		//		console.log(dateStr); 
		var day = new Date(dateStr).getDay();
		//		console.log(day); 
		
		//传对应任务的对象
		switch(day) {
			case 1:
				//			console.log(missionList[i].MISSION_NAME);
				//creatListDOM('monlist',progressList[i].MISSION_NAME, progressList.MISSION_ID);
				creatListDOM('monlist', progressList[i]);
			
				break;
			case 2:
				//creatListDOM('tueslist',progressList[i].MISSION_NAME, progressList.MISSION_ID);
				creatListDOM('tueslist', progressList[i]);
			
				break;
			case 3:
				//creatListDOM('wedlist',progressList[i].MISSION_NAME, progressList.MISSION_ID);
				creatListDOM('wedlist', progressList[i]);
		
				break;
			case 4:
				//creatListDOM('thurslist',progressList[i].MISSION_NAME, progressList.MISSION_ID);
				creatListDOM('thurslist', progressList[i]);	
				break;
			case 5:
				//creatListDOM('frilist',progressList[i].MISSION_NAME, progressList.MISSION_ID);
				creatListDOM('frilist', progressList[i]);

				break;
			case 6:
				//creatListDOM('satlist',progressList[i].MISSION_NAME, progressList.MISSION_ID);
				creatListDOM('satlist', progressList[i]);

				break;
			case 0:
				//creatListDOM('sunlist',missionList[i].MISSION_NAME, progressList.MISSION_ID);
				creatListDOM('sunlist', progressList[i]);

				break;
			default:
				break;
		}
	}
	
	//只能查看直接或间接下属
	//3.绑定人员信息
	console.log(data.ReturnUserList[0].USER_NO);
	if(data.ReturnUserList[0].USER_NO == myApp.userID) {
		//console.log('11111111');
		var employeeArr = data.ReturnUserList;
		var employeeList = document.getElementById('employeeList');

		myApp.clearAllChild(employeeList);

		for(var i = 0; i < employeeArr.length; i++) {
			//创建文档碎片节点  频繁创建节点使用
			//			var fragment  = document.createDocumentFragment();
			//.log(employeeArr[i]);
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell employeeLi';
			li.id = employeeArr[i].USER_NO;

			li.innerHTML = '<a href="#">' + employeeArr[i].USER_NAME + ' ID:' + employeeArr[i].USER_NO + '</a>';
			employeeList.appendChild(li);

		}
		//做完登录就好了
		//  	mui('#employeeName')[0].innerHTML = employeeArr[i].USER_NAME + ' ID:' + employeeArr[i].USER_NO;
		mui(document).on('tap', '.employeeLi', function() {
			TempEmployeeID = this.getAttribute('id');
			//console.log(TempEmployeeID);
			var employee = document.getElementById('employeeName');
			employee.innerHTML = '<a href="#">' + this.innerText + '</a>';
			mui('#peopleSelPopover').popover('hide');
		});
	}
	
	//4.绑定特别说明事项
	if(data.ReturnAnnList.length != 0) {
		var specialDecArr = data.ReturnAnnList;
		console.log(specialDecArr);
		var annList = document.getElementById('annList');

		myApp.clearAllChild(annList);
		for(var i = 0; i < specialDecArr.length; i++) {
			var annHead = document.createElement('h5');
			var annTextarea = document.createElement('textarea');
			//annHead.innerText = specialDecArr[i].ROWNUM;
			annHead.innerHTML = '事项' + specialDecArr[i].ROWNUM + '<button type="button" class="mui-btn mui-btn-gray deleteAnnsBtn" style="display:none;float:right;">删除</button>';

			annTextarea.innerText = specialDecArr[i].ANN_DETAIL;
			annTextarea.id = (i + 1) + 'Ann';
			console.log(annTextarea.id);
			annTextarea.readOnly = 'readonly';

			annList.appendChild(annHead);
			annList.appendChild(annTextarea);

		}

		//为每个删除事例按钮添加手势
		mui('h5').on('tap', '.deleteAnnsBtn', function() {
					
			//console.log(this.parentNode);
			//		console.log(this.previousSibling.value);
			//  console.log(this.parentNode.nextSibling);
			var tapBtn = this;
			var annTitle = this.parentNode.innerText;
			var btnArray = ['否', '是'];
			mui.confirm('确认将' + annTitle + '？', '系统提示', btnArray, function(e) {
				if(e.index == 1) {
					//console.log('是');
					console.log(tapBtn.parentNode);
					console.log(tapBtn.parentNode.nextSibling);
					var annList = document.getElementById('annList');
					annList.removeChild(tapBtn.parentNode.nextSibling)
					annList.removeChild(tapBtn.parentNode);
					mui.toast('删除事例成功!')
					if(annList.childNodes.length == 0) {
						mui.toast('已没特别事项可编辑,关闭编辑状态.')
						annList.innerHTML = '<p style="color:gray"><span style="font-size:16px;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp无特别事项!如需添加请在右上角<操作>中添加特别说明事项,添加后记得保存周报!</span></p>';
						editOff();
					}

				} else {
					mui.toast('取消删除');
					//console.log(this.innerHTML);
				}
			}, 'div');

		});
	} else {
		var annList = document.getElementById('annList');
		myApp.clearAllChild(annList);

		annList.innerHTML = '<p style="color:gray"><span style="font-size:16px;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp无特别事项!如需添加请在右上角<操作>中添加特别说明事项,添加后记得保存周报!</span></p>';
	}

}

//处理进入任务详情
myApp.MissionDetailHandle = function(data) {
	console.log(data);
	// console.log(data.ReturnList[0].MISSION_ID);
	// console.log(data.ReturnList[0].MISSION_PID);
	// console.log(data.ReturnList[0].DESCRIPTION);
	var missionObj = data.ReturnMissionList[0];
	var progressObj = data.ReturnProgressList;  //返回的任务下进展信息
//	console.log(missionObj.MISSION_NAME);
//	console.log(missionObj.MISSION_PNAME);
//	console.log(missionObj.STRATDATE_PREDICT);
//	console.log(missionObj.MISSION_NAME);
//	console.log(missionObj.MISSION_NAME);
//	console.log(missionObj.MISSION_NAME);
 //var pageUrl = encodeURI("missionDetail.html");
 					if (mui.os.android) {
					var strNerPage = "missionDetail.html";
				}else if(mui.os.ios){
					var strNerPage = encodeURI("missionDetail.html");
				}
	mui.openWindow({
		id: "missionDetail.html",
		//url: pageUrl,
		url:strNerPage,
		styles: {
			top: '0px', //新页面顶部位置
			bottom: '0px', //新页面底部位置
			popGesture: 'close'
		},
		extras: {
			// "ROWNUM": "1", 
			//          "MISSION_ID": "46",    //id
			//          "MISSION_NAME": "20170725",   //任务名称
			//          "DESCRIPTION": "20170725ceshi",   //描述
			//          "MISSION_STATE": "1",    //状态
			//          "STRATDATE_PREDICT": "2016/7/25 0:00:00", 
			//          "ENDDATE_PREDICT": "2016/7/31 0:00:00", 
			//          "STRATDATE_REALITY": "2016/7/26 0:00:00", 
			//          "ENDDATE_REALITY": "", 
			//          "MISSION_PID": "0", // 上级任务id
			//          "CRE_DATE": "2016/7/25 0:00:00", 
			//          "CRE_PRE": "136586", 
			//          "MOD_DATE": "", 
			//          "MOD_PRE": "", 
			//          "MISSION_RATE": "",  //任务完成率
			//          "MISSION_PNAME": ""  //上级任务中文名称
			//自定义扩展参数，可以用来处理页面间传值
			missionId: missionObj.MISSION_ID, //id
			des: missionObj.DESCRIPTION, //描述
			state: missionObj.MISSION_STATE, //状态
			name: missionObj.MISSION_NAME, //任务名称
			startDP: missionObj.STRATDATE_PREDICT, //预计开始时间
			endDP: missionObj.ENDDATE_PREDICT, //预计结束时间
			startDR: missionObj.STRATDATE_REALITY, //实际开始时间
			endDR: missionObj.ENDDATE_REALITY, //实际结束时间
			missonP: missionObj.MISSION_PID, // 上级任务id
			creDate: missionObj.CRE_DATE, //创建时间
			crePre: missionObj.CRE_PRE, //创建人
			missionRate: missionObj.MISSION_RATE, //任务完成率
			missionPN: missionObj.MISSION_PNAME, //上级任务中文名称
			progressObj:progressObj   //已有进展信息 {对象}
		},
		createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			//页面显示动画，默认为”slide-in-right“；
			//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '正在加载...', //等待对话框上显示的提示内容
		}
	})
}

//处理进入进展详情页面
myApp.ProgressDetailHandle = function(data) {
	console.log(data);
	// console.log(data.ReturnList[0].MISSION_ID);
	// console.log(data.ReturnList[0].MISSION_PID);
	// console.log(data.ReturnList[0].DESCRIPTION);
	var progressObj = data.ReturnList[0];
	// console.log(missionObj.ENDDATE_REALITY);
					if (mui.os.android) {
					var strNerPage = "progressDetail.html";
				}else if(mui.os.ios){
					var strNerPage = encodeURI("progressDetail.html");
				}

	mui.openWindow({
		id: "progressDetail.html",
		url: strNerPage,
		styles: {
			top: '0px', //新页面顶部位置
			bottom: '0px', //新页面底部位置
			popGesture: 'close'
		},
		extras: {
			//				 "ROWNUM": "1", 
			//          "PROGRESS_ID": "6",  //进展id 
			//          "MISSION_ID": "12", //所属任务id
			//          "PROGRESS_DURATION": "0",  //持续时间
			//          "PROGRESS_RATE": "11",  //进展完成率
			//          "PROGRESS_DATE": "2016/7/19 0 :00:00",  //进展执行开始时间
			//          "PERFORMED_STATE": "0",  //进展状态
			//          "DESCRIPTION": "已经完成2222",  //描述
			//          "CONDITION": "0",  //进展执行开始时间
			//          "CRE_DATE": "2016/7/19 0:00:00",  //创建时间
			//          "CRE_PRE": "136586",  //创建人ID
			//          "MOD_DATE": "",   //修改时间
			//          "MOD_PRE": "" //修改人姓名
			//"MISSION_NAME": "哈哈哈"
			//自定义扩展参数，可以用来处理页面间传值
			missionId: progressObj.MISSION_ID, //所属任务id
			progressId: progressObj.PROGRESS_ID, //进展id
			progressDur: progressObj.PROGRESS_DURATION, //持续时间
			progressRate: progressObj.PROGRESS_RATE, //进展完成率
			progressDes: progressObj.DESCRIPTION, //描述
			progressState: progressObj.PERFORMED_STATE, //进展状态
			progressCon: progressObj.CONDITION, //条件 暂时无用
			progressStartT: progressObj.PROGRESS_DATE, //进展执行开始时间
			progressCreDate: progressObj.CRE_DATE, //创建时间
			progressCRE_PRERId: progressObj.CRE_PRE, //创建人ID
			progressMOD_DAT: progressObj.MOD_DATE, //修改时间
			progressMOD_PRE: progressObj.MOD_PRE, //修改人姓名
			progressPName: progressObj.MISSION_NAME, //所属任务中文名称
			progressUserName:progressObj.USER_NAME //执行人中文名

		},
		createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			//页面显示动画，默认为”slide-in-right“；
			//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '正在加载...', //等待对话框上显示的提示内容
		}
	})
}

//进展详情中 所属任务信息

myApp.ProgressMissionDetailHandle = function(data) {
	var missionObj = data.ReturnMissionList[0];
	// "ROWNUM": "1", 
	//          "MISSION_ID": "46",    //id
	//          "MISSION_NAME": "20170725",   //任务名称
	//          "DESCRIPTION": "20170725ceshi",   //描述
	//          "MISSION_STATE": "1",    //状态
	//          "STRATDATE_PREDICT": "2016/7/25 0:00:00", 
	//          "ENDDATE_PREDICT": "2016/7/31 0:00:00", 
	//          "STRATDATE_REALITY": "2016/7/26 0:00:00", 
	//          "ENDDATE_REALITY": "", 
	//          "MISSION_PID": "0", // 上级任务id
	//          "CRE_DATE": "2016/7/25 0:00:00", 
	//          "CRE_PRE": "136586", 
	//          "MOD_DATE": "", 
	//          "MOD_PRE": "", 
	//          "MISSION_RATE": "",  //任务完成率
	//          "MISSION_PNAME": ""  //上级任务中文名称

//	console.log(missionObj.MISSION_NAME);
//	console.log(missionObj.MISSION_PNAME);
//	console.log(missionObj.STRATDATE_PREDICT);
//	console.log(missionObj.ENDDATE_PREDICT);
//	console.log(missionObj.DESCRIPTION);
	document.getElementById('missName').value = missionObj.MISSION_NAME;
	document.getElementById('missPName').value = missionObj.MISSION_PNAME != '' ? missionObj.MISSION_PNAME : '无上级任务';
	document.getElementById('startD_p').value = missionObj.STRATDATE_PREDICT.split(' ')[0];
	document.getElementById('endD_p').value = missionObj.ENDDATE_PREDICT.split(' ')[0];
	document.getElementById('description').value = missionObj.DESCRIPTION != '' ? missionObj.DESCRIPTION : '暂无描述';
	document.getElementById('missRate').value = missionObj.MISSION_RATE != '' ? missionObj.MISSION_RATE + '%' : '0%';
}

//获取任务列表
myApp.getMissionList = function(data) {
	var missionList = data.ReturnList;
	console.log(missionList);
//获取插入的根节点
	if(document.title == '填写日报') {
		var list = document.getElementById('planPro');
	} else if(document.title == '任务日历') {
		var list = document.getElementById('missionList');
	} else if(document.title == '添加进展') {
		var list = document.getElementById('missionList');
	} else if(document.title == '新增任务') {
		var list = document.getElementById('missionList');
	}else if(document.title == '任务详情'){
		var list = document.getElementById('missionList');
	}else if(document.title == '进展详情'){
		var list = document.getElementById('missionList');
	}
//当没有数据时 显示的画面
	if(missionList.length == 0) {
		//console.log("11111222222333333");
		if(document.title == '添加进展') {
			list.innerHTML = '<a style="color: black; font-size: 16px;margin-left: 10%;">所选日期前没有需要执行的任务!</a>'
		} else if(document.title == '填写日报') {
			list.innerHTML = '<a style="color: black; font-size: 16px;margin-left: 10%;">您这天暂时没有计划执行的任务!如需添加任务,请在"任务日历"中添加.</a>'
		} else if(document.title == '任务日历') {
			list.innerHTML = '<span style="color: black; font-size: 16px;margin-left: 10%;">您这天暂时没有计划执行的任务!如需添加任务,请点击右上角添加.</span>'
		} else {
			list.innerHTML = '<a style="color: black; font-size: 16px;margin-left: 10%;">您近期没有可选任务!</a>'
		}
		return;
	} else {
		myApp.clearAllChild(list);
	}
	
	if (document.title == '任务详情' || document.title == '新增任务') {
			var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = '<a>无上级任务</a>';
				list.appendChild(li);
			}
	
//无数据 不会执行
	for(var i = 0; i < missionList.length; i++) {
		//创建文档碎片节点  频繁创建节点使用
		//			var fragment  = document.createDocumentFragment();
		//任务日历 较特殊, 可以删除任务 故单独铺设
		if(document.title == "任务日历") {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.id = '任务' + missionList[i].MISSION_ID;
			li.setAttribute('MISSION_NAME', missionList[i].MISSION_NAME);
			//li.innerHTML = '<a class="mui-navigate-right" >任务' + (i + 1) + ': ' + missionList[i].MISSION_NAME + '</a>';
			li.innerHTML = '<div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div><div class="mui-slider-handle">任务	' + (i + 1) + ': ' + missionList[i].MISSION_NAME + '</div>';
			list.appendChild(li);
			//进入下次循环
			continue;
		}else if (document.title == '任务详情') {
			//如果备选上级任务已经为当前任务的子任务,则不能选择(不显示)
			if (document.getElementsByClassName('missName').id == missionList[i].MISSION_PID) {
				continue;
			}
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.id = '任务' + missionList[i].MISSION_ID;
				li.setAttribute('MISSION_NAME', missionList[i].MISSION_NAME);
				li.innerHTML = '<a class="mui-navigate-right" >任务: ' + missionList[i].MISSION_NAME + '</a>';
				list.appendChild(li);
				continue
		}
		//其他页面 这样铺设
		var li = document.createElement('li');
		li.className = 'mui-table-view-cell';
		li.id = '任务' + missionList[i].MISSION_ID;
		li.setAttribute('MISSION_NAME', missionList[i].MISSION_NAME);
		li.innerHTML = '<a class="mui-navigate-right" >任务' + (i + 1) + ': ' + missionList[i].MISSION_NAME + '</a>';
		list.appendChild(li);

	}

	console.log(document.title);
	var reg = /^\W+/g;
	//给每条绑定事件
	if(document.title == "添加进展") {
		mui('#missionList').off();
		mui('#missionList').on('tap', 'li', function() {
			TempMissionID = this.getAttribute('id');
			//console.log(TempMissionID);
			var belongMission = document.getElementById('missionBelong');
			belongMission.innerText = this.innerText;
			belongMission.style.color = 'black';
			//获取所属任务信息...

			var reportbody = "\"{'ParaList':[{'MissionID':'" + this.id.replace(reg,'') + "'}],'FunName': 'GetMissionInfoByID'}\"";
			myApp.XMLpostRequest(url, reportbody, myApp.MissionBelongDetail);
			mui('#middlePopover').popover('hide');
		});
	} else if(document.title == "任务日历") {
		//与节点一样,绑定前需要将原事件取消,否则造成多重相应.
		mui('#missionList').off();
		mui('#missionList').on('tap', 'li', function() {
			console.log('点击了li!!!!!!!!!!!!!!!!');
			var reportbody = "\"{'ParaList':[{'MissionID':'" + this.id.replace(reg,'')+ "'}],'FunName': 'GetMissionInfoByID'}\"";
			console.log(reportbody);
			myApp.XMLpostRequest(url, reportbody, myApp.MissionDetailHandle);
		});

		mui('#missionList').on('tap', 'a', function() {
			console.log("点击删除按钮了!!!!!!!!!!!!!!!!");
			console.log(this.innerHTML);
			//提示框
			var missID = this.parentNode.parentNode.id.replace(reg,'');
			console.log(missID.replace(reg,''));
			var btnArray = ['否', '是'];
			mui.confirm('确认删除任务？', '系统提示', btnArray, function(e) {
				if(e.index == 1) {
//					console.log('是');
//先删
					var reportbody = "\"{'ParaList':[{'MissionID':'" + missID + "'}],'FunName': 'MissionDelete'}\"";
					console.log(reportbody);
					myApp.XMLpostRequestNofun(url, reportbody);
					console.log(data);
					//myApp.getMissionList(data);
//获取日历已选择的日期,删除后重新请求刷新
//确保删除请求完成后,进行刷新操作
					mui.later(function(){
						console.log("进入删除");
					var dateSel = document.getElementById("mc-date-label").innerText;
					var reportbody = "\"{'ParaList':[{'Date':'" + dateSel + "','UserID':'" + myApp.userID + "'}],'FunName':'GetMissionDetail'}\"";					   	  
	             	myApp.XMLpostRequest(url, reportbody,myApp.getMissionList);
					},500);

					
//
				} else {
					mui.toast('取消删除!');
//					//console.log(missID);
//					console.log('否');
//					//console.log(this.innerHTML);
				}
			}, 'div');

		});

	} else if(document.title == "填写日报") {
		
		//与节点一样,绑定前需要将原事件取消,否则造成多重相应.
		mui('#planPro').off();
		mui('#planPro').on('tap', 'li', function() {
			var reportbody = "\"{'ParaList':[{'MissionID':'" + this.id.replace(reg,'') + "'}],'FunName': 'GetMissionInfoByID'}\"";
			myApp.XMLpostRequest(url, reportbody, myApp.MissionDetailHandle);
		})
	} else if(document.title == "新增任务") {
		mui('#missionList').off();
		mui('#missionList').on('tap', 'li', function() {
			document.getElementById("missionPN").innerText = this.getAttribute('MISSION_NAME') != null ? this.getAttribute('MISSION_NAME') : '无上级任务';
			document.getElementById("missionPN").setAttribute('missionPID', this.id.replace(reg,''));
			mui('#middlePopover').popover('hide');
		});
	}else if (document.title == "任务详情") {
				mui('#missionList').off();
		mui('#missionList').on('tap', 'li', function() {
			
			document.getElementById("MissionP").innerText = this.getAttribute('MISSION_NAME') != null ? this.getAttribute('MISSION_NAME') : '无上级任务';
			//console.log(this.getAttribute('MISSION_NAME'));
			document.getElementById("MissionP").setAttribute('missionPID', this.id.replace(reg,''));
			mui('#middlePopover').popover('hide');
		});
	}else if (document.title == '进展详情') {
			mui('#missionList').off();
		mui('#missionList').on('tap', 'li', function() {
			document.getElementById("MissionName").innerText = this.getAttribute('MISSION_NAME');
			document.getElementById("MissionName").setAttribute('missionPID', this.id.replace(reg,''));
			mui('#middlePopover').popover('hide');
		});
	}
}

//新增进展所属任务信息
myApp.MissionBelongDetail = function(data) {

	var missionObj = data.ReturnMissionList[0];
	//	    //id
	var missionId = missionObj.MISSION_ID;
	//		//描述
	var des = missionObj.DESCRIPTION;
	//		//状态
	var state = missionObj.MISSION_STATE;
	//		//任务名称
	var name = missionObj.MISSION_NAME;
	//		 //预计开始时间
	var startDP = missionObj.STRATDATE_PREDICT;
	//		 //预计结束时间
	var endDP = missionObj.ENDDATE_PREDICT;
	//		//实际开始时间
	var startDR = missionObj.STRATDATE_REALITY;
	//		 //实际结束时间
	var endDR = missionObj.ENDDATE_REALITY;
	//		 // 上级任务
	var missonP = missionObj.MISSION_PID;
	//		 //创建人
	var crePre = missionObj.CRE_PRE;
	//		 //任务完成率
	var missionRate = missionObj.MISSION_RATE;
	//		//上级任务中文名称
	var missionPN = missionObj.MISSION_PNAME;

	document.getElementById('missionName').innerText = name;
	//如果是顶级任务,这返回空,这时候需要判断.
	if(missionObj == undefined || missionObj.MISSION_PID == 0) {
		document.getElementById('missionPName').innerText = '无上级任务';
	} else {
		console.log(missionObj);
		console.log(missionObj.missionPN);
		document.getElementById('missionPName').innerText = missionPN;
	}
	document.getElementById('missRate').innerText = missionRate + '%';
	document.getElementById('startD_p').innerText = startDP.split(' ')[0];
	document.getElementById('endD_p').innerText = endDP.split(' ')[0];
	console.log(des);
	document.getElementById('missionDec').innerText = des;
	

}

//任务详情进进展详情,删除进展后返回任务详情,执行刷新任务信息
myApp.RefreshMissionDetail = function(data){
	var missionObj = data.ReturnMissionList[0];
	//	    //id
	var missionId = missionObj.MISSION_ID;
	//		//描述
	var des = missionObj.DESCRIPTION;
	//		//状态
	var state = missionObj.MISSION_STATE;
	//		//任务名称
	var name = missionObj.MISSION_NAME;
	//		 //预计开始时间
	var startDP = missionObj.STRATDATE_PREDICT;
	//		 //预计结束时间
	var endDP = missionObj.ENDDATE_PREDICT;
	//		//实际开始时间
	var startDR = missionObj.STRATDATE_REALITY;
	//		 //实际结束时间
	var endDR = missionObj.ENDDATE_REALITY;
	//		 // 上级任务
	var missonP = missionObj.MISSION_PID;
	//		 //创建人
	var crePre = missionObj.CRE_PRE;
	//		 //任务完成率
	var missionRate = missionObj.MISSION_RATE;
	//		//上级任务中文名称
	var missionPN = missionObj.MISSION_PNAME;
	var progressObj = data.ReturnProgressList;
	
	if (missionPN == '') {
	document.getElementById('MissionP').value = '无上级任务';
}else{
	document.getElementById('MissionP').value = missionPN;
}
				//任务基本信息铺设
				document.getElementById('MissionName').value = name;
				document.getElementById('MissionPStartTime').value = startDP.split(' ')[0];
				document.getElementById('MissionPEedTime').value = endDP.split(' ')[0];
				document.getElementById('MissionRStartTime').value = startDR != ''? endDR.split(' ')[0] : '暂无数据';
				document.getElementById('MissionREndTime').value = endDR!=''?endDR.split(' ')[0] : '暂无数据';
				document.getElementById('MissionRate').value = (missionRate != ''||missionRate != '0') ?missionRate + '%' : '0%';
				document.getElementById('MissionState').value = state != 0?'完成':'未完成';
				document.getElementById('description').innerHTML = des!=''?des : '暂无描述';
				
				
				//进展列表信息铺设
				if (progressObj == '') {
					console.log();
					myApp.clearAllChild(document.getElementById("progressList"));
					document.getElementById("progressList").innerHTML = '<p style="color:gray"><span style="font-size:16px;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp此项目暂无进展!如需添加请在"填写日报"中添加!</span></p>';

				}else{
					myApp.clearAllChild(document.getElementById("progressList"));
					mui.each(progressObj,function(index,item){
					//	console.log(item.MISSION_ID);
						creatListDOM('progressList', item);
					});
				}
	
}

//获取所选日期的进展列表
myApp.GetProgressList = function(data) {
	var missionList = data.ReturnList;
	console.log(missionList);
	//获取实际进展表根节点
	var list = document.getElementById('realPro');

//判断是否有数据,无数据时显示提示画面,并退出函数
	if(missionList.length == 0) {
		list.innerHTML = '<a style="color: black; font-size: 16px;margin-left: 10%;">您这天还未添加任何进展,如需可点击右上角"编辑"图标添加.</a>'
		return;
	} else {
		//有数据则先清空原数据
		myApp.clearAllChild(list);
	}

//循环创建列表
	for(var i = 0; i < missionList.length; i++) {
		//创建文档碎片节点  频繁创建节点使用
		//			var fragment  = document.createDocumentFragment();

		var li = document.createElement('li');
		li.className = 'mui-table-view-cell';
		li.id = '进展' + missionList[i].PROGRESS_ID;
		//应该API(GetProgressDetail)加任务名称返回值,否则需要循环网络请求,十分浪费资源.
		li.innerHTML = '<a class="mui-navigate-right" >进展' + (i + 1) + ': 所属任务: ' + missionList[i].MISSION_NAME + '</a>';
		list.appendChild(li);

	}
	var reg = /^\W+/g;
	mui('#realPro').off();
	mui('#realPro').on('tap', 'li', function() {
		//获取被点击进展的详情
		var reportbody = "\"{'ParaList':[{'ProgressID':'" + this.id.replace(reg,'') + "'}],'FunName': 'GetProgressInfoByID'}\"";
		console.log(reportbody);
		myApp.XMLpostRequest(url, reportbody, myApp.ProgressDetailHandle);

	});

}

//清空子节点
myApp.clearAllChild = function(rootNode) {
	var childs = rootNode.childNodes;
	for(var i = childs.length - 1; i >= 0; i--) {
		//alert(childs[i].nodeName); 
		rootNode.removeChild(childs[i]);
	}
}
var creatListDOM = function(domID, ObjMP) {
	//创建文档碎片节点  频繁创建节点使用
	//			var fragment  = document.createDocumentFragment();
	var list = document.getElementById(domID);
	var li = document.createElement('li');
	li.className = 'mui-table-view-cell';
	li.style.color = 'darkblue';
	//console.log(ObjMP.MISSION_ID);

	//	if(ObjMP.MISSION_ID != undefined) {
	//		console.log("11111111111111111111111111111111111111111111111111111111111111111111111111111111111");
	//		li.id = ObjMP.MISSION_ID;
	//	} else {

	//	}
	//console.log(list.parentNode.nodeName);
	//console.log(list.parentNode.previousSibling.previousSibling.firstElementChild);
	//console.log(list.parentNode.nextSibling.nodeName);
	//console.log(list.parentNode.parentNode);
	
	list.parentNode.previousSibling.previousSibling.firstElementChild.style.display = '';
	
	console.log(ObjMP.MISSION_NAME);
	if(domID.substring(domID.length - 4) == 'this') {
		if (ObjMP.MISSION_ID != undefined) {//没生成时候走这个
			li.id = '任务' + ObjMP.MISSION_ID;
		}else{//生成后走这个
			li.id = '任务' + ObjMP.REPORT_CONTENT_ID;
		}
		
		//console.log(ObjMP.MISSION_ID);
		li.innerHTML = '任务:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + ObjMP.MISSION_NAME;
	} else {
		
		//li.innerHTML = '进展:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + ObjMP.MISSION_NAME;
		if (document.title == '任务详情') {
			li.id = '进展' + ObjMP.PROGRESS_ID;
			li.innerHTML = '<a class="mui-navigate-right" >进展'+ ObjMP.ROWNUM + ': 描述: ' + ObjMP.DESCRIPTION + '</a>';
		}else{
		if (ObjMP.PROGRESS_ID != undefined) {//没生成时候走这个
			li.id = '进展' + ObjMP.PROGRESS_ID;
		}else{//生成后走这个
			li.id = '进展' + ObjMP.REPORT_CONTENT_ID;
		}	
			li.innerHTML = '<a class="mui-navigate-right" >进展: 所属任务--' + ObjMP.MISSION_NAME + '</a>';
		}
	}

	//为每个任务添加单击手势,点击进入任务详情页面
	li.addEventListener('tap', function() {
		//				console.log(myApp.tempMissonOBJ);
		//				console.log(myApp.tempMissonOBJ[this.id]);
		//				console.log(myApp.tempMissonOBJ[this.id].MISSION_ID);
		//				console.log(this.id);		
		//请求任务详情
		//console.log(this.id.substring(0, 2));
		var reg = /^\W+/g;
		if(this.id.substring(0, 2) == '任务') {
			console.log(this.id.replace(reg, ''));
			var reportbody = "\"{'ParaList':[{'MissionID':'" + this.id.replace(reg, '') + "'}],'FunName': 'GetMissionInfoByID'}\"";
			console.log(reportbody);
			myApp.XMLpostRequest(url, reportbody, myApp.MissionDetailHandle);
		} else if(this.id.substring(0, 2) == '进展') {
			//进入进展详情页面
			
			console.log(this.id.replace(reg, ''));
			var reportbody = "\"{'ParaList':[{'ProgressID':'" + this.id.replace(reg, '') + "'}],'FunName': 'GetProgressInfoByID'}\"";
			console.log(reportbody);
			myApp.XMLpostRequest(url, reportbody, myApp.ProgressDetailHandle);
		}
	});
	list.appendChild(li);

}

//通过某天日期获取,所在周的周一 周日 日期
myApp.getMondayOfTheWeekByDate = function(dateInput){
	//获取输入字符串日期的date对象
	//console.log(dateInput);
	//iOS不这样会显示NaN--Not a Number...
	dateInput = dateInput.replace(/\-/g, "/");
	//console.log(dateInput);
	var dateOutput = new Date(dateInput);
	//获取dateInput是星期几
	var myDay = dateOutput.getDay();
	
	
//	console.log(dateInput);
//	console.log(new Date(dateInput));
//判断周日 周报周期(0-6)
	if (myDay == 0) {
		dateOutput.setDate(dateOutput.getDate());
		
	} else{
		dateOutput.setDate(dateOutput.getDate() - myDay);
	}
//存周日 
	var strMon = dateOutput; 
	//存周六,周报周期(0-6)
	var strSun = new Date(dateOutput.toString());
	strSun.setDate(strSun.getDate() + 6);
	//元素1 mon 元素2 sun
	var arrOutput = [strMon, strSun];
//	console.log(strMon);
//	console.log(strSun);
	return arrOutput;
	
}
//本周是否保存过周报,本地存储.
//myApp.saveReportFlag = function(){
//	
//}
myApp.requestReportAgain = function(){
				myApp.clearAllChild(document.getElementById('monlistthis'));
				myApp.clearAllChild(document.getElementById('tueslistthis'));
				myApp.clearAllChild(document.getElementById('wedlistthis'));
				myApp.clearAllChild(document.getElementById('thurslistthis'));
				myApp.clearAllChild(document.getElementById('frilistthis'));
				myApp.clearAllChild(document.getElementById('satlistthis'));
				myApp.clearAllChild(document.getElementById('sunlistthis'));

				myApp.clearAllChild(document.getElementById('monlist'));
				myApp.clearAllChild(document.getElementById('tueslist'));
				myApp.clearAllChild(document.getElementById('wedlist'));
				myApp.clearAllChild(document.getElementById('thurslist'));
				myApp.clearAllChild(document.getElementById('frilist'));
				myApp.clearAllChild(document.getElementById('satlist'));
				myApp.clearAllChild(document.getElementById('sunlist'));
				var user = document.getElementById("employeeName").innerText;
				//取所有汉字
				var re = /^\W+/g;
				var dateStr = document.getElementById("selectDate").innerText;
				var reportbody = "\"{'ParaList':[{'Date':'" + dateStr.split('至')[0] + "','UserID':'" + user.substring(user.length - 6) + "','Refresh':'0'} ], 'FunName': 'GetWeeklyReportDetail'}\"";
				myApp.XMLpostRequest(url, reportbody, myApp.reportOfWeekHandle);
}
