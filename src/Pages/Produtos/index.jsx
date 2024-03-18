import "./_style.scss";
// import lampGreenIcon from "../../assets/icons/icons8-light-green.png";
// import lampRedIcon from "../../assets/icons/icons8-light-red.png";
// import emailIcon from "../../assets/Icons/icons8-nova-mensagem-48.png";
// import deleteIcon from "../../assets/Icons/icons8-remover-48.png";
// import editIcon from "../../assets/Icons/icons8-editar-48.png";
import CreateProductModal from "../../components/CreateProductModal";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { API } from "../../api/API";
import playButton from "../../assets/play.svg";
import closeButton from "../../assets/close.svg";
import editButton from "../../assets/edit.svg";
import emailBlockButton from "../../assets/emailGrey.svg";
import lampBlueButton from "../../assets/lampBlue.svg";
import lampRedButton from "../../assets/lampRed.svg";
import emailActiveButton from "../../assets/emailActive.svg";
import CustomModal from "../../components/CustomModal";
import { ToastContainer, toast } from "react-toastify";
import spinner from "../../assets/spinner1.svg";
import { validateEmail } from "../../Utils/functions";
import pdfButton from "../../assets/pdf-Icon.svg"
import iconEmployee from "../../assets/iconAvatar.svg"
import excelButton from "../../assets/excel_icon.svg"


Modal.setAppElement("#root");

