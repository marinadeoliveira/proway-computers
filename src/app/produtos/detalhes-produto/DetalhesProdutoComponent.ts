import { CarrinhoService } from './../../carrinho.service';
import { NotificacaoService } from './../../notificacao.service';
import { ProdutoService } from './../../produto.service';
import { IProduto, IProdutoCarrinho } from './../../produtos';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {
  produto: IProduto | undefined;
  quantidade = 1; 
  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private carrinhoService: CarrinhoService
    ) { }


  


  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const produtoId = Number(routeParams.get("id"));
    this.produto = this.produtoService.getOne(produtoId);
  }
 adicionarAoCarrinho(){
   this.notificacaoService.notificar("O produto foi adicionado ao carrinho");
   const produto: IProdutoCarrinho ={
   ...this.produto!,
   quantidade: this.quantidade
  }
  this.carrinhoService.adicionarAoCarrinho(produto);
}
}
