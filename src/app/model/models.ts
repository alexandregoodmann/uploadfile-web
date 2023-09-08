export class Agentes {
    agente: Agente[] = [];
}

export class Agente {
    codigo!: number;
    data!: Date;
    regiao: Regiao[] = [];
}

export class Regiao {
    sigla!: string;
    geracao: Compra = new Compra;
    compra: Compra = new Compra;
    precoMedio: Compra = new Compra;
}

export class Compra {
    valor: number[] = [];
}