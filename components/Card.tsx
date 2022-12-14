import {ComponentProps, HTMLAttributes, PropsWithChildren} from "react";

export default function Card({children, className}: PropsWithChildren<HTMLAttributes<any>>) {
    return <div className={`p-5 border rounded-md bg-white ${className}`}>
        {children}
    </div>
}