import { usePagination } from "../../../hooks/usePagination";

const Pagination = ({totalPages, page, changePage}) => {
  const pagesArray = usePagination(totalPages);
  return (
    <div className="pagination">
        <ul className="pagination-list">
        {pagesArray.map(p => (
          <li className={page === p ? 
                        'pagination-list__item page-current' : 
                        'pagination-list__item'}
              key={p}
              onClick={() => changePage(p)}
              >{p}</li>
        ))}
        </ul>
      </div>
  );
};

export default Pagination;