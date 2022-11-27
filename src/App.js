import { Header } from './components/Header';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import { Content } from './components/Content';

function App() {

  const dispatch = useDispatch();
  useSelector(state => console.log(state));

  //redux data
  const jsonDataRedux = useSelector(state => state.getJSONDataReducer);
  const pageSizeRequestedRedux = jsonDataRedux.page['page-size-requested'];
  const pageSizeReturnedRedux = jsonDataRedux.page['page-size-returned'];

  const contentsArrayRedux = useSelector(state => state.getJSONArrayReducer);

  const searchReduxArray = useSelector(state => state.searchJSONArrayReducer.filteredArray);
  const searchWord = useSelector(state => state.searchJSONArrayReducer.searchFilter);
  const isSearchOn = useSelector(state => state.searchJSONArrayReducer.isSearchOn);
  console.log(isSearchOn)

  const contents = searchReduxArray ? searchReduxArray : contentsArrayRedux;
  const contentsLength = searchReduxArray ? searchReduxArray.length : contentsArrayRedux.length;

  const [page, setpage] = useState(1);

  //fetching JSONData
  const getData = () => {
    fetch(process.env.PUBLIC_URL + `/api/CONTENTLISTINGPAGE-PAGE${page}.json`
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        dispatch({ type: "JSON_DATA", jsonData: myJson });
        dispatch({ type: "JSON_ARRAY", jsonArray: myJson.page['content-items'].content, search: searchWord });
      });
  }

  useEffect(() => {
    getData();
  }, [page, isSearchOn]);


  const getMoreData = () => {
    if (!searchWord) {
      if (pageSizeRequestedRedux == pageSizeReturnedRedux) {
        setpage(prevState => prevState + 1);
      }
      return;
    }

    

    if (searchWord) {
      console.log("it reached here")
      if (page == 3) return;
      else if (page == 1) {
      }
    }

    // else {
    // setpage(prevState => prevState + 1);
    // }

  }

  //searchFunctions
  const searchHandler = (searchInput) => {
    const properSearchInput = searchInput.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    dispatch({ type: "JSON_FILTER", searchFilter: properSearchInput, contents: contentsArrayRedux });
  }

  return (
    <div>
      <Header title={jsonDataRedux.page.title} onSearch={searchHandler} />
      <Content contentsLength={contentsLength} contentsArrayRedux={contentsArrayRedux} contents={contents} getMoreData={getMoreData}/>

      {/* <div className='bg-black pt-9 mt-28 sm:mt-48' >
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
                      src={require(`./assets/${element["poster-image"]}`)} />
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
      </div> */}

    </div>
  );
}

export default App;
