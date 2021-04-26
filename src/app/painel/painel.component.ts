import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})
export class PainelComponent implements OnInit, OnDestroy {
  public frases: Array<Frase> = FRASES;
  public instrucao: string = 'Traduza a frase a seguir: ';
  public botao: string = 'Verificar';
  public traducao: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase;

  public progresso: number = 0;
  public coracao: string = '/assets/coracao_cheio.png';
  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit(): void {}

  ngOnDestroy() {}

  atualizaResposta(traducao: Event): void {
    this.traducao = (<HTMLInputElement>traducao.target).value;
  }

  onMouseClicl(): void {
    //Se a tradução da frase for igual a tradução escrita ele entra no if
    if (this.rodadaFrase.frasePt == this.traducao) {
      //aqui ele incrementa mais um valor na rodada
      this.rodada++;

      //depois de incrementar o valor ele iguala a frase da rodada ao array da frase no indice rodada
      this.progresso = this.progresso + 25;

      if (this.rodada === 4) {
        this.encerrarJogo.emit('vitoria');
      }

      this.atualizaRodada();
    } else if (this.traducao == '') {
      alert('É necessario digitar a tradução da palavra');
    } else {
      this.tentativas--;

      if (this.tentativas == -1) {
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  atualizaRodada(): void {
    //Define a frase da rodada com base em alguma logica
    this.rodadaFrase = this.frases[this.rodada];

    //limpa a resposta
    this.traducao = '';
  }
}
