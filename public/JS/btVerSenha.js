const btVerSenha = document.getElementById("btVerSenha");
const campoSenha = document.getElementById("senha");
const iconSenha = document.getElementById('iconSenha');

btVerSenha.addEventListener('click', () => {
  if (campoSenha.type === "password") {
    campoSenha.type = "text";
    btVerSenha.value = "Ocultar senha";
    iconSenha.src = "/ICONS/olho-nao-ver-senha.svg";
  } else {
    campoSenha.type = "password";
    btVerSenha.value = "Ver senha";
    iconSenha.src = "/ICONS/olho-ver-senha.svg";
  }
});