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
const remove = (id) => {
  return http.delete(`/FirstResults/${id}`);
};

const FirstResultService = {
  get,
  create,
  remove,
};

export default FirstResultService;
