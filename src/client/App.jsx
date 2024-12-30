import { useState } from "react";
import "./App.css";
function App() {

  const [data, setData] = useState('');
  const [cityName, setCityName] = useState('');
  const [hotelName, setHotelName] = useState('');
  
  const handleSubmit = async() => {
    if(cityName != '' && hotelName != ''){
      const url = 'http://localhost:8079/api/location-explorer/generate';
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({city: cityName, hotel: hotelName})
      })
      const result = await response.json(); 
      setData(result.result)
      if(result){
        setCityName('')
        setHotelName('')
      }
    }
  }

  return (
    <div className="App" style={{width: '100%', }}>
      <h2>Explore the city</h2>
      <div style={{border:'1px solid #C3C3C3', backgroundColor:'#FFF', display:'flex', alignItems:'center', justifyContent:'space-between', flexDirection:'column', borderRadius: '10px'}}>
        <div style={{height: '500px', overflow: 'auto', alignItems:'center', display:'flex', flexDirection: 'column'}}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingTop: '40px'}}>
              <input 
                type="text" 
                placeholder='Please enter the city name' 
                value={cityName} 
                onChange={(e) => setCityName(e.target.value)}
                style={{height: 40, width: 250, border: '1px solid #000', paddingLeft: '10px', borderRadius: '5px'}}
              />
              <input 
                type="text" 
                placeholder='Please enter the hotel name' 
                value={hotelName} 
                onChange={(e) => setHotelName(e.target.value)}
                style={{height: 40, width: 250, border: '1px solid #000', paddingLeft: '10px', borderRadius: '5px', marginLeft: '20px'}}
              />

              <div onClick={handleSubmit} style={{height: 40, backgroundColor:'#000', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', width: 150, alignSelf:'center', marginLeft: '20px'}}>
                <h3 style={{color:'#FFF'}}>Submit</h3>
              </div>
            </div>
            {data ? 
              <p style={{textAlign:'left', padding: '20px', whiteSpace: 'pre-wrap'}}>{data}</p>
            :
              <p style={{textAlign:'center', paddingTop: '150px'}}>No data to display, Please input the city and hotel names above.! </p>
            }
        </div>
        {/* <div onClick={handleSubmit} style={{height: 40, backgroundColor:'#000', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', borderRadius: '10px', width: 150, alignSelf:'center', marginBottom: '20px'}}>
          <h2 style={{color:'#FFF'}}>Submit</h2>
        </div> */}
      </div>
      </div>
      
  );
}

export default App;
