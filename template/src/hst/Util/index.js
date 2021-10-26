import { date, uid, Notify, LocalStorage, SessionStorage, LoadingBar } from "quasar";

class Util {

    date = date;
    uid = uid;
    notify = Notify;
    LocalStorage = LocalStorage;
    SessionStorage = SessionStorage;
    LoadingBar = LoadingBar;
    email() { };
    math() { };

}

export default new Util();