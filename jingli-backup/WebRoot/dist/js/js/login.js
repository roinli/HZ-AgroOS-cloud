(function(){
    $(function(){
        //手机正则
        var telReg =/^1[0-9]{10}/;
        var numberReg=new RegExp("^[0-9]*$");
        function delay(){
        	$('#hint').slideToggle(1000,function(){
        		setTimeout(function(){$('#hint').slideToggle(1000)},3000);	
        	})
        }
        //获取验证码
        $(".getCode").click(function(){
            //手机号
            var uName=$(".u_name").val();
            if(uName==""){
            	$("#hint").html('手机号不能为空');
            	delay();
            	return;
            }
            if(!telReg.test(uName)){
        	  $("#hint").html("请输入正确的手机格式");
        	  delay();
          	  return
            }
            else{
            	var s = 59;
                var timer = setInterval(function () {
                    $(".getCode").html(s);
                    s--;
                    $(".getCode").attr('disabled', true);
                    if (s <= 0) {
                        clearInterval(timer);
                        $(".getCode").html("重新获取");
                        $(".getCode").attr('disabled', false);
                    }
                }, 1000);
                
            	$.ajax({
        			type:"POST",
        			url:"loginServlet",
        			data:{"method":"sendValidCode","phone":uName},
        			dataType:"JSON",
        			success:function(result){
        				if(result.statusCode == 100){
    		 				toastr.error('请联系管理员','未拥有权限');
    		 				return;
    		 			}
        				if(result.statusCode == '-4'){
        					$("#hint").html('用户不存在');
        	            	delay();
        	            	clearInterval(timer);
	                        $(".getCode").html("重新获取");
	                        $(".getCode").attr('disabled', false);
        	            	return;
        				}
        				if(result.statusCode == '-5'){
        					$("#hint").html('当前用户已被禁用');
        	            	delay();
        	            	clearInterval(timer);
	                        $(".getCode").html("重新获取");
	                        $(".getCode").attr('disabled', false);
        	            	return;
        				}
        				if(result.statusCode == '1'){
        					$("#hint").html('验证码已发送到'+uName+'，请注意查收');
        					delay();
        	            	return;
        				}
        			}
        		});
            }
        })
        //登陆
        $(".btn-block").click(function(){
        	$(this).css({'color':'#fff'});
            var uName=$(".u_name").val();
            var code=$(".u_pwd").val();
            if(uName==""){
            	$("#hint").html('手机号不能为空');
            	delay();
            }
            else if(!telReg.test(uName)){
            	$("#hint").html("请输入正确的手机格式");
            	delay();
            }
            else if(code==""){
            	$("#hint").html("验证码不能为空");
            	delay();
            }
            else if(!numberReg.test(code)){
            	$("#hint").html("请输入数字格式的验证码");
            	delay();
            }
            else{
        		$.ajax({
        			type:"POST",
        			url:"loginServlet",
        			data:{"method":"userLogin","phone":uName,"verifCode":code},
        			dataType:"JSON",
        			success:function(result){
        				if(result.statusCode == 100){
    		 				toastr.error('请联系管理员','未拥有权限');
    		 				return;
    		 			}
        				if(result.statusCode == '-3'){
        					$("#hint").html("验证码未发送或已失效");
        					delay();
        		          	return;
        				}
        				if(result.statusCode == '-4'){
        					$("#hint").html("验证码错误，请重新输入");
        					delay();
        					return;
        				}
        				if(result.statusCode == '-5'){
        					$("#hint").html("用户不存在");
        					delay();
        					return;
        				}
        				if(result.statusCode == '-6'){
        					$("#hint").html("当前账号已被禁用");
        					delay();
        					return;
        				}
        				if(result.statusCode == 1){
        					window.location.href="loginServlet?method=toIndex";
        				}
        			}
        		});
            }

        })
        //  回车
        $(document).keydown(function(event){
            if(event.keyCode==13){
                $(".btn-block").click();
            }
        });
        //光标焦点
        $("input").focus(function(){
            $(".prompt").html("")
        });
        $('.loginLogoImg').click(function(){
        	location.href='http://127.0.0.1:8080/wisdom_farming_site/';
        })
    })
})()