import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { 
    faUser,
    faCogs,
    faWindowClose 
} from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faCogs, faWindowClose);

export { FontAwesomeIcon };