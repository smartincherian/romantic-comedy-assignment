import './App.css';
import { Header } from './components/Header';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import { legacy_createStore as createStore } from 'redux';


function App() {

  const dispatch = useDispatch();
  useSelector(state => console.log(state));

  const jsonDataRedux = useSelector(state => state.getJSONDataReducer);
  const pageSizeRequestedRedux = jsonDataRedux.page['page-size-requested'];
  const pageSizeReturnedRedux = jsonDataRedux.page['page-size-returned'];

  const contentsArrayRedux = useSelector(state => state.getJSONArrayReducer);

  const searchReduxArray = useSelector(state => state.searchJSONArrayReducer.filteredArray);
  const searchWord = useSelector(state => state.searchJSONArrayReducer.searchFilter);
  console.log(searchReduxArray)

  const contents = searchReduxArray ? searchReduxArray : contentsArrayRedux;
  const contentsLength = searchReduxArray ? searchReduxArray.length : contentsArrayRedux.length;


  const [page, setpage] = useState(1);

  // const [contentsArray, setcontentsArray] = useState([]);
  //inital loaded data
  const getData = () => {
    
    fetch(`../api/CONTENTLISTINGPAGE-PAGE${page}.json`
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        // setcontentsArray(prevArray => [...prevArray, ...myJson.page['content-items'].content]);
        dispatch({ type: "JSON_DATA", jsonData: myJson });
        dispatch({ type: "JSON_ARRAY", jsonArray: myJson.page['content-items'].content, search:searchWord });
      });
  }

  useEffect(() => {
    getData();
  }, [page]);



  // console.log(page)

  //handling scrolling
  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //     document.documentElement.offsetHeight
  //   )
  //     return;
  //   // if (page == 'PAGE1') {
  //   //   setpage('PAGE2')
  //   // }
  //   // else if (page == 'PAGE2') {
  //   //   setpage('PAGE3')
  //   // }

  //   setnextPage(true);
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  //nextPage
  console.log(pageSizeRequestedRedux);
  console.log(pageSizeReturnedRedux);

  const getMoreData = () => {

    if (!searchWord) {
      if (pageSizeRequestedRedux == pageSizeReturnedRedux) {
        setpage(prevState => prevState + 1);
      }
      return;
    }

    if(searchWord){
      console.log("it reached here")
      if(page==3) return;
      else if (page==1){
        
      }

    }

    // else {
      // setpage(prevState => prevState + 1);
    // }

  }

  // useEffect(() => {
  //   // if (!nextPage) return;
  //   getMoreData();
  // }, []);


  // console.log(jsonData)
  const contentItems = jsonDataRedux.page['content-items'].content;
  // console.log(contentsArray)


  const searchHandler = (searchInput) => {
    const properSearchInput = searchInput.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    dispatch({ type: "JSON_FILTER", searchFilter: properSearchInput, contents: contentsArrayRedux });
    console.log(properSearchInput)
  }

  return (
    <div>
      <Header title={jsonDataRedux.page.title} onSearch={searchHandler} />
      {/* <Content jsonData={jsonData} /> */}
      <div className='bg-black pt-8' >

        <section className="overflow-hidden text-gray-100 ">
          <div className="container ml-[30px] mr-[30px]">

{/* {console.log(contentsLength)} */}
{console.log(contentsArrayRedux.length)}


            <InfiniteScroll
              dataLength={contentsLength}
              // dataLength={contentsArrayRedux.length}
              next={getMoreData}
              hasMore={(contentsArrayRedux.length < 54)}>
              <div className="flex flex-wrap ">
                {contents.map(element => {
                  // {contentsArrayRedux.map(element => {
                  return (
                    <div className="flex flex-wrap w-1/3">
                      <div className="w-full mr-[30px]">
                        <img alt="poster" className="block object-cover object-center w-full h-full rounded-lg"
                          src={require(`./assets/${element["poster-image"]}`)} />
                      </div>
                      <div className=''>
                        <p className='text-2xl text-white mt-1 mb-[90px]'>{element.name}</p>
                      </div>
                    </div>
                  )
                }
                )}
              </div>
            </InfiniteScroll>




          </div>
        </section>
      </div>
      {/* <div className="wrapper">
        <h1>Bird List</h1>
        <form>
          <label>
            <p>
              Add Bird
            </p>
            <input type="text" />
          </label>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
        <ul>
          {birds.map(bird => (
            <li key={bird.name}>
              <h3>{bird.name}</h3>
              <div>
                Views: {bird.views}
                <button onClick={() => dispatch(incrementBird(bird.name))}><span role="img" aria-label="add">➕</span></button>
              </div>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default App;
