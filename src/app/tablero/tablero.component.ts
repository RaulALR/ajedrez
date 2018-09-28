import { Component, OnInit } from '@angular/core';

import { Cell } from "./cell";

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  public chessVector: Array<Array<Cell>> = [];
  private eleccionMovimiento: number = 0;
  private anteriorY: number;
  private anteriorX: number;
  private piezaAnterior: string;
  private controlEquipo: number = 1;

  constructor() { }

  ngOnInit() {
    let arrayAux: Array<Cell> = [];
    let ctrlFila = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        arrayAux[j] = { colorFondo: this.calculateColor(j, ctrlFila), pieza: this.ficha(j, i, this.calculateColor(j, ctrlFila)), letra: this.calculateLetra(j, ctrlFila), x: i, y: j, equipo: this.getEquipo(i) };
      }
      this.chessVector.push(arrayAux);
      arrayAux = [];
      ctrlFila = ctrlFila === 0 ? 1 : 0;
    }
    console.log(this.chessVector)
  }

  private calculateColor(position: number, ctrlPos: number) {
    let color: string;
    if (ctrlPos === 0) {
      if (position === 0 || position % 2 === 0) {
        color = "white";
      } else {
        color = "black";
      }
    } else {
      if (position === 0 || position % 2 === 0) {
        color = "black";
      } else {
        color = "white";
      }
    }
    return color;
  }

  private ficha(posicion: number, fila: number, color: string) {
    let pieza: string = '';
    if (fila === 1 || fila === 6) {
      pieza = "P";
    }

    if (fila === 0 || fila === 7) {
      if (posicion === 0 || posicion === 7) {
        pieza = "T";
      }
      if (posicion === 1 || posicion === 6) {
        pieza = "C";
      }
      if (posicion === 2 || posicion === 5) {
        pieza = "A"
      }
      if (posicion === 3 || posicion === 4) {
        pieza = 'Q'
      }
      if (posicion === 4) {
        pieza = 'K'
      }
    }

    return pieza;
  }

  private calculateLetra(position: number, ctrlPos: number) {
    let color: string;
    if (ctrlPos === 0) {
      if (position === 0 || position % 2 === 0) {
        color = "black";
      } else {
        color = "white";
      }
    } else {
      if (position === 0 || position % 2 === 0) {
        color = "white";
      } else {
        color = "black";
      }
    }
    return color;
  }

  public eleccion(x, y, pieza, equipo) {
    console.log(x, y)
    if (this.eleccionMovimiento === 0) {
      if (this.controlEquipo === equipo && equipo != 0) {
        if (pieza) {
          this.anteriorY = y;
          this.anteriorX = x;
          this.piezaAnterior = pieza;
          this.eleccionMovimiento = 1;
        } else {
          alert("seleccione pieza puto")
        }
      } else {
        alert("Coge una de las tuyas puto")
      }
    } else if (this.eleccionMovimiento === 1) {
      this.moverPieza(x, y)
      this.eleccionMovimiento = 0;
    }
  }

  private moverPieza(x, y) {
    if (this.anteriorX != x || this.anteriorY != y) {
      if (!this.chessVector[x][y].pieza) {
        this.controlEquipo = this.controlEquipo === 1 ? 2 : 1;
        this.chessVector[x][y].pieza = this.piezaAnterior;
        this.chessVector[this.anteriorX][this.anteriorY].pieza = '';
        this.chessVector[this.anteriorX][this.anteriorY].equipo = 0;
      }
    }
  }

  private getEquipo(fila) {
    let equipo: number;
    if (fila === 0 || fila === 1) {
      equipo = 1;
    } else if (fila === 6 || fila === 7) {
      equipo = 2;
    } else {
      equipo = 0;
    }
    return equipo;
  }

}
