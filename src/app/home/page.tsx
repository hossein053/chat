import { OrganizeImage } from "@/components/common/image";
import image from "@/assets/images/rb_2147780861.png";
import React from "react";


export default async function Page() {

    return (
        <div className="h-full w-full row">
            <div className="inline-block bg-background dark:bg-dark-background py-7 px-5 rounded-lg relative z-10">
                <OrganizeImage
                    alt=""
                    className="w-[230px] h-auto mx-auto mb-5"
                    src={image}
                    width={50}
                    height={50}
                />
                <p>یک چت را برای شروع پیام انتخاب کنید</p>
            </div>
        </div>
    )
}