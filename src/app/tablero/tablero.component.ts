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
  private primeraJugadaAnterior: number;

  constructor() { }

  ngOnInit() {
    let arrayAux: Array<Cell> = [];
    let ctrlFila = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        arrayAux[j] = { colorFondo: this.calculateColor(j, ctrlFila), pieza: this.ficha(j, i, this.calculateColor(j, ctrlFila)), letra: this.calculateLetra(j, ctrlFila), x: i, y: j, equipo: this.getEquipo(i), primeraJugada: this.getPrimeraJugada(i) };
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

  public eleccion(x, y, pieza, equipo, primeraJugada) {
    console.log(x, y)
    if (this.eleccionMovimiento === 0) {
      if (this.controlEquipo === equipo && equipo != 0) {
        if (pieza) {
          this.anteriorY = y;
          this.anteriorX = x;
          this.piezaAnterior = pieza;
          this.eleccionMovimiento = 1;
          this.primeraJugadaAnterior = primeraJugada;
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
      if (this.controlPieza(x, y)) {
        this.controlEquipo = this.controlEquipo === 1 ? 2 : 1;
        this.chessVector[x][y].pieza = this.piezaAnterior;
        this.chessVector[this.anteriorX][this.anteriorY].pieza = '';
        this.chessVector[x][y].equipo = this.chessVector[this.anteriorX][this.anteriorY].equipo;
        this.chessVector[this.anteriorX][this.anteriorY].equipo = 0;
        this.chessVector[x][y].primeraJugada = 0;
      } else {
        alert("Ilegal")
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

  private controlPieza(x, y) {
    let movimiento: boolean = true;
    switch (this.piezaAnterior) {
      case "P":
        movimiento = this.controlPeon(x, y);
        break;
      case "T":
        movimiento = this.controlTorre(x, y);
        break;
      case "A":
        movimiento = this.controlAlfil(x, y);
        break;

      default:
        break;
    }
    return movimiento;
  }

  private controlPeon(x, y) {
    let posible: boolean = false;
    this.chessVector.map((item) => {
      item.map((obj) => {
        if (this.anteriorY === y) {
          if (this.primeraJugadaAnterior && ((obj.x === this.anteriorX + 2 && x === this.anteriorX + 2) || (obj.x === this.anteriorX - 2 && x === this.anteriorX - 2))) {
            //Movimiento top
            if (this.controlEquipo === 1 && obj.x === this.anteriorX + 2 && x === this.anteriorX + 2) {
              posible = true;
              //Movimiento bot
            } else if (this.controlEquipo === 2 && obj.x === this.anteriorX - 2 && x === this.anteriorX - 2) {
              posible = true;
            }
          } else {
            //Movimiento top
            if (this.controlEquipo === 1 && obj.x === this.anteriorX + 1 && x === this.anteriorX + 1) {
              posible = true;
              //Movimiento bot
            } else if (this.controlEquipo === 2 && obj.x === this.anteriorX - 1 && x === this.anteriorX - 1) {
              posible = true;
            }
          }
        } else {
          //Movimiento top
          if (this.controlEquipo === 1 && obj.x === this.anteriorX + 1 && (y === this.anteriorY + 1 || y === this.anteriorY - 1) && x === this.anteriorX + 1 && this.chessVector[x][y].pieza && this.chessVector[x][y].equipo !== this.controlEquipo) {
            this.matarPieza(x, y);
            posible = true;
            //Movimiento bot
          } else if (this.controlEquipo === 2 && obj.x === this.anteriorX - 1 && (y === this.anteriorY + 1 || y === this.anteriorY - 1) && x === this.anteriorX - 1 && this.chessVector[x][y].pieza && this.chessVector[x][y].equipo !== this.controlEquipo) {
            this.matarPieza(x, y);
            posible = true;
          }
        }
      })
    })

    return posible;
  }

  private controlTorre(x, y) {
    let posible: boolean = false;
    if (this.movimientoHorizontal(x, y)) {
      if (this.sinObstaculos(x, y)) {
        posible = true;
      }
    }
    return posible;
  }

  private getPrimeraJugada(x) {
    if (x === 1 || x === 6) {
      return 1;
    } else {
      return 0;
    }
  }

  private matarPieza(x, y) {
    this.chessVector[x][y].letra = this.piezaAnterior;
  }

  private movimientoHorizontal(x, y) {
    let movimientoHorizontal: boolean = false;
    if ((this.anteriorX === x && this.anteriorY !== y) || (this.anteriorX !== x && this.anteriorY === y)) {
      movimientoHorizontal = true;
    }
    return movimientoHorizontal;
  }

  private movimientoDiagonal(x, y) {
    let movimientoDiagonal: boolean = false;
    let i = this.anteriorX;
    let j = this.anteriorY;
    if (this.anteriorX < x && this.anteriorY < y) {
      
    } else if (this.anteriorX > x && this.anteriorY < y) {
      
    } else if (this.anteriorX < x && this.anteriorY > y) {
      
    } else if (this.anteriorX > x && this.anteriorY > y) {
      if((x+y)%2 === 0){

      }
    }

    return movimientoDiagonal;
  }

  private sinObstaculos(x, y) {
    let sinObtaculo: boolean = false;
    switch (this.piezaAnterior) {
      case 'T':
        sinObtaculo = this.sinObstaculosHorizontal(x, y);
        break;
      default:
        break;
    }
    return sinObtaculo;
  }

  private sinObstaculosHorizontal(x, y) {
    let sinObstaculo: boolean = true;
    if (this.anteriorX === x && this.anteriorY !== y) {
      sinObstaculo = this.calculoHorizontal(x, y, 'v');
    } else {
      sinObstaculo = this.calculoHorizontal(x, y, 'h');
    }
    return sinObstaculo;
  }

  private calculoHorizontal(x, y, tipo) {
    let matar: boolean = false;
    let cont: number = 0;
    this.chessVector[this.anteriorX][this.anteriorY].pieza = ""
    if (tipo === 'v') {
      if (y > this.anteriorY) {
        for (let i = this.anteriorY; i <= y; i++) {
          if (this.chessVector[x][i].pieza) {
            cont++;
          }
        }
      } else {
        for (let i = this.anteriorY; i >= y; i--) {
          if (this.chessVector[x][i].pieza) {
            cont++;
          }
        }
      }
    } else {
      if (x > this.anteriorX) {
        for (let i = this.anteriorX; i <= x; i++) {
          if (this.chessVector[i][y].pieza) {
            cont++;
          }
        }
      } else {
        for (let i = this.anteriorX; i >= x; i--) {
          if (this.chessVector[i][y].pieza) {
            cont++;
          }
        }
      }
    }

    if (cont === 1 && this.chessVector[x][y].pieza && this.chessVector[x][y].equipo !== this.controlEquipo) {
      this.matarPieza(x, y);
      matar = true;
    } else if (cont === 0) {
      matar = true;
    } else {
      this.chessVector[this.anteriorX][this.anteriorY].pieza = this.piezaAnterior;
    }
    return matar;
  }

  private controlAlfil(x, y) {
    let movimiento: boolean = false;
    if (this.movimientoDiagonal(x, y)) {
      movimiento = true;
    }
    return movimiento;
  }

}
