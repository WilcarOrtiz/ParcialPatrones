import * as XLSX from "xlsx";

const exportToExcel = (data) => {
  if (!data || data.length === 0) {
    console.error("No hay datos para exportar.");
    return;
  }

  const entry = data[0]; // Tomamos el primer elemento (asumiendo un solo proceso)
  let worksheetData = [];
  let headerCells = []; // Para almacenar las celdas de títulos que irán en negrita

  // Información General
  const generalHeaders = [
    "Radicación",
    "Despacho",
    "Expediente Físico",
    "Soporte Físico",
    "Número de Carpetas",
  ];
  worksheetData.push(generalHeaders);
  worksheetData.push([
    entry.radicacion,
    entry.despacho,
    entry.informacionFisica.expedienteFisico ? "Sí" : "No",
    entry.informacionFisica.soporteFisico ? "Sí" : "No",
    entry.informacionFisica.numCarpetas,
  ]);

  worksheetData.push([]); // Espacio entre secciones

  // Demandantes
  worksheetData.push(["Demandantes"]); // Título de sección
  headerCells.push({ row: worksheetData.length - 1, col: 0 }); // Guardamos celda para negrita

  const demandantesHeaders = ["Tipo", "Identificación", "Nombre"];
  worksheetData.push(demandantesHeaders);
  entry.demandantes.forEach((d) => {
    worksheetData.push([d.tipo, d.identificacion, d.nombre]);
  });

  worksheetData.push([]); // Espacio entre secciones

  // Demandados
  worksheetData.push(["Demandados"]); // Título de sección
  headerCells.push({ row: worksheetData.length - 1, col: 0 });

  const demandadosHeaders = ["Tipo", "Identificación", "Nombre"];
  worksheetData.push(demandadosHeaders);
  entry.demandados.forEach((d) => {
    worksheetData.push([d.tipo, d.identificacion, d.nombre]);
  });

  worksheetData.push([]); // Espacio entre secciones

  // Cuadernos y Documentos
  worksheetData.push(["Cuadernos y Documentos"]); // Título de sección
  headerCells.push({ row: worksheetData.length - 1, col: 0 });

  const documentosHeaders = [
    "Cuaderno",
    "Nombre Documento",
    "Fecha Creación",
    "Fecha Incorporación",
    "Orden Documento",
    "Número Páginas",
    "Página Inicio",
    "Página Fin",
    "Formato",
    "Tamaño",
    "Origen",
    "Observaciones",
  ];
  worksheetData.push(documentosHeaders);
  entry.cuadernos.forEach((c) => {
    const documentosRelacionados = entry.documentos.filter(
      (doc) => doc.Cuaderno === c.name
    );

    documentosRelacionados.forEach((doc) => {
      worksheetData.push([
        c.name, // Nueva columna con el nombre del cuaderno
        doc.nombre,
        doc.fechaCreacion,
        doc.fechalncorporacion,
        doc.ordenDocumento,
        doc.numeroPaginas,
        doc.paginalnicio,
        doc.paginaFin,
        doc.formato,
        doc.tamanio,
        doc.origen,
        doc.observaciones,
      ]);
    });
  });

  // Crear la hoja de Excel
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // Aplicar negrita a los títulos de sección y encabezados
  [
    ...headerCells,
    ...worksheetData[0].map((_, col) => ({ row: 0, col })),
  ].forEach(({ row, col }) => {
    const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
    if (worksheet[cellRef]) {
      worksheet[cellRef].s = { font: { bold: true } };
    }
  });

  // Nombre del archivo con el radicado
  const fileName = `${entry.radicacion || "Datos"}.xlsx`;

  // Guardar el archivo Excel
  XLSX.writeFile(workbook, fileName);
};

export default exportToExcel;
