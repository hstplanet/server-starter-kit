import Server from "hst/Service";
import Util from "hst/Util";
import conf from "app/hst.conf";

class HST {

    server = Server;
    util = Util;
    conf = conf;

}


export default new HST();