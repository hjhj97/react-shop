import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URI;
//axios.defaults.timeout = store.state.time.AXIOS_TIMEOUT; // 최대 10초

axios.interceptors.request.use(
  // interceptor를 통해 백엔드 API로부터 받은 값을 먼저 처리함
  (response) => {
    return response;
  },
  (error) => {
    // 2xx 외의 범위에 있는 상태코드는 여기에서 실행됨
    console.log(error.response);
    return error;
  }
);

axios.interceptors.response.use(
  // interceptor를 통해 백엔드 API로부터 받은 값을 먼저 처리함
  (response) => {
    // 2xx 범위에 있는 상태코드는 여기에서 실행됨
    //if (response.data) {
    //  return response.data;
    //} else {
    //  return response;
    //}
    //return response;
    return response.data;
  },
  (error) => {
    // 2xx 외의 범위에 있는 상태코드는 여기에서 실행됨
    //if (error.code === 'ERR_NETWORK') {
    //	store.commit('toast/error', '네트워크 에러. 잠시 후 시도해주세요');
    //} else if (error.code === 'ERR_BAD_RESPONSE') {
    //	store.commit('toast/error', '서버가 응답하지 않습니다. 잠시 후 시도해주세요');
    //} else if (error.code === 'ECONNABORTED') {
    //	store.commit('toast/error', '요청시간을 초과했습니다. 잠시 후 시도해주세요');
    //} else if (error.code === 'ERR_BAD_REQUEST') {
    //	store.commit('toast/error', '올바르지 않은 요청입니다. 잠시 후 시도해주세요');
    //	//router.replace({ name: '404' });
    //} else {
    //	store.commit('toast/error', error.code);
    //}
    //store.commit('spinnerOff');
    console.log(error);
    return error;
  }
);

export default axios;
