import React, { useState, useEffect } from "react";
import FirstResultService from "../../service/FirstResultService";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const ResulttList = () => {
  const [amortissements, setresultAmortissement] = useState([]);
  const [currentResult, setcurrentResult] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const [montantDachat, setmontantDachat] = useState(0);
  const [fraisDachat, setfraisDachat] = useState();
  const [fondPropre, setfondPropre] = useState(0);
  const [fraisDhypotheque, setfraisDhypotheque] = useState();
  const [mensualite, setmensualite] = useState();
  const [mentantEmpBrut, setmentantEmpBrut] = useState();
  const [mentantEmpNet, setmentantEmpNet] = useState();
  const [interetAnnuel, setinteretAnnuel] = useState(0);
  const [interetMensuel, setinteretMensuel] = useState();
  const [duree, setduree] = useState(0);
  const [capital, setcapital] = useState(0);
  const initialresultState = {
    id: null,
    montantDachat: null,
    fraisDachat: null,
    fondPropre: null,
    fraisDhypotheque: null,
    mensualite: null,
    mentantEmpBrut: null,
    mentantEmpNet: null,
    interetAnnuel: null,
    interetMensuel: null,
    capital: null,
    duree: null,
    amortissements: [],
  };
  const [result, setresult] = useState(initialresultState);

  const saveresult = () => {
    FirstResultService.create(
      result.montantDachat,
      result.fondPropre,
      result.duree,
      result.interetAnnuel,
      result.capital
    )
      .then((response) => {
        setresult(response.data);
        // setresult({
        //   id: response.id,
        //   montantDachat: response.montantDachat,
        //   fraisDachat: response.fraisDachat,
        //   fondPropre: response.fondPropre,
        //   fraisDhypotheque: response.fraisDhypotheque,
        //   mensualite: response.mensualite,
        //   mentantEmpBrut: response.mentantEmpBrut,
        //   mentantEmpNet: response.mentantEmpNet,
        //   interetAnnuel: response.interetAnnuel,
        //   interetMensuel: response.interetMensuel,
        //   capital: response.capital,
        //   amortissements: response.amortissements,
        // });
        console.log(result);

        ///setSubmitted(true);
        //  window.location.reload();
        console.log(response);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddrTypeChange = (event) => {
    setPostsPerPage(Number(event.target.value));
  };

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setmaxpageNumberLimit] = useState(5);
  const [minpageNumberLimit, setminpageNumberLimit] = useState(0);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  const [q, setQ] = useState("");
  const handilClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(amortissements.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPagesNumbers = pageNumbers.map((number) => {
    if (number < maxpageNumberLimit + 1 && number > minpageNumberLimit) {
      return (
        <a
          key={number}
          id={number}
          onClick={handilClick}
          className="btn btn-icon btn-sm btn-light-primary mr-2 my-1"
        >
          {number}
        </a>
      );
    } else {
      return null;
    }
  });
  // Get Index Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = amortissements.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxpageNumberLimit) {
      setmaxpageNumberLimit(maxpageNumberLimit + pageNumberLimit);
      setminpageNumberLimit(minpageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevtbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxpageNumberLimit(maxpageNumberLimit - pageNumberLimit);
      setminpageNumberLimit(minpageNumberLimit - pageNumberLimit);
    }
  };
  let pageIncrementBtn = null;
  if (amortissements.length > maxpageNumberLimit) {
    pageIncrementBtn = (
      <a
        onClick={handleNextbtn}
        className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1"
      >
        ...
      </a>
    );
  }

  <a
    href="#"
    className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1"
  >
    ...
  </a>;
  function search(row) {
    return currentPosts.filter(
      (row) =>
        row.nom.toLowerCase().indexOf(q) > -1 ||
        row.prix.toLowerCase().indexOf(q) > -1
    );
  }

  useEffect(() => {
    CreateTableAmortissement();
  }, []);
  const CreateTableAmortissement = () => {
    FirstResultService.create()
      .then((response) => {
        setresultAmortissement(response);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setresult({ ...result, [name]: value });
  };

  const setActiveresult = (result, index) => {
    setcurrentResult(result);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    FirstResultService.findByTitle(searchTitle)
      .then((response) => {
        setresultAmortissement(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="container">
        {/*begin::Card*/}
        <div className="card card-custom gutter-b example example-compact">
          <div className="card-header">
            <h3 className="card-title">Informations à entrées: </h3>
            <div className="card-toolbar">
              <div className="example-tools justify-content-center"></div>
            </div>
          </div>
          {/*begin::Form*/}
          <form className="form">
            <div className="card-body">
              <div className="form-group">
                <label>montantDachat</label>
                <input
                  className="form-control"
                  type="number"
                  id="montantDachat"
                  required
                  value={result.montantDachat}
                  onChange={handleInputChange}
                  name="montantDachat"
                  placeholder="montantDachat"
                />
              </div>

              <div className="form-group">
                <label>fondPropre </label>
                <input
                  className="form-control"
                  type="number"
                  id="fondPropre"
                  required
                  value={result.fondPropre}
                  onChange={handleInputChange}
                  name="fondPropre"
                  placeholder="fondPropre<"
                />
              </div>

              <div className="form-group">
                <label>duree</label>
                <input
                  className="form-control"
                  type="number"
                  id="duree"
                  required
                  value={result.duree}
                  onChange={handleInputChange}
                  name="duree"
                  placeholder="duree"
                />
              </div>

              <div className="form-group">
                <label>intertAnnuel</label>
                <input
                  className="form-control"
                  type="text"
                  id="interetAnnuel"
                  required
                  value={result.interetAnnuel}
                  onChange={handleInputChange}
                  name="interetAnnuel"
                  placeholder="intertAnnuel"
                />
              </div>

              <div className="form-group">
                <label>capital</label>
                <input
                  className="form-control"
                  type="text"
                  id="capital"
                  required
                  value={result.capital}
                  onChange={handleInputChange}
                  name="capital"
                  placeholder="capital"
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-lg-6">
                  <button
                    type="reset"
                    className="btn btn-primary mr-2"
                    onClick={saveresult}
                  >
                    Calculer !
                  </button>
                </div>
                <div className="col-lg-6 text-lg-right"></div>
              </div>
            </div>
          </form>
        </div>

        {/*begin::Card*/}
        <div className="card card-custom gutter-b example example-compact">
          <div className="card-header">
            <h3 className="card-title">Résultats</h3>
            <div className="card-toolbar">
              <div className="example-tools justify-content-center"></div>
            </div>
          </div>
          {/*begin::Form*/}
          <form className="form">
            <div className="card-body">
              <div className="form-group">
                <label>FraisDachat</label>
                <input
                  className="form-control"
                  type="number"
                  id="fraisDachat"
                  disabled
                  required
                  value={result.fraisDachat}
                  onChange={handleInputChange}
                  name="fraisDachat"
                />
              </div>

              <div className="form-group">
                <label>MentantEmpBrut</label>
                <input
                  className="form-control"
                  type="number"
                  disabled
                  id="mentantEmpBrut"
                  required
                  value={result.mentantEmpBrut}
                  onChange={handleInputChange}
                  name="mentantEmpBrut"
                />
              </div>

              <div className="form-group">
                <label>FraisDhypotheque</label>
                <input
                  className="form-control"
                  type="text"
                  disabled
                  id="fraisDhypotheque"
                  required
                  value={result.fraisDhypotheque}
                  onChange={handleInputChange}
                  name="fraisDhypotheque"
                />
              </div>

              <div className="form-group">
                <label>MentantEmpNet</label>
                <input
                  className="form-control"
                  type="text"
                  disabled
                  id="mentantEmpNet"
                  required
                  value={result.mentantEmpNet}
                  onChange={handleInputChange}
                  name="mentantEmpNet"
                />
              </div>

              <div className="form-group">
                <label>InteretMensuel</label>
                <input
                  className="form-control"
                  type="text"
                  disabled
                  id="interetMensuel"
                  required
                  value={result.interetMensuel}
                  onChange={handleInputChange}
                  name="interetMensuel"
                />
              </div>

              <div className="form-group">
                <label>Mensualite</label>
                <input
                  className="form-control"
                  disabled
                  type="text"
                  id="mensualite"
                  required
                  value={result.mensualite}
                  onChange={handleInputChange}
                  name="mensualite"
                />
              </div>
            </div>
          </form>
        </div>

        {/*end::Section*/}
        {/*begin::Section*/}
        {/*begin::Advance Table Widget 10*/}
        <div className="card card-custom">
          {/*begin::Header*/}
          <div className="card-header">
            <div className="card-title">
              <span className="card-icon">
                <i className="flaticon2-favourite text-primary" />
              </span>
              <h3 className="card-label">Tableau d'amortissement</h3>
            </div>
            <div className="card-toolbar">
              {/*begin::Dropdown*/}
              <div className="dropdown dropdown-inline mr-2">
                <div className="col-md-12 my-2 my-md-0">
                  <div className="input-icon">
                    <input
                      type="text"
                      className="form-control"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search..."
                      id="kt_datatable_search_query"
                    />
                    <span>
                      <i className="flaticon2-search-1 text-muted" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*end::Header*/}
          {/*begin::Body*/}
          <div className="card-body py-0">
            {/*begin::Table*/}
            <div className="table-responsive">
              <table
                className="table table-head-custom table-vertical-center"
                id="kt_advance_table_widget_4"
              >
                <thead>
                  <tr className="text-left">
                    <th className="pl-0" style={{ width: "30px" }}>
                      {/* <label className="checkbox checkbox-lg checkbox-inline mr-2">
              <input type="checkbox" defaultValue={1} />
              <span />
            </label> */}
                    </th>
                    <th className="pl-0" style={{ minWidth: "120px" }}>
                      periode
                    </th>
                    <th className="pl-0" style={{ minWidth: "120px" }}>
                      soldeDebut
                    </th>
                    <th className="pl-0" style={{ minWidth: "120px" }}>
                      mensualite
                    </th>
                    <th className="pl-0" style={{ minWidth: "120px" }}>
                      interet
                    </th>
                    <th className="pl-0" style={{ minWidth: "120px" }}>
                      capitaleRembourse
                    </th>

                    <th className="pl-0" style={{ minWidth: "120px" }}>
                      soldeFin
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {result.amortissements &&
                    result.amortissements.map((amort, index) => (
                      <tr
                        className={index === currentIndex ? "active" : ""}
                        onClick={() => setActiveresult(result, index)}
                        key={index}
                      >
                        <td className="pl-0 py-6"></td>
                        <td>
                          {/*begin::Pic*/}
                          <div className="flex-shrink-0 mr-4 mt-lg-0 mt-3">
                            <div className="symbol symbol-lg-75">
                              {amort.periode}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="label label-lg label-light label-inline">
                            {" "}
                            {amort.soldeDebut}
                          </span>
                        </td>

                        <td>
                          <span className="text-primary font-weight-bolder d-block font-size-lg">
                            {" "}
                            {result.mensualite}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                            {" "}
                            {amort.interet}
                          </span>
                          {/* <span className="text-muted font-weight-bold">Code: AR</span> */}
                        </td>

                        <td>
                          <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                            {" "}
                            {amort.capitaleRembourse}
                          </span>
                          {/* <span className="text-muted font-weight-bold">Code: AR</span> */}
                        </td>

                        <td>
                          <span className="text-primary font-weight-bolder d-block font-size-lg">
                            {" "}
                            {amort.soldeFin}
                          </span>
                        </td>

                        {/* <td>
              <span className="text-dark-75 font-weight-bolder d-block font-size-lg"> {result.n}</span>
              <span className="text-muted font-weight-bold">Insurance</span>
            </td> */}

                        <td className="pr-0 text-right">
                          <Link
                            href="#"
                            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                            to={"/result/" + result.id}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              {/*begin::Svg Icon | path:assets/media/svg/icons/Communication/Write.svg*/}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                version="1.1"
                              >
                                <g
                                  stroke="none"
                                  strokeWidth={1}
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <rect x={0} y={0} width={24} height={24} />
                                  <path
                                    d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z"
                                    fill="#000000"
                                    fillRule="nonzero"
                                    transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"
                                  />
                                  <path
                                    d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z"
                                    fill="#000000"
                                    fillRule="nonzero"
                                    opacity="0.3"
                                  />
                                </g>
                              </svg>
                              {/*end::Svg Icon*/}
                            </span>
                          </Link>
                          <a
                            href="#"
                            className="btn btn-icon btn-light btn-hover-primary btn-sm"
                            // onClick={(e) => deleteA(e, result.id)}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              {/*begin::Svg Icon | path:assets/media/svg/icons/General/Trash.svg*/}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                version="1.1"
                              >
                                <g
                                  stroke="none"
                                  strokeWidth={1}
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <rect x={0} y={0} width={24} height={24} />
                                  <path
                                    d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
                                    fill="#000000"
                                    fillRule="nonzero"
                                  />
                                  <path
                                    d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                                    fill="#000000"
                                    opacity="0.3"
                                  />
                                </g>
                              </svg>
                              {/*end::Svg Icon*/}
                            </span>
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/*end::Table*/}
          </div>
          {/*end::Body*/}
        </div>
        {/*end::Advance Table Widget 10*/}
        {/*end::Section*/}
      </div>
    </div>
  );
};

export default ResulttList;
