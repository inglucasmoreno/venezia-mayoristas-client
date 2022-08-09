export interface Usuario {
  
  // CREDENCIALES DE ACCESO
  
  email: string,
  password: string,
  
  // OTROS DATOS
  
  descripcion: string,            // Nombre o Razon social
  tipo_identificador: string,     
  identificador: string,
  role: string,
  telefono: string,
  direccion: string,
  activo: boolean  

}