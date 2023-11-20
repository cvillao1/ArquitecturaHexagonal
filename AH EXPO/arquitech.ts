
//Capa de Dominio
export class Usuario {  // Representa una entidad de usuario en el dominio
    private id: string;
    private username: string;
    private password: string;
    constructor(id: string, username: string, password: string){
        this.id= id;
        this.username= username;
        this.password= password;
    }
    public getId(): string {
      return this.id;
    }
  
    public getUsername(): string {
      return this.username;
    }
  
    public getPassword(): string {
      return this.password;
    }
    public setUsername(username: string): void {
        this.username = username;
      }
    
      public setPassword(password: string): void {
        this.password = password;
      }    
    public validatePassword(password: string): boolean {
      return this.password === password;
    }
  }
  // Capa de Dominio
  export interface IAuthenticationService {   //Define la interfaz del servicio de autenticacion en el dominio
    registerUser(username: string, password: string): void;
    authenticateUser(username: string, password: string): boolean;
  }
  
  // Capa de aplicacion 
  export class AuthenticationServiceAdapter { //  Adaptador que conecta la capa de aplicacion con la capa de dominio
    private authenticationService: IAuthenticationService;
  
    constructor(authenticationService: IAuthenticationService) {
      this.authenticationService = authenticationService;
    }
  
    public registerUser(username: string, password: string): void {
      this.authenticationService.registerUser(username, password);
    }
  
    public authenticateUser(username: string, password: string): boolean {
      return this.authenticationService.authenticateUser(username, password);
    }
  }
  // Capa de Infraestructura
  // Implementa la logica de la autenticacion utilizando la interfaz del servicio de autenticacion
  import { v4 as uuidv4 } from 'uuid';
  export class AuthenticationService implements IAuthenticationService {
    private userRepository: IUsuarioRepositorio;
  
    constructor(userRepository: IUsuarioRepositorio) {
      this.userRepository = userRepository;
    }
  
    public registerUser(username: string, password: string): void {
        const userId= uuidv4();
        const user = new Usuario(userId, username, password);
        this.userRepository.saveUser(user);
        console.log("ID UNICO DEL USUARIO: ", userId);
      }
  
    public authenticateUser(username: string, password: string): boolean {
      const user = this.userRepository.getUserByUsername(username);
      if (user && user.validatePassword(password)) {
        return true;
      }
      return false;
    }
  
    public getUserUUID(username: string): string | null {
      const user = this.userRepository.getUserByUsername(username);
      if (user) {
        return user.getId();
      }
      return null;
    }
  }
  // Capa de Infraestructura
  //Define la interfaz del repositorio de usuarios en la capa de infraestructura
  export interface IUsuarioRepositorio {
    saveUser(user: Usuario): void;
    getUserByUsername(username: string): Usuario | null;
  }
  //Capa de Infraestructura
  //Implementacion en memoria del repositorio de usuarios
  export class InmemoriaIUsuarioRepositorio implements IUsuarioRepositorio {
    private users: Usuario[];
  
    constructor() {
      this.users = [];
    }
  
    public saveUser(user: Usuario): void {
      this.users.push(user);
      console.log('Guardando el usuario en la base de datos...');
    }
  
    public getUserByUsername(username: string): Usuario | null {
      const user = this.users.find((u) => u.getUsername() === username);
      return user ? user : null;
    }
  }