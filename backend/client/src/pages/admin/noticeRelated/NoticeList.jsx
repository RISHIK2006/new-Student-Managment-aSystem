import { useAuth } from "../../../store/auth";
import ShowNotice from "./ShowNotice";
import Notices from "./Notices";

function NoticeList() {
    const { notice } = useAuth();
    return <>
        {notice.length > 0 ? <ShowNotice /> : <Notices />}
    </>
}

export default NoticeList;