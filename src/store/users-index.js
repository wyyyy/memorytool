import ResModule from './../Store/modules/ResModules';
import UsersModule from "./../Store/modules/UsersModule";
const vuex_config = new Vuex.Store({
    modules: {
        res:ResModule,
        users:UsersModule
    }
});