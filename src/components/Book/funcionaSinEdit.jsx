















"use client";
import { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import CuadernoList from "../Book/Cuaderno-list";
import CuadernoFormModal from "./cuaderno-form-modal";
import DocumentFormModal from "../Document/Document-form-modal";
import DocumentList from "../Document/Document-list";

const CuadernosSection = ({ updateParentData }) => {
  const [showCuadernoForm, setShowCuadernoForm] = useState(false);
  const [nombreCuaderno, setNombreCuaderno] = useState("");
  const [descripcionCuaderno, setDescripcionCuaderno] = useState("");
  const [cuadernos, setCuadernos] = useState([]);
  const [cuadernoToEdit, setCuadernoToEdit] = useState(null);

  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [currentCuaderno, setCurrentCuaderno] = useState("");
  const [documentList, setDocumentList] = useState([]);
  const [documentToEdit, setDocumentToEdit] = useState(null);

  // Estado para controlar qué cuadernos tienen visibles sus documentos
  const [visibleDocuments, setVisibleDocuments] = useState({});

  // Ref para almacenar la última data enviada al padre
  const prevDataRef = useRef({ cuadernos: [], documentos: [] });

  // Actualizar datos en el componente padre solo si han cambiado realmente
  useEffect(() => {
    const newData = { cuadernos, documentos: documentList };
    if (JSON.stringify(newData) !== JSON.stringify(prevDataRef.current)) {
      prevDataRef.current = newData;
      if (updateParentData) {
        updateParentData(newData);
      }
    }
  }, [cuadernos, documentList, updateParentData]);

  const handleAddCuaderno = () => {
    if (nombreCuaderno.trim() && descripcionCuaderno.trim()) {
      setCuadernos([
        ...cuadernos,
        {
          id: Date.now(),
          name: nombreCuaderno,
          description: descripcionCuaderno,
        },
      ]);
      resetCuadernoForm();
    }
  };

  const handleActualizarCuaderno = (id) => {
    const cuaderno = cuadernos.find((c) => c.id === id);
    if (cuaderno) {
      setCuadernoToEdit(cuaderno);
      setNombreCuaderno(cuaderno.name);
      setDescripcionCuaderno(cuaderno.description);
      setShowCuadernoForm(true);
    }
  };

  const handleEliminarCuaderno = (id) => {
    setCuadernos(cuadernos.filter((c) => c.id !== id));
    const cuadernoName = cuadernos.find((c) => c.id === id)?.name;
    if (cuadernoName) {
      setDocumentList(
        documentList.filter((doc) => doc.Cuaderno !== cuadernoName)
      );
      const newVisibleDocs = { ...visibleDocuments };
      delete newVisibleDocs[cuadernoName];
      setVisibleDocuments(newVisibleDocs);
    }
  };

  const handleFormSubmit = () => {
    if (cuadernoToEdit) {
      const oldName = cuadernoToEdit.name;
      const newName = nombreCuaderno;
      setCuadernos(
        cuadernos.map((c) =>
          c.id === cuadernoToEdit.id
            ? { ...c, name: nombreCuaderno, description: descripcionCuaderno }
            : c
        )
      );
      if (oldName !== newName) {
        setDocumentList(
          documentList.map((doc) =>
            doc.Cuaderno === oldName ? { ...doc, Cuaderno: newName } : doc
          )
        );
        if (visibleDocuments[oldName]) {
          const newVisibleDocs = { ...visibleDocuments };
          delete newVisibleDocs[oldName];
          newVisibleDocs[newName] = true;
          setVisibleDocuments(newVisibleDocs);
        }
      }
    } else {
      handleAddCuaderno();
    }
    resetCuadernoForm();
  };

  const resetCuadernoForm = () => {
    setShowCuadernoForm(false);
    setNombreCuaderno("");
    setDescripcionCuaderno("");
    setCuadernoToEdit(null);
  };

  const handleOpenDocumentForm = (cuadernoName) => {
    setCurrentCuaderno(cuadernoName);
    setDocumentToEdit(null);
    setShowDocumentForm(true);
  };

  const handleSaveDocument = (document) => {
    if (documentToEdit) {
      setDocumentList(
        documentList.map((doc) =>
          doc.id === documentToEdit.id ? { ...document, id: doc.id } : doc
        )
      );
    } else {
      setDocumentList([...documentList, { ...document, id: Date.now() }]);
    }
    setShowDocumentForm(false);
    setDocumentToEdit(null);
  };

  const handleToggleDocuments = (cuadernoName) => {
    setVisibleDocuments((prev) => ({
      ...prev,
      [cuadernoName]: !prev[cuadernoName],
    }));
  };

  const handleEditDocument = (document) => {
    setDocumentToEdit(document);
    setCurrentCuaderno(document.Cuaderno);
    setShowDocumentForm(true);
  };

  const handleDeleteDocument = (documentId) => {
    setDocumentList(documentList.filter((doc) => doc.id !== documentId));
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold mb-1">Cuadernos</h2>
        <button
          type="button"
          onClick={() => setShowCuadernoForm(true)}
          className="p-2 rounded-full bg-blue-500 text-white"
        >
          <Plus size={20} />
        </button>
      </div>

      {showCuadernoForm && (
        <CuadernoFormModal
          nombreCuaderno={nombreCuaderno}
          setNombreCuaderno={setNombreCuaderno}
          descripcionCuaderno={descripcionCuaderno}
          setDescripcionCuaderno={setDescripcionCuaderno}
          onSubmit={handleFormSubmit}
          onCancel={resetCuadernoForm}
          isEditing={!!cuadernoToEdit}
        />
      )}

      {cuadernos.map((cuaderno) => (
        <div key={cuaderno.id} className="mb-4">
          <CuadernoList
            cuadernos={[cuaderno]}
            onDelete={handleEliminarCuaderno}
            onEdit={handleActualizarCuaderno}
            onAddDocument={handleOpenDocumentForm}
            onViewDocuments={handleToggleDocuments}
            visibleDocuments={visibleDocuments}
          />

          {visibleDocuments[cuaderno.name] && (
            <DocumentList
              documents={documentList.filter(
                (doc) => doc.Cuaderno === cuaderno.name
              )}
              onEdit={handleEditDocument}
              onDelete={handleDeleteDocument}
            />
          )}
        </div>
      ))}

      {showDocumentForm && (
        <DocumentFormModal
          cuadernoName={currentCuaderno}
          onSave={handleSaveDocument}
          onCancel={() => {
            setShowDocumentForm(false);
            setDocumentToEdit(null);
          }}
          documentToEdit={documentToEdit}
        />
      )}
    </div>
  );
};

export default CuadernosSection;
