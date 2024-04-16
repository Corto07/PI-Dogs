import React from "react";
import style from "../pagination/pagination.module.css"

export default function Pagination ({ dogsPerPage, allDogs, pagination, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    const maxButtons = 3; // Número máximo de botones a mostrar
    const halfButtons = Math.floor(maxButtons / 2);
    
    let startPage = Math.max(currentPage - halfButtons, 1);
    let endPage = Math.min(startPage + maxButtons - 1, pageNumbers.length);

    if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pageNumbers.length;

    return (
        <nav>
            <ul className={style.crumbs}>
                <li className={style.number}>
                    <div className={`${style.crumb} ${isFirstPage ? style.crumb__disabled : ""}`} onClick={!isFirstPage ? () => pagination(1) : null}>« Primera</div>
                </li>
                <li className={style.number}>
                    <div className={`${style.crumb} ${isFirstPage ? style.crumb__disabled : ""}`} onClick={!isFirstPage ? () => pagination(currentPage - 1) : null}>«</div>
                </li>

                {pageNumbers.slice(startPage - 1, endPage).map((number, i) => (
                    <li className={style.number} key={number}>
                        <div className={`${currentPage === number ? `${style.crumb} ${style.crumb__active}` : style.crumb} ${style.crumb__enabled}`} onClick={() => pagination(number)}>{number}</div>
                    </li>
                ))}

                <li className={style.number}>
                    <div className={`${style.crumb} ${isLastPage ? style.crumb__disabled : ""}`} onClick={!isLastPage ? () => pagination(currentPage + 1) : null}>»</div>
                </li>
                <li className={style.number}>
                    <div className={`${style.crumb} ${isLastPage ? style.crumb__disabled : ""}`} onClick={!isLastPage ? () => pagination(pageNumbers.length) : null}>Ultima »</div>
                </li>
            </ul>
        </nav>
    )
};