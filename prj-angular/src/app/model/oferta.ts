export class Oferta {
 
 
 
 
    constructor(
      public obid?: number,
      public obDescricao?: string,
      public obIniVig?: string,
      public obFimVig?: string,
      public obLimite?: number,
      public oblIntavalo?: number,
      public obQtdDiaBol?: number,
      public obQtdDiaGraca?: number,
      public obTipo?: number,
      public obTipoAcordo?: string,
      public filas?: Array<string>,
    ) { }
   
  }
  
  