export default function Produtos() {
  const [modalIsOpenDelete, setIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [modalIsOpenConfig, setModalIsOpenConfig] = useState(false);
  const [modalIsOpenBenchmarking, setModalIsOpenBenchmarking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [formEdit, setFormEdit] = useState({});
  const [formContact, setFormContact] = useState({});
  const [processando, setProcessando] = useState(false);
  const [BenchmarkingInProgress, setBenchmarkingInProgress] = useState(false);
  const [benchmarkingProductId, setBenchmarkingProductId] = useState(null);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [selectedProductForEmailModal, setSelectedProductForEmailModal] =
    useState(null);
  const [selectedProductForDelete, setSelectedProductForDelete] =
    useState(null);

  const [selectedProductForBenchmarking, setSelectedProductForBenchmarking] =
    useState(null);

  function handleModalDelete(produto) {
    setIsOpenDelete(!modalIsOpenDelete);
    setSelectedProductForDelete(produto);
  }

  function handleModalEdit(produto) {
    setIsOpenEdit(!modalIsOpenEdit);
    setSelectedProductForEdit(produto);
  }

  const handleEmailModal = (produto) => {
    setModalIsOpenConfig(!modalIsOpenConfig);
    setSelectedProductForEmailModal(produto);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getProducts();
    const dataContact = JSON.parse(localStorage.getItem("dataContact"));
    setFormContact(dataContact);
  }, []);

  const getProducts = () => {
    API.get("/Produtos").then((response) => {
      setProducts(response.data.data);
    });
  };

  const statusEmail = (product) => {
    if (product.branchmarking != null) {
      if (product.branchmarking.statusEmail == 1) {
        return 1;
      }
      return 0;
    } else {
      return 0;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEdit((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitEdit = (produto) => {
    if (formEdit.estoqueAtual <= 0 || formEdit.estoqueMinimo <= 0) {
      alert("Preencha todos os campos obrigatórios");
      return;
    } else {
      API.put("/Produtos/" + produto.id, formEdit)
        .then(() => {
          toast.success(`Sucesso ao editar produto ${produto.descricao}`);
          handleModalEdit();
          getProducts();
        })
        .catch(() => {
          toast.error(`Error ao editar produto ${produto.descricao}`);
        });
    }
  };

  const processBenchmarking = (product) => {
    if (processando) return;

    getProducts();

    if (product.branchmarking == null && product.branchmarkingId != 707336527) {
      setProcessando(true);
      setBenchmarkingInProgress(true);
      setBenchmarkingProductId(product.id);
      API.get("/Crawler/benchmarking/" + product.id)
        .then((response) => {
          if (response.status == 200) {
            getProducts();
            toast.success(
              `Sucesso ao fazer benchmarking do produto ${product.descricao}`
            );
          } else {
            toast.success(
              `Error ao fazer benchmarking do produto ${product.descricao}`
            );
          }
        })
        .then(() => {})
        .finally(() => {
          setBenchmarkingInProgress(false);
          setProcessando(false);
        });
    } else {
      handleModalBenchmarking(product);
      return;
    }
  };

  const sendEmail = (product) => {
    if (processando) return;
    const dataContact = JSON.parse(localStorage.getItem("dataContact"));

    if (statusEmail(product) == 0 && product.branchmarking != null) {
      setProcessando(true);

      API.get(
        `/Crawler/enviar-email/${product.id}?userEmail=${
          dataContact.email
        }&userWhatsapp=${
          dataContact.whatsapp === "79988353265" ? "null" : dataContact.whatsapp
        }`
      )
        .then(() => {
          toast.success(
            `Sucesso ao enviar relatório do produto ${product.descricao}`
          );
          getProducts();
        })
        .catch(() => {
          toast.error(
            `Error ao enviar relatório do produto ${product.descricao}`
          );
        })
        .finally(() => {
          setProcessando(false);
        });
    } else {
      toast.warning(
        `Confira se foi feito benchmarking para o produto ${product.descricao}`
      );
      setProcessando(false);
    }
  };

  const deleteProduto = (produto) => {
    API.delete("/Produtos/" + produto.id)
      .then(() => {
        getProducts();
        toast.success(`Produto ${produto.descricao} deletado`);
        handleModalDelete();
      })
      .catch(() => {
        toast.error(`Error ao tentar deletar produto ${produto.descricao} `);
      });
  };

  const handleChangeConfig = (e) => {
    const { name, value } = e.target;
    setFormContact((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitConfig = (product) => {
    if (formContact.email.trim() === "" || formContact.whatsapp.trim() === "") {
      toast.error("Preencha todos os campos");
      return;
    }

    if (
      formContact.whatsapp.length < 11 &&
      validateEmail(formContact.email) != false
    ) {
      toast.error("Campos inválidos");
      return;
    }

    localStorage.setItem("dataContact", JSON.stringify(formContact));

    sendEmail(product);

    handleEmailModal();
  };

  const handleModalBenchmarking = (product) => {
    if (!modalIsOpenBenchmarking) {
      setSelectedProductForBenchmarking(product);
    }
    setModalIsOpenBenchmarking(!modalIsOpenBenchmarking);
  };

  const functionIconBenchmarking = (product) => {
    if (BenchmarkingInProgress && benchmarkingProductId == product.id) {
      return spinner;
    }
    if (product.branchmarkingId == 707336527) {
      return lampRedButton;
    }
    if (product.branchmarking != null) {
      return lampBlueButton;
    } else {
      return playButton;
    }
  };

  return (
    <>
      <section className=" container mt-7">
        <div className="flex-space-between">
          <h4>Gestão de Almoxarifados</h4>
          <a className="icons">
            <img src={pdfButton} className="icon pdf-btn" />
          </a>
        </div>
        <table className="table-produtos mt-5">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th className="preco-response">Gerente</th>
              <th>Lucro Gerado</th>
              <th>Produto mais vendido</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>1</td>
                <td>Almoxarifado Aislan</td>
                <td onClick={setIsOpenDelete} className="employeeLink">João Victor</td>
                <td>R$ 12.500,90</td>
                <td>Iphone 15</td>
                <td className="icons"> 
                  <a>
                    <button className="btn" onClick={setModalIsOpenBenchmarking}>Informações</button>
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Almoxarifado André</td>
                <td className="employeeLink">Pedro Cesar</td>
                <td>R$ 13.300,90</td>
                <td>Smart TV Samsung 65 polegadas</td>
                <td className="icons"> 
                  <a>
                    <button className="btn">Informações</button>
                  </a>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Almoxarifado Igor</td>
                <td className="employeeLink">João Pedro</td>
                <td>R$ 15.350,85</td>
                <td>Iphone 15</td>
                <td className="icons"> 
                  <a>
                    <button className="btn">Informações</button>
                  </a>
                </td>
              </tr>
          </tbody>
        </table>
        <div className="flex-center"></div>
      </section>

      <CustomModal
        isOpen={modalIsOpenConfig}
        onRequestClose={handleEmailModal}
        title="Informe seus dados"
        content={
          <>
            <p className="my-1 text-center">
              Para receber o relatório preencha os dados abaixo
            </p>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="inputEmail"
                value={formContact.email}
                type="email"
                name="email"
                id="email"
                placeholder="Digite seu email"
                onChange={handleChangeConfig}
              />
            </div>

            <div>
              <label htmlFor="zap">Whatsapp:</label>
              <input
                type="text"
                name="whatsapp"
                className="inputEmail"
                id="zap"
                value={formContact.whatsapp}
                placeholder="Digite seu whatsapp"
                onChange={handleChangeConfig}
              />
            </div>

            <div className="flex-center mt-2">
              <button
                className="btnGreen mr-2"
                onClick={() => handleSubmitConfig(selectedProductForEmailModal)}
              >
                Enviar
              </button>
              <button className="btnRed " onClick={() => handleEmailModal()}>
                Cancelar
              </button>
            </div>
          </>
        }
      />

      <CustomModal
        isOpen={modalIsOpenEdit}
        onRequestClose={handleModalEdit}
        title="Editar Produto"
        content={
          <>
            <div className="flex-column">
              <label htmlFor="estoqueAtual " className="mt-3">
                Estoque Atual:
              </label>
              <input
                className="inputModal"
                type="estoqueAtual"
                name="estoqueAtual"
                id="estoqueAtual"
                placeholder="Novo Estoque Atual"
                onChange={handleChange}
              />
              <label htmlFor="estoqueAtual">Estoque Mínimo:</label>
              <input
                className="inputModal"
                type="estoqueMinimo"
                name="estoqueMinimo"
                id="estoqueMinimo"
                placeholder="Novo Estoque Mínimo"
                onChange={handleChange}
              />
            </div>
            <div className="flex-center">
              <button
                className="btnGreen mt-2 mr-2"
                onClick={() => handleSubmitEdit(selectedProductForEdit)}
              >
                Editar
              </button>
              <button className="btnRed mt-2" onClick={() => handleModalEdit()}>
                Cancelar
              </button>
            </div>
          </>
        }
      />

      <CustomModal
        isOpen={modalIsOpenDelete}
        onRequestClose={handleModalDelete}
        title="Informações do Funcionário"
        content={
          <>
            <div className="flex-center mt-2">
              <img src={iconEmployee} className="icon"/>
            </div>
            <h6 className="mt-2">Nome:</h6>
            <span className="gray-1">João Victor</span>
            <h6 className="mt-2">ID Funcionário:</h6>
            <span className="gray-1">20240318JS001</span>
            <h6 className="mt-2">Contato:</h6>
            <span className="gray-1"> (79) 91234-5678</span>
            <h6 className="mt-2">Email:</h6>
            <span className="gray-1">joaovictorgerente@almoxarifado.com.br</span>
          </>
        }
      />
      <CustomModal
        isOpen={modalIsOpenBenchmarking}
        onRequestClose={handleModalBenchmarking}
        title={`Informações Adicionais`}
        content={
          <>
            <h6 className="mt-2">Endereço:</h6>
            <span className="gray-1">Rua das Estrelas, Número 123, Bairro da Serenidade</span>
            <h6 className="mt-2">Contato:</h6>
            <span className="gray-1"> (79) 91234-5678</span>
            <h6 className="mt-2">Produtos Disponíveis:</h6>
            <img src={pdfButton} alt="" className="icon-m mt-1 pdf-btn"/>
            <img src={excelButton} alt="" className="icon-m mt-1 pdf-btn"/>
          </>
        }
      />

      {showModal && (
        <CreateProductModal
          handleShowModal={handleShowModal}
          getProdutos={getProducts}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
