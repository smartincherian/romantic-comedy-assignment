import React, { useEffect, useState } from 'react';

export function Content(props) {

    const contentItems = props.jsonData.page['content-items'].content;
    console.log(contentItems)
    return (
        <div className='bg-black border-red-600 border-2' >

            <section className="overflow-hidden text-gray-100 ">
                <div className="container ml-[30px] mr-[30px]">
                    <div className="flex flex-wrap ">


                        {contentItems.map(element => {
                            return (
                                <div className="flex flex-wrap w-1/3">
                                    <div className="w-full mr-[30px]">
                                        <img alt="poster" className="block object-cover object-center w-full h-full rounded-lg"
                                            src={require(`../assets/${element["poster-image"]}`)} />
                                    </div>
                                    <div className=''>
                                        <p className='text-2xl text-white mt-1 mb-[90px]'>{element.name}</p>
                                    </div>
                                </div>
                            )
                        }
                        )}




                    </div>
                </div>
            </section>
        </div>
    )
}
