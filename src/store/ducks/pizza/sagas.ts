//@ts-nocheck
import { call, put, takeLatest } from 'redux-saga/effects';
import {Api} from "../../../api/api";
import {setPizza} from "./actionCreators";

export function* fetchPizzaRequest() {
    try {
        const items = yield call(Api.fetchPizzas);
        yield put(setPizza(items));
    } catch (error) {
        yield put(setPizza('Ничего'));
    }
}


export function* pizzaSaga() {
    yield takeLatest('FETCH_PIZZA_REQUEST', fetchPizzaRequest);
}
