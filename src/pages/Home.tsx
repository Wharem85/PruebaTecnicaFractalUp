import React, {useEffect, useState, Suspense} from 'react';
import { Box, Grid, TextField } from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import ModalCountry from '../containers/ModalCountry';
import axios from 'axios';
import { Menu, Search } from '@mui/icons-material';
import '../styles/general.css';
import CardsCountries from '../components/CardsCountries';

const GET_COUNTRIES = gql`
  {
		countries {
			name
			capital
			currencies
			code
			languages {
				name
			}
			continent {
				name
			}
		}
	}
`;

const Home: React.FC = () => {
	const clientId = 'PDWo34J8Cq552VghWXkrdwrqorj8lumfg68yE8Zr6DEg0Equ3clJ0Blv';
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState({});
	const [openModal, setOpenModal] = useState(false);
	const [filter, setFilter] = useState('');
	const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

	useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

	const { data, loading, error } = useQuery(GET_COUNTRIES);

	useEffect(() => {
		if (data) {
      const countries = data.countries;
      Promise.all(countries.map(async (country: any) => {
        try {
          const response = await axios.get(`https://api.pexels.com/v1/search?query=${country.name} country&per_page=1`, {
            headers: {
              Authorization: clientId
            }
          });
          const imageUrl = response.data.photos[0].src.small;

          const restResponse = await axios.get(`https://restcountries.com/v3.1/name/${country.name}`);
          const flagUrl = restResponse.data[0].flags.png;

          return { ...country, imageUrl, flagUrl };
        } catch (error: any) {
          console.error(`Error fetching data for ${country.name}: ${error.message}`);
          return { ...country, imageUrl: null, flagUrl: null };
        }
      })).then((countriesWithImages: any) => {
        setCountries(countriesWithImages);
      });
    }
	}, [data]);

	if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

	let filteredCountries = countries;

  if (filter) {
    filteredCountries = filteredCountries.filter((country: any) =>
      country.name.toLowerCase().includes(filter.toLowerCase()) ||
      country.continent.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

	return (
		<div className="background">
			<Box sx={{display: 'flex', alignItems: 'center', marginLeft: windowSize.width <= 1200 ? 2 : 30, justifyContent: 'center'}}>
				<Menu sx={{width: 50, height: 50, marginLeft: windowSize.width <= 1200 ? 0 : 30, display: windowSize.width <= 1200 ? 'flex' : 'none'}} />
				<TextField
            label="Buscar por país o continente"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
							width: windowSize.width <= 1200 ? 600 : 800,
							borderRadius: '25px',
							backgroundColor: '#fff',
							color: 'black',
							'& .MuiFilledInput-input': {
								backgroundColor: 'white',
								borderStartStartRadius: '25px',
								borderEndStartRadius: '25px',
								border: 'none',
								color: 'black',
								'&:hover': {
									backgroundColor: 'white',
								},
							},
						}}
						InputProps={{
							endAdornment: <Search sx={{width: 30, height: 30}} />,
							sx: {
								paddingRight: '30px',
								borderRadius: '25px',
								backgroundColor: 'white',
								'&:hover': {
									backgroundColor: 'white',
								},
							},
						}}
						variant="filled"
          />
			</Box>
			{filteredCountries.length > 0 ? (
				<Grid sx={{marginLeft: windowSize.width <= 1200 ? 2 : 30, width: '90%', marginTop: 5}} container spacing={3}>
					<Suspense fallback={<div>Cargando...</div>}>

						{filteredCountries.map((countrie: any) => (
							<CardsCountries key={countrie.code} country={countrie} setCountry={setCountry} setOpenModal={setOpenModal} />
						))}
					</Suspense>
				</Grid>
				) : (
					<div>Cargando...</div>
			)}
			<ModalCountry open={openModal} setOpen={setOpenModal} country={country} />
		</div>
	)
}

export default Home;
