// punto 1
class Usuario {
    constructor(id, nombre, correo, contraseña) {
      this.id = id;
      this.nombre = nombre;
      this.correo = correo;
      this.contraseña = contraseña;
    }
}
//  punto 2
class Formulario {
    constructor() {
      this.usuariosRegistrados = [];
    }
    // punto 3
    validarNombre(nombre) {
      return nombre.length >= 3;
    }
    // punto 4
    validarCorreo(correo) {
      const re = /\S+@\S+\.\S+/;
      return re.test(correo);
    }
    // punto 5
    validarContraseña(contraseña) {
      const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(contraseña);
    }
    //  punto 6
    registrarUsuario(id, nombre, correo, contraseña) {
      if (this.validarNombre(nombre) && this.validarCorreo(correo) && this.validarContraseña(contraseña)) {
        const nuevoUsuario = new Usuario(id, nombre, correo, contraseña);
        this.usuariosRegistrados.push(nuevoUsuario);
        return true;
      }else{
        return false;
      }
    }
}
// punto 7
class TablaUsuarios {
    constructor(usuarios) {
      this.usuarios = usuarios;
    }
    // ... punto 7
    render() {
      let tabla = "<table><tr><th>ID</th><th>Nombre</th><th>Correo</th></tr>";
      this.usuarios.forEach(usuario => {
        tabla += `<tr><td>${usuario.id}</td><td>${usuario.nombre}</td><td>${usuario.correo}</td></tr>`;
      });
      tabla += "</table>";
      return tabla;
    }
}
// punto 8
const formulario = new Formulario();
const formElement = document.createElement('form');
formElement.innerHTML = `
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" required><br>
  <label for="correo">Correo electrónico:</label>
  <input type="email" id="correo" name="correo" required><br>
  <label for="contraseña">Contraseña:</label>
  <input type="password" id="contraseña" name="contraseña" required><br>
  <input type="submit" value="Registrar">
`;
document.body.appendChild(formElement);

// punto 9
formElement.addEventListener('submit', function(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;
  const id = formulario.usuariosRegistrados.length + 1;
  if (formulario.registrarUsuario(id, nombre, correo, contraseña)) {
    tablaUsuariosElement.innerHTML = tablaUsuarios.render();
    formElement.reset();
  } else {
    alert('El nombre debe contener mas de 3 caracteres y la contraseña debe contener al menos 8 caracteres una letra mayuscula, una minuscula y un numero.'  );
  }
});

// punto 10
const tablaUsuarios = new TablaUsuarios(formulario.usuariosRegistrados);
const tablaUsuariosElement = document.createElement('div');
tablaUsuariosElement.innerHTML = tablaUsuarios.render();
document.body.appendChild(tablaUsuariosElement);