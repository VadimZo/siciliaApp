//@ts-nocheck
import { call, put, takeLatest } from 'redux-saga/effects';
import {Api} from "../../../api/api";
import {setUserData, setUserLoadingStatus} from "./actionCreators";

export function* fetchUserDataRequest() {
    try {
        yield put(setUserLoadingStatus('LOADING'));
        const {data}=yield call(Api.getMe);
        yield put(setUserData(data));
        yield put(setUserLoadingStatus('LOADED'));
    } catch (error) {
        yield put(setUserLoadingStatus('NEVER'));
    }
}
export function* fetchSineUpRequest({payload}) {
    try {
        yield put(setUserLoadingStatus('LOADING'));
        const {data}=yield call(Api.sineUp, payload);
        yield put(setUserLoadingStatus('SUCCESS'));
        yield put(setUserLoadingStatus('LOADED'));
    } catch (error) {
        yield put(setUserLoadingStatus('ERROR'));
    }
}
export function* fetchSineInRequest({payload}) {
    try {
        yield put(setUserLoadingStatus('LOADING'));
        const {data}  = yield call(Api.signIn, payload);
        window.localStorage.setItem('token', data.token);
        yield put(setUserData(data));
        yield put(setUserLoadingStatus('SUCCESS'));
        yield put(setUserLoadingStatus('LOADED'));
    } catch (error) {
        yield put(setUserLoadingStatus('ERROR'));
    }
}


export function* userSaga() {
   yield takeLatest('FETCH_SINE_UP', fetchSineUpRequest);
   yield takeLatest('FETCH_SINE_IN', fetchSineInRequest);
   yield takeLatest('FETCH_USER_DATA', fetchUserDataRequest);
}
