import http from "../http-common";

const get = (id) => {
  return http.get(`/FirstResults?=${id}`);
};

const create = (montantDachat, fondPropre, duree, intertAnnuel, capital) => {
  //return http.post("/", data);
  return http.post(
    `/FirstResults?montantDachat=${montantDachat}&fondPropre=${fondPropre}&duree=${duree}&intertAnnuel=${intertAnnuel}&capital=${capital}`
  );
};

const FirstResultService = {
  get,
  create,
};

export default FirstResultService;
