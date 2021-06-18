//@ts-nocheck
import { call, put, takeLatest } from 'redux-saga/effects';
import {Api} from "../../../api/api";
import {setCity} from "./actionCreators";

export function* fetchIpGeoRequest() {
    try {
        const city = yield call(Api.fetchIpGeo);
        yield put(setCity(city));
    } catch (error) {
        console.log(error);
        //yield put(setCity("Москва"));
    }
}

export function* IpGeoSaga() {
    yield takeLatest('FETCH_IP_GEO_REQUEST', fetchIpGeoRequest);
}
