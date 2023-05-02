import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { 
    faUser,
    faCogs,
    faWindowClose,
    faEdit
} from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faCogs, faWindowClose, faEdit);

export { FontAwesomeIcon };