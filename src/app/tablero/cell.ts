export class Cell {
    constructor(
        public colorFondo: string,
        public pieza: string,
        public letra: string,
        public x: number,
        public y: number,
        public equipo: number,
        public primeraJugada: number
    ){}
}
