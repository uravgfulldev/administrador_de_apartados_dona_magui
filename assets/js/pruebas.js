
  
function create(){
  const template= document.createElement("template");
  html= `
  <div class="col-lg-4 col-sm-6 dish-box-wp breakfast" data-cat="breakfast">
  <div class="dish-box text-center">
  <div class="dist-img">
    <img src="assets/images/Comidas/carneEnSuJugo.jpg" alt="">
  </div>
  <div class="dish-title">
    <h3 class="h3-title">Carne en su jugo</h3>
  </div>
  <div class="dist-bottom-row">
    <ul>
      <li>
        <b>$ 75</b>
      </li>
      <li>
        <button class="dish-add-btn">
          <i class="uil uil-plus"></i>
        </button>
      </li>
    </ul>
  </div>
  </div>
  </div>'
  `
 template.innerHTML=html.trim();
 const myHtmlElement=template.content.firstElementChild;

document.getElementById("menu-lunes").appendChild(myHtmlElement);
}