// src/components/Table.js
import React from "react";

export default function Table({ columns = [], data = [] }) {
  // ✅ التحقق باش ما يطيحش البرنامج فاش تكون البيانات ناقصة
  if (!Array.isArray(columns) || !Array.isArray(data)) {
    console.error("❌ Erreur: columns ou data ne sont pas des tableaux");
    return <div>Erreur dans les données du tableau.</div>;
  }

  // ✅ JSX الصحيح
  return (
    <div className="table-responsive mt-3">
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr key={i}>
                {columns.map((col, j) => (
                  <td key={j}>{row[col.accessor]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center text-muted py-3">
                Aucun enregistrement trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
