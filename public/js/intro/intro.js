	
	/* 필수 구분 체크 */
	function fn_check() {
		var corpCd = $(':radio[name="corpCd"]:checked').val();
		var userId = $('#userId').val();
		var userPwd = $('#userPwd').val();
		
		if(!corpCd) {
			alert('사용자 구분을 선택해 주세요.');
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
		return true;		
	}
	
	/* ---------------------------------------------------- 쿠키 아이디 저장 시작 ----------------------------------------------*/
	// 아이디 저장 체크박스 선택시 호출되는 이벤트
	function confirmSave(checkbox) {
		var isRemember;
		
		if(checkbox.checked) {
			isRemember = confirm("이 PC에 로그인 정보를 저장하시겠습니까? PC방등의 공공장소에서는 개인 정보가"
					+ " 유출될 수 있으니 주의해주십시오.");
			if(!isRemember) {
				checkbox.checked = false;
				deleteCookie("userInputId");
			}
			else {
				var userInputId = $("input[name='userId']").val();
				setCookie("userInputId", userInputId, 7);
			}
		} else {
			checkbox.checked = false;
			deleteCookie("userInputId");
		}
	}
	
	// 쿠키 설정
	function setCookie(name, value, expiredays) {
		var today = new Date();
		today.setDate(today.getDate() + expiredays);
		var cookieValue = escape(value) + ((expiredays==null) ? "" : "; expires=" + today.toGMTString());
		document.cookie = name + "=" + cookieValue;
	}
	
	// 쿠키 삭제
	function deleteCookie(name) {
		var today = new Date();
		today.setDate(today.getDate() -1);
		document.cookie = name + "=" + "; expires=" + today.toGMTString();
	}
	
	// 설정된 쿠키의 값을 가져옴
	function getCookie(cName) {
		
		cName = cName + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf(cName);
		var cValue = "";
		if(start != -1) {
			start += cName.length;
			var end = cookieData.indexOf(';', start);
			if(end == -1) end = cookieData.length;
			cValue = cookieData.substring(start, end);
			
		}
		return unescape(cValue);
	}
	/* ---------------------------------------------------- 쿠키 아이디 저장 끝 ----------------------------------------------*/