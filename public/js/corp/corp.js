/**
 * 
 */

	function fn_check() {
		var corpCd = $("#corpCd").val();
		var corpNm = $("#corpName").val();
		var borNo1 = $("#borNo1").val();
		var borNo2 = $("#borNo2").val();
		var borNo3 = $("#borNo3").val();
		var ceoNm = $("#ceoNm").val();
		
		if(corpCd.length < 1) {
			alert('회사코드를 입력해 주세요.');
			return false;
		} 

		
		if(corpNm.length < 1) {
			alert('회사명을 입력해 주세요.');
			return false;
		} 
		
		if(borNo1.length < 1 || borNo2.length < 1 || borNo3.length < 1) {
			alert('사업자 번호를 확인하세요.');
			return false;
		}
		
		if(ceoNm.length < 1) {
			alert('대표자를 입력해 주세요.');
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
	
	function fn_reset() {
		
		var frm = document.forms.searchForm;
		
		frm.corpNm.value = "";
		frm.userNm.value = "";
	}
	