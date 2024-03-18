/* eslint-disable react/prop-types */
import { useState } from "react";
import "./_style.scss";
import { API } from "../../api/API";

export default function CreateProductModal({ handleShowModal, getProdutos }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.descricao.trim() === "" ||
      formData.estoqueAtual <= 0 ||
      formData.estoqueMinimo <= 0
    ) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    API.post("/Produtos", formData).then(() => {
      getProdutos();
    });

    handleShowModal();
  };

  return (
    <div className="container-product-modal">
      <div className="content-product-modal">
        <div className="flex-column-center">
          <h4 className="mb-5 ">Cadastrar novo produto</h4>
        </div>
        <form className="form-product-modal" onSubmit={handleSubmit}>
          <div className="flex-column">
            <label htmlFor="descricao">Nome:</label>
            <input
              className="inputCreateProduct"
              type="text"
              placeholder="Descrição do produto"
              name="descricao"
              onChange={handleChange}
            />
          </div>
          <div className="flex-column mt-1">
            <label htmlFor="estoqueAtual">Estoque Atual:</label>
            <input
              className="inputCreateProduct"
              type="text"
              name="estoqueAtual"
              placeholder="Estoque Atual Produto"
              onChange={handleChange}
            />
          </div>
          <div className="flex-column mt-1">
            <label htmlFor="estoqueMinimo">Estoque Mínimo:</label>
            <input
              className="inputCreateProduct"
              type="text"
              name="estoqueMinimo"
              placeholder="Estoque mínimo Produto"
              onChange={handleChange}
            />
          </div>
          <div className="flex-center mt-3">
            <button type="submit" className="btnGreen w-25 mr-2">
              Salvar
            </button>
            <button
              type="submit"
              onClick={handleShowModal}
              className="btnRed w-25"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
