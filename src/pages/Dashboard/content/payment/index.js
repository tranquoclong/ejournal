import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationRe from '../../../../common/Paging'
import { actFetchPaymentsAsync, actFetchPaymentUnisAsync } from '../../../../store/post/actions';

function Payments() {
    const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const payment = useSelector((state) => state.Post.payment);
  const paymentUnis = useSelector((state) => state.Post.paymentUnis);
  console.log("🚀 ~ file: index.js:14 ~ Payments ~ paymentUnis:", paymentUnis)
  useEffect(
    () => {
      dispatch(actFetchPaymentsAsync());
      dispatch(actFetchPaymentUnisAsync());
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div className="dashboard-content">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box margin-top-20 user-list">
            <h4 className="gray">Lịch Sử Thanh Toán Cá Nhân</h4>
            <ul>
              {payment && (
                <>
                  {payment.slice(page, page + 8).map((user, index) => (
                    <li key={index}>
                      <div className="user-list-item">
                        <div className="user-list-content">
                          <h4>
                            {parseInt(user.amount).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </h4>
                          {moment(user.creationtime).format("DD-MM-YYYY")}
                        </div>
                        <div className="user-btns"></div>
                      </div>
                    </li>
                  ))}
                  <PaginationRe
                    page={page}
                    setPage={setPage}
                    count={8}
                    totalPages={payment.length}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box margin-top-20 user-list">
            <h4 className="gray">Lịch Sử Thanh Toán Trường Học</h4>
            <ul>
              {paymentUnis && (
                <>
                  {paymentUnis.slice(page, page + 8).map((user, index) => (
                    <li key={index}>
                      <div className="user-list-item">
                        <div className="user-list-content">
                          <h4>
                            {parseInt(user.amount).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </h4>
                          <span>
                            {moment(user.expirationdate).format("DD-MM-YYYY")}
                          </span>
                        </div>
                        <div className="user-btns"></div>
                      </div>
                    </li>
                  ))}
                  <PaginationRe
                    page={page}
                    setPage={setPage}
                    count={8}
                    totalPages={paymentUnis.length}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments