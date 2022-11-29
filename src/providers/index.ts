import {container} from "tsyringe";
import {IDateProvider} from "./IDateProvider";
import {DateProvider} from "./DateProvider";
import {IMailProvider} from "./IMailProvider";
import {MailProvider} from "./MailProvider";
import {IStorageProvider} from "./IStorageProvider";
import {LocalStorageProvider} from "./LocalStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DateProvider)
container.registerSingleton<IMailProvider>("MailProvider", MailProvider)
container.registerSingleton<IStorageProvider>("StorageProvider", LocalStorageProvider)
