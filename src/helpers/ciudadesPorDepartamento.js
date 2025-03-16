import { Ciudad, Departamento } from '../domain';

export const ciudadesPorDepartamento = () => {
  return {
    [Departamento.amazonas]: [
      Ciudad.leticia,
      Ciudad.puertoNarino,
      Ciudad.laChorrera,
    ],

    [Departamento.antioquia]: [Ciudad.medellin, Ciudad.bello, Ciudad.envigado],

    [Departamento.arauca]: [Ciudad.arauca, Ciudad.tame, Ciudad.saravena],

    [Departamento.atlantico]: [
      Ciudad.barranquilla,
      Ciudad.soledad,
      Ciudad.malambo,
    ],

    [Departamento.bolivar]: [Ciudad.cartagena, Ciudad.magangue, Ciudad.turbaco],

    [Departamento.boyaca]: [Ciudad.tunja, Ciudad.duitama, Ciudad.sogamoso],

    [Departamento.caldas]: [
      Ciudad.manizales,
      Ciudad.chinchina,
      Ciudad.laDorada,
    ],

    [Departamento.caqueta]: [
      Ciudad.florencia,
      Ciudad.doncello,
      Ciudad.sanVicente,
    ],

    [Departamento.casanare]: [
      Ciudad.yopal,
      Ciudad.villanueva,
      Ciudad.pazDeAriporo,
    ],

    [Departamento.cauca]: [
      Ciudad.popayan,
      Ciudad.santanderDeQuilichao,
      Ciudad.puertoTejada,
    ],

    [Departamento.cesar]: [Ciudad.valledupar, Ciudad.aguachica, Ciudad.codazzi],

    [Departamento.choco]: [Ciudad.quibdo, Ciudad.istmina, Ciudad.condoto],

    [Departamento.cordoba]: [Ciudad.monteria, Ciudad.cerete, Ciudad.sahagun],

    [Departamento.cundinamarca]: [
      Ciudad.bogota,
      Ciudad.sopo,
      Ciudad.facatativa,
    ],

    [Departamento.meta]: [Ciudad.villavicencio, Ciudad.granada, Ciudad.acacias],

    [Departamento.huila]: [Ciudad.neiva, Ciudad.garzon, Ciudad.pitalito],

    [Departamento.magdalena]: [
      Ciudad.santaMarta,
      Ciudad.cienaga,
      Ciudad.fundacion,
    ],

    [Departamento.narinio]: [Ciudad.pasto, Ciudad.ipiales, Ciudad.tumaco],

    [Departamento.norteDeSantander]: [
      Ciudad.cucuta,
      Ciudad.ocaña,
      Ciudad.pamplona,
    ],

    [Departamento.putumayo]: [
      Ciudad.mocoa,
      Ciudad.puertoAsis,
      Ciudad.laHormiga,
    ],

    [Departamento.quindio]: [Ciudad.armenia, Ciudad.calarca, Ciudad.montenegro],

    [Departamento.risaralda]: [
      Ciudad.pereira,
      Ciudad.dosquebradas,
      Ciudad.santaRosa,
    ],

    [Departamento.SanAndresProvidencia]: [
      Ciudad.sanAndres,
      Ciudad.providencia,
      Ciudad.santaCatalina,
    ],

    [Departamento.santander]: [
      Ciudad.bucaramanga,
      Ciudad.floridablanca,
      Ciudad.giron,
    ],

    [Departamento.sucre]: [Ciudad.sincelejo, Ciudad.corozal, Ciudad.sampues],

    [Departamento.tolima]: [Ciudad.ibague, Ciudad.espinal, Ciudad.honda],

    [Departamento.valleDelCauca]: [
      Ciudad.cali,
      Ciudad.palmira,
      Ciudad.buenaventura,
    ],

    [Departamento.vaupes]: [Ciudad.mitu, Ciudad.caruru, Ciudad.taraira],

    [Departamento.vichada]: [
      Ciudad.puertoCarreño,
      Ciudad.cumaribo,
      Ciudad.laPrimavera,
    ],

    [Departamento.laGuajira]: [Ciudad.riohacha, Ciudad.maicao, Ciudad.sanJuan],
  };
};
