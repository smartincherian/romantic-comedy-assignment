import { Header } from './components/Header';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Content } from './components/Content';

function App() {

  const dispatch = useDispatch();
  useSelector(state => console.log(state));

  //redux data
  const jsonDataRedux = useSelector(state => state.getJSONDataReducer);
  const pageSizeRequestedRedux = jsonDataRedux.page['page-size-requested'];
  const pageSizeReturnedRedux = jsonDataRedux.page['page-size-returned'];

  const contentsArrayRedux = useSelector(state => state.getJSONArrayReducer);
  console.log(contentsArrayRedux)

  const searchReduxArray = useSelector(state => state.searchJSONArrayReducer.filteredArray);
  const searchWord = useSelector(state => state.searchJSONArrayReducer.searchFilter);
  const isSearchOn = useSelector(state => state.searchJSONArrayReducer.isSearchOn);
  console.log(isSearchOn)

  const contents = (searchWord == undefined || searchWord == '') ? contentsArrayRedux  : searchReduxArray;
  const contentsLength = (searchWord == undefined || searchWord == '') ? contentsArrayRedux.length : searchReduxArray.length;

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
  }, [page]);


  const getMoreData = () => {
    if (searchWord == undefined || searchWord == '') {
      if (pageSizeRequestedRedux == pageSizeReturnedRedux) {
        setpage(prevState => prevState + 1);
      }
      return;
    }

    else  {
      if (pageSizeRequestedRedux == pageSizeReturnedRedux) {
        setpage(prevState => prevState + 1);
      }
    }
  }

  //searchFunctions
  const searchHandler = (searchInput) => {
    const properSearchInput = searchInput.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    dispatch({ type: "JSON_FILTER", searchFilter: properSearchInput, contents: contentsArrayRedux });
  }

  return (
    <div>
      <Header title={jsonDataRedux.page.title} onSearch={searchHandler} />
      <Content contentsLength={contentsLength} page={page} contents={contents} getMoreData={getMoreData} />
    </div>
  );
}

export default App;
