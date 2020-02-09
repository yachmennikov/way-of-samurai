import React, { useState } from 'react';
import styles from './paginator.module.css';

const Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginationItem}>
      { portionNumber > 1 &&
        <button onClick={ () => setPortionNumber(portionNumber - 1) }>Prev</button>
      }
      { pages.filter( p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
             .map( page => <span className={ currentPage === page ? styles.selectedPage : '' } 
               key={page} onClick={ () => { onPageChanged(page) } }>{ page } </span> )
      }
       { portionCount > portionNumber &&
        <button onClick={ () => setPortionNumber(portionNumber + 1) }>Next</button>
      }
    </div>
  )
}

export default Paginator