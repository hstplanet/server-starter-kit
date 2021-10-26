import Auth from "hst/Service/Auth";
import Storage from "hst/Service/Storage";
import Store from "hst/Service/Store";
import Socket from "hst/Service/Socket";
class Serive {

    auth = Auth;
    store = Store;
    storage = Storage;
    socket = Socket;

}
export default new Serive();