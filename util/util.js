function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}


function formValidate(val, type) {
    let phoneReg = /(^1[3|4|5|7|8|6|9]\d{9}$)|(^09\d{8}$)/,
        emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
        password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,30}$/
    if (val === '') {
        return false
    } else {

        if (type === 'require') {
            return !!val.replace(/\s+/g, "")
        }
        if (type === 'phone') {
			console.log(val)
            return phoneReg.test(val)
        }
        if (type === 'email') {
            return emailReg.test(val)
        }
        if (type === 'password') {
            return password.test(val)
        }
    }
}


module.exports = {
	throttle:throttle,
	formValidate:formValidate,
	vuemixin:{
		created: function () { console.log(1) }
	}
}