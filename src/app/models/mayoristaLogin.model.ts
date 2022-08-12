// Modelo - Maryorista Online
export class MayoristaOnline {
  constructor(
      public mayoristaId: string,
      public email: string,
      public descripcion: string,
      public confirm: boolean,
      public role: string,
      public activo: boolean
  ){}   
}