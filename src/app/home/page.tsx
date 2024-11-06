import Image from "next/image";
import React from "react";


export default async function Page() {

    return (
        <div className="bg-white h-full w-full window-chat row">
            <div className="inline-block bg-white py-7 px-5 rounded-lg">
                <Image
                    alt=""
                    className="w-[230px] h-auto mx-auto mb-5"
                    src={require('@/assets/images/rb_2147780861.png')}
                    width={50}
                    height={50}
                />
                <p>یک چت را برای شروع پیام انتخاب کنید</p>
            </div>
        </div>
    )
}