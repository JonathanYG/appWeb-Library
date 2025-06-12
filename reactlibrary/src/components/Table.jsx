import React, { useState } from 'react';
import { MdOutlineToggleOn, MdOutlineToggleOff, MdSearch, MdBookOnline, MdOutlineGavel } from 'react-icons/md';
import ModalConfirm from '../components/Modalconfirm.jsx';
import { StylesTable } from '../styles/StylesTable.jsx';

export default function Table({
    title,
    columns,
    data,
    onEdit,
    onToggleStatus,
    onViewReservations,
    onViewFines,
    rowsPerPage = 5
}) {
    const styles = StylesTable();
    const [currentPage, setCurrentPage] = useState(1);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleConfirmToggle = () => {
        if (onToggleStatus && selectedItem) {
            onToggleStatus(selectedItem);
        }
        setShowConfirmModal(false);
    };

    const hasActions = onEdit || onToggleStatus || onViewReservations || onViewFines;

    return (
        <div style={styles.container}>
            <div style={styles.header}>{title}</div>
    
            <div style={styles.wrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.theadRow}>
                        {columns.filter(col => !col.hidden).map(col => (
                            <th key={col.accessor}>{col.label}</th>
                        ))}
                        {hasActions && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                        <tr key={index} style={styles.tbodyRow}>
                            {columns.filter(col => !col.hidden).map(col => (
                            <td
                                key={col.accessor}
                                style={{
                                ...(col.accessor === 'state' && styles.estadoColor(item.state)),
                                ...((col.accessor === 'rut' || col.accessor.toLowerCase().includes('fecha')) && { whiteSpace: 'nowrap' }),
                                }}
                            >
                                {item[col.accessor]}
                            </td>
                            ))}
            
                            <td style={styles.nowrapCell}>
                            {onEdit && (
                                <MdSearch
                                    title="Ver detalles"
                                    onClick={() => onEdit(item)}
                                    style={styles.iconAction}
                                    size={20}
                                />
                            )}
            
                            {onViewReservations && (
                                <MdBookOnline
                                    title="Ver reservas"
                                    onClick={() => onViewReservations(item)}
                                    style={{ ...styles.iconAction, color: '#3498db' }}
                                    size={20}
                                />
                            )}
            
                            {onViewFines && (
                                <MdOutlineGavel
                                    title="Ver multas"
                                    onClick={() => onViewFines(item)}
                                    style={{ ...styles.iconAction, color: '#e67e22' }}
                                    size={20}
                                />
                            )}
            
                            {onToggleStatus && (
                                item.state === 'Activo' ? (
                                <MdOutlineToggleOn
                                    title="Bloquear"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setShowConfirmModal(true);
                                    }}
                                    style={{ ...styles.toggleEnabled, color: 'green' }}
                                    size={24}
                                />
                                ) : (
                                <MdOutlineToggleOff
                                    title="Activar"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setShowConfirmModal(true);
                                    }}
                                    style={{ ...styles.toggleEnabled, color: 'gray' }}
                                    size={24}
                                />
                                )
                            )}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
            <div style={styles.pagination}>
                <button
                    style={styles.paginationButtonDefault}
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                &lt;&lt; Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        style={styles.paginationButton(currentPage === index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    style={styles.paginationButtonDefault}
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                Next &gt;&gt;
                </button>
            </div>
        
            <ModalConfirm
                isOpen={showConfirmModal}
                message={`¿Estás seguro de que deseas cambiar el estado del lector "${selectedItem?.nombre || selectedItem?.email}"?`}
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmToggle}
            />
        </div>
    );
}
