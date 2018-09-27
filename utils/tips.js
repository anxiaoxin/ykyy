function showTip (tip){
  let div = document.createElement("div");
  div.className = "tips-container";
  let template = 
  `
    <div>
      ${tip}                 
    </div>
  `;
  div.innerHTML = template;
  let bodyDom = document.getElementsByTagName("body")[0];
  bodyDom.appendChild(div);
  
  setTimeout(function(){
    bodyDom.removeChild(div);
  },1000)
}

export default showTip