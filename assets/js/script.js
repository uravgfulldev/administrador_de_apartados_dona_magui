document.getElementById("btn_register").addEventListener("click",register);
document.getElementById("btn_login").addEventListener("click",login);
var container_login_register=document.querySelector(".container_login_register");
var formulario_login=document.querySelector(".form_login");
var formulario_register=document.querySelector(".form_register");
var back_box_login=document.querySelector(".back_box_login");
var back_box_register=document.querySelector(".back_box_register");

function anchoPagina(){
    if(window.innerWidth > 850){
        back_box_login.style.display= "block";
        back_box_register.style.display= "block";
    }else{
        back_box_register.style.display= "block";
        back_box_register.style.opacity="1";
    }

}
function register(){
    if(window.innerWidth > 850){
        formulario_register.style.display="block";
        container_login_register.style.left="410px";
        formulario_login.style.display="none";
        back_box_login.style.opacity="1";
        back_box_register.style.opacity="0";   
    }else{
        formulario_register.style.display="block";
        container_login_register.style.left="0px";
        formulario_login.style.display="none";
        back_box_login.style.opacity="1";
        back_box_register.style.display="none";
        back_box_login.style.display="block";
    }
    
}
function login(){
    if(window.innerWidth>840){
        formulario_register.style.display="none";
        container_login_register.style.left="10px";
        formulario_login.style.display="block";
        back_box_login.style.opacity="0";
        back_box_register.style.opacity="1";
    } else{
        formulario_register.style.display="none";
        container_login_register.style.left="0px";
        formulario_login.style.display="block";
        back_box_login.style.display="none";
        back_box_register.style.display="block";

    }  
}
    