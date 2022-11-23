import {container} from "tsyringe";
import {IDateProvider} from "./IDateProvider";
import {DateProvider} from "./DateProvider";
import {IMailProvider} from "./IMailProvider";
import {MailProvider} from "./MailProvider";

container.registerSingleton<IDateProvider>("DateProvider", DateProvider)
container.registerSingleton<IMailProvider>("MailProvider", MailProvider)