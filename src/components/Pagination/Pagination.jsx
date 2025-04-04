import React from 'react';
import './pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
    const maxVisiblePages = 10;

    // Определяем диапазон отображаемых страниц
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Корректируем начало, если в конце не хватает страниц
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button 
                    onClick={() => onPageChange(currentPage - 1)}
                    className="pagination-button"
                >
                    &laquo; Prev
                </button>
            )}

            {startPage > 1 && (
                <>
                    <button 
                        onClick={() => onPageChange(1)}
                        className={`pagination-button ${1 === currentPage ? 'active' : ''}`}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="pagination-ellipsis">...</span>}
                </>
            )}

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`pagination-button ${number === currentPage ? 'active' : ''}`}
                >
                    {number}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
                    <button 
                        onClick={() => onPageChange(totalPages)}
                        className={`pagination-button ${totalPages === currentPage ? 'active' : ''}`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {currentPage < totalPages && (
                <button 
                    onClick={() => onPageChange(currentPage + 1)}
                    className="pagination-button"
                >
                    Next &raquo;
                </button>
            )}
        </div>
    );
}

export default Pagination;