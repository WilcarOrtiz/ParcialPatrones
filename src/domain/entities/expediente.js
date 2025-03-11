export class Expediente {
  #numeroRadicacion;
  #expedienteFisico;
  #soportefisico;
  #numeroCarpetasFisicas;
  #cuadernos;
  #serie;
  #demandados;
  #demandantes;
  #partesProcesales;
  #despachoAsosiado;

  constructor(
    numeroRadicacion,
    expedienteFisico,
    soportefisico,
    numeroCarpetasFisicas,
    serie,
    demandados,
    demandantes,
    despachoAsosiado
  ) {
    this.#numeroRadicacion = numeroRadicacion;
    this.#expedienteFisico = expedienteFisico;
    this.#soportefisico = soportefisico;
    this.#numeroCarpetasFisicas = numeroCarpetasFisicas;
    this.#cuadernos = [];
    this.#serie = serie;
    this.#demandados = demandados;
    this.#demandantes = demandantes;
    this.#partesProcesales = [...demandados, ...demandantes];
    this.#despachoAsosiado = despachoAsosiado;
  }

  get numeroRadicacion() {
    return this.#numeroRadicacion;
  }

  get expedienteFisico() {
    return this.#expedienteFisico;
  }

  get soportefisico() {
    return this.#soportefisico;
  }

  get numeroCarpetasFisicas() {
    return this.#numeroCarpetasFisicas;
  }

  get serie() {
    return this.#serie;
  }

  get demandados() {
    return this.#demandados;
  }

  get demandantes() {
    return this.#demandantes;
  }

  get despachoAsosiado() {
    return this.#despachoAsosiado;
  }

  set numeroRadicacion(numeroRadicacion) {
    this.#numeroRadicacion = numeroRadicacion;
  }

  set expedienteFisico(expedienteFisico) {
    this.#expedienteFisico = expedienteFisico;
  }

  set soportefisico(soportefisico) {
    this.#soportefisico = soportefisico;
  }

  set numeroCarpetasFisicas(numeroCarpetasFisicas) {
    this.#numeroCarpetasFisicas = numeroCarpetasFisicas;
  }

  set serie(serie) {
    this.#serie = serie;
  }

  set demandados(demandados) {
    this.#demandados = demandados;
  }

  set demandantes(demandantes) {
    this.#demandantes = demandantes;
  }

  set despachoAsosiado(despachoAsosiado) {
    this.#despachoAsosiado = despachoAsosiado;
  }

  registrarDemandante(demandante) {
    this.#demandantes.push(demandante);
    this.#partesProcesales.push(demandante);
  }

  registrarDemandado(demandado) {
    this.#demandados.push(demandado);
    this.#partesProcesales.push(demandado);
  }

  eliminarParteProcesal(id) {
    const index = this.#partesProcesales.findIndex((parteProcesal) => {
      parteProcesal.id === id;
    });
    this.#partesProcesales.splice(index, 1);
  }

  buscarEntidadProcesal(id) {
    return this.#partesProcesales.find(
      (parteProcesal) => parteProcesal.id === id
    );
  }

  actualizarEntidadProcesal(id, entidadProcesal) {
    const entidadProcesalEncontrada = this.buscarEntidadProcesal(id);
    entidadProcesalEncontrada = entidadProcesal;
  }

  listarDemandantes() {
    return this.#demandantes;
  }

  listarDemandados() {
    return this.#demandados;
  }

  registrarCuaderno(cuaderno) {
    this.#cuadernos.push(cuaderno);
  }

  eliminarCuaderno(nombre) {
    const index = this.#cuadernos.findIndex((cuaderno) => {
      cuaderno.nombre === nombre;
    });
    this.#cuadernos.splice(index, 1);
  }

  buscarCuaderno(nombre) {
    return this.#cuadernos.find((cuaderno) => cuaderno.nombre === nombre);
  }

  actualizarCuaderno(nombre, cuaderno) {
    const cuadernoEncontrado = this.buscarCuaderno(nombre);
    cuadernoEncontrado = cuaderno;
  }

  listarCuadernos() {
    return this.#cuadernos;
  }
}
