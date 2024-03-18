import "./_style.scss";

export default function Request() {
  return (
    <>
      <section className="container">
        <div className="main">
          <div className="header">
            <span>Novo Pedido de Requisição</span>
          </div>

          <div className="conteudo">
            <div className="titulo">
              <span>Dados Principais | Requisição Nº </span>
              <input
                min="0"
                className="greenInput w-25"
                data-isnumber="true"
                type="number"
                id="inpNumero"
              />
            </div>
            <div className="dadosPrincipais">
              <form className="dados-content">
                <div className="row">
                  <div className="grid-4">
                    <label htmlFor="idDepartamento">ID</label>
                    <input
                      className="greenInput"
                      id="idDepartamento"
                      min="0"
                      data-isnumber="true"
                      name="validated"
                      type="number"
                      // onChange={handleChange}
                    ></input>
                  </div>
                  <div className="grid-4">
                    <label htmlFor="nomeDepartamento">Departamento</label>
                    <input
                      disabled
                      type="text"
                      name="validated"
                      id="departamento"
                      // onChange={handleChange}
                    ></input>
                  </div>
                  <div className="grid-4">
                    <label htmlFor="dataRequesicao">Data Requisição</label>
                    <input
                      type="date"
                      name="validated"
                      id="dataRequesicao"
                      // onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="grid-4">
                    <label htmlFor="idFuncionario">ID</label>
                    <input
                      type="number"
                      name="validated"
                      id="idFuncionario"
                      className="greenInput"
                      // onChange={handleChange}
                    ></input>
                  </div>
                  <div className="grid-4">
                    <label htmlFor="nomeFuncionario">Nome</label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="NomeFuncionario"

                      // onChange={handleChange}
                    ></input>
                  </div>
                  <div className="grid-4">
                    <label htmlFor="cargo">Cargo</label>
                    <input
                      className="greenInput"
                      disabled
                      type="text"
                      name="validated"
                      id="cargo"
                      // onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="grid-4">
                    <label htmlFor="categoriaMotivo">Categoria Motivo</label>
                    <select
                      className="greenInput"
                      id="categoriaMotivo"
                    ></select>
                  </div>
                  <div className="grid-4">
                    <label htmlFor="motivo">Motivo</label>
                    <select
                      disabled
                      id="motivo"
                      // onChange={handleChange}
                    ></select>
                  </div>
                  <div className="grid-4">
                    <label htmlFor="prioridade">Prioridade</label>
                    <div className="radio-group flex prioridades">
                      <label htmlFor="prioridade">Baixa</label>
                      <input
                        className="baixo chkPrioridade"
                        type="radio"
                        id="prioridade"
                        name="prioridade"
                        value="Baixa"
                        // onChange={handleRadioChange}
                      />
                      <label htmlFor="prioridade">Média</label>
                      <input
                        className="medio chkPrioridade"
                        type="radio"
                        id="prioridade"
                        name="prioridade"
                        value="Media"
                        // onChange={handleRadioChange}
                      />
                      <label htmlFor="prioridade">Alta</label>
                      <input
                        className="urgente chkPrioridade"
                        type="radio"
                        id="prioridade"
                        name="prioridade"
                        value="urgente"
                        // onChange={handleRadioChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="titulo">
              <div className="titulo-produtos">
                <span>Itens da Requisição </span>
              </div>
            </div>

            <div className="itensRequisicao">
              <div className="itens-container">
                <div className="camposItens">
                  <div className="row">
                    <div className="grid-2 ">
                      <label htmlFor="idProduto">Cod. Produto</label>
                      <input
                        type="text"
                        min="0"
                        data-isnumber="true"
                        id="CodigoProduto"
                        className="greenInput"
                        // onChange={handleChange}
                      ></input>
                    </div>
                    <div className="grid-3 ">
                      <label htmlFor="nomeProduto">Nome Produto</label>
                      <input
                        disabled
                        type="text"
                        id="DescricaoProduto"
                        // onChange={handleChange}
                      ></input>
                    </div>
                    <div className="grid-2 ">
                      <label htmlFor="quantidade">Quantidade</label>
                      <input
                        disabled
                        type="text"
                        id="Estoque"
                        // onChange={handleChange}
                      ></input>
                    </div>

                    <div className="grid-2 ">
                      <label htmlFor="saida">Saida</label>
                      <input
                        disabled
                        data-isnumber="true"
                        type="number"
                        min="0"
                        id="Saida"
                        className="greenInput"
                        // onChange={handleChange}
                      ></input>
                    </div>
                    <div className="grid-1 ">
                      <div>Cor</div>
                    </div>
                    <div className="grid-2 ">
                      <div className="grupoBtnInserirItens">
                        <div className="BtnInserirItens" id="BtnInserirItens">
                          <button
                            id="button-add"
                            type="submit"
                            // onclick="adicionarProduto()"
                          >
                            Adicionar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <table id="tabela">
                    <thead>
                      <tr className="">
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Qtd</th>
                        <th>Un</th>
                        <th>Preço</th>
                        <th>Total</th>
                        <th id="table-deletar">Deletar</th>
                      </tr>
                    </thead>
                    <tbody id="tabela-body"></tbody>
                  </table>
                  <div className="box-total">
                    <p> Total </p>
                    <div className="box input-total">
                      R$
                      <p id="totalItens"></p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="camposObservacao">
                  <div className="camposBtn">
                    <div className="grupoBtn">
                      <button
                        // onClick="salvarRequisicao}
                        className="button-save btn mr-2"
                      >
                        Salvar
                      </button>
                      <button
                        //  onClick={cancelarRequisicao}
                        className="button-cancel btn"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="grupoStatusEstoque">
        <div>
          <div id="corEstoque"></div>
          <div className="modalEstoque">
            <div className="modalDiv">
              <span className="quadrado modal-verde"></span>
              <p id="statusEstoque">
                Estoque acima, ou igual de 10% do Estoque mínimo
              </p>
            </div>
            <div className="modalDiv">
              <span className="quadrado modal-amarelo"></span>
              <p id="statusEstoqueMinimo">
                Estoque abaixo de 10% e maior o igual que o Estoque mínimo
              </p>
            </div>
            <div className="modalDiv">
              <span className="quadrado modal-vermelho"></span>
              <p id="statusEstoqueMaximo">Estoque abaixo do Estoque mínimo</p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
