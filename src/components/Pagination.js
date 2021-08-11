import React from 'react'

const Pagination = ({totalPage, pageNumber, onClickPageButton}) => {

    return (
        <div className={"pagination-container Pagination"}>
            {totalPage ? Array.from({length: totalPage}).map((data, idx) => {
                    return(
                    <button key={idx + 1} className={"pagination-btn " + (pageNumber == (idx + 1) ? 'active' : null)} onClick={() => onClickPageButton(idx + 1)}>
                        {idx + 1}
                    </button> )
                    
            }) : null}
        </div>
    )
}

export default Pagination
