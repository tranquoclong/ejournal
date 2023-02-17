import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PaginationRe from '../../../../common/Paging';

function Major({ allMajor }) {
  const [page, setPage] = useState(0);
  return (
    <div className="col-lg-6 col-md-12 col-xs-12 traffic">
      <div className="dashboard-list-box margin-top-20">
        <h4 className="gray">Danh sách các ngành học</h4>
        <ul>
          {allMajor && (
            <>
              {allMajor.slice(page, page + 5).map((major, index) => (
                <li key={index}>
                  <div className="user-list-item">
                    <div className="user-list-content">
                      <h4>{major.name}</h4>
                      <span>{major.status}</span>
                    </div>
                    <div className="user-btns">
                      <Link to="#" className="button">
                        View
                      </Link>
                      <Link to="#" className="button">
                        Edit
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
              <PaginationRe
                page={page}
                setPage={setPage}
                count={5}
                totalPages={allMajor.length}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Major