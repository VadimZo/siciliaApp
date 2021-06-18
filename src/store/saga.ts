//@ts-nocheck
import { all } from 'redux-saga/effects';
import {pizzaSaga} from "./ducks/pizza/sagas";
import {IpGeoSaga} from "./ducks/navigation/sagas";
import {userSaga} from './ducks/user/sagas';

export default function* rootSaga() {
    yield all([pizzaSaga(),IpGeoSaga(),userSaga()]);
}
