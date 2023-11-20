import { Usuario } from "./arquitech";

//Creamos una instancia de Usuario
const user1 = new Usuario("132131232", "Carlos Luis", "testing");

console.log("USUARIO 1");
console.log("ID: ");
console.log(user1.getId()); // Imprime: 132131232
console.log("Username: ");
console.log(user1.getUsername()); // Imprime: Carlos Luis
console.log("Contraseña: ");
console.log(user1.getPassword()); // Imprime: testing

