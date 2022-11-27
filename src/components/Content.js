import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'

export function Content(props) {

    const {contentsLength,contentsArrayRedux,contents,getMoreData } =  props;

    return (
        <div className='bg-black pt-9 mt-28 sm:mt-48' >
            <InfiniteScroll
                dataLength={contentsLength}
                next={getMoreData}
                hasMore={(contentsArrayRedux.length < 54)}>
                <div className="flex flex-wrap ml-4 sm:ml-[30px]">
                    {contents.map(element => {
                        return (
                            <div className="flex flex-wrap w-1/3">
                                <div className="w-full mr-4 sm:mr-[30px]">
                                    <img alt="poster" className="block object-cover object-center w-full h-full rounded-lg"
                                        src={require(`../assets/${element["poster-image"]}`)} />
                                </div>
                                <div className=''>
                                    <p className='text-sm sm:text-2xl text-white mt-1 mb-12 sm:mb-[90px]  '>{element.name}</p>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </InfiniteScroll>
        </div>
    )
}
