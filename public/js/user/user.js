	function fn_corp_reset(index) {
		if(index == 1) {
			$('input:radio[name="corpCd"]').eq(0).attr("checked", false);
		}
		else {
			if( $("#corp_cd option:selected")) {
				 $("#corp_cd").find('option:selected').attr("selected", false);
			}
			$(':radio[name="corpCd"]').val("oncar");
			$('input:radio[name="corpCd"]').eq(0).attr("checked", true);
		}
	}
	
	
	function fn_check() {
		var corpCd1 = $(':radio[name="corpCd"]:checked').val();
		var corpCd2 = $("#corp_cd option:selected").val();
		var userGb = $(':radio[name="userGb"]:checked').val();
		var userId = $('#user_id').val();
		var userPwd = $('#userPwd').val();
		var userNm = $('#user_name').val();
		var rePwd = $('#rePwd').val();
		var callNo = $('#callNo').val();
		var faxNo = $('#faxNo').val();
		var email = $('#email').val();
		var useYN = $(':radio[name="useYN"]:checked').val();
		
		if(!corpCd1 && !corpCd2) {
			alert('회사명을 선택해 주세요.');
			return false;
		} 
		
		if(!userGb) {
			alert('권한을 선택해 주세요.');
			return false;
		} 
		
		if(userNm.length < 1) {
			alert('이름을 입력해 주세요.');
			return false;
		}
		
		if(userId.length < 1) {
			alert('아이디를 입력해 주세요.');
			return false;
		}
		
		if(userPwd.length < 1) {
			alert('비밀번호를 입력해 주세요.');
			return false;
		}
		
		if(rePwd.length < 1) {
			alert('비밀번호를 다시 입력해 주세요.');
			return false;
		}
		
		if(callNo.length < 1) {
			alert('연락처를 입력해 주세요.');
			return false;
		}
		
		if(email.length < 1) {
			alert('이메일을 입력해 주세요.');
			return false;
		}
		
		if(!useYN) {
			alert('사용여부를 선택해 주세요.');
			return false;
		}
		
		return true;		
	}
	
	function fn_email_Check() {
		var regExp = "[a-z0-9]+[a-z0-9.,]+@[a-z0-9_-]+[a-z0-9.,]+\\.[a-z0-9]+";
		var email = document.getElementById('email').value;

		if(email.length == 0){
			alert('이메일을 입력해 주세요.');
			return;
		}
		//이메일 형식에 맞지않으면
		if (!email.match(regExp)){

			alert('올바른 이메일 주소가 아닙니다.');
			document.joinForm.email.value = "";
			return;
		}
	}
	
		
	
	function fn_pwd_Check() {
		var userPwd = $('#userPwd').val();
		var rePwd = $('#rePwd').val();
		
		if(userPwd != rePwd) {
			alert("비밀번호가 일치하지 않습니다.");
			document.joinForm.rePwd.value = "";
			return;
		}
	}
	
	
	
	function fn_reset() {
		var frm = document.forms.searchForm;
		
		frm.userNm.value = "";
		frm.userId.value = "";
		frm.phoneNo.value = "";
	}
	
	