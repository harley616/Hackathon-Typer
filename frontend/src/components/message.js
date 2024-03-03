import React from 'react';

export default function Messsage({message}) {
    return (
        <div className="absolute center top-40 p-2 bg-red-400 w-full h-max rounded-md">
            {message}
        </div>
    );
}