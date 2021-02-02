export const FETCH_BEGAN = "FETCH_BEGAN";
export const FETCH_SUCCEEDED = "FETCH_SUCCEEDED";
export const FETCH_FAILED = "FETCH_FAILED";

export const fetchDataBegin = () => ({
  type: FETCH_BEGAN,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_SUCCEEDED,
  payload: { data },
});

export const fetchDataFail = (error) => ({
  type: FETCH_FAILED,
  payload: { error },
});
