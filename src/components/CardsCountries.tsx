import React, {Fragment} from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

interface Data {
	country: any,
	setCountry: any;
	setOpenModal: any;
}


const CardsCountries: React.FC<Data> = ({country, setCountry, setOpenModal}) => {
	return (
		<Fragment>
			<Grid item key={country.code} xs={12} sm={6} md={4} sx={{maxWidth: 400}} onClick={() => {
					setCountry(country)
					setOpenModal(true)
				}}>
          <Card sx={{ maxWidth: 400, borderRadius: '30px' }}>
            <CardMedia
              component="img"
              height="140"
              image={country.imageUrl}
              alt={country.name}
            />
            <CardContent>
							<Grid container alignItems="center" spacing={2}>
								<Grid item>
									<img src={country.flagUrl} style={{width: 50}} />
								</Grid>
								<Grid item>
									<Typography gutterBottom variant="h5" component="div" className="name-country">
										<a className="name-country">{country.name}</a>
									</Typography>
									<Typography variant="body2" color="text.secondary" className="name-continent">
										<span className="name-continent">{country.continent?.name}</span>
									</Typography>
								</Grid>
							</Grid>
            </CardContent>
          </Card>
        </Grid>
		</Fragment>
	)
}

export default CardsCountries;
