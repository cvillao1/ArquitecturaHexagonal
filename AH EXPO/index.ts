// Importar las clases y interfaces necesarias
import { IUsuarioRepositorio } from "./arquitech";
import { AuthenticationService } from "./arquitech";
import { AuthenticationServiceAdapter } from "./arquitech";
import { InmemoriaIUsuarioRepositorio } from "./arquitech";


// Crear una instancia del repositorio de usuarios en memoria
const userRepository: IUsuarioRepositorio = new InmemoriaIUsuarioRepositorio();

// Crear una instancia del servicio de autenticación
const authService = new AuthenticationService(userRepository);

// Crear una instancia del adaptador de autenticación
const authAdapter = new AuthenticationServiceAdapter(authService);

// Registra un usuario
const username = 'Carlos Luis';
const password = 'casdasd';
authService.registerUser(username, password);


// Autentica al usuario registrado
const isAuthenticated = authService.authenticateUser(username, password);
console.log('¿El usuario está autenticado?', isAuthenticated);
console.log("Hola Bienvenido, Carlos Luis");