import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onSelectPage: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalPages, onSelectPage }) => {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(10);

  useEffect(() => {
    let newStart = start;
    let newEnd = end;

    if (currentPage > end) {
      newStart = currentPage - 9;
      newEnd = currentPage;
    } else if (currentPage < start) {
      newStart = currentPage;
      newEnd = currentPage + 9;
    }

    if (newStart < 1) newStart = 1;
    if (newEnd > totalPages) newEnd = totalPages;

    setStart(newStart);
    setEnd(newEnd);

  }, [currentPage, start, end, totalPages]);

  let items = [];

  for (let i = start; i <= end; i++) {
    items.push(
      <Pagination.Item className='page-item'
        key={i}
        active={i === currentPage}
        onClick={() => onSelectPage(i)}
        
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="pagination-container">
      <Pagination className='d-flex justify-content-center mx-2 fuente'>
        <Pagination.First className='page-item' onClick={() => onSelectPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev className='page-item' onClick={() => onSelectPage(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1} />
        {items}
        <Pagination.Next className='page-item' onClick={() => onSelectPage(currentPage < totalPages ? currentPage + 1 : totalPages )  }disabled={currentPage === totalPages}  />
        <Pagination.Last className='page-item' onClick={() => onSelectPage(totalPages)} disabled={currentPage === totalPages}  />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
