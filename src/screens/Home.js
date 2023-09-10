import React, { useState, useEffect } from 'react'
import Nabvar from '../Components/Nabvar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'


export default function Home() {
  const [search, setsearch] = useState([]);
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    response = await response.json();
    // console.log(response[0],response[1]);
    setfoodItem(response[0]);
    setfoodCat(response[1]);

  }

  useEffect(() => {
    loadData();


  }, []);




  return (
    <>
      <div><Nabvar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/?samosa" className="d-block w-100" style={{filter:"brightness(30%)",height:"60vh",width:"100vh"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/?burger" className="d-block w-100" style={{filter:"brightness(30%)",height:"60vh",width:"100vh"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/?momos" className="d-block w-100" style={{filter:"brightness(30%)",height:"60vh",width:"100vh"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
      <div className='container'>
        {
         foodCat !==[] ? foodCat.map((data)=>{
          return <div className='row mb-3'>
          <div key={data._id} className='fs-3 m-3'>
            {data.CategoryName}</div>
            <hr/>
            {foodItem !==[]?foodItem.filter((item)=>
             item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleString().toLowerCase()))
             .map(filterItems=>{
              return (
                <div className='col-12 col-md-6 col-lg-3 ' key={filterItems._id}>
                  < Card 
                  foodItem={filterItems}
                  options={filterItems.options[0]}
                   /> </div>
              )
             })
             :<div>No Such Data Found</div>}
            </div>
         })
         :""
         
        }
        
        

      </div>
      <div><Footer /></div>

    </>
  )
}
