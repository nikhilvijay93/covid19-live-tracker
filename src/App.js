import React, { useState, useEffect} from 'react';
import { MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core';
import Infobox from './Infobox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
import './App.css';


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect( () => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, [])

  useEffect( () => {
    const getCountriesData= async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2         
        }
        ));

        const sortedData = sortData(data)
        setTableData(sortedData);
        setCountries(countries);
      });
    };
    getCountriesData();
  }, [])

  const onChangeCountry = async (event) => {
    const countryCode = event.target.value;

    console.log(countryCode);

    setCountry(countryCode);

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      setCountryInfo(data);
    });
  };

  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid 19 Live Tracker</h1>
          <FormControl>
            <Select variant="outlined" onChange={onChangeCountry} value={country}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {
                countries.map( country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

              {/*<MenuItem value="worldwide">WorldWide</MenuItem>
              <MenuItem value="worldwide">Option 2</MenuItem>
              <MenuItem value="worldwide">Option 3</MenuItem>
              <MenuItem value="worldwide">Option 4</MenuItem>*/}
            </Select>
          </FormControl>
        </div>
      
        <div className="infoBox">
          <Infobox 
          title="Coronavirus Cases" 
          cases={countryInfo.todayCases} 
          total={countryInfo.cases} />
          
          <Infobox 
          title="Recovered" 
          cases={countryInfo.todayRecovered} 
          total={countryInfo.recovered} />
          
          <Infobox 
          title="Deaths" 
          cases={countryInfo.todayDeaths} 
          total={countryInfo.deaths} />
        </div>

        {/* Header - done*/}

        {/* Title + dropdown field  - done*/}

        {/* Infobox */}
        {/* Infobox */}
        {/* Infobox */}

        {/* Map */}
        <Map />

      </div>
      <Card className="app_right">
          {/* Table */}
          {/* Graph */}
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}/>
            <h3>WorldWide new cases</h3>
            <LineGraph />
          </CardContent>
      </Card>
    </div>
  );
} 

export default App;
