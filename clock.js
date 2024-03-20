const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date(); 
  //newdate()객체를 date 변수에 햘당해 이후 코드에서 gethours(), getminutes()등과 같은 date객체의 여러 속성과 메소드에 접근할 수 있다. 따라서 new date()는 현재 시간을 나타내는 새로운 date객체를 생성하여 해당시간의 시분초를 가져올 수 있도록 하는데 필요하다.
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);