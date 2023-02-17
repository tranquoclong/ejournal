import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetAllMajor, actGetAllUniversity } from "../../../../store/user/actions";
import PaginationRe from "../../../../common/Paging";
import Major from "./major";
import { Link } from 'react-router-dom';
import AddMajor from "./addMajor";
import AddUniversity from "./addUniversity";
function University() {
    const dispatch = useDispatch();
    const allUniversity = useSelector((state) => state.User.allUniversity);
    const allMajor = useSelector((state) => state.User.allMajor);
    const [page, setPage] = useState(0);
    useEffect(
    () => {
        dispatch(actGetAllUniversity());
        dispatch(actGetAllMajor());
    },
    // eslint-disable-next-line
    []
    );
  return (
    <div className="dashboard-content">
      <div className="dashboard-form" style={{ marginBottom: "30px" }}>
        <div className="row">
          <AddUniversity allUniversity={allUniversity} />
          <AddMajor allMajor={allMajor} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box with-icons margin-top-20">
            <h4 className="gray">Danh sách các trường học</h4>
            <ul>
              {allUniversity && (
                <>
                  {allUniversity
                    .slice(page, page + 5)
                    .map((university, index) => (
                      <li key={index}>
                        <div className="user-list-item">
                          <div className="user-list-content">
                            <h4>{university.name}</h4>
                            <span>{university.email}</span>
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
                    totalPages={allUniversity.length}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
        <Major allMajor={allMajor} />
      </div>
    </div>
  );
}

export default University