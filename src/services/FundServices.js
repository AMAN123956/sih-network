import request from "./request";

export const PostFundRaise = (data, companyId) => {
  return request.post(`/api/startup/raiseFund/${companyId}`, data);
};

export const GetStartup = (id) => {
  return request.get(`/api/startup/${id}`);
};
