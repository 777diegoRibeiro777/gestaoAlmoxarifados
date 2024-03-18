import { useEffect, useState } from "react";
import "./_style.scss";
import { API } from "../../api/API";
import { Pagination, Select } from "antd";

export default function Beanchmarking() {
  const [logs, setLogs] = useState([]);
  const [numPagina, setNumPagina] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("Selecione");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    API.get(`Log?page=${numPagina}&pageSize=12&filter=${filter}`).then(
      (response) => {
        setLogs(response.data);

        setTotalPages(response.headers["x-total-pages"] * 12);
      }
    );
    if (window.screenX < 768) {
      setIsSmallScreen(true);
    }
  }, [numPagina, filter]);

  const onchange = (page) => {
    setNumPagina(page);
  };

  const handleFilter = (e) => {
    setFilter(e);
  };

  return (
    <>
      <section className="container mt-6 container-log">
        <h4 className="text-center">Logs Beanchmarking</h4>
        <div className="flex-space-between mt-6">
          <Select
            defaultValue="Selecione"
            style={{ width: 120 }}
            onChange={handleFilter}
          >
            <Select.Option value="Selecione">Selecione</Select.Option>
            <Select.Option value="Sucesso">Sucesso</Select.Option>
            <Select.Option value="Falha">Falha</Select.Option>
          </Select>
        </div>
        <table className="table-produtos rounded">
          <thead>
            <tr>
              {isSmallScreen ? <th>Log</th> : <th>Código</th>}

              {isSmallScreen ? null : <th>Usuário</th>}
              <th>Id Produto</th>
              <th>Etapa</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {logs &&
              logs.map((log) => {
                return (
                  <tr key={log.iDlOG}>
                    <td>{log.iDlOG}</td>
                    {isSmallScreen ? null : <td>{log.usuarioRobo}</td>}
                    <td>{log.idProdutoAPI}</td>
                    <td>{log.etapa}</td>
                    <td>{log.informacaoLog}</td>
                    <td>
                      {log.dateLog
                        .split("T")[0]
                        .replace("-", "/")
                        .replace("-", "/")
                        .replace("-", "/")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          defaultCurrent={numPagina}
          total={totalPages}
          onChange={onchange}
          defaultPageSize={12}
          showSizeChanger={false}
        />
      </section>
    </>
  );
}
