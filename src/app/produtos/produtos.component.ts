import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../produto.service';
import { IProduto } from './../produtos';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: IProduto[] | undefined;
  quantidade = 1;
  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
  ) { }
  

  ngOnInit(): void {
    const produtos = this.produtoService.getAll();
    this.route.queryParamMap.subscribe(params =>{
      const descricao = params.get("descricao")?.toLowerCase();
      if(descricao){
        this.produtos = produtos.filter(produto => produto.descricao.toLowerCase().includes(descricao));
        return;
      }
      this.produtos = produtos;
    });
  }

}
