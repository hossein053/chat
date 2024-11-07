import { FormSendMessage } from "@/components/view/formSendMassage";
import { GetListMessage } from "@/components/view/getListMessage";
interface context {
    params: {
        userId: string;
    };
}
export default function Page(context: context) {

    const { params: { userId } } = context;

    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-[85vh] max-h-[85vh] p-2">
                <GetListMessage _id={userId} />
            </div>
            <div className="h-[10vh] max-h-[10vh] p-2">
                <FormSendMessage _id={userId} />
            </div>
        </div>
    )
}