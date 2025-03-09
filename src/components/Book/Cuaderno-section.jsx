"use client";

import { useState, useEffect } from "react";
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

  // Track which cuadernos have their documents visible
  const [visibleDocuments, setVisibleDocuments] = useState({});

  // Actualizar los datos en el componente padre cada vez que cambian
  useEffect(() => {
    if (updateParentData) {
      updateParentData({
        cuadernos: cuadernos,
        documentos: documentList,
      });
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
    const cuaderno = cuadernos.find((cuaderno) => cuaderno.id === id);
    if (cuaderno) {
      setCuadernoToEdit(cuaderno);
      setNombreCuaderno(cuaderno.name);
      setDescripcionCuaderno(cuaderno.description);
      setShowCuadernoForm(true);
    }
  };

  const handleEliminarCuaderno = (id) => {
    // Remove the cuaderno
    setCuadernos(cuadernos.filter((cuaderno) => cuaderno.id !== id));

    // Also remove any documents associated with this cuaderno
    const cuadernoName = cuadernos.find((c) => c.id === id)?.name;
    if (cuadernoName) {
      setDocumentList(
        documentList.filter((doc) => doc.Cuaderno !== cuadernoName)
      );

      // Remove from visible documents
      const newVisibleDocs = { ...visibleDocuments };
      delete newVisibleDocs[cuadernoName];
      setVisibleDocuments(newVisibleDocs);
    }
  };

  const handleFormSubmit = () => {
    if (cuadernoToEdit) {
      const oldName = cuadernoToEdit.name;
      const newName = nombreCuaderno;

      // Update cuaderno
      setCuadernos(
        cuadernos.map((cuaderno) =>
          cuaderno.id === cuadernoToEdit.id
            ? {
                ...cuaderno,
                name: nombreCuaderno,
                description: descripcionCuaderno,
              }
            : cuaderno
        )
      );

      // Update document references if the name changed
      if (oldName !== newName) {
        setDocumentList(
          documentList.map((doc) =>
            doc.Cuaderno === oldName ? { ...doc, Cuaderno: newName } : doc
          )
        );

        // Update visible documents state
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
      // Update existing document
      setDocumentList(
        documentList.map((doc) =>
          doc.id === documentToEdit.id ? { ...document, id: doc.id } : doc
        )
      );
    } else {
      // Add new document with ID
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
        <h2 className="block text-gray-600 text-sm font-medium mb-1">
          Cuadernos
        </h2>
        <button
          type="button"
          onClick={() => setShowCuadernoForm(true)}
          className=" rounded-full bg-primary text-white"
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
