export class Documento {
  #nombre;
  #fechaCreacion;
  #fechaIncorporacion;
  #ordenDocumento;
  #numeroPaginas;
  #paginaIncio;
  #paginaFin;
  #formato;
  #tamanio;
  #origen;
  #observaciones;

  constructor(
    nombre,
    fechaCreacion,
    fechaIncorporacion,
    ordenDocumento,
    numeroPaginas,
    paginaIncio,
    paginaFin,
    formato,
    tamanio,
    origen,
    observaciones
  ) {
    this.#nombre = nombre;
    this.#fechaCreacion = fechaCreacion;
    this.#fechaIncorporacion = fechaIncorporacion;
    this.#ordenDocumento = ordenDocumento;
    this.#numeroPaginas = numeroPaginas;
    this.#paginaIncio = paginaIncio;
    this.#paginaFin = paginaFin;
    this.#formato = formato;
    this.#tamanio = tamanio;
    this.#origen = origen;
    this.#observaciones = observaciones;
  }

  get nombre() {
    return this.#nombre;
  }

  get fechaCreacion() {
    return this.#fechaCreacion;
  }

  get fechaIncorporacion() {
    return this.#fechaIncorporacion;
  }

  get ordenDocumento() {
    return this.#ordenDocumento;
  }

  get numeroPaginas() {
    return this.#numeroPaginas;
  }

  get paginaIncio() {
    return this.#paginaIncio;
  }

  get paginaFin() {
    return this.#paginaFin;
  }

  get formato() {
    return this.#formato;
  }

  get tamanio() {
    return this.#tamanio;
  }

  get origen() {
    return this.#origen;
  }

  get observaciones() {
    return this.#observaciones;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }

  set fechaCreacion(fechaCreacion) {
    this.#fechaCreacion = fechaCreacion;
  }

  set fechaIncorporacion(fechaIncorporacion) {
    this.#fechaIncorporacion = fechaIncorporacion;
  }

  set ordenDocumento(ordenDocumento) {
    this.#ordenDocumento = ordenDocumento;
  }

  set numeroPaginas(numeroPaginas) {
    this.#numeroPaginas = numeroPaginas;
  }

  set paginaIncio(paginaIncio) {
    this.#paginaIncio = paginaIncio;
  }

  set paginaFin(paginaFin) {
    this.#paginaFin = paginaFin;
  }

  set formato(formato) {
    this.#formato = formato;
  }

  set tamanio(tamanio) {
    this.#tamanio = tamanio;
  }

  set origen(origen) {
    this.#origen = origen;
  }

  set observaciones(observaciones) {
    this.#observaciones = observaciones;
  }
}
