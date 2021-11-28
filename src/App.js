import { useEffect, useState } from "react"
import "./bootstrap.min.css"
import { header, footerText, mainText, advertisementPath } from './text.json'

function App() {

  const [navArrs, setNavArrs] = useState([])
  const [nowIndex, setNowIndex] = useState(0)
  useEffect(() => {
    // if (false) setInterval(() => { getNews() }, 5000);
    getNews()

  }, [])
  useEffect(() => {
    let myTimeOut = setTimeout(() => {
      let lens = navArrs.length
      if (lens > 0) {
        console.log(nowIndex, lens, nowIndex < lens)
        nowIndex < lens - 4 ? setNowIndex(nowIndex + 1) : setNowIndex(0)
      }
    }, 5000);
    return () => clearTimeout(myTimeOut)
  })
  const getNews = () => {

    fetch(advertisementPath,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      })
      .then((res) => {
        return res.text()
      }).then((res) => {
        return JSON.parse(res)
      }).then((res) => {
        console.log(res)
        if (res.status !== "ok") { return }
        // const result = res.articles[0]

        setNavArrs(res.articles)


      }).catch((e)=>{
        console.log(e)
        alert('network err')
      })
  }

  return (
    <div className="container w-100 mt-3">
      <div id="headerBox" className=" w-100  mb-1   p-2 text-center text-wrap fs-1 ">{header}</div>
      <div id="mainAndNavBox " className="row g-2">
        <pre id="mainBox" className="col-8  fs-4 round bg-light p-2" style={{ whiteSpace: 'pre-wrap' }} >{mainText}</pre>
        <div className="col-1 p-1"></div>
        <div className="col-3 ">
          {!!navArrs.length && <a id="navBox " href={navArrs[nowIndex].url?navArrs[nowIndex].url:""} title={navArrs[nowIndex].title}><img src={navArrs[nowIndex].urlToImage?navArrs[nowIndex].urlToImage:""} alt={navArrs[nowIndex].content} width="100%" height="100%" ></img></a>}
          {/* {navArrs.length >= 1 && [nowIndex, nowIndex + 1, nowIndex + 2, nowIndex + 3, nowIndex + 4].map((value) => {
            if(!navArrs[value].url||navArrs[value].urlToImage){
              return <div key={`${value}`}/>
            }

            return <a id="navBox "  href={navArrs[value].url} title={navArrs[value].title}><img src={navArrs[value].urlToImage} alt={navArrs[value].content} width="100%" height="25%" ></img></a>
          })

          } */}
        </div>
      </div>
      <div id="footer" className="mt-5 mb-5 p-2 text-center ">{footerText}</div>
    </div>
  );
}

export default App;
