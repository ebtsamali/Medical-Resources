import React from 'react';

const Pagination = ({ booksPerPage, totalBooks, currentPage,paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
        pageNumbers.push(i);
    }

  	return (
		<div className="center">
			<div className="pagination">
				{pageNumbers.map(number => (
					<a key={number} className={number===currentPage?"active":null} onClick={() => paginate(number)}>
						{number}
					</a>
				))}
			</div>
		</div>
  	);
};

export default Pagination;

