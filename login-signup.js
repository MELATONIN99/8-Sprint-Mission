const $input = document.getElementsByClassName('input-text');
const $email = document.getElementById('email');
const $password = document.getElementById('password');
const $checkPassword = document.getElementById('checkPassword');
const $loginBtn = document.getElementsByClassName('login-btn');
const $loginForm = document.getElementById('loginForm');
const $conditionMessage = document.querySelectorAll('.condition-message');
const $passwordEye = document.getElementById('passwordEye');
const $checkPasswordEye = document.getElementById('checkPasswordEye');
const PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const pass = [false, false, false, false];

// 인풋 입력값있는지 체크
function inputCheck(e) {
  const $target = e.target;
  const $message = $target.nextElementSibling;
  const isValid = $target.value.trim() === '';
  $target.classList.toggle('error2', isValid);
  $message.classList.toggle('waring2', isValid);
}

// 이메일 정규식 체크
function emailCheck(e) {
  if (e.target.id !== 'email') return;
  const $target = e.target;
  const $message = $conditionMessage[0];
  const isValid = PATTERN.test($email.value) || $target.value.length === 0;
  $target.classList.toggle('error', !isValid);
  $message.classList.toggle('waring', !isValid);
}

// // 비밀번호 8글자 이상인지 체크
function passwordCheck(e) {
  if (e.target.id !== 'password') return;
  const $target = e.target;
  const $message = $target.nextElementSibling.nextElementSibling;
  const isValid = $target.value.length >= 8 || $target.value.length === 0;
  $target.classList.toggle('error', !isValid);
  $message.classList.toggle('waring', !isValid);
}

// 비밀번호 재확인 체크
function ReCheckPassword(e) {
  if (e.target.id !== 'checkPassword') return;
  const $target = e.target;
  const $message = $conditionMessage[2];
  const isValid = $password.value !== $checkPassword.value;
  $target.classList.toggle('error', isValid);
  $message.classList.toggle('waring', isValid);
}

// 조건 충족했는지 체크
function meetsCondition() {
  for (let i = 0; i < $input.length; i++) {
    const isError = $input[i].classList.contains('error') || $input[i].classList.contains('error2');
    if ($input[i].value !== '') {
      pass.splice(i, 1, isError ? false : true);
    }
  }
}

// 모든 조건을 충족했는지 체크 후 충족했다면 버튼 활성화
function meetAallConditions() {
  const isPass = $input.length === 2 ? pass.slice(0, 2) : pass;
  const isValid = isPass.every((value) => value === true);
  $loginBtn[0].classList.toggle('accept', isValid);
}

// 포커스 아웃 시에 함수들을 실행하여 조건 확인
$loginForm.addEventListener('focusout', (e) => {
  emailCheck(e);
  passwordCheck(e);
  if ($input.length === 4) {
    ReCheckPassword(e);
  }
  inputCheck(e);
  meetsCondition();
  meetAallConditions();
});

// 모든 조건 만족 시 submit 하여 페이지 이동
$loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  meetsCondition();
  meetAallConditions();
  if ($loginBtn[0].classList.contains('accept')) {
    $input.length === 2 ? (window.location.href = '/items') : (window.location.href = '/signin');
  }
});

// 패스워드 눈알 아이콘 클릭 시 패스워드 보임/숨김 변경
$passwordEye.addEventListener('click', () => {
  if ($password.type === 'text') {
    $password.type = 'password';
    $passwordEye.src = 'image/icon/btn_icon/visibilty_off.png';
  } else {
    $password.type = 'text';
    $passwordEye.src = 'image/icon/btn_icon/visibilty_on.png';
  }
});

$checkPasswordEye.addEventListener('click', () => {
  if ($checkPassword.type === 'text') {
    $checkPassword.type = 'password';
    $checkPasswordEye.src = 'image/icon/btn_icon/visibilty_off.png';
  } else {
    $checkPassword.type = 'text';
    $checkPasswordEye.src = 'image/icon/btn_icon/visibilty_on.png';
  }
});
