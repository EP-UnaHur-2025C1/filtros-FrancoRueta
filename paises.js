//DECLARACION DE CLASES
class FiltroPaises {

  //filtropaises va a ser siempre asincrono.
  constructor() {
    return (async () => {
      this.defaultFormato = (e) => {
        return {
          pais: e.name.common,
          capital: e.capital !== undefined ? e.capital[0] : "Sin Capital",
          fronteras: e.borders !== undefined ? e.borders : "Sin Fronteras",
          lenguajes: e.languages !== undefined ? e.languages : "Sin Lenguajes",
        };
      };
      this.formato = this.defaultFormato;
      this.filtros = [];
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        this.data = await response.json();
      } catch (ex) {
        console.log(ex.message);
        this.data = [];
      }
      return this;
    })();
  }

  addFiltro(name, fnFiltro) {
    this.filtros.push({ name, fnFiltro });
  }

  getFiltros() {
    return this.filtros;
  }

  //includePoputlation: boolean
  setFormato(includePoputlation) {
    this.formato = this.defaultFormato;
    if (includePoputlation)
      this.formato = (e) => {
        return { ...this.defaultFormato(e), poblacion: e.population };
      };
  }

  aplicarFiltroConFormato(filterName) {
    const filtro = this.filtros.find((f) => f.name === filterName);
    if (filtro) return this.data.filter(filtro.fnFiltro).map(this.formato);
    return [];
  }
}



//FUNCIONES DE FILTRO
function filtroPaisesSuperpoblados(pais) {
  return pais.population > 100000000;
}
function filtroPaisesInsulares(pais) {
  return pais.borders === undefined || pais.borders.length === 0;
}
function filtroPaisesGuaranies(pais) {
  return pais.languages !== undefined && pais.languages["grn"] !== undefined;
}



//Habia entendido mal la consigna, y lo implemente aca en vez del html.
/* //DECLARAMOS PAISES
const paises = new FiltroPaises().then((paises) => {

  
  //paises superpoblados
  paises.addFiltro("poblacionMayor", filtroPaisesSuperpoblados);
  paises.setFormato(true);
  console.log('PAISES CON MAS DE 100 MILLONES DE HABITANTES:');
  console.log(paises.aplicarFiltroConFormato("poblacionMayor"));
  paises.setFormato(false);

  //paises insulares
  paises.addFiltro("insulares", filtroPaisesInsulares);
  paises.setFormato(true);
  console.log('PAISES INSULARES:');
  console.log(paises.aplicarFiltroConFormato("insulares"));
  paises.setFormato(false);

  //paises de habla guarani
  paises.addFiltro("guarani", filtroPaisesGuaranies);
  paises.setFormato(true);
  console.log('PAISES DE HABLA GUARANI:');
  console.log(paises.aplicarFiltroConFormato("guarani"));
  
  return;
}
); */


/**CAMPOS DE PAISES:
   * name: {...},
    tld: [...],
    cca2: 'ID',
    ccn3: '360',
    cca3: 'IDN',
    cioc: 'INA',
    independent: true,
    status: 'officially-assigned',
    unMember: true,
    currencies: {...},
    idd: {...},
    capital: [...],
    altSpellings: [...],
      region: 'Asia',
      subregion: 'South-Eastern Asia',
    languages: {...},
    translations: {...},
    latlng: [...],
      landlocked: false,
    borders: [...],
      area: 1904569,
    demonyms: {...},
      flag: '🇮🇩',
    maps: {...},
      population: 273523621,
    gini: {...},
      fifa: 'IDN',
    car: {...},
    timezones: [...],
    continents: [...],
    flags: {...},
    coatOfArms: {...},
      startOfWeek: 'monday',
    capitalInfo: {...},
    postalCode: {...} */